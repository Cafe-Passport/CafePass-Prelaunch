-- SQL script to create the partners_waitlist table in Supabase
-- You can paste this into the SQL Editor in the Supabase dashboard or run it via the Supabase CLI

-- Enable the pgcrypto extension (already enabled on most Supabase projects)
create extension if not exists pgcrypto;

-- 1. Create table
create table if not exists public.partners_waitlist (
  id uuid primary key default gen_random_uuid(),
  cafe text not null,
  email text not null,
  beta boolean not null default false,
  created_at timestamptz not null default now()
);

-- 2. Ensure each e-mail is unique
alter table public.partners_waitlist
  add constraint partners_waitlist_email_key unique (email);

-- 3. Turn on Row-Level Security (RLS)
alter table public.partners_waitlist enable row level security;

-- 4. Allow anonymous INSERTs (for your client-side form)
create policy "Allow anon inserts" on public.partners_waitlist
  for insert to anon  -- role used by the public API key
  with check (true);

-- 5. (Optional) Allow authenticated users to read their own submissions
-- create policy "Allow select for authenticated" on public.partners_waitlist
--   for select using (true);
