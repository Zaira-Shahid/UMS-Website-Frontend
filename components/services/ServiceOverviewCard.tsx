import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { accents } from "@/lib/accent";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";
import { ServiceVisual } from "./ServiceVisual";

/**
 * Overview card: image, name, one-line value, top three systems, Explore link.
 * The title link is stretched over the whole card, so the card is one tab stop.
 */
export function ServiceOverviewCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const a = accents[service.accent];
  const fire = service.accent === "fire";
  return (
    <article className="group relative">
        <div className="relative aspect-[4/3] overflow-hidden bg-navy-900">
          <ServiceVisual
            service={service}
            sizes="(min-width:1024px) 40vw, (min-width:640px) 50vw, 100vw"
            className="transition duration-700 ease-out group-hover:scale-105"
          />
          <span
            aria-hidden
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent",
              fire && "bg-fire/10 mix-blend-multiply",
            )}
          />
          <span
            aria-hidden
            className={cn(
              "absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100",
              a.bg,
            )}
          />
          <span className="absolute left-5 top-5 font-heading text-sm font-semibold tabular-nums tracking-[0.14em] text-white/80">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

      <div className="mt-6">
        <h2 className="text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] uppercase leading-[1.02]">
          {service.name}
        </h2>
        <p className="mt-3 font-heading text-lg font-semibold text-ink/80">{service.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Key ${service.shortName} systems`}>
          {service.systems.slice(0, 3).map((s) => (
            <li
              key={s.name}
              className={cn(
                "rounded-full border px-3 py-1 text-sm",
                fire ? "border-fire/30 text-[#b3271f]" : "border-line text-ink",
              )}
            >
              {s.name}
            </li>
          ))}
          {service.systems.length > 3 && (
            <li className="px-1 py-1 text-sm text-muted">+{service.systems.length - 3} more</li>
          )}
        </ul>
        <Link
          href={`/services/${service.slug}`}
          className={cn(
            "mt-5 inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-navy transition-colors after:absolute after:inset-0",
            fire ? "group-hover:text-fire" : "group-hover:text-cyan",
          )}
        >
          Explore {service.shortName}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
