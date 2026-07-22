import type { User } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";
import { signOut } from "@/app/actions/auth";
import { getDisplayName, getDisplayRole } from "@/lib/team";
import { getGreeting } from "@/lib/greeting";

export default function TopBar({ user }: { user: User | null }) {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const name = getDisplayName(user);
  const role = getDisplayRole(user);
  const initial = name.charAt(0).toUpperCase();

  return (
    <header className="flex items-center justify-between border-b border-brand-gold/20 bg-brand-green px-8 py-5">
      <div>
        <h1 className="font-heading text-2xl tracking-wide text-brand-ivory">
          {getGreeting()}, {name}.
        </h1>
        <p className="mt-0.5 text-xs uppercase tracking-[0.15em] text-brand-ivory/50">
          {today}
        </p>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-gold/40 font-heading text-sm text-brand-gold-soft">
              {initial}
            </div>
            <div className="leading-tight">
              <p className="text-sm text-brand-ivory/90">{name}</p>
              {role && (
                <p className="text-[11px] uppercase tracking-wider text-brand-ivory/45">
                  {role}
                </p>
              )}
            </div>
          </div>

          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-sm border border-brand-gold/25 px-3 py-1.5 text-xs uppercase tracking-wider text-brand-ivory/60 transition-colors hover:border-brand-gold/50 hover:text-brand-gold-soft"
            >
              <LogOut size={13} strokeWidth={1.5} />
              Sign out
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
