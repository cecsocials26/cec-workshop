"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { resolveOrCreateCustomerId } from "@/lib/customers-server";
import type { JobStatus } from "@/lib/jobs";

function readJobFields(formData: FormData, customerId: string) {
  const priceRaw = formData.get("price") as string;
  const scheduledDateRaw = formData.get("scheduled_date") as string;
  const scheduledTimeRaw = formData.get("scheduled_time") as string;
  const quoteExpiresRaw = formData.get("quote_expires_at") as string;

  const propertyIdRaw = formData.get("property_id") as string;

  return {
    customer_id: customerId,
    property_id: propertyIdRaw || null,
    job_type: formData.get("job_type") as string,
    status: formData.get("status") as JobStatus,
    scheduled_date: scheduledDateRaw || null,
    scheduled_time: scheduledTimeRaw || null,
    quote_expires_at: quoteExpiresRaw || null,
    price: priceRaw ? Number(priceRaw) : null,
    notes: (formData.get("notes") as string) || null,
  };
}

export async function createJob(formData: FormData) {
  const supabase = await createClient();
  const customerId = await resolveOrCreateCustomerId(supabase, formData);
  const fields = readJobFields(formData, customerId);

  const { error } = await supabase.from("jobs").insert(fields);
  if (error) throw new Error(error.message);

  revalidatePath("/jobs");
  revalidatePath("/crm");
  revalidatePath("/");
  redirect("/jobs");
}

export async function updateJob(id: string, formData: FormData) {
  const supabase = await createClient();
  const customerId = await resolveOrCreateCustomerId(supabase, formData);
  const fields = readJobFields(formData, customerId);

  const { error } = await supabase.from("jobs").update(fields).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/jobs");
  revalidatePath("/crm");
  revalidatePath("/");
  redirect("/jobs");
}

export async function deleteJob(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("jobs").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/jobs");
  revalidatePath("/");
  redirect("/jobs");
}
