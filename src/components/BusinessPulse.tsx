import Sparkline from "@/components/Sparkline";
import type { PulseMetric } from "@/lib/business-pulse";

function ChangeBadge({ changePercent }: { changePercent: number | null }) {
  if (changePercent === null) {
    return <span className="text-xs text-brand-ivory/35">New</span>;
  }
  const positive = changePercent >= 0;
  return (
    <span
      className={`text-xs ${positive ? "text-brand-gold-soft" : "text-brand-ivory/50"}`}
    >
      {positive ? "+" : ""}
      {changePercent}% vs last month
    </span>
  );
}

export default function BusinessPulse({ metrics }: { metrics: PulseMetric[] }) {
  return (
    <div className="rounded-sm border border-brand-gold/25 bg-brand-green-light/40 px-6 py-6">
      <p className="mb-5 text-[11px] uppercase tracking-[0.18em] text-brand-ivory/55">
        Business pulse
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="flex flex-col gap-2">
            <p className="text-[11px] uppercase tracking-wider text-brand-ivory/45">
              {m.label}
            </p>
            {m.value === "Not yet tracked" ? (
              <p className="font-heading text-lg italic text-brand-ivory/60">
                Not yet tracked
              </p>
            ) : (
              <>
                <p className="font-heading text-2xl text-brand-ivory">{m.value}</p>
                <div className="flex items-center justify-between gap-2">
                  <ChangeBadge changePercent={m.changePercent} />
                  {m.sparkline && (
                    <div className="text-brand-gold-soft/70">
                      <Sparkline data={m.sparkline} width={64} height={20} />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
