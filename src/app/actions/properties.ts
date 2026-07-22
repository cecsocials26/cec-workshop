"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { resolveOrCreateCustomerId } from "@/lib/customers-server";

function readPropertyFields(formData: FormData, customerId: string) {
  const healthScoreRaw = formData.get("health_score") as string;

  return {
    customer_id: customerId,
    address: formData.get("address") as string,
    construction: (formData.get("construction") as string) || null,
    health_score: healthScoreRaw ? Number(healthScoreRaw) : null,
    access_notes: (formData.get("access_notes") as string) || null,
    notes: (formData.get("notes") as string) || null,
  };
}

export async function createProperty(formData: FormData) {
  const supabase = await createClient();
  const customerId = await resolveOrCreateCustomerId(supabase, formData);
  const fields = readPropertyFields(formData, customerId);

  const { error } = await supabase.from("properties").insert(fields);
  if (error) throw new Error(error.message);

  revalidatePath("/properties");
  revalidatePath("/crm");
  redirect("/properties");
}

export async function updateProperty(id: string, formData: FormData) {
  const supabase = await createClient();
  const customerId = await resolveOrCreateCustomerId(supabase, formData);
  const fields = readPropertyFields(formData, customerId);

  const { error } = await supabase.from("properties").update(fields).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/properties");
  revalidatePath("/crm");
  redirect("/properties");
}

export async function deleteProperty(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) {
    if (error.code === "23503") {
      throw new Error(
        "This property has jobs linked to it and can't be deleted. Unlink those jobs first.",
      );
    }
    throw new Error(error.message);
  }

  revalidatePath("/properties");
  revalidatePath("/crm");
  redirect("/properties");
}
