"use client";

import { toggleTodoDone } from "@/app/actions/todos";

export default function TodoCheckbox({ id, done }: { id: string; done: boolean }) {
  return (
    <input
      type="checkbox"
      defaultChecked={done}
      onChange={(e) => toggleTodoDone(id, e.target.checked)}
      className="h-4 w-4 shrink-0 rounded-sm border-brand-gold/40 bg-brand-green-dark/60 accent-brand-gold"
    />
  );
}
