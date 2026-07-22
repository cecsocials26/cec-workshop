import type { Customer } from "@/lib/customers";

export type Property = {
  id: string;
  customer_id: string;
  address: string;
  construction: string | null;
  health_score: number | null;
  access_notes: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  customer?: Customer;
};

export function propertyLabel(property: Pick<Property, "address">): string {
  return property.address;
}

export function healthScoreLabel(score: number | null): string {
  if (score == null) return "Not yet assessed";
  return `${score} / 5`;
}
