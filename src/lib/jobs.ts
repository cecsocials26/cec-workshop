import type { Customer } from "@/lib/customers";
import type { Property } from "@/lib/properties";

export type JobStatus =
  | "quoted"
  | "scheduled"
  | "in_progress"
  | "completed"
  | "invoiced"
  | "paid";

export const SERVICE_CATEGORIES = [
  "Roof Care",
  "Gutter Care",
  "Render & Soft Washing",
  "Solar Panel Cleaning",
  "Driveways & Patios",
  "Window Cleaning",
  "Garden Maintenance",
  "Commercial Exterior Care",
] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

export type Job = {
  id: string;
  customer_id: string;
  property_id: string | null;
  job_type: string;
  service_category: ServiceCategory | null;
  status: JobStatus;
  scheduled_date: string | null;
  scheduled_time: string | null;
  quote_expires_at: string | null;
  price: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  customer?: Customer;
  property?: Property;
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

export function weeklyCounts(dates: string[], weeks = 8): number[] {
  const now = new Date();
  const buckets = new Array(weeks).fill(0);

  for (const d of dates) {
    const date = new Date(d);
    const diffWeeks = Math.floor(
      (now.getTime() - date.getTime()) / (7 * 24 * 3_600_000),
    );
    const bucketIndex = weeks - 1 - diffWeeks;
    if (bucketIndex >= 0 && bucketIndex < weeks) {
      buckets[bucketIndex] += 1;
    }
  }

  return buckets;
}

export function formatTime(time: string | null): string {
  if (!time) return "—";
  const [h, m] = time.split(":");
  const hour = Number(h);
  const period = hour >= 12 ? "pm" : "am";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${m}${period}`;
}

export function formatDate(date: string | null): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
