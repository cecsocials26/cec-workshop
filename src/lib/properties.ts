import type { Customer } from "@/lib/customers";

export type HealthState =
  | "excellent"
  | "good"
  | "monitor"
  | "attention_required"
  | "critical";

export const HEALTH_STATES: { value: HealthState; label: string; rank: number }[] = [
  { value: "excellent", label: "Excellent", rank: 0 },
  { value: "good", label: "Good", rank: 1 },
  { value: "monitor", label: "Monitor", rank: 2 },
  { value: "attention_required", label: "Attention Required", rank: 3 },
  { value: "critical", label: "Critical", rank: 4 },
];

export function healthStateLabel(state: HealthState | null): string {
  if (!state) return "Not yet assessed";
  return HEALTH_STATES.find((s) => s.value === state)?.label ?? state;
}

export type Property = {
  id: string;
  customer_id: string;
  address: string;
  construction: string | null;
  roof_condition: HealthState | null;
  gutters_condition: HealthState | null;
  render_condition: HealthState | null;
  solar_condition: HealthState | null;
  driveway_condition: HealthState | null;
  garden_condition: HealthState | null;
  drainage_condition: HealthState | null;
  salt_exposure: HealthState | null;
  weather_damage: HealthState | null;
  access_notes: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  customer?: Customer;
};

export function propertyLabel(property: Pick<Property, "address">): string {
  return property.address;
}

/** The 7 core contributing factors shown under the health dial. */
export const HEALTH_FACTORS: { key: keyof Property; label: string }[] = [
  { key: "roof_condition", label: "Roof" },
  { key: "gutters_condition", label: "Gutters" },
  { key: "render_condition", label: "Render" },
  { key: "solar_condition", label: "Solar" },
  { key: "driveway_condition", label: "Driveway" },
  { key: "garden_condition", label: "Garden" },
  { key: "drainage_condition", label: "Drainage" },
];

/** Two extra manually-set factors, distinct from the core 7. */
export const HEALTH_EXTRA_FACTORS: { key: keyof Property; label: string }[] = [
  { key: "salt_exposure", label: "Salt Exposure" },
  { key: "weather_damage", label: "Weather Damage" },
];

export const ALL_HEALTH_FACTORS = [...HEALTH_FACTORS, ...HEALTH_EXTRA_FACTORS];

/**
 * The dial shows the worst of whichever factors have actually been
 * set — factors that haven't been assessed yet are excluded rather
 * than counted as good or bad. Returns null (Not yet assessed) if
 * nothing has been set at all.
 */
export function computeOverallHealth(property: Property): HealthState | null {
  const setStates = ALL_HEALTH_FACTORS.map(
    (f) => property[f.key] as HealthState | null,
  ).filter((s): s is HealthState => s != null);

  if (setStates.length === 0) return null;

  return setStates.reduce((worst, s) => {
    const worstRank = HEALTH_STATES.find((h) => h.value === worst)!.rank;
    const sRank = HEALTH_STATES.find((h) => h.value === s)!.rank;
    return sRank > worstRank ? s : worst;
  });
}
