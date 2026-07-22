"use client";

import { useState } from "react";
import { ASSIGNED_TO_OPTIONS, TODO_CATEGORIES, type Todo } from "@/lib/todos";

const fieldClass =
  "rounded-sm border border-brand-gold/25 bg-brand-green-dark/60 px-4 py-2.5 text-sm text-brand-ivory placeholder:text-brand-ivory/30 outline-none transition-colors duration-200 ease-out focus:border-brand-gold/60";

const labelClass = "text-[11px] uppercase tracking-[0.15em] text-brand-ivory/55";

export default function TodoForm({
  action,
  todo,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  todo?: Todo;
  submitLabel: string;
}) {
  const initialIsKnownCategory =
    !todo?.category || TODO_CATEGORIES.includes(todo.category);
  const [category, setCategory] = useState(
    initialIsKnownCategory ? (todo?.category ?? TODO_CATEGORIES[0]) : "__custom__",
  );

  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="description">
          Task
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={2}
          defaultValue={todo?.description}
          className={fieldClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={fieldClass}
          >
            {TODO_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
            <option value="__custom__">+ Other…</option>
          </select>
        </div>

        {category === "__custom__" && (
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="category_custom">
              Custom category
            </label>
            <input
              id="category_custom"
              name="category_custom"
              required
              defaultValue={
                !initialIsKnownCategory ? (todo?.category ?? "") : ""
              }
              className={fieldClass}
            />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="assigned_to">
            Assigned to
          </label>
          <select
            id="assigned_to"
            name="assigned_to"
            defaultValue={todo?.assigned_to ?? "either"}
            className={fieldClass}
          >
            {ASSIGNED_TO_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
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
            defaultValue={todo?.due_date ?? ""}
            className={fieldClass}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-brand-ivory/70">
        <input
          type="checkbox"
          name="done"
          defaultChecked={todo?.done ?? false}
          className="h-4 w-4 rounded-sm border-brand-gold/40 bg-brand-green-dark/60 accent-brand-gold"
        />
        Done
      </label>

      <button
        type="submit"
        className="press self-start rounded-sm bg-brand-gold px-6 py-2.5 text-sm font-medium uppercase tracking-[0.15em] text-brand-green-dark transition-all duration-200 ease-out hover:bg-brand-gold-soft"
      >
        {submitLabel}
      </button>
    </form>
  );
}
