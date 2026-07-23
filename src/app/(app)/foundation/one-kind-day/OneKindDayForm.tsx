"use client";

import { ONE_KIND_DAY_STATUSES, type OneKindDay } from "@/lib/one-kind-day";

const fieldClass =
  "rounded-sm border border-brand-gold/25 bg-brand-green-dark/60 px-4 py-2.5 text-sm text-brand-ivory placeholder:text-brand-ivory/30 outline-none transition-colors duration-200 ease-out focus:border-brand-gold/60";

const labelClass = "text-[11px] uppercase tracking-[0.15em] text-brand-ivory/55";

export default function OneKindDayForm({
  action,
  entry,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  entry?: OneKindDay;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="visit_date">
            Date
          </label>
          <input
            id="visit_date"
            name="visit_date"
            type="date"
            required
            defaultValue={entry?.visit_date ?? ""}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={entry?.status ?? "planned"}
            className={fieldClass}
          >
            {ONE_KIND_DAY_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="person_or_household">
            Person / household helped
          </label>
          <input
            id="person_or_household"
            name="person_or_household"
            required
            placeholder="First name only, e.g. Margaret"
            defaultValue={entry?.person_or_household ?? ""}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="area">
            Area
          </label>
          <input
            id="area"
            name="area"
            placeholder="e.g. Clacton-on-Sea (no full address)"
            defaultValue={entry?.area ?? ""}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="task">
          Task performed
        </label>
        <input
          id="task"
          name="task"
          required
          placeholder="e.g. Garden tidy-up and gutter clear"
          defaultValue={entry?.task ?? ""}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="team_members">
          Team member(s) involved
        </label>
        <input
          id="team_members"
          name="team_members"
          placeholder="e.g. Sam, Jordon"
          defaultValue={entry?.team_members ?? ""}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="media_links">
          Photo / video links
        </label>
        <textarea
          id="media_links"
          name="media_links"
          rows={3}
          placeholder="One link per line"
          defaultValue={entry?.media_links ?? ""}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="story">
          Story / caption
        </label>
        <textarea
          id="story"
          name="story"
          rows={4}
          defaultValue={entry?.story ?? ""}
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        className="press self-start rounded-sm bg-brand-gold px-6 py-2.5 text-sm font-medium uppercase tracking-[0.15em] text-brand-green-dark transition-all duration-200 ease-out hover:bg-brand-gold-soft"
      >
        {submitLabel}
      </button>
    </form>
  );
}
