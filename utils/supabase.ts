import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Browser client. Uses the PUBLIC anon key only (safe to expose; data access
// is protected by Row Level Security). Server-side code uses the service
// role key via Vercel env vars and never imports this file.
//
// flowType 'pkce' is required with HashRouter: the implicit flow returns
// tokens in the URL hash, which collides with #/route paths and loses the
// session. PKCE returns ?code=... in the query string instead, which
// supabase-js exchanges for a session on load.

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase: SupabaseClient | null =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: {
          flowType: 'pkce',
          detectSessionInUrl: true,
          persistSession: true,
          autoRefreshToken: true,
        },
      })
    : null;

export const isSupabaseConfigured = Boolean(url && anonKey);
