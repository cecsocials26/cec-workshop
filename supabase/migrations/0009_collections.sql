-- Collections: CEC's editable service catalog ("The Complete Exterior
-- Care Collection" brand book), seeded with the real copy. Distinct
-- from Jobs.service_category (individual service types used for
-- Property Passport stamps) — a Collection is a bundled package of
-- several services sold together.

create table public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tagline text,
  description text,
  services text[] not null default '{}',
  perfect_for text,
  typical_frequency text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.collections enable row level security;

create policy "Authenticated users have full access to collections"
on public.collections
for all
to authenticated
using (true)
with check (true);

create trigger collections_set_updated_at
before update on public.collections
for each row
execute function public.set_updated_at();

insert into public.collections
  (name, tagline, description, services, perfect_for, typical_frequency, sort_order)
values
  (
    'The Home Collection',
    'For the everyday beauty of a well-kept home.',
    'Designed to maintain the beauty and condition of residential homes throughout the year — the quiet, regular care that keeps a home looking its best.',
    array['Window Cleaning', 'Gutter Clearing', 'Fascia & Soffit Cleaning', 'Conservatory Cleaning', 'Exterior Detailing'],
    'Homeowners who want their property looking its best year-round, without having to remember to book it.',
    'Every 4–8 weeks for windows; twice yearly for gutters, fascia, and soffits.',
    1
  ),
  (
    'The Garden Collection',
    'For outdoor spaces enjoyed all year round.',
    'Helping customers enjoy beautiful outdoor spaces in every season — restoring and protecting every outdoor living area.',
    array['Patio Cleaning', 'Driveway Cleaning', 'Pressure Washing', 'Lawn Maintenance', 'Hedge Trimming', 'Garden Maintenance'],
    'Families and homeowners who use their garden and outdoor space regularly and want it kept in genuine order.',
    'Seasonal deep cleans, with lawn and hedge care through the growing season.',
    2
  ),
  (
    'The Roof Collection',
    'Protecting the most vulnerable part of any property.',
    'Roofs take the brunt of British weather. This Collection helps prevent the expensive repairs that come from years of quiet neglect.',
    array['Roof Moss Removal', 'Roof Soft Washing', 'Roof Cleaning', 'Gutter Inspection', 'Minor Maintenance Reporting'],
    'Any homeowner wanting to protect their roof investment before small problems become expensive ones.',
    'Annual soft wash and moss treatment, with a gutter inspection included each visit.',
    3
  ),
  (
    'The Solar Collection',
    'Protecting a renewable energy investment.',
    'Clean panels perform better and last longer. This Collection keeps a solar investment working as hard as it should.',
    array['Solar Panel Cleaning', 'Visual Inspection', 'Debris Removal', 'Performance Care'],
    'Homeowners with solar panels who want to protect performance and long-term return on investment.',
    'Twice yearly, or quarterly for properties in high-debris areas.',
    4
  ),
  (
    'The Heritage Collection',
    'For period, listed, and character properties.',
    'Created specifically for properties that require sympathetic care. Every method is carefully selected to protect delicate surfaces while preserving their character.',
    array['Gentle Soft Washing', 'Stone Cleaning', 'Render Cleaning', 'Traditional Exterior Maintenance'],
    'Owners of period, listed, or character properties where the wrong method could cause real damage.',
    'Annual care, with methods chosen specifically for the property''s age and materials.',
    5
  ),
  (
    'The Estate Collection',
    'Our highest level of property care.',
    'For large homes, country houses, estates, and commercial grounds — a bespoke annual maintenance programme tailored entirely to the property and its owner.',
    array['A tailored combination of services across every Collection', 'A dedicated point of contact', 'An annually planned programme of care'],
    'Large homes, estates, and commercial grounds needing a single, coordinated standard of care.',
    'A bespoke annual programme, planned around the property rather than a fixed schedule.',
    6
  ),
  (
    'The Coastal Collection',
    'Care built for life by the sea.',
    'Clacton-on-Sea''s salt air and sea spray ask more of a property than inland weather ever does — faster algae growth, salt residue, and quicker corrosion of metalwork. This Collection is built specifically for coastal living.',
    array['Salt Residue Removal', 'Coastal Render & Window Care', 'Metalwork Protection', 'Algae & Sea-Spray Treatment'],
    'Properties within reach of the coast, facing faster wear from salt air and sea spray.',
    'More frequent than inland properties — typically every 6–8 weeks for exposed surfaces.',
    7
  ),
  (
    'The Custodian Collection',
    'For the homes you can''t always be there for.',
    'For holiday lets and second homes, we become the trusted presence that looks after a property while its owner is away.',
    array['Pre-Arrival Cleans', 'Post-Guest Turnarounds', 'Off-Season Property Checks', 'Seasonal Caretaking'],
    'Holiday let owners and second-home owners who need a trusted presence when they can''t be there themselves.',
    'Around each guest turnover, plus regular off-season checks.',
    8
  );
