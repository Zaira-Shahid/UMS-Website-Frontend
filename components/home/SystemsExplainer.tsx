"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceBySlug } from "@/content/services";
import { disciplineColor } from "@/lib/discipline";
import { cn } from "@/lib/utils";
import type { ServiceSlug } from "@/types";
import { BuildingCutaway, type SystemKey } from "./BuildingCutaway";

type Tab = { id: "all" | SystemKey; label: string; slug: ServiceSlug };

const TABS: Tab[] = [
  { id: "all", label: "All systems", slug: "integrated-mep" },
  { id: "hvac", label: "HVAC", slug: "hvac" },
  { id: "fire", label: "Fire protection", slug: "fire-fighting" },
  { id: "elec", label: "Electrical & ELV", slug: "electrical-elv" },
  { id: "plumb", label: "Plumbing", slug: "plumbing" },
];

/**
 * Dark section: "MEP inside a building". The same cutaway as the hero, larger and unlabelled, with a tab per
 * system. Choosing a system highlights it in the drawing and explains what it does in a building (copy comes
 * from the service content). Hovering a system in the drawing previews it. Without motion the drawing is
 * static; the tabs still work.
 */
export function SystemsExplainer() {
  const [selected, setSelected] = useState<Tab["id"]>("all");
  const [hover, setHover] = useState<SystemKey | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tab = TABS.find((t) => t.id === selected) ?? TABS[0];
  const service = serviceBySlug(tab.slug);
  const lit: SystemKey | null = hover ?? (selected === "all" ? null : selected);

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const to = e.key === "ArrowDown" || e.key === "ArrowRight" ? i + 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? TABS.length - 1 : null;
    if (to === null) return;
    e.preventDefault();
    const n = (to + TABS.length) % TABS.length;
    setSelected(TABS[n].id);
    tabRefs.current[n]?.focus();
  };

  return (
    <section aria-labelledby="inside-title" className="bg-navy-900 py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div id="inside-title">
          <SectionHeading
            tone="light"
            index="02"
            label="Inside a building"
            title="The systems you never see, and what each one does"
            description="Choose a system to light it up in the drawing and read what it does in a building."
          />
        </div>

        <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div role="tablist" aria-label="Building systems" className="flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:border-l lg:border-white/15">
              {TABS.map((t, i) => {
                const on = t.id === selected;
                const color = t.id === "all" ? "var(--cyan-300)" : disciplineColor[t.slug];
                return (
                  <button
                    key={t.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`inside-tab-${t.id}`}
                    aria-selected={on}
                    aria-controls="inside-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setSelected(t.id)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={cn(
                      "relative flex items-center gap-3 rounded-full border px-4 py-2 text-left font-heading text-sm font-semibold uppercase tracking-[0.08em] transition-colors lg:rounded-none lg:border-0 lg:px-6 lg:py-3.5 lg:text-base",
                      on ? "border-white/60 text-white" : "border-white/20 text-white/60 hover:text-white",
                    )}
                  >
                    <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ background: color }} />
                    {t.label}
                    {on && <span aria-hidden className="absolute -left-px top-0 hidden h-full w-[3px] lg:block" style={{ background: color }} />}
                  </button>
                );
              })}
            </div>

            <div id="inside-panel" role="tabpanel" aria-labelledby={`inside-tab-${tab.id}`} tabIndex={0} className="mt-8 outline-offset-4 lg:pl-6">
              {service && (
                <>
                  <h3 className="font-heading text-[1.75rem] font-bold uppercase leading-tight text-white">{service.name}</h3>
                  <p className="mt-3 text-white/75">{service.summary}</p>
                  {tab.id !== "all" && (
                  <dl className="mt-6 space-y-3">
                    {service.systems.slice(0, 4).map((x) => (
                      <div key={x.name}>
                        <dt className="text-sm font-semibold text-white">{x.name}</dt>
                        <dd className="text-sm text-white/60">{x.description}</dd>
                      </div>
                    ))}
                  </dl>
                  )}
                  <Link
                    href={`/services/${service.slug}`}
                    className="group mt-7 inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-cyan-300 hover:text-white"
                  >
                    {service.shortName}
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            <BuildingCutaway
              active={lit}
              onHover={setHover}
              showLabels={false}
              className="cutaway mx-auto h-auto w-full max-w-[640px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
