import { createClient } from "@/lib/supabase/server";
import { createProperty } from "@/app/actions/properties";
import type { Customer } from "@/lib/customers";
import PropertyForm from "../PropertyForm";

export default async function NewPropertyPage({
  searchParams,
}: {
  searchParams: Promise<{ customer?: string }>;
}) {
  const { customer: initialCustomerId } = await searchParams;

  const supabase = await createClient();
  const { data: customers } = await supabase
    .from("customers")
    .select("*")
    .order("full_name", { ascending: true })
    .returns<Customer[]>();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
          New property
        </h2>
        <p className="mt-2 text-sm text-brand-ivory/50">
          Start a Property Passport.
        </p>
      </div>

      <div className="surface-static max-w-2xl rounded-sm border border-brand-gold/20 bg-brand-green-light/20 px-6 py-6">
        <PropertyForm
          action={createProperty}
          customers={customers ?? []}
          initialCustomerId={initialCustomerId}
          submitLabel="Create property"
        />
      </div>
    </div>
  );
}
