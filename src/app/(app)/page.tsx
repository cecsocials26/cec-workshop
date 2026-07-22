import { Banknote, FileText, FileSignature } from "lucide-react";
import StatCard from "@/components/StatCard";
import JobsOverviewCard from "@/components/JobsOverviewCard";
import JobsCalendar from "@/components/JobsCalendar";
import TodosOverviewCard from "@/components/TodosOverviewCard";
import TodaysSchedule from "@/components/TodaysSchedule";
import WeatherCard from "@/components/WeatherCard";
import BusinessPulse from "@/components/BusinessPulse";
import NotificationsStrip from "@/components/NotificationsStrip";
import { createClient } from "@/lib/supabase/server";
import { weeklyCounts, type Job } from "@/lib/jobs";
import type { Todo } from "@/lib/todos";
import { getWeatherSnapshot, getServiceRecommendations } from "@/lib/weather";
import { computeBusinessPulse } from "@/lib/business-pulse";
import { getQuoteExpiryAlerts } from "@/lib/notifications";

export default async function Home() {
  const supabase = await createClient();
  const todayStr = new Date().toISOString().slice(0, 10);

  const [{ data: allJobs }, { count: outstandingTodosCount }, { data: todosPreview }, weather] =
    await Promise.all([
      supabase.from("jobs").select("*, customer:customers(*)").returns<Job[]>(),
      supabase.from("todos").select("*", { count: "exact", head: true }).eq("done", false),
      supabase
        .from("todos")
        .select("*")
        .eq("done", false)
        .order("due_date", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: true })
        .limit(4)
        .returns<Todo[]>(),
      getWeatherSnapshot(),
    ]);

  const jobs = allJobs ?? [];

  const activeJobsCount = jobs.filter((j) => j.status !== "paid").length;
  const upcomingJobs = jobs
    .filter(
      (j) => j.scheduled_date && j.scheduled_date >= todayStr && j.status !== "paid",
    )
    .sort((a, b) => (a.scheduled_date! < b.scheduled_date! ? -1 : 1))
    .slice(0, 2);
  const scheduledJobs = jobs.filter((j) => j.scheduled_date);
  const todaysJobs = jobs
    .filter((j) => j.scheduled_date === todayStr)
    .sort((a, b) =>
      (a.scheduled_time ?? "99:99").localeCompare(b.scheduled_time ?? "99:99"),
    );

  const jobsWeeklyCounts = weeklyCounts(jobs.map((j) => j.created_at));
  const pulseMetrics = computeBusinessPulse(jobs);
  const alerts = getQuoteExpiryAlerts(jobs);
  const recommendations = weather ? getServiceRecommendations(weather) : [];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
            Overview
          </h2>
          <p className="mt-2 text-sm text-brand-ivory/50">
            A single vantage point over jobs, payments, documents and forms.
          </p>
        </div>
        <WeatherCard weather={weather} recommendations={recommendations} />
      </div>

      <NotificationsStrip alerts={alerts} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <JobsOverviewCard
          activeCount={activeJobsCount}
          upcoming={upcomingJobs}
          weeklyCounts={jobsWeeklyCounts}
        />
        <TodosOverviewCard
          outstandingCount={outstandingTodosCount ?? 0}
          preview={todosPreview ?? []}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <TodaysSchedule jobs={todaysJobs} />
        </div>
        <div className="lg:col-span-3">
          <JobsCalendar jobs={scheduledJobs} />
        </div>
      </div>

      <BusinessPulse metrics={pulseMetrics} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard label="Payments" icon={Banknote} />
        <StatCard label="Documents" icon={FileText} />
        <StatCard label="Forms" icon={FileSignature} />
      </div>
    </div>
  );
}
