// Vercel Serverless Function — POST /api/razorpay-webhook
// Receives Razorpay webhook events, verifies the signature over the RAW
// request body with the webhook secret, and updates order status in Supabase.
// This is the safety net: even if the browser closes before verify-payment
// runs, the webhook still records the payment outcome.

import crypto from 'crypto';

// Read the raw request body ourselves; the signature is computed over the
// exact bytes Razorpay sent, so re-serialised JSON would not match.
function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    return res.status(500).json({ error: 'Webhook not configured' });
  }

  try {
    const raw = await readRawBody(req);
    const signature = req.headers['x-razorpay-signature'];
    if (!signature) return res.status(400).json({ error: 'Missing signature' });

    const expected = crypto.createHmac('sha256', secret).update(raw).digest('hex');
    const valid =
      expected.length === signature.length &&
      crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));

    if (!valid) {
      console.error('Webhook signature mismatch');
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const event = JSON.parse(raw.toString('utf8'));
    const type = event?.event;
    const payment = event?.payload?.payment?.entity;

    const sbUrl = process.env.VITE_SUPABASE_URL;
    const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (sbUrl && sbKey && payment?.id) {
      const headers = {
        'Content-Type': 'application/json',
        apikey: sbKey,
        Authorization: `Bearer ${sbKey}`,
      };

      if (type === 'payment.captured' || type === 'order.paid') {
        // Update existing order to captured; if verify-payment never ran
        // (e.g. browser closed), insert a minimal record so nothing is lost.
        const upd = await fetch(
          `${sbUrl}/rest/v1/orders?payment_id=eq.${encodeURIComponent(payment.id)}`,
          { method: 'PATCH', headers: { ...headers, Prefer: 'return=representation' }, body: JSON.stringify({ status: 'captured' }) }
        );
        const updated = upd.ok ? await upd.json() : [];
        if (!Array.isArray(updated) || updated.length === 0) {
          await fetch(`${sbUrl}/rest/v1/orders`, {
            method: 'POST',
            headers: { ...headers, Prefer: 'return=minimal,resolution=ignore-duplicates' },
            body: JSON.stringify({
              email: payment.email || null,
              phone: payment.contact || null,
              product_name: payment.description || 'Avera Coffee',
              amount: Math.round((payment.amount || 0) / 100),
              payment_id: payment.id,
              razorpay_order_id: payment.order_id || null,
              status: 'captured',
            }),
          });
        }
      } else if (type === 'payment.failed') {
        await fetch(
          `${sbUrl}/rest/v1/orders?payment_id=eq.${encodeURIComponent(payment.id)}`,
          { method: 'PATCH', headers, body: JSON.stringify({ status: 'failed' }) }
        );
      }
    }

    // Always 200 so Razorpay does not retry endlessly for events we ignore.
    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('webhook error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
