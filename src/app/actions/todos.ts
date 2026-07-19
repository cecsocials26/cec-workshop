"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { AssignedTo } from "@/lib/todos";

function readTodoFields(formData: FormData) {
  const categorySelected = formData.get("category") as string;
  const category =
    categorySelected === "__custom__"
      ? (formData.get("category_custom") as string)
      : categorySelected;

  return {
    description: formData.get("description") as string,
    category,
    assigned_to: formData.get("assigned_to") as AssignedTo,
    due_date: (formData.get("due_date") as string) || null,
    done: formData.get("done") === "on",
  };
}

export async function createTodo(formData: FormData) {
  const supabase = await createClient();
  const fields = readTodoFields(formData);

  const { error } = await supabase.from("todos").insert(fields);
  if (error) throw new Error(error.message);

  revalidatePath("/todos");
  revalidatePath("/");
  redirect("/todos");
}

export async function updateTodo(id: string, formData: FormData) {
  const supabase = await createClient();
  const fields = readTodoFields(formData);

  const { error } = await supabase.from("todos").update(fields).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/todos");
  revalidatePath("/");
  redirect("/todos");
}

export async function deleteTodo(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/todos");
  revalidatePath("/");
  redirect("/todos");
}

export async function toggleTodoDone(id: string, done: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("todos")
    .update({ done })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/todos");
  revalidatePath("/");
}
