import {
  CloudRain,
  CloudDrizzle,
  Cloud,
  CloudFog,
  CloudSnow,
  CloudLightning,
  Sun,
  Wind,
} from "lucide-react";
import { getGreeting } from "@/lib/greeting";
import type { WeatherSnapshot, ServiceRecommendation } from "@/lib/weather";

function WeatherIcon({ code }: { code: number }) {
  const props = { size: 28, strokeWidth: 1.5, className: "text-brand-gold-soft" };
  if (code === 0) return <Sun {...props} />;
  if (code <= 3) return <Cloud {...props} />;
  if (code === 45 || code === 48) return <CloudFog {...props} />;
  if (code >= 51 && code <= 57) return <CloudDrizzle {...props} />;
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82))
    return <CloudRain {...props} />;
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86))
    return <CloudSnow {...props} />;
  if (code >= 95) return <CloudLightning {...props} />;
  return <Cloud {...props} />;
}

export default function WeatherCard({
  weather,
  recommendations,
}: {
  weather: WeatherSnapshot | null;
  recommendations: ServiceRecommendation[];
}) {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="surface-card flex w-full flex-col gap-4 rounded-sm border border-brand-gold/25 bg-brand-green-light/40 px-6 py-5 sm:max-w-sm">
      <div>
        <p className="font-heading text-lg text-brand-ivory">{getGreeting()}</p>
        <p className="text-xs uppercase tracking-wider text-brand-ivory/45">
          {today} &middot; Clacton-on-Sea
        </p>
      </div>

      {!weather ? (
        <p className="text-sm text-brand-ivory/40">Weather unavailable right now.</p>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <WeatherIcon code={weather.conditionCode} />
            <div>
              <p className="font-heading text-3xl text-brand-ivory">
                {weather.tempC}&deg;C
              </p>
              <p className="text-xs text-brand-ivory/50">{weather.conditionLabel}</p>
            </div>
          </div>

          <p className="text-xs text-brand-ivory/50">
            {weather.rainSoon
              ? `Rain likely around ${weather.rainSoon.at} (${weather.rainSoon.probability}%)`
              : "No rain expected in the next few hours."}
          </p>

          {weather.isWindy && (
            <p className="flex items-center gap-1.5 text-xs text-brand-gold-soft">
              <Wind size={13} strokeWidth={1.5} />
              Windy — {weather.windKph}km/h
            </p>
          )}

          <div className="flex flex-col gap-2 border-t border-brand-gold/15 pt-3">
            <p className="text-[11px] uppercase tracking-[0.15em] text-brand-ivory/45">
              Weather guidance
            </p>
            {recommendations.map((r) => (
              <div
                key={r.category}
                title={r.reason}
                className="flex items-center justify-between gap-2"
              >
                <span className="text-xs text-brand-ivory/70">{r.category}</span>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                    r.action === "proceed"
                      ? "border-brand-gold/40 text-brand-gold-soft"
                      : "border-brand-ivory/25 text-brand-ivory/45"
                  }`}
                >
                  {r.action === "proceed" ? "Proceed" : "Delay"}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
