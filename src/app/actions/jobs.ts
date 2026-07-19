"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { JobStatus } from "@/lib/jobs";

function readJobFields(formData: FormData) {
  const priceRaw = formData.get("price") as string;
  const scheduledDateRaw = formData.get("scheduled_date") as string;

  return {
    customer_name: formData.get("customer_name") as string,
    customer_phone: (formData.get("customer_phone") as string) || null,
    customer_email: (formData.get("customer_email") as string) || null,
    customer_address: (formData.get("customer_address") as string) || null,
    job_type: formData.get("job_type") as string,
    status: formData.get("status") as JobStatus,
    scheduled_date: scheduledDateRaw || null,
    price: priceRaw ? Number(priceRaw) : null,
    notes: (formData.get("notes") as string) || null,
  };
}

export async function createJob(formData: FormData) {
  const supabase = await createClient();
  const fields = readJobFields(formData);

  const { error } = await supabase.from("jobs").insert(fields);
  if (error) throw new Error(error.message);

  revalidatePath("/jobs");
  revalidatePath("/");
  redirect("/jobs");
}

export async function updateJob(id: string, formData: FormData) {
  const supabase = await createClient();
  const fields = readJobFields(formData);

  const { error } = await supabase.from("jobs").update(fields).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/jobs");
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
