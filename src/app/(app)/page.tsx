import { Banknote, FileText, FileSignature } from "lucide-react";
import StatCard from "@/components/StatCard";
import JobsOverviewCard from "@/components/JobsOverviewCard";
import JobsCalendar from "@/components/JobsCalendar";
import TodosOverviewCard from "@/components/TodosOverviewCard";
import { createClient } from "@/lib/supabase/server";
import type { Job } from "@/lib/jobs";
import type { Todo } from "@/lib/todos";

export default async function Home() {
  const supabase = await createClient();
  const today = new Date().toISOString().slice(0, 10);

  const [
    { count: activeJobsCount },
    { data: upcomingJobs },
    { data: scheduledJobs },
    { count: outstandingTodosCount },
    { data: todosPreview },
  ] = await Promise.all([
    supabase
      .from("jobs")
      .select("*", { count: "exact", head: true })
      .neq("status", "paid"),
    supabase
      .from("jobs")
      .select("*, customer:customers(*)")
      .gte("scheduled_date", today)
      .neq("status", "paid")
      .order("scheduled_date", { ascending: true })
      .limit(2)
      .returns<Job[]>(),
    supabase
      .from("jobs")
      .select("id, job_type, status, scheduled_date, customer:customers(full_name)")
      .not("scheduled_date", "is", null)
      .returns<
        (Pick<Job, "id" | "job_type" | "status" | "scheduled_date"> & {
          customer: { full_name: string } | null;
        })[]
      >(),
    supabase
      .from("todos")
      .select("*", { count: "exact", head: true })
      .eq("done", false),
    supabase
      .from("todos")
      .select("*")
      .eq("done", false)
      .order("due_date", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: true })
      .limit(4)
      .returns<Todo[]>(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
          Overview
        </h2>
        <p className="mt-1 text-sm text-brand-ivory/50">
          A single vantage point over jobs, payments, documents and forms.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <JobsOverviewCard
          activeCount={activeJobsCount ?? 0}
          upcoming={upcomingJobs ?? []}
        />
        <TodosOverviewCard
          outstandingCount={outstandingTodosCount ?? 0}
          preview={todosPreview ?? []}
        />
      </div>

      <JobsCalendar jobs={scheduledJobs ?? []} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard label="Payments" icon={Banknote} />
        <StatCard label="Documents" icon={FileText} />
        <StatCard label="Forms" icon={FileSignature} />
      </div>
    </div>
  );
}
