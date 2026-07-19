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
  return (
    <div className="rounded-sm border border-brand-gold/25 bg-brand-green-light/40 px-6 py-6">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.18em] text-brand-ivory/55">
          {label}
        </span>
        <Icon size={18} strokeWidth={1.5} className="text-brand-gold-soft" />
      </div>
      <p className="mt-5 font-heading text-2xl italic tracking-wide text-brand-ivory/70">
        {value}
      </p>
    </div>
  );
}
