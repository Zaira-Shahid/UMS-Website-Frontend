"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceBySlug } from "@/content/services";
import { disciplineColor } from "@/lib/discipline";
import { cn } from "@/lib/utils";
import type { ServiceSlug } from "@/types";
import { BuildingSection, SECTION_CALLOUTS, type SystemKey } from "./BuildingSection";

type Tab = { id: "all" | SystemKey; label: string; slug: ServiceSlug };

const TABS: Tab[] = [
  { id: "all", label: "All systems", slug: "integrated-mep" },
  { id: "hvac", label: "HVAC", slug: "hvac" },
  { id: "fire", label: "Fire protection", slug: "fire-fighting" },
  { id: "elec", label: "Electrical & ELV", slug: "electrical-elv" },
  { id: "plumb", label: "Plumbing", slug: "plumbing" },
];

/**
 * Light section laid out like a drawing sheet: a 2D section through a typical building on the right (about 60%),
 * the system selector and explanation on the left. Choosing a system colours it, dims the others and numbers its
 * key components on the drawing; the text and the "on the drawing" list follow. On narrow screens the order is
 * selector (a scrolling row of chips), drawing, text. Static under reduced motion; the selector is a tablist
 * with arrow-key support.
 */
export function SystemsExplainer() {
  const [selected, setSelected] = useState<Tab["id"]>("all");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tab = TABS.find((t) => t.id === selected) ?? TABS[0];
  const service = serviceBySlug(tab.slug);
  const system: SystemKey | null = selected === "all" ? null : selected;

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const to =
      e.key === "ArrowDown" || e.key === "ArrowRight" ? i + 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? TABS.length - 1 : null;
    if (to === null) return;
    e.preventDefault();
    const n = (to + TABS.length) % TABS.length;
    setSelected(TABS[n].id);
    tabRefs.current[n]?.focus();
  };

  return (
    <section aria-labelledby="inside-title" className="bg-offwhite py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div id="inside-title">
          <SectionHeading
            index="02"
            label="Inside a building"
            title="The systems you never see, and where each one sits"
            description="A typical building in section. Choose a system to colour it, dim the rest, and read what its key parts do."
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-x-12 lg:gap-y-8">
          {/* selector */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <div
              role="tablist"
              aria-label="Building systems"
              className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:border-navy/15 lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
            >
              {TABS.map((t, i) => {
                const on = t.id === selected;
                const color = t.id === "all" ? "var(--navy)" : disciplineColor[t.slug];
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
                      "relative flex shrink-0 items-center gap-3 rounded-full border px-4 py-2 text-left font-heading text-sm font-semibold uppercase tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan lg:rounded-none lg:border-0 lg:px-6 lg:py-3.5 lg:text-base",
                      on ? "border-navy bg-navy text-white lg:bg-transparent lg:text-navy" : "border-navy/25 text-navy/65 hover:text-navy lg:text-navy/55",
                    )}
                  >
                    <span aria-hidden className="size-2.5 shrink-0 rounded-full" style={{ background: color }} />
                    {t.label}
                    {on && <span aria-hidden className="absolute -left-px top-0 hidden h-full w-[3px] lg:block" style={{ background: color }} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* drawing sheet */}
          <div className="min-w-0 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
            <div className="border border-navy/20 bg-white p-2 sm:p-3">
              <BuildingSection active={system} className="building-section block h-auto w-full" />
            </div>
          </div>

          {/* explanation */}
          <div id="inside-panel" role="tabpanel" aria-labelledby={`inside-tab-${tab.id}`} tabIndex={0} className="min-w-0 outline-offset-4 lg:col-start-1 lg:row-start-2 lg:pl-6">
            {service && (
              <>
                <h3 className="font-heading text-[1.75rem] font-bold uppercase leading-tight text-navy">{service.name}</h3>
                <p className="mt-3 text-muted">{service.summary}</p>

                {system && (
                  <>
                    <h4 className="mono-label mt-6 text-navy">On the drawing</h4>
                    <ol className="mt-3 space-y-2">
                      {SECTION_CALLOUTS[system].map((c) => (
                        <li key={c.n} className="flex items-center gap-3 text-sm text-ink">
                          <span
                            aria-hidden
                            className="flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                            style={{ background: disciplineColor[tab.slug] }}
                          >
                            {c.n}
                          </span>
                          {c.label}
                        </li>
                      ))}
                    </ol>
                    <dl className="mt-6 space-y-3">
                      {service.systems.slice(0, 3).map((x) => (
                        <div key={x.name}>
                          <dt className="text-sm font-semibold text-navy">{x.name}</dt>
                          <dd className="text-sm text-muted">{x.description}</dd>
                        </div>
                      ))}
                    </dl>
                  </>
                )}

                <Link
                  href={`/services/${service.slug}`}
                  className="group mt-7 inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#00608c] hover:text-navy"
                >
                  {service.shortName}
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
