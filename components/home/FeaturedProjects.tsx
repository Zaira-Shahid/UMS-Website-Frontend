"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Button } from "@/components/ui/Button";
import { CornerBrackets } from "@/components/ui/CornerBrackets";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { serviceBySlug } from "@/content/services";

/**
 * Horizontal scroll-snap carousel of the six case studies. Only the project
 * NAMES are confirmed — sector, location and UMS package render as pending
 * placeholders until the client supplies them (TODO: client to confirm).
 */
export function FeaturedProjects() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = (card?.clientWidth ?? 360) + 24;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      aria-labelledby="projects-title"
      className="relative isolate overflow-hidden bg-navy-900 py-20 text-white md:py-28"
    >
      <BlueprintGrid variant="dark" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div id="projects-title">
            <SectionHeading
              tone="light"
              index="02"
              label="Projects"
              title="Buildings that depend on their services"
              description="Hospitals, malls, headquarters and developments. Project details are shown as they are confirmed with UMS."
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              aria-label="Previous projects"
              className="flex size-12 items-center justify-center rounded-ums border border-white/30 transition-colors hover:border-white hover:bg-white hover:text-navy disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              aria-label="Next projects"
              className="flex size-12 items-center justify-center rounded-ums border border-white/30 transition-colors hover:border-white hover:bg-white hover:text-navy disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <Reveal className="relative mt-12">
        <ul
          ref={trackRef}
          onScroll={update}
          tabIndex={0}
          aria-label="Featured projects, scroll horizontally"
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-6 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden"
          style={{
            paddingLeft: "max(1.25rem, calc((100vw - 80rem) / 2 + 2rem))",
            paddingRight: "max(1.25rem, calc((100vw - 80rem) / 2 + 2rem))",
            scrollPaddingLeft: "max(1.25rem, calc((100vw - 80rem) / 2 + 2rem))",
          }}
        >
          {projects.map((p, i) => {
            const sector = industries.find((x) => x.slug === p.sector);
            return (
              <li key={p.slug} className="w-[82vw] shrink-0 snap-start sm:w-[24rem] lg:w-[26rem]">
                <Link href={`/projects/${p.slug}`} className="group block">
                  <CornerBrackets tone="light">
                    <div className="relative aspect-[4/5] overflow-hidden bg-navy">
                      {/* TODO: replace with approved UMS photography */}
                      <SiteImage
                        asset={p.image}
                        fill
                        sizes="(min-width:1024px) 26rem, (min-width:640px) 24rem, 82vw"
                        className="object-cover transition duration-700 ease-out group-hover:scale-105"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-transparent to-navy-900/30 transition-opacity duration-500 group-hover:opacity-70"
                      />
                      <span className="absolute left-4 top-4 font-heading text-sm font-semibold tabular-nums tracking-[0.14em] text-white/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                        <span className="font-heading text-2xl font-bold uppercase leading-[1.05] tracking-[0.01em]">
                          {p.name}
                        </span>
                        <ArrowRight
                          aria-hidden
                          className="mb-1 size-5 shrink-0 text-cyan-300 transition-transform duration-300 group-hover:translate-x-1.5"
                        />
                      </span>
                    </div>
                  </CornerBrackets>

                  <div className="mt-5 space-y-3 text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      {sector ? (
                        <Badge tone="cyan">{sector.name}</Badge>
                      ) : (
                        // TODO: client to confirm — sector
                        <Badge tone="pending">Sector · to be confirmed</Badge>
                      )}
                      {p.location ? (
                        <span className="text-white/75">{p.location}</span>
                      ) : (
                        // TODO: client to confirm — location
                        <Badge tone="pending">Location · to be confirmed</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {p.services.length > 0 ? (
                        p.services.map((slug) => (
                          <span
                            key={slug}
                            className="rounded-full border border-white/25 px-3 py-1 text-xs uppercase tracking-[0.08em] text-white/85"
                          >
                            {serviceBySlug(slug)?.shortName}
                          </span>
                        ))
                      ) : (
                        // TODO: client to confirm — UMS package
                        <Badge tone="pending">UMS package · to be confirmed</Badge>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mx-auto mt-4 flex max-w-7xl items-center gap-6 px-5 sm:px-8">
          <div
            role="progressbar"
            aria-label="Scroll position"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            className="h-px flex-1 bg-white/20"
          >
            <div
              className="h-full origin-left bg-cyan-300 transition-transform duration-200"
              style={{ transform: `scaleX(${Math.max(0.12, progress)})` }}
            />
          </div>
          <Button href="/projects" variant="outline-light" size="sm" arrow>
            All projects
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
