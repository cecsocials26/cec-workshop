-- Jobs table: core job/visit tracking for Complete Exterior Care.
-- Customer contact info is embedded here for now (no separate customers
-- table yet) since Customers/CRM is a future section; normalize into a
-- proper customers table with a foreign key when that section is built.

create table public.jobs (
  id uuid primary key default gen_random_uuid(),

  customer_name text not null,
  customer_phone text,
  customer_email text,
  customer_address text,

  job_type text not null,
  status text not null default 'quoted'
    check (status in ('quoted', 'scheduled', 'in_progress', 'completed', 'invoiced', 'paid')),
  scheduled_date date,
  price numeric(10, 2),
  notes text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.jobs enable row level security;

create policy "Authenticated users have full access to jobs"
on public.jobs
for all
to authenticated
using (true)
with check (true);

create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger jobs_set_updated_at
before update on public.jobs
for each row
execute function public.set_updated_at();
