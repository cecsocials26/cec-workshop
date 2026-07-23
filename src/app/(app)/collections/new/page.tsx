import { createCollection } from "@/app/actions/collections";
import CollectionForm from "../CollectionForm";

export default function NewCollectionPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
          New collection
        </h2>
        <p className="mt-2 text-sm text-brand-ivory/50">
          Add a new Collection to the catalog.
        </p>
      </div>

      <div className="surface-static max-w-2xl rounded-sm border border-brand-gold/20 bg-brand-green-light/20 px-6 py-6">
        <CollectionForm action={createCollection} submitLabel="Create collection" />
      </div>
    </div>
  );
}
