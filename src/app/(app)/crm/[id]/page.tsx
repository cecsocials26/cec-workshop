import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateCustomer, deleteCustomer } from "@/app/actions/customers";
import type { Customer } from "@/lib/customers";
import { healthScoreLabel, type Property } from "@/lib/properties";
import CustomerForm from "../CustomerForm";

export default async function EditCustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const [{ data: customer }, { data: properties }] = await Promise.all([
    supabase.from("customers").select("*").eq("id", id).maybeSingle<Customer>(),
    supabase
      .from("properties")
      .select("*")
      .eq("customer_id", id)
      .order("created_at", { ascending: false })
      .returns<Property[]>(),
  ]);

  if (!customer) notFound();

  const updateCustomerWithId = updateCustomer.bind(null, customer.id);
  const deleteCustomerWithId = deleteCustomer.bind(null, customer.id);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
            {customer.full_name}
          </h2>
        </div>
        <form action={deleteCustomerWithId}>
          <button
            type="submit"
            className="press rounded-sm border border-brand-gold/25 px-4 py-2 text-xs uppercase tracking-wider text-brand-ivory/50 transition-all duration-200 ease-out hover:border-brand-gold/50 hover:text-brand-gold-soft"
          >
            Delete customer
          </button>
        </form>
      </div>

      <div className="surface-static max-w-2xl rounded-sm border border-brand-gold/20 bg-brand-green-light/20 px-6 py-6">
        <CustomerForm
          action={updateCustomerWithId}
          customer={customer}
          submitLabel="Save changes"
        />
      </div>

      <div className="flex max-w-2xl flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg text-brand-gold-soft">Properties</h3>
          <Link
            href={`/properties/new?customer=${customer.id}`}
            className="press text-xs uppercase tracking-wider text-brand-gold-soft transition-colors duration-200 ease-out hover:text-brand-gold"
          >
            + Add property
          </Link>
        </div>

        {!properties || properties.length === 0 ? (
          <p className="text-sm text-brand-ivory/40">No properties on file yet.</p>
        ) : (
          <ul className="surface-static flex flex-col divide-y divide-brand-gold/10 rounded-sm border border-brand-gold/20">
            {properties.map((property) => (
              <li key={property.id}>
                <Link
                  href={`/properties/${property.id}`}
                  className="flex items-center justify-between gap-3 px-4 py-3 transition-colors duration-200 ease-out hover:bg-brand-gold/5"
                >
                  <span className="text-sm text-brand-ivory/90">{property.address}</span>
                  <span className="shrink-0 text-xs text-brand-ivory/50">
                    {healthScoreLabel(property.health_score)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
