import type { createClient } from "@/lib/supabase/server";

/**
 * Resolves the "customer_id" field from a form: an existing customer id,
 * or "__new__" to create one on the fly from the accompanying
 * new_customer_* fields. Shared by any server action whose form embeds
 * the customer picker (Jobs, Properties).
 */
export async function resolveOrCreateCustomerId(
  supabase: Awaited<ReturnType<typeof createClient>>,
  formData: FormData,
): Promise<string> {
  const selected = formData.get("customer_id") as string;
  if (selected !== "__new__") return selected;

  const { data: customer, error } = await supabase
    .from("customers")
    .insert({
      full_name: formData.get("new_customer_name") as string,
      phone: (formData.get("new_customer_phone") as string) || null,
      email: (formData.get("new_customer_email") as string) || null,
      address: (formData.get("new_customer_address") as string) || null,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return customer.id;
}
