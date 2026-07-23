import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateOneKindDay, deleteOneKindDay } from "@/app/actions/one-kind-day";
import type { OneKindDay } from "@/lib/one-kind-day";
import OneKindDayForm from "../OneKindDayForm";

export default async function EditOneKindDayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: entry } = await supabase
    .from("one_kind_days")
    .select("*")
    .eq("id", id)
    .maybeSingle<OneKindDay>();

  if (!entry) notFound();

  const updateWithId = updateOneKindDay.bind(null, entry.id);
  const deleteWithId = deleteOneKindDay.bind(null, entry.id);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
            {entry.person_or_household}
          </h2>
          <p className="mt-2 text-sm text-brand-ivory/50">{entry.task}</p>
        </div>
        <form action={deleteWithId}>
          <button
            type="submit"
            className="press rounded-sm border border-brand-gold/25 px-4 py-2 text-xs uppercase tracking-wider text-brand-ivory/50 transition-all duration-200 ease-out hover:border-brand-gold/50 hover:text-brand-gold-soft"
          >
            Delete entry
          </button>
        </form>
      </div>

      <div className="surface-static max-w-2xl rounded-sm border border-brand-gold/20 bg-brand-green-light/20 px-6 py-6">
        <OneKindDayForm action={updateWithId} entry={entry} submitLabel="Save changes" />
      </div>
    </div>
  );
}
