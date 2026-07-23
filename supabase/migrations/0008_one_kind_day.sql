-- One Kind Day: the Olive Branch Foundation's weekly community content
-- series, distinct from generic Foundation activity. Privacy: only a
-- first name/household and general area are stored, never a full
-- address.

create table public.one_kind_days (
  id uuid primary key default gen_random_uuid(),
  visit_date date not null,
  person_or_household text not null,
  area text,
  task text not null,
  team_members text,
  media_links text,
  status text not null default 'planned'
    check (status in ('planned', 'filmed', 'posted')),
  story text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.one_kind_days enable row level security;

create policy "Authenticated users have full access to one_kind_days"
on public.one_kind_days
for all
to authenticated
using (true)
with check (true);

create trigger one_kind_days_set_updated_at
before update on public.one_kind_days
for each row
execute function public.set_updated_at();
