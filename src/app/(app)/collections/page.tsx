import Link from "next/link";
import { Layers } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Collection } from "@/lib/collections";

export default async function CollectionsPage() {
  const supabase = await createClient();
  const { data: collections, error } = await supabase
    .from("collections")
    .select("*")
    .order("sort_order", { ascending: true })
    .returns<Collection[]>();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
            Collections
          </h2>
          <p className="mt-2 text-sm text-brand-ivory/50">
            Not a price list — a different way to choose how we care for a property.
          </p>
        </div>
        <Link
          href="/collections/new"
          className="press rounded-sm bg-brand-gold px-5 py-2.5 text-sm font-medium uppercase tracking-[0.15em] text-brand-green-dark transition-all duration-200 ease-out hover:bg-brand-gold-soft"
        >
          New collection
        </Link>
      </div>

      {error && (
        <p className="rounded-sm border border-brand-gold/20 bg-brand-green-dark/40 px-4 py-3 text-sm text-brand-gold-soft">
          Couldn&apos;t load collections: {error.message}
        </p>
      )}

      {!error && collections?.length === 0 && (
        <p className="flex items-center gap-2 rounded-sm border border-brand-gold/20 bg-brand-green-dark/40 px-4 py-3 text-sm text-brand-ivory/60">
          <Layers size={18} strokeWidth={1.25} className="shrink-0 text-brand-ivory/25" />
          No collections yet.
        </p>
      )}

      {!error && collections && collections.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="surface-card flex flex-col gap-3 rounded-sm border border-brand-gold/25 bg-brand-green-light/40 px-6 py-6 hover:border-brand-gold/50"
            >
              <div>
                <h3 className="font-heading text-xl text-brand-ivory">{collection.name}</h3>
                {collection.tagline && (
                  <p className="mt-1 text-sm italic text-brand-gold-soft">
                    {collection.tagline}
                  </p>
                )}
              </div>

              {collection.services.length > 0 && (
                <ul className="flex flex-col gap-1 border-t border-brand-gold/15 pt-3 text-sm text-brand-ivory/60">
                  {collection.services.slice(0, 4).map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                  {collection.services.length > 4 && (
                    <li className="text-brand-ivory/35">
                      +{collection.services.length - 4} more
                    </li>
                  )}
                </ul>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
