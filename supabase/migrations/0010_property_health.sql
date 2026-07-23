-- Replace the plain 1-5 health_score with a proper health dial: 9
-- manually-set factors, each using the same named-state scale. The
-- overall dial state is computed in the app as the worst of whichever
-- factors have actually been set — never fabricated for the rest.

alter table public.properties drop column if exists health_score;

alter table public.properties
  add column roof_condition text
    check (roof_condition in ('excellent', 'good', 'monitor', 'attention_required', 'critical')),
  add column gutters_condition text
    check (gutters_condition in ('excellent', 'good', 'monitor', 'attention_required', 'critical')),
  add column render_condition text
    check (render_condition in ('excellent', 'good', 'monitor', 'attention_required', 'critical')),
  add column solar_condition text
    check (solar_condition in ('excellent', 'good', 'monitor', 'attention_required', 'critical')),
  add column driveway_condition text
    check (driveway_condition in ('excellent', 'good', 'monitor', 'attention_required', 'critical')),
  add column garden_condition text
    check (garden_condition in ('excellent', 'good', 'monitor', 'attention_required', 'critical')),
  add column drainage_condition text
    check (drainage_condition in ('excellent', 'good', 'monitor', 'attention_required', 'critical')),
  add column salt_exposure text
    check (salt_exposure in ('excellent', 'good', 'monitor', 'attention_required', 'critical')),
  add column weather_damage text
    check (weather_damage in ('excellent', 'good', 'monitor', 'attention_required', 'critical'));
