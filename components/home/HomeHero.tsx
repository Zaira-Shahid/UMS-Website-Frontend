"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { quoteHref } from "@/content/navigation";
import type { ServiceSlug } from "@/types";
import { BuildingCutaway, type SystemKey } from "./BuildingCutaway";

/** Services shown in the strip, with the system each one lights up in the drawing. */
const STRIP: { slug: ServiceSlug; system: SystemKey; label: string; dot: string }[] = [
  { slug: "hvac", system: "hvac", label: "HVAC", dot: "bg-hvac" },
  { slug: "fire-fighting", system: "fire", label: "Fire Fighting", dot: "bg-fire" },
  { slug: "electrical-elv", system: "elec", label: "Electrical & ELV", dot: "bg-electric" },
  { slug: "plumbing", system: "plumb", label: "Plumbing", dot: "bg-plumbing" },
];

/**
 * Homepage hero: the building cutaway is the focal point. Hovering or focusing a service in the strip
 * (or hovering a system in the drawing) dims the other systems so each discipline can be read on its own.
 * The strip items are ordinary links to the real service pages.
 */
export function HomeHero() {
  const [active, setActive] = useState<SystemKey | null>(null);

  return (
    <section
      aria-label="UMS — MEP contracting"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-navy-950 text-white"
    >
      {/* Depth: a soft cyan pool behind the building and a faint blueprint grid fading out to the edges */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 72% 52%, rgb(23 63 96 / 0.85), transparent 70%), radial-gradient(40% 40% at 8% 100%, rgb(0 140 203 / 0.12), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="bg-blueprint-dark absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(80%_70%_at_65%_50%,black,transparent)]"
      />

      {/* Below xl the building sits under the headline at full width; from xl it fills the right of the screen
          and bleeds slightly past the edge. */}
      <div className="relative flex flex-1 flex-col xl:flex-row xl:items-center">
        <div className="hero-rise relative z-10 mx-auto w-full max-w-7xl px-5 pb-2 pt-28 sm:px-8 xl:pb-0 xl:pt-20">
          <div className="max-w-[30rem] md:max-w-[34rem] xl:max-w-[29rem]">
            <p className="mono-label flex items-center gap-3 text-cyan-300">
              <span aria-hidden className="h-px w-8 bg-cyan-300" />
              Integrated MEP
            </p>
            <h1 className="mt-5 font-heading text-[clamp(2.6rem,1.6rem+4vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.01em] text-white">
              MEP Contracting for Complex Buildings
            </h1>
            <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-white/75">
              HVAC, fire protection, electrical and plumbing, planned and coordinated as one set of systems inside the
              building.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={quoteHref()} variant="accent" size="lg" arrow>
                Request a Quote
              </Button>
              <Button href="/services" variant="outline-light" size="lg">
                Explore Services
              </Button>
            </div>
          </div>
        </div>

        <div className="hero-rise-late relative overflow-hidden xl:absolute xl:-bottom-8 xl:right-[-4%] xl:top-8 xl:w-[68%] xl:overflow-visible">
          <BuildingCutaway
            active={active}
            onHover={setActive}
            className="cutaway mx-auto h-auto w-full max-w-[860px] max-md:-ml-[15%] max-md:w-[130%] max-md:max-w-none xl:h-full xl:max-w-none"
          />
        </div>
      </div>

      <nav aria-label="Services" className="relative border-t border-white/15 bg-navy-950/75 backdrop-blur-md">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 sm:px-8 xl:grid-cols-5">
          {STRIP.map((s, i) => {
            return (
              <li key={s.slug} className="border-white/10 [&:nth-child(odd)]:border-r xl:border-r">
                <Link
                  href={`/services/${s.slug}`}
                  onMouseEnter={() => setActive(s.system)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(s.system)}
                  onBlur={() => setActive(null)}
                  className="group flex h-full flex-col gap-1.5 px-5 py-4 transition-colors hover:bg-white/5 focus-visible:bg-white/5 sm:px-6"
                >
                  <span className="mono-label flex items-center gap-2 text-white/55">
                    <span aria-hidden className={`size-2 rounded-full ${s.dot}`} />0{i + 1}
                  </span>
                  <span className="flex items-center justify-between gap-2 font-heading text-base font-semibold uppercase tracking-[0.06em] sm:text-lg">
                    {s.label}
                    <ArrowRight
                      aria-hidden
                      className="size-4 shrink-0 text-cyan-300 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
          <li className="col-span-2 border-t border-white/10 xl:col-span-1 xl:border-t-0">
            <Link
              href="/services"
              className="group flex h-full items-center justify-between gap-2 px-5 py-4 font-heading text-base font-semibold uppercase tracking-[0.06em] text-cyan-300 transition-colors hover:bg-white/5 focus-visible:bg-white/5 sm:px-6 sm:py-5 sm:text-lg"
            >
              All services
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
