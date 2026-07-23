"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/nav";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-brand-gold/20 bg-gradient-to-b from-brand-green to-brand-green-dark">
      <div className="flex flex-col items-center gap-3 border-b border-brand-gold/20 px-6 py-8">
        <div className="relative h-16 w-16 overflow-hidden rounded-full ring-1 ring-brand-gold/40">
          <Image
            src="/brand/cec-crest.png"
            alt="Complete Exterior Care crest"
            fill
            sizes="64px"
            className="object-cover"
            priority
          />
        </div>
        <div className="text-center">
          <p className="font-heading text-xl leading-tight tracking-wide text-brand-ivory">
            CEC Workshop
          </p>
          <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-brand-gold-soft/80">
            Complete Exterior Care
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.enabled &&
              (item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href));

            if (!item.enabled) {
              return (
                <li key={item.label}>
                  <div
                    className="flex cursor-not-allowed items-center justify-between rounded-sm px-3 py-2.5 text-brand-ivory/35"
                    title={item.room ? `${item.room} — coming soon` : "Coming soon"}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={17} strokeWidth={1.5} />
                      <span className="flex flex-col">
                        <span className="text-[13.5px] tracking-wide">
                          {item.label}
                        </span>
                        {item.room && (
                          <span className="text-[10px] italic text-brand-ivory/25">
                            {item.room}
                          </span>
                        )}
                      </span>
                    </span>
                    <span className="rounded-full border border-brand-ivory/20 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-brand-ivory/40">
                      Soon
                    </span>
                  </div>
                </li>
              );
            }

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  title={item.room}
                  className={`press flex items-center gap-3 rounded-sm px-3 py-2.5 transition-colors duration-200 ease-out ${
                    isActive
                      ? "bg-brand-gold/10 text-brand-gold-soft"
                      : "text-brand-ivory/85 hover:bg-brand-gold/5 hover:text-brand-gold-soft"
                  }`}
                >
                  <Icon size={17} strokeWidth={1.5} />
                  <span className="flex flex-col">
                    <span className="text-[13.5px] tracking-wide">
                      {item.label}
                    </span>
                    {item.room && (
                      <span className="text-[10px] italic text-brand-gold-soft/50">
                        {item.room}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-brand-gold/20 px-6 py-5">
        <p className="text-[11px] uppercase tracking-[0.2em] text-brand-ivory/40">
          Care &middot; Clean &middot; Protect
        </p>
      </div>
    </aside>
  );
}
