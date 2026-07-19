export type Customer = {
  id: string;
  full_name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export function customerLabel(customer: Pick<Customer, "full_name" | "phone">) {
  return customer.phone
    ? `${customer.full_name} · ${customer.phone}`
    : customer.full_name;
}
