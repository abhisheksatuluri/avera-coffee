import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, LogOut, User as UserIcon } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../utils/supabase';
import { useAuth } from '../context/AuthContext';

interface OrderRow {
  id: string;
  created_at: string;
  product_name: string;
  size: string;
  grind: string;
  amount: number;
  status: string;
  payment_id: string;
  city: string;
}

const statusStyle = (s: string) => {
  if (s === 'paid' || s === 'captured') return 'bg-green-900/40 text-green-400';
  if (s === 'failed') return 'bg-red-900/40 text-red-400';
  return 'bg-white/10 text-cream-dim';
};

const Account: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!supabase || !user) return;
    supabase
      .from('orders')
      .select('id, created_at, product_name, size, grind, amount, status, payment_id, city')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setOrders(data as OrderRow[]);
        setOrdersLoading(false);
      });
  }, [user]);

  if (!isSupabaseConfigured || loading || !user) {
    return <div className="bg-obsidian min-h-screen pt-32 text-center text-cream-dim text-sm">Loading…</div>;
  }

  const displayName = (user.user_metadata?.full_name as string) || user.email || 'Member';

  return (
    <div className="bg-obsidian min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-12 pb-8 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
              <UserIcon size={20} />
            </div>
            <div>
              <span className="text-gold text-[10px] font-bold uppercase tracking-widest block">Avera Club Member</span>
              <h1 className="text-xl md:text-2xl font-serif text-cream">{displayName}</h1>
              <p className="text-cream-dim text-xs">{user.email}</p>
            </div>
          </div>
          <button
            onClick={async () => { await signOut(); navigate('/'); }}
            className="flex items-center gap-2 text-cream-dim hover:text-gold transition-colors text-xs uppercase tracking-widest"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>

        {/* Orders */}
        <div className="mb-4 flex items-center gap-3">
          <Package size={18} className="text-gold" />
          <h2 className="text-lg font-serif text-cream">Your Orders</h2>
        </div>

        {ordersLoading ? (
          <p className="text-cream-dim text-sm py-8">Loading your orders…</p>
        ) : orders.length === 0 ? (
          <div className="border border-white/10 bg-white/[0.02] p-10 text-center">
            <p className="text-cream-dim text-sm mb-6">No orders yet. Your freshly roasted coffee journey starts here.</p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-gold text-obsidian font-bold py-3 px-8 text-xs uppercase tracking-widest hover:bg-gold/90 transition-colors"
            >
              Explore the Coffees
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map(o => (
              <div key={o.id} className="border border-white/10 bg-white/[0.02] p-5 flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex-1">
                  <p className="text-cream font-medium text-sm">{o.product_name}</p>
                  <p className="text-cream-dim text-xs mt-0.5">
                    {o.size} &bull; {o.grind} &bull; {new Date(o.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  <p className="text-cream-dim/60 text-[10px] mt-1 font-mono">{o.payment_id}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold ${statusStyle(o.status)}`}>{o.status}</span>
                  <span className="text-gold font-bold">&#8377;{o.amount}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
