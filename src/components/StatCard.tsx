import type { LucideIcon } from "lucide-react";

export default function StatCard({
  label,
  icon: Icon,
  value = "Not yet tracked",
}: {
  label: string;
  icon: LucideIcon;
  value?: string;
}) {
  const isEmpty = value === "Not yet tracked";

  return (
    <div className="surface-card rounded-sm border border-brand-gold/25 bg-brand-green-light/40 px-6 py-6">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.18em] text-brand-ivory/55">
          {label}
        </span>
        <Icon size={18} strokeWidth={1.5} className="text-brand-gold-soft" />
      </div>
      <div className="mt-5 flex items-center gap-3">
        {isEmpty && (
          <Icon size={22} strokeWidth={1.25} className="shrink-0 text-brand-ivory/20" />
        )}
        <p
          className={`font-heading text-2xl italic tracking-wide ${
            isEmpty ? "text-brand-ivory/50" : "text-brand-ivory/70"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
