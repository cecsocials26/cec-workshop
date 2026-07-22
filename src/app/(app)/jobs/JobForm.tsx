"use client";

import { useState } from "react";
import { JOB_STATUSES, type Job } from "@/lib/jobs";
import { customerLabel, type Customer } from "@/lib/customers";

const fieldClass =
  "rounded-sm border border-brand-gold/25 bg-brand-green-dark/60 px-4 py-2.5 text-sm text-brand-ivory placeholder:text-brand-ivory/30 outline-none transition-colors focus:border-brand-gold/60";

const labelClass = "text-[11px] uppercase tracking-[0.15em] text-brand-ivory/55";

export default function JobForm({
  action,
  job,
  customers,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  job?: Job;
  customers: Customer[];
  submitLabel: string;
}) {
  const [customerId, setCustomerId] = useState(job?.customer_id ?? "__new__");

  return (
    <form action={action} className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h3 className="font-heading text-lg text-brand-gold-soft">Customer</h3>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="customer_id">
            Existing customer
          </label>
          <select
            id="customer_id"
            name="customer_id"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className={fieldClass}
          >
            <option value="__new__">+ Add new customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {customerLabel(c)}
              </option>
            ))}
          </select>
        </div>

        {customerId === "__new__" && (
          <div className="grid grid-cols-1 gap-4 rounded-sm border border-brand-gold/15 bg-brand-green-dark/30 p-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass} htmlFor="new_customer_name">
                Name
              </label>
              <input
                id="new_customer_name"
                name="new_customer_name"
                required
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass} htmlFor="new_customer_phone">
                Phone
              </label>
              <input
                id="new_customer_phone"
                name="new_customer_phone"
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass} htmlFor="new_customer_email">
                Email
              </label>
              <input
                id="new_customer_email"
                name="new_customer_email"
                type="email"
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass} htmlFor="new_customer_address">
                Address
              </label>
              <input
                id="new_customer_address"
                name="new_customer_address"
                className={fieldClass}
              />
            </div>
          </div>
        )}
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
            <label className={labelClass} htmlFor="scheduled_time">
              Scheduled time
            </label>
            <input
              id="scheduled_time"
              name="scheduled_time"
              type="time"
              defaultValue={job?.scheduled_time ?? ""}
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
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="quote_expires_at">
              Quote expires
            </label>
            <input
              id="quote_expires_at"
              name="quote_expires_at"
              type="date"
              defaultValue={job?.quote_expires_at ?? ""}
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
