import Link from "next/link";
import { Home } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { healthScoreLabel, type Property } from "@/lib/properties";

export default async function PropertiesPage() {
  const supabase = await createClient();
  const { data: properties, error } = await supabase
    .from("properties")
    .select("*, customer:customers(*)")
    .order("created_at", { ascending: false })
    .returns<Property[]>();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-brand-gold-soft/70">
            Archive Room
          </p>
          <h2 className="mt-1 font-heading text-3xl tracking-wide text-brand-ivory">
            Properties
          </h2>
          <p className="mt-2 text-sm text-brand-ivory/50">
            One Property Passport per customer property.
          </p>
        </div>
        <Link
          href="/properties/new"
          className="press rounded-sm bg-brand-gold px-5 py-2.5 text-sm font-medium uppercase tracking-[0.15em] text-brand-green-dark transition-all duration-200 ease-out hover:bg-brand-gold-soft"
        >
          New property
        </Link>
      </div>

      {error && (
        <p className="rounded-sm border border-brand-gold/20 bg-brand-green-dark/40 px-4 py-3 text-sm text-brand-gold-soft">
          Couldn&apos;t load properties: {error.message}
        </p>
      )}

      {!error && properties?.length === 0 && (
        <p className="flex items-center gap-2 rounded-sm border border-brand-gold/20 bg-brand-green-dark/40 px-4 py-3 text-sm text-brand-ivory/60">
          <Home size={18} strokeWidth={1.25} className="shrink-0 text-brand-ivory/25" />
          No properties yet. Add the first one to get started.
        </p>
      )}

      {!error && properties && properties.length > 0 && (
        <div className="surface-static overflow-x-auto rounded-sm border border-brand-gold/20">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-brand-gold/20 text-[11px] uppercase tracking-wider text-brand-ivory/50">
                <th className="px-4 py-3 font-normal">Customer</th>
                <th className="px-4 py-3 font-normal">Address</th>
                <th className="px-4 py-3 font-normal">Construction</th>
                <th className="px-4 py-3 font-normal">Health score</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr
                  key={property.id}
                  className="border-b border-brand-gold/10 transition-colors duration-200 ease-out last:border-0 hover:bg-brand-gold/5"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/properties/${property.id}`}
                      className="text-brand-ivory/90 hover:text-brand-gold-soft"
                    >
                      {property.customer?.full_name ?? "—"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-brand-ivory/70">{property.address}</td>
                  <td className="px-4 py-3 text-brand-ivory/70">
                    {property.construction ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-brand-ivory/70">
                    {healthScoreLabel(property.health_score)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
