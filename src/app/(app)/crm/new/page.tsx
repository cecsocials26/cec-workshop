import { createCustomer } from "@/app/actions/customers";
import CustomerForm from "../CustomerForm";

export default function NewCustomerPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
          New customer
        </h2>
        <p className="mt-2 text-sm text-brand-ivory/50">
          Add a customer to the books.
        </p>
      </div>

      <div className="surface-static max-w-2xl rounded-sm border border-brand-gold/20 bg-brand-green-light/20 px-6 py-6">
        <CustomerForm action={createCustomer} submitLabel="Create customer" />
      </div>
    </div>
  );
}
