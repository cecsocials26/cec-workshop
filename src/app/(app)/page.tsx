import { ClipboardList, Banknote, FileText, FileSignature } from "lucide-react";
import StatCard from "@/components/StatCard";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { count: activeJobs } = await supabase
    .from("jobs")
    .select("*", { count: "exact", head: true })
    .neq("status", "paid");

  const jobsValue =
    activeJobs == null
      ? "Not yet tracked"
      : `${activeJobs} active job${activeJobs === 1 ? "" : "s"}`;

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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Jobs" icon={ClipboardList} value={jobsValue} />
        <StatCard label="Payments" icon={Banknote} />
        <StatCard label="Documents" icon={FileText} />
        <StatCard label="Forms" icon={FileSignature} />
      </div>
    </div>
  );
}
