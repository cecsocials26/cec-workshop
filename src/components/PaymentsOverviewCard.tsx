import Link from "next/link";
import { Banknote } from "lucide-react";
import PaymentStatusBadge from "@/components/PaymentStatusBadge";
import Sparkline from "@/components/Sparkline";
import { formatDate, formatPrice } from "@/lib/jobs";
import type { Payment } from "@/lib/payments";

export default function PaymentsOverviewCard({
  outstandingTotal,
  upcoming,
  weeklyReceived,
}: {
  outstandingTotal: number;
  upcoming: Payment[];
  weeklyReceived?: number[];
}) {
  return (
    <Link
      href="/payments"
      className="surface-card flex h-full flex-col gap-5 rounded-sm border border-brand-gold/25 bg-brand-green-light/40 px-6 py-6 hover:border-brand-gold/50"
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.18em] text-brand-ivory/55">
          Payments
        </span>
        <Banknote size={18} strokeWidth={1.5} className="text-brand-gold-soft" />
      </div>

      <div className="flex items-end justify-between gap-3">
        <p className="font-heading text-4xl text-brand-ivory">
          {formatPrice(outstandingTotal)}
          <span className="ml-2 text-lg text-brand-ivory/50">outstanding</span>
        </p>
        {weeklyReceived && (
          <div className="pb-1 text-brand-gold-soft/70">
            <Sparkline data={weeklyReceived} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 border-t border-brand-gold/15 pt-4">
        <p className="text-[11px] uppercase tracking-[0.15em] text-brand-ivory/45">
          Needs attention
        </p>
        {upcoming.length === 0 ? (
          <p className="flex items-center gap-2 text-sm text-brand-ivory/40">
            <Banknote size={16} strokeWidth={1.25} className="shrink-0 text-brand-ivory/20" />
            Nothing due.
          </p>
        ) : (
          upcoming.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm text-brand-ivory/90">
                  {payment.job?.customer?.full_name ?? "—"}
                </p>
                <p className="truncate text-xs text-brand-ivory/50">
                  {formatPrice(payment.amount)} &middot; due {formatDate(payment.due_date)}
                </p>
              </div>
              <PaymentStatusBadge payment={payment} />
            </div>
          ))
        )}
      </div>
    </Link>
  );
}
