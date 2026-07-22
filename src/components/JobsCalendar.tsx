"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CalendarX } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import type { Job } from "@/lib/jobs";

type CalendarJob = Pick<Job, "id" | "job_type" | "status" | "scheduled_date"> & {
  customer?: { full_name: string } | null;
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function fromDateKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function getCalendarDays(year: number, month: number): Date[] {
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = (firstOfMonth.getDay() + 6) % 7; // Monday = 0
  const start = new Date(year, month, 1 - startOffset);
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export default function JobsCalendar({ jobs }: { jobs: CalendarJob[] }) {
  const todayKey = toDateKey(new Date());
  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedKey, setSelectedKey] = useState<string | null>(todayKey);

  const jobsByDate = useMemo(() => {
    const map = new Map<string, CalendarJob[]>();
    for (const job of jobs) {
      if (!job.scheduled_date) continue;
      const list = map.get(job.scheduled_date) ?? [];
      list.push(job);
      map.set(job.scheduled_date, list);
    }
    return map;
  }, [jobs]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const days = useMemo(() => getCalendarDays(year, month), [year, month]);

  const monthLabel = viewDate.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
  const selectedJobs = selectedKey ? (jobsByDate.get(selectedKey) ?? []) : [];

  return (
    <div className="surface-card flex h-full flex-col rounded-sm border border-brand-gold/25 bg-brand-green-light/40 px-6 py-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl text-brand-ivory">{monthLabel}</h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setViewDate(new Date(year, month - 1, 1))}
            className="press rounded-sm p-1.5 text-brand-ivory/50 transition-colors duration-200 ease-out hover:text-brand-gold-soft"
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => setViewDate(new Date(year, month + 1, 1))}
            className="press rounded-sm p-1.5 text-brand-ivory/50 transition-colors duration-200 ease-out hover:text-brand-gold-soft"
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wider text-brand-ivory/40">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const key = toDateKey(day);
          const inMonth = day.getMonth() === month;
          const hasJobs = jobsByDate.has(key);
          const isSelected = key === selectedKey;
          const isToday = key === todayKey;

          return (
            <button
              type="button"
              key={key}
              onClick={() => setSelectedKey(key)}
              className={`press flex flex-col items-center gap-0.5 rounded-sm py-1.5 text-sm transition-colors duration-200 ease-out ${
                isSelected
                  ? "bg-brand-gold text-brand-green-dark"
                  : inMonth
                    ? "text-brand-ivory/80 hover:bg-brand-gold/10"
                    : "text-brand-ivory/25 hover:bg-brand-gold/5"
              } ${isToday && !isSelected ? "ring-1 ring-brand-gold/40" : ""}`}
            >
              <span>{day.getDate()}</span>
              <span
                className={`h-1 w-1 rounded-full ${
                  hasJobs ? (isSelected ? "bg-brand-green-dark" : "bg-brand-gold") : "bg-transparent"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex-1 border-t border-brand-gold/15 pt-4">
        <p className="text-[11px] uppercase tracking-[0.15em] text-brand-ivory/45">
          {selectedKey
            ? fromDateKey(selectedKey).toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })
            : "Select a date"}
        </p>
        {selectedJobs.length === 0 ? (
          <p className="mt-2 flex items-center gap-2 text-sm text-brand-ivory/40">
            <CalendarX size={16} strokeWidth={1.25} className="shrink-0 text-brand-ivory/20" />
            Nothing scheduled.
          </p>
        ) : (
          <ul className="mt-2 flex flex-col gap-2">
            {selectedJobs.map((job) => (
              <li key={job.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm text-brand-ivory/90">
                    {job.customer?.full_name ?? "—"}
                  </p>
                  <p className="truncate text-xs text-brand-ivory/50">
                    {job.job_type}
                  </p>
                </div>
                <StatusBadge status={job.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
