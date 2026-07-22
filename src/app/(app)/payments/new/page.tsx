import { createClient } from "@/lib/supabase/server";
import { createPayment } from "@/app/actions/payments";
import type { Job } from "@/lib/jobs";
import PaymentForm from "../PaymentForm";

export default async function NewPaymentPage() {
  const supabase = await createClient();
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*, customer:customers(*)")
    .order("created_at", { ascending: false })
    .returns<Job[]>();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
          New payment
        </h2>
        <p className="mt-2 text-sm text-brand-ivory/50">
          Record a payment against a job.
        </p>
      </div>

      <div className="surface-static max-w-2xl rounded-sm border border-brand-gold/20 bg-brand-green-light/20 px-6 py-6">
        <PaymentForm action={createPayment} jobs={jobs ?? []} submitLabel="Create payment" />
      </div>
    </div>
  );
}
