import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateJob, deleteJob } from "@/app/actions/jobs";
import type { Job } from "@/lib/jobs";
import JobForm from "../JobForm";

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: job } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .maybeSingle<Job>();

  if (!job) notFound();

  const updateJobWithId = updateJob.bind(null, job.id);
  const deleteJobWithId = deleteJob.bind(null, job.id);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
            {job.customer_name}
          </h2>
          <p className="mt-1 text-sm text-brand-ivory/50">{job.job_type}</p>
        </div>
        <form action={deleteJobWithId}>
          <button
            type="submit"
            className="rounded-sm border border-brand-gold/25 px-4 py-2 text-xs uppercase tracking-wider text-brand-ivory/50 transition-colors hover:border-brand-gold/50 hover:text-brand-gold-soft"
          >
            Delete job
          </button>
        </form>
      </div>

      <div className="max-w-2xl rounded-sm border border-brand-gold/20 bg-brand-green-light/20 px-6 py-6">
        <JobForm action={updateJobWithId} job={job} submitLabel="Save changes" />
      </div>
    </div>
  );
}
