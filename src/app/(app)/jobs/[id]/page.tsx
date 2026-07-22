import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateJob, deleteJob } from "@/app/actions/jobs";
import type { Job } from "@/lib/jobs";
import type { Customer } from "@/lib/customers";
import JobForm from "../JobForm";

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: job }, { data: customers }] = await Promise.all([
    supabase
      .from("jobs")
      .select("*, customer:customers(*)")
      .eq("id", id)
      .maybeSingle<Job>(),
    supabase
      .from("customers")
      .select("*")
      .order("full_name", { ascending: true })
      .returns<Customer[]>(),
  ]);

  if (!job) notFound();

  const updateJobWithId = updateJob.bind(null, job.id);
  const deleteJobWithId = deleteJob.bind(null, job.id);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
            {job.customer?.full_name ?? "—"}
          </h2>
          <p className="mt-2 text-sm text-brand-ivory/50">{job.job_type}</p>
        </div>
        <form action={deleteJobWithId}>
          <button
            type="submit"
            className="press rounded-sm border border-brand-gold/25 px-4 py-2 text-xs uppercase tracking-wider text-brand-ivory/50 transition-all duration-200 ease-out hover:border-brand-gold/50 hover:text-brand-gold-soft"
          >
            Delete job
          </button>
        </form>
      </div>

      <div className="surface-static max-w-2xl rounded-sm border border-brand-gold/20 bg-brand-green-light/20 px-6 py-6">
        <JobForm
          action={updateJobWithId}
          job={job}
          customers={customers ?? []}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
