import { createTodo } from "@/app/actions/todos";
import TodoForm from "../TodoForm";

export default function NewTodoPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
          New todo
        </h2>
        <p className="mt-2 text-sm text-brand-ivory/50">
          Add something to the shared list.
        </p>
      </div>

      <div className="surface-static max-w-2xl rounded-sm border border-brand-gold/20 bg-brand-green-light/20 px-6 py-6">
        <TodoForm action={createTodo} submitLabel="Create todo" />
      </div>
    </div>
  );
}
