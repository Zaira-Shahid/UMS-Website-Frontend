"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { projectSectors } from "@/content/projects";
import { MoreProjects } from "./MoreProjects";
import { ProjectCard } from "./ProjectCard";
import { SectorPills } from "./SectorPills";

export interface BrowserProject {
  slug: string;
  name: string;
  /** "Gulberg, Islamabad" or "Multan", where the company profile gives a place. */
  place?: string;
  client?: string;
  /** The ?sector= value of the project's sector, only when its sector is set. */
  sectorParam?: string;
  image: { src: string; width: number; height: number };
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

  return (
    <>
      <SectorPills sectors={sectors} active={active} />

      {shownSectors.map((s) => {
        const inSector = projects.filter((p) => p.sectorParam === s.param);
        // The All view shows three cards per category (in the order of the company profile); a sector's own view shows them all.
        const cards = active === "all" ? inSector.slice(0, 3) : inSector;
        return (
          <section key={s.param} aria-labelledby={`sector-${s.param}`} className="mt-8 first:mt-6 md:mt-10">
            <h2 id={`sector-${s.param}`} className="text-[clamp(1.5rem,1.1rem+1.3vw,2.125rem)] font-extrabold text-navy">
              {s.heading}
            </h2>
            <span aria-hidden className="accent-bar mt-2 block" />
            <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((p) => (
                <li key={p.slug} className="relative">
                  <ProjectCard p={p} />
                </li>
              ))}
            </ul>
            {cards.length < inSector.length && (
              <p className="mt-4 text-right">
                <Link
                  href={`/projects?sector=${s.param}`}
                  scroll={false}
                  className="inline-flex min-h-11 items-center gap-1.5 font-heading text-[0.9375rem] font-bold text-blue-700 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                >
                  View all {s.label} projects
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </p>
            )}
          </section>
        );
      })}

      {active === "all" && more.length > 0 && <MoreProjects projects={more} />}
    </>
  );
}

export function ProjectsBrowser({ projects }: { projects: BrowserProject[] }) {
  const sector = useSearchParams().get("sector") ?? "all";
  return <ProjectsView projects={projects} sector={sector} />;
}
