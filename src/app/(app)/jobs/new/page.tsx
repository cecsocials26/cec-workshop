import { createClient } from "@/lib/supabase/server";
import { createJob } from "@/app/actions/jobs";
import type { Customer } from "@/lib/customers";
import JobForm from "../JobForm";

export default async function NewJobPage() {
  const supabase = await createClient();
  const { data: customers } = await supabase
    .from("customers")
    .select("*")
    .order("full_name", { ascending: true })
    .returns<Customer[]>();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
          New job
        </h2>
        <p className="mt-1 text-sm text-brand-ivory/50">
          Add a job to the pipeline.
        </p>
      </div>

      <div className="max-w-2xl rounded-sm border border-brand-gold/20 bg-brand-green-light/20 px-6 py-6">
        <JobForm
          action={createJob}
          customers={customers ?? []}
          submitLabel="Create job"
        />
      </div>
    </div>
  );
}
