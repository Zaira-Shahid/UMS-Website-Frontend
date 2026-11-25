import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DisciplineSketch } from "@/components/home/DisciplineSketch";
import { Reveal } from "@/components/ui/Reveal";
import { quoteHref } from "@/content/navigation";
import { disciplineColor } from "@/lib/discipline";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

/** One discipline on the overview page: full-width band, alternating sides, its own colour and drawing. */
export function ServiceBand({ service, index }: { service: Service; index: number }) {
  const color = disciplineColor[service.slug];
  const flip = index % 2 === 1;
  return (
    <section aria-labelledby={`${service.slug}-title`} className={cn("py-16 md:py-24", index % 2 === 0 ? "bg-white" : "bg-offwhite")}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className={cn("min-w-0 lg:col-span-7", flip && "lg:order-2")}>
          <p className="mono-label flex items-center gap-3 text-muted">
            <span aria-hidden className="h-px w-8" style={{ background: color }} />
            <span className="tabular-nums text-navy">{String(index + 1).padStart(2, "0")}</span>
            {service.shortName}
          </p>
          <h2 id={`${service.slug}-title`} className="mt-4 text-navy">
            {service.name}
          </h2>
          <p className="mt-4 max-w-xl font-heading text-xl font-semibold leading-snug text-navy/90">{service.tagline}</p>
          <p className="mt-4 max-w-xl text-muted">{service.summary}</p>
          <p className="mt-5 max-w-xl text-sm text-ink">{service.systems.map((s) => s.name).join(" · ")}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              href={`/services/${service.slug}`}
              className="group inline-flex items-center gap-1.5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-navy hover:text-cyan"
            >
              View service
              <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={quoteHref({ service: service.slug })}
              className="font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#00608c] hover:text-navy"
            >
              Request a quote
            </Link>
          </div>
        </Reveal>
        <div aria-hidden className={cn("lg:col-span-5", flip && "lg:order-1")} style={{ color }}>
          <DisciplineSketch slug={service.slug} className="mx-auto w-full max-w-[24rem]" />
        </div>
      </div>
    </section>
  );
}
