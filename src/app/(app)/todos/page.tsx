import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  TODO_CATEGORIES,
  formatDueDate,
  isOverdue,
  type Todo,
} from "@/lib/todos";
import AssignedBadge from "@/components/AssignedBadge";
import TodoCheckbox from "@/components/TodoCheckbox";

export default async function TodosPage({
  searchParams,
}: {
  searchParams: Promise<{ completed?: string }>;
}) {
  const { completed } = await searchParams;
  const showCompleted = completed === "1";

  const supabase = await createClient();
  const { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .order("due_date", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: true })
    .returns<Todo[]>();

  const visible = (todos ?? []).filter((t) => showCompleted || !t.done);

  const categories = [
    ...TODO_CATEGORIES,
    ...Array.from(
      new Set(visible.map((t) => t.category).filter((c) => !TODO_CATEGORIES.includes(c))),
    ),
  ];

  const grouped = categories
    .map((category) => ({
      category,
      items: visible.filter((t) => t.category === category),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
            Todos
          </h2>
          <p className="mt-2 text-sm text-brand-ivory/50">
            Shared admin and one-off actions, separate from the Jobs pipeline.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={showCompleted ? "/todos" : "/todos?completed=1"}
            className="press rounded-sm border border-brand-gold/25 px-4 py-2.5 text-xs uppercase tracking-wider text-brand-ivory/50 transition-all duration-200 ease-out hover:border-brand-gold/50 hover:text-brand-gold-soft"
          >
            {showCompleted ? "Hide completed" : "Show completed"}
          </Link>
          <Link
            href="/todos/new"
            className="press rounded-sm bg-brand-gold px-5 py-2.5 text-sm font-medium uppercase tracking-[0.15em] text-brand-green-dark transition-all duration-200 ease-out hover:bg-brand-gold-soft"
          >
            New todo
          </Link>
        </div>
      </div>

      {error && (
        <p className="rounded-sm border border-brand-gold/20 bg-brand-green-dark/40 px-4 py-3 text-sm text-brand-gold-soft">
          Couldn&apos;t load todos: {error.message}
        </p>
      )}

      {!error && grouped.length === 0 && (
        <p className="flex items-center gap-2 rounded-sm border border-brand-gold/20 bg-brand-green-dark/40 px-4 py-3 text-sm text-brand-ivory/60">
          <CheckCircle2 size={18} strokeWidth={1.25} className="shrink-0 text-brand-ivory/25" />
          {showCompleted ? "No todos yet." : "Nothing outstanding — nice work."}
        </p>
      )}

      <div className="flex flex-col gap-6">
        {grouped.map(({ category, items }) => (
          <section
            key={category}
            className="surface-static rounded-sm border border-brand-gold/20 bg-brand-green-light/20"
          >
            <div className="border-b border-brand-gold/15 px-5 py-3">
              <h3 className="font-heading text-lg text-brand-gold-soft">
                {category}{" "}
                <span className="font-body text-xs text-brand-ivory/40">
                  ({items.length})
                </span>
              </h3>
            </div>
            <ul className="flex flex-col divide-y divide-brand-gold/10">
              {items.map((todo) => {
                const dueLabel = formatDueDate(todo.due_date);
                const overdue = isOverdue(todo);

                return (
                  <li
                    key={todo.id}
                    className="flex items-center gap-3 px-5 py-3 transition-colors duration-200 ease-out hover:bg-brand-gold/5"
                  >
                    <TodoCheckbox id={todo.id} done={todo.done} />
                    <Link
                      href={`/todos/${todo.id}`}
                      className={`min-w-0 flex-1 truncate text-sm ${
                        todo.done
                          ? "text-brand-ivory/35 line-through"
                          : "text-brand-ivory/90 hover:text-brand-gold-soft"
                      }`}
                    >
                      {todo.description}
                    </Link>
                    {dueLabel && (
                      <span
                        className={`shrink-0 text-xs ${
                          overdue ? "text-brand-gold-soft" : "text-brand-ivory/40"
                        }`}
                      >
                        {dueLabel}
                      </span>
                    )}
                    <AssignedBadge assignedTo={todo.assigned_to} />
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
