-- Payments table: real payment records against jobs. A job can have
-- multiple payments (e.g. a deposit and a balance). Status (paid /
-- overdue / due) is derived from paid_date/due_date, not stored.

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  amount numeric(10, 2) not null,
  due_date date,
  paid_date date,
  method text
    check (method in ('cash', 'card', 'bank_transfer', 'cheque', 'other')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.payments enable row level security;

create policy "Authenticated users have full access to payments"
on public.payments
for all
to authenticated
using (true)
with check (true);

create trigger payments_set_updated_at
before update on public.payments
for each row
execute function public.set_updated_at();
