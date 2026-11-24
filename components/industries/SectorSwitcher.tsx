"use client";

import { useEffect, useMemo, useRef } from "react";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

export interface Sector {
  id: string;
  label: string;
}

/**
 * Sticky sector switcher. Anchor links to each sector section, highlighted as you scroll.
 * On narrow screens it is a horizontally scrolling strip, and the active chip is kept in view.
 */
export function SectorSwitcher({ sectors }: { sectors: Sector[] }) {
  const ids = useMemo(() => sectors.map((s) => s.id), [sectors]);
  const active = useActiveSection(ids);
  const strip = useRef<HTMLUListElement>(null);

  // Keep the active chip visible inside the scrollable strip (without scrolling the page).
  useEffect(() => {
    const chip = strip.current?.querySelector<HTMLElement>('[aria-current="location"]');
    const box = strip.current;
    if (!chip || !box) return;
    const left = chip.offsetLeft - (box.clientWidth - chip.clientWidth) / 2;
    box.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <div className="sticky top-16 z-30 border-b border-line bg-white shadow-[0_8px_16px_-12px_rgb(11_34_54/0.25)]">
      <nav aria-label="Sectors" className="mx-auto max-w-7xl px-5 sm:px-8">
        <ul ref={strip} className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sectors.map((s) => {
            const on = active === s.id;
            return (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  aria-current={on ? "location" : undefined}
                  className={cn(
                    "relative block whitespace-nowrap px-4 py-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] transition-colors",
                    on ? "text-navy" : "text-muted hover:text-navy",
                  )}
                >
                  {s.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-4 bottom-0 h-0.5 origin-left bg-cyan transition-transform duration-300",
                      on ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
