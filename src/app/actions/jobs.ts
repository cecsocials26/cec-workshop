"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { JobStatus } from "@/lib/jobs";

function readJobFields(formData: FormData, customerId: string) {
  const priceRaw = formData.get("price") as string;
  const scheduledDateRaw = formData.get("scheduled_date") as string;
  const scheduledTimeRaw = formData.get("scheduled_time") as string;
  const quoteExpiresRaw = formData.get("quote_expires_at") as string;

  return {
    customer_id: customerId,
    job_type: formData.get("job_type") as string,
    status: formData.get("status") as JobStatus,
    scheduled_date: scheduledDateRaw || null,
    scheduled_time: scheduledTimeRaw || null,
    quote_expires_at: quoteExpiresRaw || null,
    price: priceRaw ? Number(priceRaw) : null,
    notes: (formData.get("notes") as string) || null,
  };
}

async function resolveCustomerId(
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

export async function createJob(formData: FormData) {
  const supabase = await createClient();
  const customerId = await resolveCustomerId(supabase, formData);
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
  const customerId = await resolveCustomerId(supabase, formData);
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
