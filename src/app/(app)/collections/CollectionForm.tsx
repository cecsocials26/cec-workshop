"use client";

import type { Collection } from "@/lib/collections";

const fieldClass =
  "rounded-sm border border-brand-gold/25 bg-brand-green-dark/60 px-4 py-2.5 text-sm text-brand-ivory placeholder:text-brand-ivory/30 outline-none transition-colors duration-200 ease-out focus:border-brand-gold/60";

const labelClass = "text-[11px] uppercase tracking-[0.15em] text-brand-ivory/55";

export default function CollectionForm({
  action,
  collection,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  collection?: Collection;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={collection?.name}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="sort_order">
            Sort order
          </label>
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={collection?.sort_order ?? 0}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="tagline">
          Tagline
        </label>
        <input
          id="tagline"
          name="tagline"
          defaultValue={collection?.tagline ?? ""}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={collection?.description ?? ""}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="services">
          Services (one per line)
        </label>
        <textarea
          id="services"
          name="services"
          rows={6}
          defaultValue={(collection?.services ?? []).join("\n")}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="perfect_for">
          Perfect for
        </label>
        <textarea
          id="perfect_for"
          name="perfect_for"
          rows={2}
          defaultValue={collection?.perfect_for ?? ""}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="typical_frequency">
          Typical frequency
        </label>
        <textarea
          id="typical_frequency"
          name="typical_frequency"
          rows={2}
          defaultValue={collection?.typical_frequency ?? ""}
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
