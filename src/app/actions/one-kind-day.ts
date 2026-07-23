"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { OneKindDayStatus } from "@/lib/one-kind-day";

function readOneKindDayFields(formData: FormData) {
  return {
    visit_date: formData.get("visit_date") as string,
    person_or_household: formData.get("person_or_household") as string,
    area: (formData.get("area") as string) || null,
    task: formData.get("task") as string,
    team_members: (formData.get("team_members") as string) || null,
    media_links: (formData.get("media_links") as string) || null,
    status: formData.get("status") as OneKindDayStatus,
    story: (formData.get("story") as string) || null,
  };
}

export async function createOneKindDay(formData: FormData) {
  const supabase = await createClient();
  const fields = readOneKindDayFields(formData);

  const { error } = await supabase.from("one_kind_days").insert(fields);
  if (error) throw new Error(error.message);

  revalidatePath("/foundation/one-kind-day");
  redirect("/foundation/one-kind-day");
}

export async function updateOneKindDay(id: string, formData: FormData) {
  const supabase = await createClient();
  const fields = readOneKindDayFields(formData);

  const { error } = await supabase.from("one_kind_days").update(fields).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/foundation/one-kind-day");
  redirect("/foundation/one-kind-day");
}

export async function deleteOneKindDay(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("one_kind_days").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/foundation/one-kind-day");
  redirect("/foundation/one-kind-day");
}
