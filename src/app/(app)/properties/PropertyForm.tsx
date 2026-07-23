"use client";

import { useState } from "react";
import {
  ALL_HEALTH_FACTORS,
  HEALTH_STATES,
  type Property,
} from "@/lib/properties";
import { customerLabel, type Customer } from "@/lib/customers";

const fieldClass =
  "rounded-sm border border-brand-gold/25 bg-brand-green-dark/60 px-4 py-2.5 text-sm text-brand-ivory placeholder:text-brand-ivory/30 outline-none transition-colors duration-200 ease-out focus:border-brand-gold/60";

const labelClass = "text-[11px] uppercase tracking-[0.15em] text-brand-ivory/55";

export default function PropertyForm({
  action,
  property,
  customers,
  initialCustomerId,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  property?: Property;
  customers: Customer[];
  initialCustomerId?: string;
  submitLabel: string;
}) {
  const [customerId, setCustomerId] = useState(
    property?.customer_id ?? initialCustomerId ?? "__new__",
  );

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
              <input id="new_customer_phone" name="new_customer_phone" className={fieldClass} />
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
        <h3 className="font-heading text-lg text-brand-gold-soft">Property</h3>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="address">
            Property address
          </label>
          <input
            id="address"
            name="address"
            required
            defaultValue={property?.address}
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="construction">
            Construction / materials
          </label>
          <input
            id="construction"
            name="construction"
            placeholder="e.g. Brick, tile roof, uPVC"
            defaultValue={property?.construction ?? ""}
            className={fieldClass}
          />
        </div>

      </section>

      <section className="flex flex-col gap-4">
        <h3 className="font-heading text-lg text-brand-gold-soft">Health Assessment</h3>
        <p className="text-xs text-brand-ivory/45">
          Set during a visit — leave as &quot;Not yet assessed&quot; for anything you haven&apos;t
          checked. The dial shows the worst of whatever&apos;s been assessed.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {ALL_HEALTH_FACTORS.map((factor) => (
            <div key={factor.key} className="flex flex-col gap-1.5">
              <label className={labelClass} htmlFor={factor.key}>
                {factor.label}
              </label>
              <select
                id={factor.key}
                name={factor.key}
                defaultValue={(property?.[factor.key] as string | null) ?? ""}
                className={fieldClass}
              >
                <option value="">Not yet assessed</option>
                {HEALTH_STATES.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="access_notes">
            Access &amp; hazard notes
          </label>
          <textarea
            id="access_notes"
            name="access_notes"
            rows={3}
            placeholder="Gate codes, dogs on site, parking, working-at-height hazards, etc."
            defaultValue={property?.access_notes ?? ""}
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            defaultValue={property?.notes ?? ""}
            className={fieldClass}
          />
        </div>
      </section>

      <button
        type="submit"
        className="press self-start rounded-sm bg-brand-gold px-6 py-2.5 text-sm font-medium uppercase tracking-[0.15em] text-brand-green-dark transition-all duration-200 ease-out hover:bg-brand-gold-soft"
      >
        {submitLabel}
      </button>
    </form>
  );
}
