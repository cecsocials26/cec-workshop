import {
  ALL_HEALTH_FACTORS,
  HEALTH_STATES,
  computeOverallHealth,
  healthStateLabel,
  type Property,
} from "@/lib/properties";

const CENTER = 100;
const RADIUS = 78;
const STROKE = 16;
const GAP_DEG = 2.5;

function polarToCartesian(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER + RADIUS * Math.cos(rad), y: CENTER + RADIUS * Math.sin(rad) };
}

function arcPath(startAngle: number, endAngle: number) {
  const start = polarToCartesian(startAngle);
  const end = polarToCartesian(endAngle);
  return `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 0 1 ${end.x} ${end.y}`;
}

// Sweeps the top semicircle: 180deg (left) -> 360deg (right).
const SEGMENT_SPAN = 180 / HEALTH_STATES.length;

export default function PropertyHealthDial({ property }: { property: Property }) {
  const overall = computeOverallHealth(property);
  const overallRank = overall
    ? HEALTH_STATES.find((s) => s.value === overall)!.rank
    : null;

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">
      <div className="relative shrink-0">
        <svg width={200} height={116} viewBox="0 0 200 110" className="overflow-visible">
          {HEALTH_STATES.map((state, i) => {
            const start = 180 + i * SEGMENT_SPAN + GAP_DEG / 2;
            const end = 180 + (i + 1) * SEGMENT_SPAN - GAP_DEG / 2;
            const isCurrent = overallRank === state.rank;
            return (
              <path
                key={state.value}
                d={arcPath(start, end)}
                fill="none"
                stroke={isCurrent ? "var(--color-brand-gold)" : "currentColor"}
                strokeOpacity={isCurrent ? 1 : 0.15}
                strokeWidth={STROKE}
                strokeLinecap="round"
                className="text-brand-ivory transition-all duration-500 ease-out"
              />
            );
          })}
        </svg>
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center">
          <p className="font-heading text-xl text-brand-ivory">
            {healthStateLabel(overall)}
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-brand-ivory/40">
            Property Health
          </p>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
        {ALL_HEALTH_FACTORS.map((factor) => {
          const state = property[factor.key] as
            | Property["roof_condition"]
            | undefined;
          return (
            <div key={factor.key} className="flex items-center justify-between gap-2">
              <span className="text-xs text-brand-ivory/60">{factor.label}</span>
              <span
                className={`text-[10.5px] uppercase tracking-wider ${
                  state ? "text-brand-gold-soft" : "text-brand-ivory/30"
                }`}
              >
                {healthStateLabel(state ?? null)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
