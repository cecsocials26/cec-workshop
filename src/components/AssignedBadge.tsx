import { assignedToLabel, type AssignedTo } from "@/lib/todos";

const STYLES: Record<AssignedTo, string> = {
  sam: "border-brand-gold/35 text-brand-gold-soft",
  jordon: "border-brand-gold/35 text-brand-gold-soft",
  either: "border-brand-ivory/20 text-brand-ivory/50",
};

export default function AssignedBadge({ assignedTo }: { assignedTo: AssignedTo }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-[10.5px] uppercase tracking-wider ${STYLES[assignedTo]}`}
    >
      {assignedToLabel(assignedTo)}
    </span>
  );
}
