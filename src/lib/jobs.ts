import type { Customer } from "@/lib/customers";

export type JobStatus =
  | "quoted"
  | "scheduled"
  | "in_progress"
  | "completed"
  | "invoiced"
  | "paid";

export type Job = {
  id: string;
  customer_id: string;
  job_type: string;
  status: JobStatus;
  scheduled_date: string | null;
  price: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  customer?: Customer;
};

export const JOB_STATUSES: { value: JobStatus; label: string }[] = [
  { value: "quoted", label: "Quoted" },
  { value: "scheduled", label: "Scheduled" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "invoiced", label: "Invoiced" },
  { value: "paid", label: "Paid" },
];

export function jobStatusLabel(status: JobStatus): string {
  return JOB_STATUSES.find((s) => s.value === status)?.label ?? status;
}

export function formatPrice(price: number | null): string {
  if (price == null) return "—";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(price);
}

export function formatDate(date: string | null): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
