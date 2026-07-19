"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function readCustomerFields(formData: FormData) {
  return {
    full_name: formData.get("full_name") as string,
    phone: (formData.get("phone") as string) || null,
    email: (formData.get("email") as string) || null,
    address: (formData.get("address") as string) || null,
    notes: (formData.get("notes") as string) || null,
  };
}

export async function createCustomer(formData: FormData) {
  const supabase = await createClient();
  const fields = readCustomerFields(formData);

  const { error } = await supabase.from("customers").insert(fields);
  if (error) throw new Error(error.message);

  revalidatePath("/crm");
  redirect("/crm");
}

export async function updateCustomer(id: string, formData: FormData) {
  const supabase = await createClient();
  const fields = readCustomerFields(formData);

  const { error } = await supabase
    .from("customers")
    .update(fields)
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/crm");
  revalidatePath("/jobs");
  redirect("/crm");
}

export async function deleteCustomer(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("customers").delete().eq("id", id);
  if (error) {
    if (error.code === "23503") {
      throw new Error(
        "This customer has jobs on file and can't be deleted. Reassign or remove those jobs first.",
      );
    }
    throw new Error(error.message);
  }

  revalidatePath("/crm");
  redirect("/crm");
}
