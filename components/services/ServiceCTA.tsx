import { Button } from "@/components/ui/Button";
import { quoteHref } from "@/content/navigation";
import { accents } from "@/lib/accent";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

/** Service-specific enquiry band. Replaces the generic footer band on service pages. */
export function ServiceCTA({ service }: { service: Service }) {
  const a = accents[service.accent];
  const isIntegrated = service.slug === "integrated-mep";
  return (
    <section
      aria-labelledby="service-cta-title"
      className="relative isolate overflow-hidden bg-navy py-16 text-white md:py-20"
    >
      {service.accent === "fire" && (
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_100%,rgb(217_52_43/0.3),transparent_60%)]"
        />
      )}
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p
            className={cn(
              "flex items-center gap-3 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.14em]",
              a.textOnDark,
            )}
          >
            <span aria-hidden className={cn("h-px w-8", a.rule)} />
            {service.shortName}
          </p>
          <h2 id="service-cta-title" className="mt-5 text-white">
            Planning your {service.shortName} works?
          </h2>
          <p className="mt-4 text-white/75">
            Send the drawings, the brief or just the outline. We will tell you what we need to
            price {service.shortName} and what happens next.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            href={quoteHref({ service: service.slug })}
            variant={a.button}
            size="lg"
            arrow
            className="h-auto min-h-14 w-full whitespace-normal py-3 text-center sm:w-auto"
          >
            Request a Quote for {service.shortName}
          </Button>
          <Button
            href={isIntegrated ? "/services" : "/services/integrated-mep"}
            variant="outline-light"
            size="lg"
            className="h-auto min-h-14 w-full whitespace-normal py-3 text-center sm:w-auto"
          >
            {isIntegrated ? "All services" : "See Integrated MEP"}
          </Button>
        </div>
      </div>
    </section>
  );
}
