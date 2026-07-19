import Link from "next/link";
import { ListChecks } from "lucide-react";
import AssignedBadge from "@/components/AssignedBadge";
import { formatDueDate, isOverdue, type Todo } from "@/lib/todos";

export default function TodosOverviewCard({
  outstandingCount,
  preview,
}: {
  outstandingCount: number;
  preview: Todo[];
}) {
  return (
    <Link
      href="/todos"
      className="flex h-full flex-col gap-5 rounded-sm border border-brand-gold/25 bg-brand-green-light/40 px-6 py-6 transition-colors hover:border-brand-gold/50"
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.18em] text-brand-ivory/55">
          Todos
        </span>
        <ListChecks size={18} strokeWidth={1.5} className="text-brand-gold-soft" />
      </div>

      <p className="font-heading text-4xl text-brand-ivory">
        {outstandingCount}{" "}
        <span className="text-lg text-brand-ivory/50">outstanding</span>
      </p>

      <div className="flex flex-1 flex-col gap-3 border-t border-brand-gold/15 pt-4">
        <p className="text-[11px] uppercase tracking-[0.15em] text-brand-ivory/45">
          Needs attention
        </p>
        {preview.length === 0 ? (
          <p className="text-sm text-brand-ivory/40">All clear.</p>
        ) : (
          preview.map((todo) => {
            const dueLabel = formatDueDate(todo.due_date);
            const overdue = isOverdue(todo);
            return (
              <div key={todo.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm text-brand-ivory/90">
                    {todo.description}
                  </p>
                  <p className="truncate text-xs text-brand-ivory/50">
                    {todo.category}
                    {dueLabel && (
                      <>
                        {" "}
                        &middot;{" "}
                        <span className={overdue ? "text-brand-gold-soft" : ""}>
                          {dueLabel}
                        </span>
                      </>
                    )}
                  </p>
                </div>
                <AssignedBadge assignedTo={todo.assigned_to} />
              </div>
            );
          })
        )}
      </div>
    </Link>
  );
}
