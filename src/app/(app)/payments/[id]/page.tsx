import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updatePayment, deletePayment } from "@/app/actions/payments";
import type { Payment } from "@/lib/payments";
import type { Job } from "@/lib/jobs";
import PaymentForm from "../PaymentForm";

export default async function EditPaymentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: payment }, { data: jobs }] = await Promise.all([
    supabase
      .from("payments")
      .select("*, job:jobs(*, customer:customers(*))")
      .eq("id", id)
      .maybeSingle<Payment>(),
    supabase
      .from("jobs")
      .select("*, customer:customers(*)")
      .order("created_at", { ascending: false })
      .returns<Job[]>(),
  ]);

  if (!payment) notFound();

  const updatePaymentWithId = updatePayment.bind(null, payment.id);
  const deletePaymentWithId = deletePayment.bind(null, payment.id);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
            {payment.job?.customer?.full_name ?? "—"}
          </h2>
          <p className="mt-2 text-sm text-brand-ivory/50">
            {payment.job?.job_type ?? "—"}
          </p>
        </div>
        <form action={deletePaymentWithId}>
          <button
            type="submit"
            className="press rounded-sm border border-brand-gold/25 px-4 py-2 text-xs uppercase tracking-wider text-brand-ivory/50 transition-all duration-200 ease-out hover:border-brand-gold/50 hover:text-brand-gold-soft"
          >
            Delete payment
          </button>
        </form>
      </div>

      <div className="surface-static max-w-2xl rounded-sm border border-brand-gold/20 bg-brand-green-light/20 px-6 py-6">
        <PaymentForm
          action={updatePaymentWithId}
          payment={payment}
          jobs={jobs ?? []}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
