import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateTodo, deleteTodo } from "@/app/actions/todos";
import type { Todo } from "@/lib/todos";
import TodoForm from "../TodoForm";

export default async function EditTodoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: todo } = await supabase
    .from("todos")
    .select("*")
    .eq("id", id)
    .maybeSingle<Todo>();

  if (!todo) notFound();

  const updateTodoWithId = updateTodo.bind(null, todo.id);
  const deleteTodoWithId = deleteTodo.bind(null, todo.id);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
            {todo.category}
          </h2>
        </div>
        <form action={deleteTodoWithId}>
          <button
            type="submit"
            className="rounded-sm border border-brand-gold/25 px-4 py-2 text-xs uppercase tracking-wider text-brand-ivory/50 transition-colors hover:border-brand-gold/50 hover:text-brand-gold-soft"
          >
            Delete todo
          </button>
        </form>
      </div>

      <div className="max-w-2xl rounded-sm border border-brand-gold/20 bg-brand-green-light/20 px-6 py-6">
        <TodoForm action={updateTodoWithId} todo={todo} submitLabel="Save changes" />
      </div>
    </div>
  );
}
