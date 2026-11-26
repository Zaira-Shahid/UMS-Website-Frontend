"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { projectSectors } from "@/content/projects";
import { cn } from "@/lib/utils";
import type { ServiceSlug } from "@/types";
import { MoreProjects } from "./MoreProjects";
import { ProjectCard } from "./ProjectCard";

export interface BrowserProject {
  slug: string;
  name: string;
  city?: string;
  /** The ?sector= value of the project's sector, only when its sector is set. */
  sectorParam?: string;
  description?: string;
  services: ServiceSlug[];
  image?: { src: string; width: number; height: number };
  /** Badge on the photo: "Illustrative" for samples, "Illustrative imagery" for the design-pack pictures. */
  imageLabel?: string;
  illustrative: boolean;
}

/**
 * Filter pills and the project sections (mockup 19). "All Projects" lists each sector as its own section; a pill filters
 * to one sector through ?sector=… so the back button works. Projects without a confirmed sector are listed under
 * "More Projects" on the All view only. `ProjectsView` is the plain view; `ProjectsBrowser` reads the URL.
 */
export function ProjectsView({ projects, sector }: { projects: BrowserProject[]; sector: string }) {
  const sectors = projectSectors.filter((s) => projects.some((p) => p.sectorParam === s.param));
  const active = sectors.some((s) => s.param === sector) ? sector : "all";
  const shownSectors = active === "all" ? sectors : sectors.filter((s) => s.param === active);
  const more = projects.filter((p) => !p.sectorParam);
  const hasSamples = projects.some((p) => p.illustrative);

  const pill = "inline-flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-lg border-2 px-5 font-heading text-[0.9375rem] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue lg:min-w-[10rem]";

  return (
    <>
      <nav aria-label="Filter projects by sector" className="-mx-[var(--wrap-pad)] overflow-x-auto px-[var(--wrap-pad)] pb-2 [scrollbar-width:none] lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden">
        <ul className="flex gap-3 lg:gap-4">
          {[{ param: "all", label: "All Projects" }, ...sectors].map((s) => {
            const on = s.param === active;
            return (
              <li key={s.param} className="shrink-0">
                <Link
                  href={s.param === "all" ? "/projects" : `/projects?sector=${s.param}`}
                  scroll={false}
                  aria-current={on ? "true" : undefined}
                  className={cn(pill, on ? "border-navy bg-navy text-white" : "border-navy/70 bg-white text-navy hover:border-navy hover:bg-sky-50")}
                >
                  {s.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {hasSamples && <p className="mt-2 text-sm italic text-muted">Illustrative projects</p>}

      {shownSectors.map((s) => (
        <section key={s.param} aria-labelledby={`sector-${s.param}`} className="mt-8 first:mt-6 md:mt-10">
          <h2 id={`sector-${s.param}`} className="text-[clamp(1.5rem,1.1rem+1.3vw,2.125rem)] font-extrabold text-navy">
            {s.heading}
          </h2>
          <span aria-hidden className="accent-bar mt-2 block" />
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects
              .filter((p) => p.sectorParam === s.param)
              .map((p) => (
                <li key={p.slug} className="relative">
                  <ProjectCard p={p} />
                </li>
              ))}
          </ul>
        </section>
      ))}

      {active === "all" && more.length > 0 && <MoreProjects projects={more} />}
    </>
  );
}

export function ProjectsBrowser({ projects }: { projects: BrowserProject[] }) {
  const sector = useSearchParams().get("sector") ?? "all";
  return <ProjectsView projects={projects} sector={sector} />;
}
