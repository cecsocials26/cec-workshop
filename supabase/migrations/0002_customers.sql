-- Customers table + normalization of jobs' previously-embedded customer fields.

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text,
  email text,
  address text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.customers enable row level security;

create policy "Authenticated users have full access to customers"
on public.customers
for all
to authenticated
using (true)
with check (true);

create trigger customers_set_updated_at
before update on public.customers
for each row
execute function public.set_updated_at();

-- Backfill: one customer row per distinct existing job contact.
insert into public.customers (full_name, phone, email, address)
select distinct
  customer_name, customer_phone, customer_email, customer_address
from public.jobs;

alter table public.jobs add column customer_id uuid references public.customers(id);

update public.jobs j
set customer_id = c.id
from public.customers c
where j.customer_name = c.full_name
  and coalesce(j.customer_phone, '') = coalesce(c.phone, '')
  and coalesce(j.customer_email, '') = coalesce(c.email, '')
  and coalesce(j.customer_address, '') = coalesce(c.address, '');

alter table public.jobs alter column customer_id set not null;

alter table public.jobs drop column customer_name;
alter table public.jobs drop column customer_phone;
alter table public.jobs drop column customer_email;
alter table public.jobs drop column customer_address;
