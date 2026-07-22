// Clacton-on-Sea, Essex — CEC's fixed base of operations.
const LATITUDE = 51.7909;
const LONGITUDE = 1.156;

export type WeatherSnapshot = {
  tempC: number;
  conditionCode: number;
  conditionLabel: string;
  isRainingNow: boolean;
  isStormy: boolean;
  rainSoon: { at: string; probability: number } | null;
};

export type ServiceRecommendation = {
  category: string;
  action: "proceed" | "delay";
  reason: string;
};

function describeWeatherCode(code: number): string {
  if (code === 0) return "Clear sky";
  if (code <= 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code >= 85 && code <= 86) return "Snow showers";
  if (code >= 95) return "Thunderstorm";
  return "Unsettled";
}

export async function getWeatherSnapshot(): Promise<WeatherSnapshot | null> {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${LATITUDE}&longitude=${LONGITUDE}` +
      `&current=temperature_2m,precipitation,weather_code` +
      `&hourly=precipitation_probability` +
      `&timezone=Europe%2FLondon&forecast_days=1`;

    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) return null;

    const data = await res.json();
    const currentCode: number = data.current.weather_code;
    const currentPrecip: number = data.current.precipitation;

    const hourlyTimes: string[] = data.hourly.time;
    const hourlyProbabilities: number[] = data.hourly.precipitation_probability;

    const now = new Date();
    let rainSoon: WeatherSnapshot["rainSoon"] = null;

    for (let i = 0; i < hourlyTimes.length; i++) {
      const t = new Date(hourlyTimes[i]);
      if (t < now) continue;
      const hoursAhead = (t.getTime() - now.getTime()) / 3_600_000;
      if (hoursAhead > 6) break;
      if (hourlyProbabilities[i] >= 50) {
        rainSoon = {
          at: t.toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit" }),
          probability: hourlyProbabilities[i],
        };
        break;
      }
    }

    return {
      tempC: Math.round(data.current.temperature_2m),
      conditionCode: currentCode,
      conditionLabel: describeWeatherCode(currentCode),
      isRainingNow: currentPrecip > 0,
      isStormy: currentCode >= 95,
      rainSoon,
    };
  } catch {
    return null;
  }
}

/**
 * Simple if/then guidance per core service category — not a model,
 * just fixed weather rules. Applied to CEC's service categories rather
 * than whatever free-text job_type happens to be on a job record.
 */
export function getServiceRecommendations(
  weather: WeatherSnapshot,
): ServiceRecommendation[] {
  const wetNow = weather.isRainingNow || weather.isStormy;
  const rainWithinHours = weather.rainSoon !== null;

  return [
    {
      category: "Roof & Soft Washing",
      action: wetNow || rainWithinHours ? "delay" : "proceed",
      reason: wetNow
        ? "Currently wet — treatments need a dry surface to bond."
        : rainWithinHours
          ? `Rain expected around ${weather.rainSoon?.at} — won't have time to cure.`
          : "Dry conditions expected — safe to treat.",
    },
    {
      category: "Gutter Clearing",
      action: weather.isStormy ? "delay" : "proceed",
      reason: weather.isStormy
        ? "Thunderstorm risk — not safe for ladder work."
        : "Light rain doesn't stop gutter clearing.",
    },
    {
      category: "Window Cleaning",
      action: wetNow ? "delay" : "proceed",
      reason: wetNow
        ? "Raining now — streaks and no visible result."
        : "Dry right now — good to go.",
    },
    {
      category: "Patio & Driveway",
      action: wetNow || rainWithinHours ? "delay" : "proceed",
      reason:
        wetNow || rainWithinHours
          ? "Wet or imminent rain reduces cleaning effectiveness."
          : "Dry conditions — proceed as planned.",
    },
    {
      category: "Solar Panel Cleaning",
      action: wetNow ? "delay" : "proceed",
      reason: wetNow
        ? "Wet panels/roof access isn't safe in current conditions."
        : "Dry and safe for roof access.",
    },
  ];
}
