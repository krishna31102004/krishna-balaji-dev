-- Run once in Supabase → SQL Editor.

-- Visitor globe: rounded (~10km) locations, no IPs.
create table if not exists public.visits (
  id bigint generated always as identity primary key,
  lat real not null check (lat between -90 and 90),
  lng real not null check (lng between -180 and 180),
  country text check (char_length(country) <= 2),
  created_at timestamptz not null default now()
);
alter table public.visits enable row level security;
create policy "anyone can read visits" on public.visits for select using (true);
create policy "anyone can log a visit" on public.visits for insert with check (true);
