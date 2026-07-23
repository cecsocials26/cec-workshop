import { oneKindDayStatusLabel, type OneKindDayStatus } from "@/lib/one-kind-day";

const STYLES: Record<OneKindDayStatus, string> = {
  planned: "border-brand-ivory/20 text-brand-ivory/50",
  filmed: "border-brand-gold/40 text-brand-gold-soft",
  posted: "border-brand-gold bg-brand-gold text-brand-green-dark",
};

export default function OneKindDayStatusBadge({ status }: { status: OneKindDayStatus }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-[10.5px] uppercase tracking-wider ${STYLES[status]}`}
    >
      {oneKindDayStatusLabel(status)}
    </span>
  );
}
