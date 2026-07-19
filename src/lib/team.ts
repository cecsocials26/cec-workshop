import type { User } from "@supabase/supabase-js";

type Meta = { full_name?: string; role?: string };

export function getDisplayName(user: User | null): string {
  if (!user) return "there";
  const meta = user.user_metadata as Meta | undefined;
  if (meta?.full_name) return meta.full_name.split(" ")[0];
  return user.email?.split("@")[0] ?? "there";
}

export function getDisplayRole(user: User | null): string | null {
  const meta = user?.user_metadata as Meta | undefined;
  return meta?.role ?? null;
}
