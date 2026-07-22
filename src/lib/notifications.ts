import { formatDate, type Job } from "@/lib/jobs";

export type Alert = {
  id: string;
  message: string;
  href: string;
};

/**
 * Real quote-expiry alerts derived from Job.quote_expires_at. There is
 * no Marketing or Payments/Invoices data yet, so content-approval and
 * overdue-invoice alerts simply aren't computed — adding those once
 * those modules exist, rather than faking them now.
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
