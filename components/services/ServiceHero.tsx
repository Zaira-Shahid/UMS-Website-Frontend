import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { quoteHref } from "@/content/navigation";
import { accents } from "@/lib/accent";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";
import { ServiceVisual } from "./ServiceVisual";

/** Dark hero for a service page. Fire Fighting carries the fire accent throughout. */
export function ServiceHero({ service }: { service: Service }) {
  const a = accents[service.accent];
  return (
    <section
      aria-labelledby="service-title"
      className="relative isolate overflow-hidden bg-navy-900 pb-16 pt-[calc(var(--header-h)+2.5rem)] text-white lg:pb-24"
    >
      <BlueprintGrid variant="dark" />
      {service.accent === "fire" && (
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_30%,rgb(217_52_43/0.22),transparent_55%)]"
        />
      )}

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Breadcrumbs
          tone="light"
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.name },
          ]}
        />

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p
              className={cn(
                "flex items-center gap-3 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.14em]",
                a.textOnDark,
              )}
            >
              <span aria-hidden className={cn("h-px w-8", a.rule)} />
              Service
            </p>
            <h1 id="service-title" className="mt-5 text-[clamp(2.5rem,1.6rem+4vw,5rem)] text-white">
              {service.name}
            </h1>
            <p className="mt-5 max-w-xl font-heading text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] font-semibold leading-snug text-white/90">
              {service.tagline}
            </p>
            <p className="mt-5 max-w-xl text-white/75">{service.summary}</p>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Systems covered">
              {service.systems.slice(0, 4).map((s) => (
                <li
                  key={s.name}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm",
                    service.accent === "fire"
                      ? "border-fire/60 text-[#ffb3ad]"
                      : "border-cyan-300/40 text-cyan-300",
                  )}
                >
                  {s.name}
                </li>
              ))}
              {service.systems.length > 4 && (
                <li className="rounded-full border border-white/20 px-3.5 py-1.5 text-sm text-white/60">
                  +{service.systems.length - 4} more
                </li>
              )}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                href={quoteHref({ service: service.slug })}
                variant={a.button}
                size="lg"
                magnetic
                arrow
                className="w-full sm:w-auto"
              >
                Request a Quote for {service.shortName}
              </Button>
              <Button href="/services" variant="outline-light" size="lg" className="w-full sm:w-auto">
                All services
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden bg-navy lg:aspect-[4/5]">
                <ServiceVisual
                  service={service}
                  priority
                  sizes="(min-width:1024px) 40vw, 100vw"
                />
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent",
                    service.accent === "fire" && "bg-fire/10 mix-blend-multiply",
                  )}
                />
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
