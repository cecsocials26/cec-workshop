"use client";

import { JOB_STATUSES, type Job } from "@/lib/jobs";

const fieldClass =
  "rounded-sm border border-brand-gold/25 bg-brand-green-dark/60 px-4 py-2.5 text-sm text-brand-ivory placeholder:text-brand-ivory/30 outline-none transition-colors focus:border-brand-gold/60";

const labelClass = "text-[11px] uppercase tracking-[0.15em] text-brand-ivory/55";

export default function JobForm({
  action,
  job,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  job?: Job;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h3 className="font-heading text-lg text-brand-gold-soft">Customer</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="customer_name">
              Name
            </label>
            <input
              id="customer_name"
              name="customer_name"
              required
              defaultValue={job?.customer_name}
              className={fieldClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="customer_phone">
              Phone
            </label>
            <input
              id="customer_phone"
              name="customer_phone"
              defaultValue={job?.customer_phone ?? ""}
              className={fieldClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="customer_email">
              Email
            </label>
            <input
              id="customer_email"
              name="customer_email"
              type="email"
              defaultValue={job?.customer_email ?? ""}
              className={fieldClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="customer_address">
              Address
            </label>
            <input
              id="customer_address"
              name="customer_address"
              defaultValue={job?.customer_address ?? ""}
              className={fieldClass}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="font-heading text-lg text-brand-gold-soft">Job</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="job_type">
              Job type
            </label>
            <input
              id="job_type"
              name="job_type"
              required
              placeholder="e.g. Gutter clearing"
              defaultValue={job?.job_type}
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
              defaultValue={job?.status ?? "quoted"}
              className={fieldClass}
            >
              {JOB_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="scheduled_date">
              Scheduled date
            </label>
            <input
              id="scheduled_date"
              name="scheduled_date"
              type="date"
              defaultValue={job?.scheduled_date ?? ""}
              className={fieldClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="price">
              Price (£)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              defaultValue={job?.price ?? ""}
              className={fieldClass}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            defaultValue={job?.notes ?? ""}
            className={fieldClass}
          />
        </div>
      </section>

      <button
        type="submit"
        className="self-start rounded-sm bg-brand-gold px-6 py-2.5 text-sm font-medium uppercase tracking-[0.15em] text-brand-green-dark transition-colors hover:bg-brand-gold-soft"
      >
        {submitLabel}
      </button>
    </form>
  );
}
