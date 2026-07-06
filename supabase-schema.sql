-- =====================================================================
-- AVERA COFFEE - Supabase schema
-- Run this ONCE in: Supabase Dashboard -> SQL Editor -> New query -> Run
-- =====================================================================

-- ---------- PROFILES ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  address text,
  city text,
  pincode text,
  is_club_member boolean not null default false,
  created_at timestamptz not null default now()
);

-- Safe to re-run on existing databases:
alter table public.profiles add column if not exists is_club_member boolean not null default false;

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

-- Auto-create a profile row whenever a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------- ORDERS ----------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid references auth.users (id) on delete set null,  -- null = guest order
  customer_name text,
  email text,
  phone text,
  address text,
  city text,
  pincode text,
  product_name text not null,
  size text,
  grind text,
  amount integer not null,              -- rupees
  payment_id text unique,               -- razorpay_payment_id
  razorpay_order_id text,
  status text not null default 'paid'   -- paid | captured | failed | refunded
);

create index if not exists orders_user_id_idx on public.orders (user_id);
create index if not exists orders_email_idx on public.orders (email);

alter table public.orders enable row level security;

-- Logged-in users can see only their own orders.
-- Inserts/updates happen ONLY from the server (service role bypasses RLS).
drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own" on public.orders
  for select using (auth.uid() = user_id);

-- Done. You should see: profiles, orders under Table Editor.
