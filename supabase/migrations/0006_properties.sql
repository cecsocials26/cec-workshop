-- Property Passports: one record per customer property. A customer
-- can have more than one (e.g. a landlord with several rentals), so
-- jobs link to a specific property rather than just the customer.

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  address text not null,
  construction text,
  health_score smallint check (health_score between 1 and 5),
  access_notes text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.properties enable row level security;

create policy "Authenticated users have full access to properties"
on public.properties
for all
to authenticated
using (true)
with check (true);

create trigger properties_set_updated_at
before update on public.properties
for each row
execute function public.set_updated_at();

-- Nullable: existing jobs predate Properties, and not every job needs
-- one assigned immediately.
alter table public.jobs add column property_id uuid references public.properties(id);
