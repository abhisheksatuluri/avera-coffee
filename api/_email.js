// Shared email helper for order notifications (not a route: underscore-prefixed
// files in /api are not deployed as endpoints by Vercel).
// Sends via the Avera Zoho mailbox using an app password.

import nodemailer from 'nodemailer';

const GOLD = '#D6A84F';
const DARK = '#1C1410';

function transport() {
  const user = process.env.ZOHO_SMTP_USER;
  const pass = process.env.ZOHO_SMTP_PASS;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.in',
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

function orderRows(order, customer, paymentId) {
  return `
    <table style="width:100%;border-collapse:collapse;font-size:14px;color:#333">
      <tr><td style="padding:6px 0;color:#888">Product</td><td style="padding:6px 0;text-align:right"><strong>${order.productName}</strong></td></tr>
      <tr><td style="padding:6px 0;color:#888">Size / Grind</td><td style="padding:6px 0;text-align:right">${order.size} &bull; ${order.grind}</td></tr>
      <tr><td style="padding:6px 0;color:#888">Amount Paid</td><td style="padding:6px 0;text-align:right"><strong style="color:${GOLD}">&#8377;${order.amount}</strong></td></tr>
      <tr><td style="padding:6px 0;color:#888">Order Reference</td><td style="padding:6px 0;text-align:right;font-family:monospace;font-size:12px">${paymentId}</td></tr>
      <tr><td style="padding:6px 0;color:#888;vertical-align:top">Delivery Address</td><td style="padding:6px 0;text-align:right">${customer.name}<br>${customer.address}, ${customer.city} - ${customer.pincode}<br>${customer.phone}</td></tr>
    </table>`;
}

function shell(inner) {
  return `
  <div style="background:#f6f2ec;padding:32px 16px;font-family:Georgia,serif">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #eee">
      <div style="background:${DARK};padding:28px;text-align:center">
        <div style="color:#F4EDE3;font-size:22px;letter-spacing:6px;font-weight:bold">AVERA</div>
        <div style="color:${GOLD};font-size:10px;letter-spacing:3px;margin-top:4px">SPECIALTY COFFEE ROASTERS</div>
      </div>
      <div style="padding:32px 28px">${inner}</div>
      <div style="background:#faf7f2;padding:20px 28px;font-size:12px;color:#999;text-align:center">
        Avera Specialty Coffee Roasters &bull; Hyderabad, India<br>
        orders@averacoffee.com &bull; WhatsApp +91 90874 34124 &bull; averacoffee.com
      </div>
    </div>
  </div>`;
}

export async function sendOrderEmails({ order, customer, paymentId }) {
  const t = transport();
  if (!t) return { sent: false, reason: 'smtp not configured' };

  const from = `"Avera Specialty Coffee" <${process.env.ZOHO_SMTP_USER}>`;
  const results = { customer: false, avera: false };

  // 1. Customer confirmation
  if (customer?.email) {
    try {
      await t.sendMail({
        from,
        to: customer.email,
        subject: `Your Avera order is confirmed ☕ ${order.productName}`,
        html: shell(`
          <h2 style="color:${DARK};font-size:20px;margin:0 0 8px">Thank you, ${(customer.name || '').split(' ')[0] || 'coffee lover'}!</h2>
          <p style="color:#555;font-size:14px;line-height:1.7;margin:0 0 20px">
            Your order is confirmed and your beans are heading to the roaster.
            We roast fresh to order, never from stock, and dispatch within 48 hours
            with tracking sent to this email.
          </p>
          ${orderRows(order, customer, paymentId)}
          <p style="color:#555;font-size:13px;line-height:1.7;margin:24px 0 0">
            Questions about your order? Just reply to this email or message us on
            WhatsApp at +91 90874 34124.
          </p>`),
      });
      results.customer = true;
    } catch (e) {
      console.error('customer email failed:', e.message);
    }
  }

  // 2. Internal notification to Avera
  try {
    await t.sendMail({
      from,
      to: process.env.ZOHO_SMTP_USER,
      subject: `NEW ORDER ₹${order.amount} - ${order.productName} (${customer?.city || 'unknown city'})`,
      html: shell(`
        <h2 style="color:${DARK};font-size:18px;margin:0 0 16px">New paid order received</h2>
        ${orderRows(order, customer, paymentId)}
        <p style="font-size:13px;color:#555;margin:20px 0 0">
          Customer: ${customer?.name || '-'} &bull; ${customer?.email || '-'} &bull; ${customer?.phone || '-'}
        </p>`),
    });
    results.avera = true;
  } catch (e) {
    console.error('avera notification email failed:', e.message);
  }

  return { sent: results.customer || results.avera, results };
}
