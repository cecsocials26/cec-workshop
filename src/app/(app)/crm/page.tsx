import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Customer } from "@/lib/customers";

export default async function CrmPage() {
  const supabase = await createClient();
  const { data: customers, error } = await supabase
    .from("customers")
    .select("*")
    .order("full_name", { ascending: true })
    .returns<Customer[]>();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
            Customers
          </h2>
          <p className="mt-1 text-sm text-brand-ivory/50">
            Every customer on file.
          </p>
        </div>
        <Link
          href="/crm/new"
          className="rounded-sm bg-brand-gold px-5 py-2.5 text-sm font-medium uppercase tracking-[0.15em] text-brand-green-dark transition-colors hover:bg-brand-gold-soft"
        >
          New customer
        </Link>
      </div>

      {error && (
        <p className="rounded-sm border border-brand-gold/20 bg-brand-green-dark/40 px-4 py-3 text-sm text-brand-gold-soft">
          Couldn&apos;t load customers: {error.message}
        </p>
      )}

      {!error && customers?.length === 0 && (
        <p className="rounded-sm border border-brand-gold/20 bg-brand-green-dark/40 px-4 py-3 text-sm text-brand-ivory/60">
          No customers yet. Add the first one to get started.
        </p>
      )}

      {!error && customers && customers.length > 0 && (
        <div className="overflow-x-auto rounded-sm border border-brand-gold/20">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-brand-gold/20 text-[11px] uppercase tracking-wider text-brand-ivory/50">
                <th className="px-4 py-3 font-normal">Name</th>
                <th className="px-4 py-3 font-normal">Phone</th>
                <th className="px-4 py-3 font-normal">Email</th>
                <th className="px-4 py-3 font-normal">Address</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-brand-gold/10 last:border-0 hover:bg-brand-gold/5"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/crm/${customer.id}`}
                      className="text-brand-ivory/90 hover:text-brand-gold-soft"
                    >
                      {customer.full_name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-brand-ivory/70">
                    {customer.phone ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-brand-ivory/70">
                    {customer.email ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-brand-ivory/70">
                    {customer.address ?? "—"}
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
