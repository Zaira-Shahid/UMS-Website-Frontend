import { DisciplineSketch } from "@/components/home/DisciplineSketch";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { quoteHref } from "@/content/navigation";
import { accents } from "@/lib/accent";
import { disciplineColor } from "@/lib/discipline";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

/**
 * Light hero for a service page: strong type on the left, the discipline's own line drawing on the right.
 * Fire Fighting keeps the fire accent; every other discipline uses its own colour on the drawing.
 */
export function ServiceHero({ service }: { service: Service }) {
  const a = accents[service.accent];
  const color = disciplineColor[service.slug];
  return (
    <section aria-labelledby="service-title" className="relative isolate overflow-hidden bg-offwhite pb-16 pt-[calc(var(--header-h)+2.5rem)] lg:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.name }]} />

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className={cn("flex items-center gap-3 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.14em]", a.textOnLight)}>
              <span aria-hidden className="h-px w-8" style={{ background: color }} />
              Service
            </p>
            <h1 id="service-title" className="mt-5 text-[clamp(2.5rem,1.6rem+4vw,5rem)] text-navy">
              {service.name}
            </h1>
            <p className="mt-5 max-w-xl font-heading text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] font-semibold leading-snug text-navy/90">
              {service.tagline}
            </p>
            <p className="mt-5 max-w-xl text-muted">{service.summary}</p>

            <p className="mt-6 max-w-xl text-sm text-ink">
              {service.systems.slice(0, 5).map((s) => s.name).join(" · ")}
              {service.systems.length > 5 ? ` · +${service.systems.length - 5} more` : ""}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={quoteHref({ service: service.slug })} variant={a.buttonOnLight} size="lg" arrow className="h-auto min-h-14 w-full whitespace-normal py-3 text-center sm:w-auto">
                Request a Quote for {service.shortName}
              </Button>
              <Button href="/services" variant="outline" size="lg" className="h-auto min-h-14 w-full whitespace-normal py-3 text-center sm:w-auto">
                All services
              </Button>
            </div>
          </div>

          <div aria-hidden className="lg:col-span-5">
            <div className="mx-auto max-w-[30rem]" style={{ color }}>
              <DisciplineSketch slug={service.slug} className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
