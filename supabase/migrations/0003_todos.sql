-- Shared internal todo list: admin/one-off actions separate from the Jobs pipeline.

create table public.todos (
  id uuid primary key default gen_random_uuid(),
  description text not null,
  category text not null,
  assigned_to text not null check (assigned_to in ('sam', 'jordon', 'either')),
  done boolean not null default false,
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.todos enable row level security;

create policy "Authenticated users have full access to todos"
on public.todos
for all
to authenticated
using (true)
with check (true);

create trigger todos_set_updated_at
before update on public.todos
for each row
execute function public.set_updated_at();

insert into public.todos (description, category, assigned_to) values
  ('Register Complete Exterior Care with Companies House', 'Business Setup', 'jordon'),
  ('Open a business bank account for CEC', 'Business Setup', 'jordon'),
  ('Set up CEC business email addresses (jordon@, sam@, info@, bookings@)', 'Business Setup', 'jordon'),
  ('Get a dedicated business work phone number', 'Business Setup', 'jordon'),
  ('Register for Self Assessment / confirm VAT status once trading begins', 'Business Setup', 'jordon'),
  ('Set up business accounting software / confirm who''s handling books', 'Business Setup', 'jordon'),

  ('Van/vehicle insurance (business use)', 'Insurance', 'jordon'),
  ('Public liability insurance', 'Insurance', 'jordon'),
  ('Employers'' liability insurance', 'Insurance', 'jordon'),
  ('Tool & equipment insurance', 'Insurance', 'jordon'),

  ('Order business cards', 'Brand & Marketing', 'either'),
  ('Order uniforms', 'Brand & Marketing', 'either'),
  ('Confirm vehicle livery/graphics order', 'Brand & Marketing', 'either'),
  ('Schedule first posts across the locked social media handles', 'Brand & Marketing', 'either'),

  ('Book the photo shoot (Paycocke''s House, Coggeshall — 01376 561305 — or Finchingfield/Thaxted as backup)', 'Photography', 'either'),
  ('Confirm National Trust commercial photography permission if using Paycocke''s', 'Photography', 'either'),
  ('Film first jet washing / roof cleaning / before-after content', 'Photography', 'either'),

  ('Call CVS Tendring (01255 425692) to introduce CEC and discuss referrals', 'One Kind Day / Foundation', 'either'),
  ('Identify and confirm the first One Kind Day recipient', 'One Kind Day / Foundation', 'either'),
  ('Prepare consent form/process for the first filmed visit', 'One Kind Day / Foundation', 'either'),

  ('Check in with Claire on website build progress', 'Website', 'sam'),

  ('Work out real cost-per-job figures for core services', 'Pricing', 'either'),
  ('Set final pricing for each Collection and membership tier', 'Pricing', 'either'),

  ('Stocktake current equipment against the Collections now offered — flag anything missing for Coastal (salt-removal products) or Solar (panel-safe cleaning kit) before those Collections are actively sold', 'Equipment', 'jordon'),

  ('Confirm risk assessment / method statement templates exist for roof work and any working-at-height jobs', 'Legal / Compliance', 'jordon'),
  ('Confirm safeguarding process is documented before the first One Kind Day visit (consent, family/carer involvement — already drafted in the One Kind Day launch booklet)', 'Legal / Compliance', 'jordon');
