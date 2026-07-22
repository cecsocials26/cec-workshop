import type { ServiceCategory } from "@/lib/jobs";

const STAMP_ICON_SLUGS: Record<ServiceCategory, string> = {
  "Roof Care": "roof-care",
  "Gutter Care": "gutter-care",
  "Render & Soft Washing": "render-soft-washing",
  "Solar Panel Cleaning": "solar-panel-cleaning",
  "Driveways & Patios": "driveways-patios",
  "Window Cleaning": "window-cleaning",
  "Garden Maintenance": "garden-maintenance",
  "Commercial Exterior Care": "commercial-exterior-care",
};

export function stampIconSrc(category: ServiceCategory): string {
  return `/brand/stamps/${STAMP_ICON_SLUGS[category]}.png`;
}
