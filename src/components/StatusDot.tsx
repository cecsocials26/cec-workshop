import type { JobStatus } from "@/lib/jobs";

const DOT_STYLES: Record<JobStatus, string> = {
  quoted: "bg-brand-ivory/30",
  scheduled: "bg-brand-gold/60",
  in_progress: "bg-brand-gold",
  completed: "bg-brand-ivory/70",
  invoiced: "bg-brand-gold/60",
  paid: "bg-brand-ivory/70",
};

export default function StatusDot({ status }: { status: JobStatus }) {
  return (
    <span
      className={`inline-block h-2 w-2 shrink-0 rounded-full ${DOT_STYLES[status]}`}
      title={status}
    />
  );
}
