import { ClipboardList, Banknote, FileText, FileSignature } from "lucide-react";
import StatCard from "@/components/StatCard";

export default function Home() {
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
        <StatCard label="Jobs" icon={ClipboardList} />
        <StatCard label="Payments" icon={Banknote} />
        <StatCard label="Documents" icon={FileText} />
        <StatCard label="Forms" icon={FileSignature} />
      </div>
    </div>
  );
}
