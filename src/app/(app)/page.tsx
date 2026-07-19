import { Banknote, FileText, FileSignature } from "lucide-react";
import StatCard from "@/components/StatCard";
import JobsOverviewCard from "@/components/JobsOverviewCard";
import JobsCalendar from "@/components/JobsCalendar";
import { createClient } from "@/lib/supabase/server";
import type { Job } from "@/lib/jobs";

export default async function Home() {
  const supabase = await createClient();
  const today = new Date().toISOString().slice(0, 10);

  const [{ count: activeCount }, { data: upcoming }, { data: scheduled }] =
    await Promise.all([
      supabase
        .from("jobs")
        .select("*", { count: "exact", head: true })
        .neq("status", "paid"),
      supabase
        .from("jobs")
        .select("*")
        .gte("scheduled_date", today)
        .neq("status", "paid")
        .order("scheduled_date", { ascending: true })
        .limit(2)
        .returns<Job[]>(),
      supabase
        .from("jobs")
        .select("id, customer_name, job_type, status, scheduled_date")
        .not("scheduled_date", "is", null)
        .returns<
          Pick<Job, "id" | "customer_name" | "job_type" | "status" | "scheduled_date">[]
        >(),
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

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <JobsOverviewCard activeCount={activeCount ?? 0} upcoming={upcoming ?? []} />
        </div>
        <div className="lg:col-span-3">
          <JobsCalendar jobs={scheduled ?? []} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard label="Payments" icon={Banknote} />
        <StatCard label="Documents" icon={FileText} />
        <StatCard label="Forms" icon={FileSignature} />
      </div>
    </div>
  );
}
