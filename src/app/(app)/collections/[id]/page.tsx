import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateCollection, deleteCollection } from "@/app/actions/collections";
import type { Collection } from "@/lib/collections";
import CollectionForm from "../CollectionForm";

export default async function EditCollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: collection } = await supabase
    .from("collections")
    .select("*")
    .eq("id", id)
    .maybeSingle<Collection>();

  if (!collection) notFound();

  const updateWithId = updateCollection.bind(null, collection.id);
  const deleteWithId = deleteCollection.bind(null, collection.id);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
            {collection.name}
          </h2>
          {collection.tagline && (
            <p className="mt-2 text-sm text-brand-ivory/50">{collection.tagline}</p>
          )}
        </div>
        <form action={deleteWithId}>
          <button
            type="submit"
            className="press rounded-sm border border-brand-gold/25 px-4 py-2 text-xs uppercase tracking-wider text-brand-ivory/50 transition-all duration-200 ease-out hover:border-brand-gold/50 hover:text-brand-gold-soft"
          >
            Delete collection
          </button>
        </form>
      </div>

      <div className="surface-static max-w-2xl rounded-sm border border-brand-gold/20 bg-brand-green-light/20 px-6 py-6">
        <CollectionForm action={updateWithId} collection={collection} submitLabel="Save changes" />
      </div>
    </div>
  );
}
