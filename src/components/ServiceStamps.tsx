import Image from "next/image";
import { SERVICE_CATEGORIES, type ServiceCategory } from "@/lib/jobs";
import { stampIconSrc } from "@/lib/stamps";

export default function ServiceStamps({
  collected,
}: {
  collected: ServiceCategory[];
}) {
  const collectedSet = new Set(collected);

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {SERVICE_CATEGORIES.map((category) => {
        const isCollected = collectedSet.has(category);
        return (
          <div key={category} className="flex flex-col items-center gap-2.5 text-center">
            <div
              className={`relative h-20 w-20 overflow-hidden rounded-full ring-1 transition-all duration-200 ease-out ${
                isCollected ? "ring-brand-gold/50" : "opacity-30 grayscale ring-brand-ivory/20"
              }`}
            >
              <Image
                src={stampIconSrc(category)}
                alt={category}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <p
              className={`font-body text-[11px] uppercase leading-tight tracking-wider ${
                isCollected ? "text-brand-gold-soft" : "text-brand-ivory/35"
              }`}
            >
              {category}
            </p>
          </div>
        );
      })}
    </div>
  );
}
