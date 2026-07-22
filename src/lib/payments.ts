import type { Job } from "@/lib/jobs";

export type PaymentMethod = "cash" | "card" | "bank_transfer" | "cheque" | "other";

export type Payment = {
  id: string;
  job_id: string;
  amount: number;
  due_date: string | null;
  paid_date: string | null;
  method: PaymentMethod | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  job?: Job;
};

export const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: "cash", label: "Cash" },
  { value: "card", label: "Card" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "cheque", label: "Cheque" },
  { value: "other", label: "Other" },
];

export function paymentMethodLabel(method: PaymentMethod | null): string {
  if (!method) return "—";
  return PAYMENT_METHODS.find((m) => m.value === method)?.label ?? method;
}

export type PaymentStatus = "paid" | "overdue" | "due";

export function getPaymentStatus(
  payment: Pick<Payment, "paid_date" | "due_date">,
): PaymentStatus {
  if (payment.paid_date) return "paid";
  const today = new Date().toISOString().slice(0, 10);
  if (payment.due_date && payment.due_date < today) return "overdue";
  return "due";
}
