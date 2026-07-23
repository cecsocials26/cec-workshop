import Image from "next/image";
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function FoundationPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="surface-static overflow-hidden rounded-sm border border-brand-gold/20 bg-brand-green-light/20">
        <div className="flex flex-col items-center gap-8 px-8 py-12 text-center sm:flex-row sm:text-left">
          <div className="relative h-44 w-44 shrink-0 sm:h-52 sm:w-52">
            <Image
              src="/brand/olive-branch-foundation.png"
              alt="The Olive Branch Foundation"
              fill
              sizes="208px"
              className="object-contain"
              priority
            />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-brand-gold-soft/80">
              The Olive Branch Foundation
            </p>
            <h2 className="mt-2 font-heading text-3xl tracking-wide text-brand-ivory">
              Care That Reaches Further
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-brand-ivory/70">
              Choosing Complete Exterior Care means becoming part of something bigger than
              exterior care alone. The Olive Branch Foundation is our commitment to the local
              community — creating opportunity, growth, and belonging through employment,
              training, and hands-on support for the people who live here.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.15em] text-brand-gold-soft">
              Opportunity &middot; Growth &middot; Community
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="surface-card rounded-sm border border-brand-gold/25 bg-brand-green-light/40 px-6 py-6">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.18em] text-brand-ivory/55">
              Project 100
            </span>
            <Leaf size={18} strokeWidth={1.5} className="text-brand-gold-soft" />
          </div>
          <div className="mt-5 flex items-center gap-3">
            <Leaf size={22} strokeWidth={1.25} className="shrink-0 text-brand-ivory/20" />
            <p className="font-heading text-lg italic text-brand-ivory/50">Not yet tracked</p>
          </div>
          <p className="mt-3 text-xs text-brand-ivory/45">
            Our founding goal: 100 local work and training opportunities created by Complete
            Exterior Care.
          </p>
        </div>

        <Link
          href="/foundation/one-kind-day"
          className="surface-card flex flex-col justify-between rounded-sm border border-brand-gold/25 bg-brand-green-light/40 px-6 py-6 hover:border-brand-gold/50"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.18em] text-brand-ivory/55">
                One Kind Day
              </span>
              <Leaf size={18} strokeWidth={1.5} className="text-brand-gold-soft" />
            </div>
            <p className="mt-5 text-sm text-brand-ivory/70">
              Our weekly promise — a full day of free help for someone in our community who
              needs it, whatever that means for them.
            </p>
          </div>
          <p className="mt-4 text-xs uppercase tracking-wider text-brand-gold-soft">
            View the timeline &rarr;
          </p>
        </Link>
      </div>
    </div>
  );
}
