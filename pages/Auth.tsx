import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../utils/supabase';
import { useAuth } from '../context/AuthContext';

type Mode = 'login' | 'signup';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (user) navigate('/account');
  }, [user, navigate]);

  const handleGoogle = async () => {
    if (!supabase) return;
    setError('');
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/#/account` },
    });
    if (err) setError(err.message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || busy) return;
    setBusy(true);
    setError('');
    setNotice('');

    try {
      if (mode === 'signup') {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });
        if (err) throw err;
        setNotice('Account created. Please check your email to confirm your address, then log in.');
        setMode('login');
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
        navigate('/account');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="bg-obsidian min-h-screen pt-32 px-6 text-center">
        <h1 className="text-2xl font-serif text-cream mb-3">Accounts Coming Soon</h1>
        <p className="text-cream-dim text-sm">Member accounts are launching shortly. Until then, you can order any coffee as a guest.</p>
      </div>
    );
  }

  return (
    <div className="bg-obsidian min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-3">The Avera Club</span>
          <h1 className="text-3xl md:text-4xl font-serif text-cream">
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h1>
          <p className="text-cream-dim text-sm mt-3">
            {mode === 'login'
              ? 'Log in to view your orders and saved details.'
              : 'Track orders, save addresses, and get early access to limited roasts.'}
          </p>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 border border-white/15 bg-white/[0.03] text-cream py-3.5 text-sm hover:border-gold/50 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.6 39.6 16.3 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C41 35.4 44 30.1 44 24c0-1.3-.1-2.6-.4-3.9z"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-4 my-7">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-cream-dim/60 text-[10px] uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-cream-dim mb-2">Full Name</label>
              <input
                type="text" value={name} onChange={e => setName(e.target.value)} required
                className="w-full bg-espresso/60 border border-white/15 p-4 text-cream text-sm placeholder-cream-dim/40 focus:border-gold focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
          )}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-cream-dim mb-2">Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full bg-espresso/60 border border-white/15 p-4 text-cream text-sm placeholder-cream-dim/40 focus:border-gold focus:outline-none transition-colors"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-cream-dim mb-2">Password</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8}
              className="w-full bg-espresso/60 border border-white/15 p-4 text-cream text-sm placeholder-cream-dim/40 focus:border-gold focus:outline-none transition-colors"
              placeholder="Minimum 8 characters"
            />
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}
          {notice && <p className="text-green-400 text-xs">{notice}</p>}

          <button
            type="submit" disabled={busy}
            className="w-full bg-gold text-obsidian font-bold py-4 text-sm uppercase tracking-widest hover:bg-gold/90 transition-colors disabled:opacity-50"
          >
            {busy ? 'Please wait…' : mode === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-cream-dim text-sm mt-8">
          {mode === 'login' ? (
            <>New to Avera?{' '}
              <button onClick={() => { setMode('signup'); setError(''); }} className="text-gold hover:underline">Create an account</button>
            </>
          ) : (
            <>Already have an account?{' '}
              <button onClick={() => { setMode('login'); setError(''); }} className="text-gold hover:underline">Log in</button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Auth;
