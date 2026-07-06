import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Browser client. Uses the PUBLIC anon key only (safe to expose; data access
// is protected by Row Level Security). Server-side code uses the service
// role key via Vercel env vars and never imports this file.

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export const isSupabaseConfigured = Boolean(url && anonKey);
