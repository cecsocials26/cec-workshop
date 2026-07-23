import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatVisitDate, mediaLinkList, type OneKindDay } from "@/lib/one-kind-day";
import OneKindDayStatusBadge from "@/components/OneKindDayStatusBadge";

export default async function OneKindDayPage() {
  const supabase = await createClient();
  const { data: entries, error } = await supabase
    .from("one_kind_days")
    .select("*")
    .order("visit_date", { ascending: false })
    .returns<OneKindDay[]>();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
            One Kind Day
          </h2>
          <p className="mt-2 text-sm text-brand-ivory/50">
            A weekly promise — a full day of free help for someone in our community.
          </p>
        </div>
        <Link
          href="/foundation/one-kind-day/new"
          className="press rounded-sm bg-brand-gold px-5 py-2.5 text-sm font-medium uppercase tracking-[0.15em] text-brand-green-dark transition-all duration-200 ease-out hover:bg-brand-gold-soft"
        >
          New entry
        </Link>
      </div>

      {error && (
        <p className="rounded-sm border border-brand-gold/20 bg-brand-green-dark/40 px-4 py-3 text-sm text-brand-gold-soft">
          Couldn&apos;t load One Kind Day entries: {error.message}
        </p>
      )}

      {!error && entries?.length === 0 && (
        <p className="flex items-center gap-2 rounded-sm border border-brand-gold/20 bg-brand-green-dark/40 px-4 py-3 text-sm text-brand-ivory/60">
          <HeartHandshake size={18} strokeWidth={1.25} className="shrink-0 text-brand-ivory/25" />
          Nothing logged yet. Add the first One Kind Day.
        </p>
      )}

      {!error && entries && entries.length > 0 && (
        <div className="flex flex-col gap-5">
          {entries.map((entry) => {
            const links = mediaLinkList(entry.media_links);
            return (
              <Link
                key={entry.id}
                href={`/foundation/one-kind-day/${entry.id}`}
                className="surface-card flex flex-col gap-3 rounded-sm border border-brand-gold/25 bg-brand-green-light/40 px-6 py-6 hover:border-brand-gold/50"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-[0.15em] text-brand-ivory/45">
                    {formatVisitDate(entry.visit_date)}
                  </p>
                  <OneKindDayStatusBadge status={entry.status} />
                </div>

                <h3 className="font-heading text-xl text-brand-ivory">
                  {entry.person_or_household}
                  {entry.area && (
                    <span className="text-base text-brand-ivory/50"> &middot; {entry.area}</span>
                  )}
                </h3>

                <p className="text-sm text-brand-gold-soft">{entry.task}</p>

                {entry.story && (
                  <p className="line-clamp-2 text-sm text-brand-ivory/60">{entry.story}</p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-xs text-brand-ivory/40">
                  {entry.team_members && <span>Team: {entry.team_members}</span>}
                  {links.length > 0 && <span>{links.length} media link{links.length === 1 ? "" : "s"}</span>}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
