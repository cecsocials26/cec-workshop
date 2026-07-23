"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function readCollectionFields(formData: FormData) {
  const servicesRaw = (formData.get("services") as string) ?? "";
  const services = servicesRaw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const sortOrderRaw = formData.get("sort_order") as string;

  return {
    name: formData.get("name") as string,
    tagline: (formData.get("tagline") as string) || null,
    description: (formData.get("description") as string) || null,
    services,
    perfect_for: (formData.get("perfect_for") as string) || null,
    typical_frequency: (formData.get("typical_frequency") as string) || null,
    sort_order: sortOrderRaw ? Number(sortOrderRaw) : 0,
  };
}

export async function createCollection(formData: FormData) {
  const supabase = await createClient();
  const fields = readCollectionFields(formData);

  const { error } = await supabase.from("collections").insert(fields);
  if (error) throw new Error(error.message);

  revalidatePath("/collections");
  redirect("/collections");
}

export async function updateCollection(id: string, formData: FormData) {
  const supabase = await createClient();
  const fields = readCollectionFields(formData);

  const { error } = await supabase.from("collections").update(fields).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/collections");
  redirect("/collections");
}

export async function deleteCollection(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("collections").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/collections");
  redirect("/collections");
}
