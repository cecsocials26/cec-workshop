export type OneKindDayStatus = "planned" | "filmed" | "posted";

export type OneKindDay = {
  id: string;
  visit_date: string;
  person_or_household: string;
  area: string | null;
  task: string;
  team_members: string | null;
  media_links: string | null;
  status: OneKindDayStatus;
  story: string | null;
  created_at: string;
  updated_at: string;
};

export const ONE_KIND_DAY_STATUSES: { value: OneKindDayStatus; label: string }[] = [
  { value: "planned", label: "Planned" },
  { value: "filmed", label: "Filmed" },
  { value: "posted", label: "Posted" },
];

export function oneKindDayStatusLabel(status: OneKindDayStatus): string {
  return ONE_KIND_DAY_STATUSES.find((s) => s.value === status)?.label ?? status;
}

export function formatVisitDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function mediaLinkList(mediaLinks: string | null): string[] {
  if (!mediaLinks) return [];
  return mediaLinks
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}
