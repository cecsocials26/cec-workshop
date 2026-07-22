import { formatDate, formatPrice, type Job } from "@/lib/jobs";
import { getPaymentStatus, type Payment } from "@/lib/payments";

export type Alert = {
  id: string;
  message: string;
  href: string;
};

/**
 * Real quote-expiry alerts derived from Job.quote_expires_at. There is
 * no Marketing data yet, so content-approval alerts simply aren't
 * computed — adding those once that module exists, rather than
 * faking them now.
 */
export function getQuoteExpiryAlerts(jobs: Job[]): Alert[] {
  const now = new Date();
  const soonThreshold = new Date(now);
  soonThreshold.setDate(soonThreshold.getDate() + 3);

  return jobs
    .filter((j) => j.status === "quoted" && j.quote_expires_at)
    .filter((j) => new Date(j.quote_expires_at as string) <= soonThreshold)
    .map((j) => {
      const expires = new Date(j.quote_expires_at as string);
      const expired = expires < now;
      return {
        id: j.id,
        message: `Quote for ${j.customer?.full_name ?? "a customer"} ${
          expired ? "expired" : "expires"
        } ${formatDate(j.quote_expires_at)}`,
        href: `/jobs/${j.id}`,
      };
    });
}

/** Real overdue-invoice alerts derived from Payment.due_date/paid_date. */
export function getOverduePaymentAlerts(payments: Payment[]): Alert[] {
  return payments
    .filter((p) => getPaymentStatus(p) === "overdue")
    .map((p) => ({
      id: p.id,
      message: `Payment of ${formatPrice(p.amount)} from ${
        p.job?.customer?.full_name ?? "a customer"
      } is overdue (was due ${formatDate(p.due_date)})`,
      href: `/payments/${p.id}`,
    }));
}
