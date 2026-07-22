import Link from "next/link";
import { ClipboardList, CalendarX } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import Sparkline from "@/components/Sparkline";
import { formatDate, type Job } from "@/lib/jobs";

export default function JobsOverviewCard({
  activeCount,
  upcoming,
  weeklyCounts,
}: {
  activeCount: number;
  upcoming: Job[];
  weeklyCounts?: number[];
}) {
  return (
    <Link
      href="/jobs"
      className="surface-card flex h-full flex-col gap-5 rounded-sm border border-brand-gold/25 bg-brand-green-light/40 px-6 py-6 hover:border-brand-gold/50"
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.18em] text-brand-ivory/55">
          Jobs
        </span>
        <ClipboardList size={18} strokeWidth={1.5} className="text-brand-gold-soft" />
      </div>

      <div className="flex items-end justify-between gap-3">
        <p className="font-heading text-4xl text-brand-ivory">
          {activeCount}{" "}
          <span className="text-lg text-brand-ivory/50">
            active job{activeCount === 1 ? "" : "s"}
          </span>
        </p>
        {weeklyCounts && (
          <div className="pb-1 text-brand-gold-soft/70">
            <Sparkline data={weeklyCounts} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 border-t border-brand-gold/15 pt-4">
        <p className="text-[11px] uppercase tracking-[0.15em] text-brand-ivory/45">
          Next up
        </p>
        {upcoming.length === 0 ? (
          <p className="flex items-center gap-2 text-sm text-brand-ivory/40">
            <CalendarX size={16} strokeWidth={1.25} className="shrink-0 text-brand-ivory/20" />
            Nothing scheduled yet.
          </p>
        ) : (
          upcoming.map((job) => (
            <div key={job.id} className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm text-brand-ivory/90">
                  {job.customer?.full_name ?? "—"}
                </p>
                <p className="truncate text-xs text-brand-ivory/50">
                  {job.job_type} &middot; {formatDate(job.scheduled_date)}
                </p>
              </div>
              <StatusBadge status={job.status} />
            </div>
          ))
        )}
      </div>
    </Link>
  );
}
