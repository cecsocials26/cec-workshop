import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateCustomer, deleteCustomer } from "@/app/actions/customers";
import type { Customer } from "@/lib/customers";
import CustomerForm from "../CustomerForm";

export default async function EditCustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: customer } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .maybeSingle<Customer>();

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
            className="rounded-sm border border-brand-gold/25 px-4 py-2 text-xs uppercase tracking-wider text-brand-ivory/50 transition-colors hover:border-brand-gold/50 hover:text-brand-gold-soft"
          >
            Delete customer
          </button>
        </form>
      </div>

      <div className="max-w-2xl rounded-sm border border-brand-gold/20 bg-brand-green-light/20 px-6 py-6">
        <CustomerForm
          action={updateCustomerWithId}
          customer={customer}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
