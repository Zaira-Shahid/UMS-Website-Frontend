"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { SlantedTab } from "@/components/ui/Slanted";

export interface BrowserProject {
  slug: string;
  name: string;
  city?: string;
  /** Industry slug, only when confirmed. */
  sector?: string;
  sectorName?: string;
  image?: { src: string; width: number; height: number };
}

/**
 * Projects grid with sector tabs. Only sectors that have at least one confirmed project get a tab, so there are no
 * empty tabs. Projects with no confirmed sector appear under "All" only. Images are illustrative and labelled.
 */
export function ProjectsBrowser({ projects }: { projects: BrowserProject[] }) {
  const base = useId();
  const sectors = [...new Map(projects.filter((p) => p.sector).map((p) => [p.sector!, p.sectorName ?? p.sector!])).entries()];
  const tabs = [{ key: "all", label: "All" }, ...sectors.map(([key, label]) => ({ key, label }))];
  const [active, setActive] = useState("all");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const shown = active === "all" ? projects : projects.filter((p) => p.sector === active);

  const onKeyDown = (e: KeyboardEvent) => {
    const i = tabs.findIndex((t) => t.key === active);
    let to = i;
    if (e.key === "ArrowRight") to = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") to = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(tabs[to].key);
    refs.current[to]?.focus();
  };

  return (
    <div>
      {tabs.length > 2 || (tabs.length === 2 && projects.some((p) => !p.sector)) ? (
        <div role="tablist" aria-label="Project sectors" onKeyDown={onKeyDown} className="-mx-[var(--wrap-pad)] flex overflow-x-auto border-b border-blue px-[var(--wrap-pad)] pb-px lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden">
          {tabs.map((t, i) => (
            <SlantedTab
              key={t.key}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`${base}-tab-${t.key}`}
              aria-controls={`${base}-panel`}
              active={t.key === active}
              tabIndex={t.key === active ? 0 : -1}
              onClick={() => setActive(t.key)}
              className="shrink-0 whitespace-nowrap px-5 lg:px-9"
            >
              {t.label}
            </SlantedTab>
          ))}
        </div>
      ) : null}

      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${active}`} className="mt-8">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-card border border-blue/70 bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:border-blue motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-[#3f78a8]">
                {p.image ? (
                  <>
                    <Image src={p.image.src} alt="" fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover object-[center_30%]" />
                    <span className="absolute bottom-2 left-3 text-sm italic text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.7)]">Illustrative imagery</span>
                  </>
                ) : (
                  <Building2 aria-hidden strokeWidth={1.2} className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 text-white/60" />
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-[1.375rem] font-bold leading-tight text-navy">{p.name}</h2>
                {(p.city || p.sectorName) && (
                  <p className="mt-2 flex items-center gap-2 text-base text-navy">
                    {p.city && <MapPin aria-hidden className="size-4 shrink-0 text-blue-700" />}
                    {[p.city, p.sectorName].filter(Boolean).join(" · ")}
                  </p>
                )}
                <span className="mt-auto inline-flex items-center gap-2 pt-4 font-heading font-bold text-blue-700">
                  Explore Project
                  <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                </span>
              </div>
            </Link>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}
