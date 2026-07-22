import { formatPrice, type Job } from "@/lib/jobs";

export type PulseMetric = {
  label: string;
  value: string;
  changePercent: number | null;
  sparkline: number[] | null;
};

const COMPLETED_STATUSES = new Set(["completed", "invoiced", "paid"]);

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function inRange(dateStr: string, start: Date, end: Date): boolean {
  const d = new Date(dateStr);
  return d >= start && d < end;
}

function pctChange(current: number, previous: number): number | null {
  if (previous <= 0) return null;
  return Math.round(((current - previous) / previous) * 100);
}

function weeklySeries(
  points: { date: string; value: number }[],
  weeks = 8,
): number[] {
  const now = new Date();
  const buckets = new Array(weeks).fill(0);
  for (const { date, value } of points) {
    const d = new Date(date);
    const diffWeeks = Math.floor(
      (now.getTime() - d.getTime()) / (7 * 24 * 3_600_000),
    );
    const idx = weeks - 1 - diffWeeks;
    if (idx >= 0 && idx < weeks) buckets[idx] += value;
  }
  return buckets;
}

function conversionRate(list: Job[]): number | null {
  if (list.length === 0) return null;
  return Math.round(
    (list.filter((j) => j.status !== "quoted").length / list.length) * 100,
  );
}

/**
 * Everything here is computed from real Jobs rows — no invented figures.
 * "Customer Reviews" has no data source anywhere in the app yet, so it
 * stays a permanent "Not yet tracked" until a reviews mechanism exists.
 */
export function computeBusinessPulse(jobs: Job[]): PulseMetric[] {
  const now = new Date();
  const thisMonthStart = startOfMonth(now);
  const lastMonthStart = new Date(
    thisMonthStart.getFullYear(),
    thisMonthStart.getMonth() - 1,
    1,
  );

  const thisMonth = jobs.filter((j) =>
    inRange(j.created_at, thisMonthStart, now),
  );
  const lastMonth = jobs.filter((j) =>
    inRange(j.created_at, lastMonthStart, thisMonthStart),
  );

  const paidJobs = jobs.filter((j) => j.status === "paid");
  const revenueThisMonth = thisMonth
    .filter((j) => j.status === "paid")
    .reduce((sum, j) => sum + (j.price ?? 0), 0);
  const revenueLastMonth = lastMonth
    .filter((j) => j.status === "paid")
    .reduce((sum, j) => sum + (j.price ?? 0), 0);

  const completedThisMonth = thisMonth.filter((j) =>
    COMPLETED_STATUSES.has(j.status),
  ).length;
  const completedLastMonth = lastMonth.filter((j) =>
    COMPLETED_STATUSES.has(j.status),
  ).length;

  const conversionThisMonth = conversionRate(thisMonth);
  const conversionLastMonth = conversionRate(lastMonth);

  return [
    {
      label: "Revenue",
      value: formatPrice(revenueThisMonth),
      changePercent: pctChange(revenueThisMonth, revenueLastMonth),
      sparkline: weeklySeries(
        paidJobs.map((j) => ({ date: j.created_at, value: j.price ?? 0 })),
      ),
    },
    {
      label: "Jobs Completed",
      value: String(completedThisMonth),
      changePercent: pctChange(completedThisMonth, completedLastMonth),
      sparkline: weeklySeries(
        jobs
          .filter((j) => COMPLETED_STATUSES.has(j.status))
          .map((j) => ({ date: j.created_at, value: 1 })),
      ),
    },
    {
      label: "Quote Conversion",
      value:
        conversionThisMonth === null ? "Not yet tracked" : `${conversionThisMonth}%`,
      changePercent:
        conversionThisMonth !== null && conversionLastMonth !== null
          ? pctChange(conversionThisMonth, conversionLastMonth)
          : null,
      sparkline: null,
    },
    {
      label: "Customer Reviews",
      value: "Not yet tracked",
      changePercent: null,
      sparkline: null,
    },
  ];
}
