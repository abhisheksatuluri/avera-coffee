// Vercel Serverless Function — POST /api/create-order
// Creates a Razorpay order. Amount is computed SERVER-SIDE from a trusted
// price table so it cannot be tampered with by the client.
// Secrets are read from runtime env vars (never shipped to the browser).

// Keep in sync with constants.ts — price per kg in INR.
const PRICE_PER_KG = {
  '1': 2200, // Arabica Washed
  '2': 2200, // Arabica Natural
  '3': 2200, // Robusta
  '4': 2200, // Red Honey Sun-Dried
  '5': 2200, // Black Honey Sun-Dried
  '6': 2200, // Fermented Whiskey
};

const SIZE_MULTIPLIER = {
  '250g': 0.25,
  '500g': 0.5,
  '1kg': 1,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const KEY_ID = process.env.RAZORPAY_KEY_ID;
  const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
  if (!KEY_ID || !KEY_SECRET) {
    return res.status(500).json({ error: 'Payment gateway not configured' });
  }

  try {
    const { productId, size, quantity = 1 } = req.body || {};

    const perKg = PRICE_PER_KG[productId];
    const mult = SIZE_MULTIPLIER[size];
    if (!perKg || !mult) {
      return res.status(400).json({ error: 'Invalid product or size' });
    }

    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    // rupees = perKg * multiplier; paise = rupees * 100
    const amountPaise = Math.round(perKg * mult * 100) * qty;
    if (amountPaise < 100) {
      return res.status(400).json({ error: 'Amount below minimum (100 paise)' });
    }

    const auth = Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString('base64');
    const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`,
        notes: { productId, size, quantity: String(qty) },
      }),
    });

    if (rzpRes.status === 401) {
      return res.status(401).json({ error: 'Razorpay authentication failed' });
    }
    if (!rzpRes.ok) {
      const detail = await rzpRes.text();
      console.error('Razorpay order error:', detail);
      return res.status(500).json({ error: 'Could not create order' });
    }

    const order = await rzpRes.json();
    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: KEY_ID, // public key, safe to expose to the checkout
    });
  } catch (err) {
    console.error('create-order error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
