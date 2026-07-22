import { getPaymentStatus, type PaymentStatus, type Payment } from "@/lib/payments";

const STYLES: Record<PaymentStatus, string> = {
  due: "border-brand-ivory/20 text-brand-ivory/50",
  overdue: "border-brand-gold/50 bg-brand-gold/10 text-brand-gold-soft",
  paid: "border-brand-gold bg-brand-gold text-brand-green-dark",
};

const LABELS: Record<PaymentStatus, string> = {
  due: "Due",
  overdue: "Overdue",
  paid: "Paid",
};

export default function PaymentStatusBadge({
  payment,
}: {
  payment: Pick<Payment, "paid_date" | "due_date">;
}) {
  const status = getPaymentStatus(payment);
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-[10.5px] uppercase tracking-wider ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
