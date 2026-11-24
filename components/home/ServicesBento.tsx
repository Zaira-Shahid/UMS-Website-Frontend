import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceVisual } from "@/components/services/ServiceVisual";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";
import type { Service, ServiceSlug } from "@/types";

/** Grid placement for the asymmetric bento (lg+). Mobile is one column. */
const layout: Record<ServiceSlug, { span: string; bullets: number; tall?: boolean }> = {
  "integrated-mep": { span: "md:col-span-2 lg:col-span-7 lg:row-span-2", bullets: 5, tall: true },
  hvac: { span: "lg:col-span-5", bullets: 3 },
  "fire-fighting": { span: "lg:col-span-5", bullets: 3 },
  plumbing: { span: "lg:col-span-4", bullets: 3 },
  "electrical-elv": { span: "lg:col-span-4", bullets: 3 },
  "pools-fountains": { span: "md:col-span-2 lg:col-span-4", bullets: 3 },
};

function Card({ service, index }: { service: Service; index: number }) {
  const cfg = layout[service.slug];
  const fire = service.accent === "fire";
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full min-h-[18rem] flex-col justify-end overflow-hidden bg-navy-900 text-white"
    >
      {/* TODO: replace with approved UMS photography */}
      <ServiceVisual
        service={service}
        sizes={cfg.tall ? "(min-width:1024px) 58vw, 100vw" : "(min-width:1024px) 33vw, 100vw"}
        className="opacity-60 transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-40"
      />
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/55 to-navy-900/10",
          fire && "from-[#2a0f12]",
        )}
      />
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100",
          fire ? "bg-fire" : "bg-cyan-300",
        )}
      />

      <span className="absolute left-5 top-5 font-heading text-sm font-semibold tabular-nums tracking-[0.14em] text-white/70 sm:left-7 sm:top-6">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        aria-hidden
        className="absolute right-5 top-5 flex size-10 items-center justify-center border border-white/30 text-white transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-navy sm:right-7 sm:top-5"
      >
        <ArrowUpRight className="size-4" />
      </span>

      {/* pt-16 keeps copy clear of the index number and arrow in the top corners */}
      <span className={cn("relative px-5 pb-5 pt-16 sm:px-7 sm:pb-7", cfg.tall && "lg:p-10 lg:pt-16")}>
        <span
          className={cn(
            "block pr-12 font-heading font-bold uppercase leading-[1.02] tracking-[0.01em]",
            cfg.tall ? "text-[clamp(2rem,1.4rem+2.2vw,3.5rem)]" : "text-[clamp(1.5rem,1.2rem+0.9vw,2rem)]",
          )}
        >
          {service.name}
        </span>
        <span
          className={cn(
            "mt-3 block max-w-md text-[0.9375rem] text-white/80",
            !cfg.tall && "line-clamp-4",
          )}
        >
          {service.summary}
        </span>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-white/75">
          {service.systems.slice(0, cfg.bullets + (cfg.tall ? 1 : 0)).map((s) => (
            <li key={s.name} className="flex items-center gap-2">
              <span aria-hidden className={cn("size-1.5 rounded-full", fire ? "bg-fire" : "bg-cyan-300")} />
              {s.name}
            </li>
          ))}
        </ul>
        <span className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-cyan-300 group-hover:text-white">
          Explore {service.shortName}
        </span>
      </span>
    </Link>
  );
}

export function ServicesBento() {
  return (
    <section aria-labelledby="services-title" className="bg-white pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div id="services-title">
            <SectionHeading
              index="01"
              label="Services"
              title="Six disciplines, one coordinated delivery"
              description="From a single discipline to a fully integrated MEP package — each service is delivered with the others in mind."
            />
          </div>
          <Button href="/services" variant="outline" arrow>
            All services
          </Button>
        </div>

        <Reveal stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[minmax(17rem,auto)]">
          {services.map((s, i) => (
            <RevealItem key={s.slug} className={cn(layout[s.slug].span, "[&>*]:h-full")}>
              <Card service={s} index={i} />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
