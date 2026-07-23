export type Collection = {
  id: string;
  name: string;
  tagline: string | null;
  description: string | null;
  services: string[];
  perfect_for: string | null;
  typical_frequency: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};
