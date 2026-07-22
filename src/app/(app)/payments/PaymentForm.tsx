"use client";

import { PAYMENT_METHODS, type Payment } from "@/lib/payments";
import { formatPrice, type Job } from "@/lib/jobs";

const fieldClass =
  "rounded-sm border border-brand-gold/25 bg-brand-green-dark/60 px-4 py-2.5 text-sm text-brand-ivory placeholder:text-brand-ivory/30 outline-none transition-colors duration-200 ease-out focus:border-brand-gold/60";

const labelClass = "text-[11px] uppercase tracking-[0.15em] text-brand-ivory/55";

export default function PaymentForm({
  action,
  payment,
  jobs,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  payment?: Payment;
  jobs: Job[];
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="job_id">
          Job
        </label>
        <select
          id="job_id"
          name="job_id"
          required
          defaultValue={payment?.job_id ?? ""}
          className={fieldClass}
        >
          <option value="" disabled>
            Select a job
          </option>
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.customer?.full_name ?? "—"} &middot; {job.job_type}
              {job.price != null ? ` (${formatPrice(job.price)})` : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="amount">
            Amount (£)
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={payment?.amount ?? ""}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="method">
            Method
          </label>
          <select
            id="method"
            name="method"
            defaultValue={payment?.method ?? ""}
            className={fieldClass}
          >
            <option value="">Not set</option>
            {PAYMENT_METHODS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="due_date">
            Due date
          </label>
          <input
            id="due_date"
            name="due_date"
            type="date"
            defaultValue={payment?.due_date ?? ""}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="paid_date">
            Paid date
          </label>
          <input
            id="paid_date"
            name="paid_date"
            type="date"
            defaultValue={payment?.paid_date ?? ""}
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
          defaultValue={payment?.notes ?? ""}
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
