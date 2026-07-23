import Link from "next/link";
import { Hammer } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDate, formatPrice, type Job } from "@/lib/jobs";
import StatusBadge from "@/components/StatusBadge";

export default async function JobsPage() {
  const supabase = await createClient();
  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("*, customer:customers(*)")
    .order("scheduled_date", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false })
    .returns<Job[]>();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-brand-gold-soft/70">
            Operations Room
          </p>
          <h2 className="mt-1 font-heading text-3xl tracking-wide text-brand-ivory">
            Jobs
          </h2>
          <p className="mt-2 text-sm text-brand-ivory/50">
            Every job, from quote to payment.
          </p>
        </div>
        <Link
          href="/jobs/new"
          className="press rounded-sm bg-brand-gold px-5 py-2.5 text-sm font-medium uppercase tracking-[0.15em] text-brand-green-dark transition-all duration-200 ease-out hover:bg-brand-gold-soft"
        >
          New job
        </Link>
      </div>

      {error && (
        <p className="rounded-sm border border-brand-gold/20 bg-brand-green-dark/40 px-4 py-3 text-sm text-brand-gold-soft">
          Couldn&apos;t load jobs: {error.message}
        </p>
      )}

      {!error && jobs?.length === 0 && (
        <p className="flex items-center gap-2 rounded-sm border border-brand-gold/20 bg-brand-green-dark/40 px-4 py-3 text-sm text-brand-ivory/60">
          <Hammer size={18} strokeWidth={1.25} className="shrink-0 text-brand-ivory/25" />
          No jobs yet. Create the first one to get started.
        </p>
      )}

      {!error && jobs && jobs.length > 0 && (
        <div className="surface-static overflow-x-auto rounded-sm border border-brand-gold/20">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-brand-gold/20 text-[11px] uppercase tracking-wider text-brand-ivory/50">
                <th className="px-4 py-3 font-normal">Customer</th>
                <th className="px-4 py-3 font-normal">Job type</th>
                <th className="px-4 py-3 font-normal">Status</th>
                <th className="px-4 py-3 font-normal">Scheduled</th>
                <th className="px-4 py-3 font-normal">Price</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-brand-gold/10 transition-colors duration-200 ease-out last:border-0 hover:bg-brand-gold/5"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="text-brand-ivory/90 hover:text-brand-gold-soft"
                    >
                      {job.customer?.full_name ?? "—"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-brand-ivory/70">
                    {job.job_type}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="px-4 py-3 text-brand-ivory/70">
                    {formatDate(job.scheduled_date)}
                  </td>
                  <td className="px-4 py-3 text-brand-ivory/70">
                    {formatPrice(job.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
