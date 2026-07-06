// Vercel Serverless Function — POST /api/verify-payment
// Verifies the Razorpay payment signature with HMAC-SHA256.
// Only a matching signature is treated as a real, captured payment.

import crypto from 'crypto';
import { sendOrderEmails } from './_email.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
  if (!KEY_SECRET) {
    return res.status(500).json({ error: 'Payment gateway not configured' });
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer,
      order,
    } = req.body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const expected = crypto
      .createHmac('sha256', KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const valid =
      expected.length === razorpay_signature.length &&
      crypto.timingSafeEqual(
        Buffer.from(expected),
        Buffer.from(razorpay_signature)
      );

    if (!valid) {
      // Signature mismatch — DO NOT mark as paid.
      return res.status(400).json({ verified: false, error: 'Signature mismatch' });
    }

    // Payment verified. Record the order in Supabase (best-effort, never blocks success).
    const sbUrl = process.env.VITE_SUPABASE_URL;
    const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (sbUrl && sbKey) {
      try {
        // Upsert on payment_id: if the webhook already inserted a minimal
        // record (it can win the race), merge the full customer details in.
        const sbRes = await fetch(`${sbUrl}/rest/v1/orders?on_conflict=payment_id`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: sbKey,
            Authorization: `Bearer ${sbKey}`,
            Prefer: 'return=minimal,resolution=merge-duplicates',
          },
          body: JSON.stringify({
            user_id: req.body?.user_id || null, // null = guest order
            customer_name: customer?.name || null,
            email: customer?.email || null,
            phone: customer?.phone || null,
            address: customer?.address || null,
            city: customer?.city || null,
            pincode: customer?.pincode || null,
            product_name: order?.productName || 'Avera Coffee',
            size: order?.size || null,
            grind: order?.grind || null,
            amount: Number(order?.amount) || 0,
            payment_id: razorpay_payment_id,
            razorpay_order_id,
            // status intentionally omitted: fresh inserts default to 'paid';
            // if the webhook already marked it 'captured', the merge keeps it.
          }),
        });
        if (!sbRes.ok) console.error('Supabase order insert failed:', await sbRes.text());
      } catch (dbErr) {
        console.error('Supabase order insert error (non-fatal):', dbErr);
      }
    }

    // Email the customer their confirmation + notify Avera (Zoho SMTP).
    // Best-effort: never blocks the success response.
    let zohoSent = false;
    try {
      const mail = await sendOrderEmails({
        order: order || {},
        customer: customer || {},
        paymentId: razorpay_payment_id,
      });
      zohoSent = Boolean(mail?.sent);
    } catch (mailErr) {
      console.error('order emails failed (non-fatal):', mailErr);
    }

    // Fallback notification to Avera via Web3Forms if Zoho did not send.
    const w3 = process.env.WEB3FORMS_KEY;
    if (!zohoSent && w3 && customer) {
      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: w3,
            subject: `New PAID Order — ${order?.productName || 'Avera Coffee'}`,
            from_name: 'Avera Website',
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id,
            product: order?.productName || '',
            size: order?.size || '',
            grind: order?.grind || '',
            amount: order?.amount || '',
            customer_name: customer?.name || '',
            customer_email: customer?.email || '',
            customer_phone: customer?.phone || '',
            address: customer?.address || '',
            city: customer?.city || '',
            pincode: customer?.pincode || '',
          }),
        });
      } catch (notifyErr) {
        console.error('Order notification failed (non-fatal):', notifyErr);
      }
    }

    return res.status(200).json({ verified: true, payment_id: razorpay_payment_id });
  } catch (err) {
    console.error('verify-payment error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
