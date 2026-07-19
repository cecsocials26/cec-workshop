import type { JobStatus } from "@/lib/jobs";
import { jobStatusLabel } from "@/lib/jobs";

const STYLES: Record<JobStatus, string> = {
  quoted: "border-brand-ivory/20 text-brand-ivory/50",
  scheduled: "border-brand-gold/35 text-brand-gold-soft",
  in_progress: "border-brand-gold/50 bg-brand-gold/10 text-brand-gold-soft",
  completed: "border-brand-gold/20 bg-brand-green-light/60 text-brand-ivory/85",
  invoiced: "border-brand-gold/40 text-brand-gold-soft",
  paid: "border-brand-gold bg-brand-gold text-brand-green-dark",
};

export default function StatusBadge({ status }: { status: JobStatus }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-[10.5px] uppercase tracking-wider ${STYLES[status]}`}
    >
      {jobStatusLabel(status)}
    </span>
  );
}
