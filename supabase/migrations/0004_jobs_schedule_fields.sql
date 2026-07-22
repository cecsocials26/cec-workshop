-- Real fields needed for the Overview dashboard's Today's Schedule
-- panel (a genuine time-of-day) and Notifications strip (a genuine
-- quote-expiry date) — both nullable, both honestly empty until set.

alter table public.jobs add column scheduled_time time;
alter table public.jobs add column quote_expires_at date;
