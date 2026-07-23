export type AssignedTo = "sam" | "jordon" | "either";

export type Todo = {
  id: string;
  description: string;
  category: string;
  assigned_to: AssignedTo;
  done: boolean;
  due_date: string | null;
  created_at: string;
  updated_at: string;
};

export const TODO_CATEGORIES = [
  "Business Setup",
  "Insurance",
  "Brand & Marketing",
  "Photography",
  "One Kind Day / Olive Branch Foundation",
  "Website",
  "Pricing",
  "Equipment",
  "Legal / Compliance",
];

export const ASSIGNED_TO_OPTIONS: { value: AssignedTo; label: string }[] = [
  { value: "sam", label: "Sam" },
  { value: "jordon", label: "Jordon" },
  { value: "either", label: "Either" },
];

export function assignedToLabel(assignedTo: AssignedTo): string {
  return ASSIGNED_TO_OPTIONS.find((o) => o.value === assignedTo)?.label ?? assignedTo;
}

export function isOverdue(todo: Pick<Todo, "due_date" | "done">): boolean {
  if (!todo.due_date || todo.done) return false;
  return todo.due_date < new Date().toISOString().slice(0, 10);
}

export function formatDueDate(date: string | null): string | null {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}
