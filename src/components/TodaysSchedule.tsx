import Link from "next/link";
import StatusDot from "@/components/StatusDot";
import { formatTime, type Job } from "@/lib/jobs";

export default function TodaysSchedule({ jobs }: { jobs: Job[] }) {
  return (
    <div className="surface-card flex h-full flex-col gap-4 rounded-sm border border-brand-gold/25 bg-brand-green-light/40 px-6 py-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl text-brand-ivory">Today&apos;s schedule</h3>
        <Link
          href="/jobs"
          className="text-xs uppercase tracking-wider text-brand-gold-soft hover:text-brand-gold"
        >
          View all
        </Link>
      </div>

      {jobs.length === 0 ? (
        <p className="text-sm text-brand-ivory/40">Nothing scheduled for today.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {jobs.map((job) => (
            <li key={job.id}>
              <Link
                href={`/jobs/${job.id}`}
                className="press -mx-2 flex items-center gap-3 rounded-sm px-2 py-1.5 transition-colors duration-200 ease-out hover:bg-brand-gold/5"
              >
                <StatusDot status={job.status} />
                <span className="w-16 shrink-0 text-xs text-brand-ivory/50">
                  {formatTime(job.scheduled_time)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-brand-ivory/90">{job.job_type}</p>
                  <p className="truncate text-xs text-brand-ivory/50">
                    {job.customer?.address ?? job.customer?.full_name ?? "—"}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
