import Link from "next/link";
import { Banknote } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDate, formatPrice } from "@/lib/jobs";
import { getPaymentStatus, type Payment } from "@/lib/payments";
import PaymentStatusBadge from "@/components/PaymentStatusBadge";
import MarkPaidButton from "@/components/MarkPaidButton";

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ paid?: string }>;
}) {
  const { paid } = await searchParams;
  const showPaid = paid === "1";

  const supabase = await createClient();
  const { data: payments, error } = await supabase
    .from("payments")
    .select("*, job:jobs(*, customer:customers(*))")
    .order("due_date", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false })
    .returns<Payment[]>();

  const visible = (payments ?? []).filter(
    (p) => showPaid || getPaymentStatus(p) !== "paid",
  );

  const outstanding = (payments ?? [])
    .filter((p) => getPaymentStatus(p) !== "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
            Payments
          </h2>
          <p className="mt-2 text-sm text-brand-ivory/50">
            {outstanding > 0
              ? `${formatPrice(outstanding)} outstanding.`
              : "Nothing outstanding right now."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={showPaid ? "/payments" : "/payments?paid=1"}
            className="press rounded-sm border border-brand-gold/25 px-4 py-2.5 text-xs uppercase tracking-wider text-brand-ivory/50 transition-all duration-200 ease-out hover:border-brand-gold/50 hover:text-brand-gold-soft"
          >
            {showPaid ? "Hide paid" : "Show paid"}
          </Link>
          <Link
            href="/payments/new"
            className="press rounded-sm bg-brand-gold px-5 py-2.5 text-sm font-medium uppercase tracking-[0.15em] text-brand-green-dark transition-all duration-200 ease-out hover:bg-brand-gold-soft"
          >
            New payment
          </Link>
        </div>
      </div>

      {error && (
        <p className="rounded-sm border border-brand-gold/20 bg-brand-green-dark/40 px-4 py-3 text-sm text-brand-gold-soft">
          Couldn&apos;t load payments: {error.message}
        </p>
      )}

      {!error && visible.length === 0 && (
        <p className="flex items-center gap-2 rounded-sm border border-brand-gold/20 bg-brand-green-dark/40 px-4 py-3 text-sm text-brand-ivory/60">
          <Banknote size={18} strokeWidth={1.25} className="shrink-0 text-brand-ivory/25" />
          {showPaid ? "No payments yet." : "Nothing outstanding — nice work."}
        </p>
      )}

      {!error && visible.length > 0 && (
        <div className="surface-static overflow-x-auto rounded-sm border border-brand-gold/20">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-brand-gold/20 text-[11px] uppercase tracking-wider text-brand-ivory/50">
                <th className="px-4 py-3 font-normal">Customer</th>
                <th className="px-4 py-3 font-normal">Job</th>
                <th className="px-4 py-3 font-normal">Amount</th>
                <th className="px-4 py-3 font-normal">Due</th>
                <th className="px-4 py-3 font-normal">Status</th>
                <th className="px-4 py-3 font-normal" />
              </tr>
            </thead>
            <tbody>
              {visible.map((payment) => {
                const status = getPaymentStatus(payment);
                return (
                  <tr
                    key={payment.id}
                    className="border-b border-brand-gold/10 transition-colors duration-200 ease-out last:border-0 hover:bg-brand-gold/5"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/payments/${payment.id}`}
                        className="text-brand-ivory/90 hover:text-brand-gold-soft"
                      >
                        {payment.job?.customer?.full_name ?? "—"}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-brand-ivory/70">
                      {payment.job?.job_type ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-brand-ivory/70">
                      {formatPrice(payment.amount)}
                    </td>
                    <td className="px-4 py-3 text-brand-ivory/70">
                      {formatDate(payment.due_date)}
                    </td>
                    <td className="px-4 py-3">
                      <PaymentStatusBadge payment={payment} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      {status !== "paid" && <MarkPaidButton id={payment.id} />}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
