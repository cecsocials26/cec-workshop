-- Fixed service category on jobs, distinct from the free-text job_type
-- description. This is what Property Passport service stamps are
-- derived from (a stamp "collects" once a completed job of that
-- category exists for the property) — a reliable fixed list rather
-- than fuzzy-matching free text.

alter table public.jobs add column service_category text
  check (service_category in (
    'Roof Care',
    'Gutter Care',
    'Render & Soft Washing',
    'Solar Panel Cleaning',
    'Driveways & Patios',
    'Window Cleaning',
    'Garden Maintenance',
    'Commercial Exterior Care'
  ));
