import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Product } from '../types';
import { loadRazorpay } from '../utils/razorpay';

interface CheckoutModalProps {
  product: Product;
  size: string;
  grind: string;
  amountRupees: number;
  onClose: () => void;
}

type Status = 'form' | 'processing' | 'success' | 'error';

const CheckoutModal: React.FC<CheckoutModalProps> = ({ product, size, grind, amountRupees, onClose }) => {
  const [status, setStatus] = useState<Status>('form');
  const [error, setError] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', pincode: '',
  });

  const set = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const canPay = form.name && form.email && form.phone && form.address && form.city && form.pincode;

  const handlePay = async () => {
    if (!canPay) return;
    setStatus('processing');
    setError('');

    try {
      // 1. Create order on our backend (amount computed server-side)
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, size, quantity: 1 }),
      });
      if (!orderRes.ok) throw new Error('Could not start payment. Please try again.');
      const { order_id, amount, currency, key_id } = await orderRes.json();

      // 2. Load Razorpay checkout
      const ready = await loadRazorpay();
      if (!ready) throw new Error('Payment system failed to load. Check your connection.');

      // 3. Open the Razorpay modal
      const rzp = new (window as any).Razorpay({
        key: key_id,
        amount,
        currency,
        order_id,
        name: 'Avera Specialty Coffee',
        description: `${product.name} — ${size}, ${grind}`,
        image: '/Logo.webp',
        prefill: { name: form.name, email: form.email, contact: form.phone },
        notes: { address: `${form.address}, ${form.city} - ${form.pincode}`, grind },
        theme: { color: '#D6A84F' },
        handler: async (response: any) => {
          // 4. Verify signature on our backend
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customer: form,
                order: { productName: product.name, size, grind, amount: amountRupees },
              }),
            });
            const data = await verifyRes.json();
            if (verifyRes.ok && data.verified) {
              setPaymentId(data.payment_id || response.razorpay_payment_id || '');
              setStatus('success');
            } else {
              setError('Payment could not be verified. If money was deducted, contact us and it will be refunded.');
              setStatus('error');
            }
          } catch {
            setError('Payment verification failed. Please contact us.');
            setStatus('error');
          }
        },
        modal: {
          ondismiss: () => setStatus('form'), // user closed the modal
        },
      });

      rzp.on('payment.failed', (resp: any) => {
        setError(resp?.error?.description || 'Payment failed. Please try again.');
        setStatus('error');
      });

      rzp.open();
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-espresso border border-white/10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="font-serif text-lg text-cream">Checkout</h3>
          <button onClick={onClose} className="text-cream-dim hover:text-cream" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {status === 'success' ? (
          <div className="p-6 md:p-8">
            {/* Confirmation header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-400 text-2xl">&#10003;</div>
              <h3 className="font-serif text-2xl text-cream mb-1">Thank you, {form.name.split(' ')[0]}!</h3>
              <p className="text-cream-dim text-sm">Your order is confirmed and payment received.</p>
            </div>

            {/* Order number */}
            {paymentId && (
              <div className="text-center mb-6 pb-6 border-b border-white/10">
                <p className="text-[10px] uppercase tracking-widest text-cream-dim mb-1">Order Reference</p>
                <p className="text-gold font-mono text-sm">{paymentId}</p>
              </div>
            )}

            {/* Order details */}
            <div className="flex items-center gap-4 mb-5">
              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
              <div className="flex-1">
                <p className="text-cream font-medium text-sm">{product.name}</p>
                <p className="text-cream-dim text-xs">{size} &bull; {grind} &bull; Qty 1</p>
              </div>
              <p className="text-gold font-bold">&#8377;{amountRupees}</p>
            </div>

            {/* Delivery details */}
            <div className="mb-5 p-4 bg-white/[0.02] border border-white/10">
              <p className="text-[10px] uppercase tracking-widest text-gold mb-2">Delivering To</p>
              <p className="text-cream text-sm">{form.name}</p>
              <p className="text-cream-dim text-xs mt-1">{form.address}, {form.city} &mdash; {form.pincode}</p>
              <p className="text-cream-dim text-xs mt-1">{form.phone} &bull; {form.email}</p>
            </div>

            {/* What happens next */}
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-widest text-gold mb-3">What Happens Next</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-gold text-xs mt-0.5">&#9312;</span>
                  <p className="text-cream-dim text-xs">Your beans are roasted fresh to order, never from stock.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gold text-xs mt-0.5">&#9313;</span>
                  <p className="text-cream-dim text-xs">We dispatch within 48 hours and send tracking to {form.email}.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gold text-xs mt-0.5">&#9314;</span>
                  <p className="text-cream-dim text-xs">Questions? Message us anytime on WhatsApp.</p>
                </div>
              </div>
            </div>

            <button onClick={onClose} className="w-full bg-gold text-obsidian font-bold py-4 text-sm uppercase tracking-widest hover:bg-gold/90 transition-colors">
              Continue
            </button>
          </div>
        ) : (
          <div className="p-6">
            {/* Order summary */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
              <div className="flex-1">
                <p className="text-cream font-medium text-sm">{product.name}</p>
                <p className="text-cream-dim text-xs">{size} &bull; {grind}</p>
              </div>
              <p className="text-gold font-bold">&#8377;{amountRupees}</p>
            </div>

            {/* Form */}
            <div className="space-y-3">
              {[
                { k: 'name', label: 'Full Name', type: 'text', ph: 'Your name' },
                { k: 'email', label: 'Email', type: 'email', ph: 'you@email.com' },
                { k: 'phone', label: 'Phone', type: 'tel', ph: '+91 XXXXX XXXXX' },
                { k: 'address', label: 'Delivery Address', type: 'text', ph: 'House no, street, area' },
              ].map(f => (
                <div key={f.k}>
                  <label className="block text-[10px] uppercase tracking-widest text-cream-dim mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    value={(form as any)[f.k]}
                    onChange={(e) => set(f.k, e.target.value)}
                    placeholder={f.ph}
                    className="w-full bg-obsidian border border-white/15 p-3 text-cream text-sm placeholder-cream-dim/40 focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-cream-dim mb-1">City</label>
                  <input type="text" value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="City"
                    className="w-full bg-obsidian border border-white/15 p-3 text-cream text-sm placeholder-cream-dim/40 focus:border-gold focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-cream-dim mb-1">Pincode</label>
                  <input type="text" value={form.pincode} onChange={(e) => set('pincode', e.target.value)} placeholder="500001"
                    className="w-full bg-obsidian border border-white/15 p-3 text-cream text-sm placeholder-cream-dim/40 focus:border-gold focus:outline-none transition-colors" />
                </div>
              </div>
            </div>

            {error && <p className="text-red-400 text-xs mt-4">{error}</p>}

            <button
              onClick={handlePay}
              disabled={!canPay || status === 'processing'}
              className="w-full bg-gold text-obsidian font-bold py-4 mt-6 text-sm uppercase tracking-widest hover:bg-gold/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {status === 'processing' ? 'Processing…' : `Pay ₹${amountRupees}`}
            </button>
            <p className="text-center text-cream-dim/60 text-[10px] mt-3 uppercase tracking-wider">
              Secure payment via Razorpay
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
