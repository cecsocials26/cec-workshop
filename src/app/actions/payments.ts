"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { PaymentMethod } from "@/lib/payments";

function readPaymentFields(formData: FormData) {
  const amountRaw = formData.get("amount") as string;
  const dueDateRaw = formData.get("due_date") as string;
  const paidDateRaw = formData.get("paid_date") as string;
  const methodRaw = formData.get("method") as string;

  return {
    job_id: formData.get("job_id") as string,
    amount: Number(amountRaw),
    due_date: dueDateRaw || null,
    paid_date: paidDateRaw || null,
    method: (methodRaw || null) as PaymentMethod | null,
    notes: (formData.get("notes") as string) || null,
  };
}

export async function createPayment(formData: FormData) {
  const supabase = await createClient();
  const fields = readPaymentFields(formData);

  const { error } = await supabase.from("payments").insert(fields);
  if (error) throw new Error(error.message);

  revalidatePath("/payments");
  revalidatePath("/");
  redirect("/payments");
}

export async function updatePayment(id: string, formData: FormData) {
  const supabase = await createClient();
  const fields = readPaymentFields(formData);

  const { error } = await supabase.from("payments").update(fields).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/payments");
  revalidatePath("/");
  redirect("/payments");
}

export async function deletePayment(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("payments").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/payments");
  revalidatePath("/");
  redirect("/payments");
}

export async function markPaymentPaid(id: string) {
  const supabase = await createClient();
  const today = new Date().toISOString().slice(0, 10);

  const { error } = await supabase
    .from("payments")
    .update({ paid_date: today })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/payments");
  revalidatePath("/");
}
