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
    <div className="sticky top-[var(--header-h)] z-30 border-b border-border bg-white shadow-[0_8px_16px_-12px_rgb(11_34_54/0.25)]">
      <nav aria-label="Sectors" className="wrap">
        <ul ref={strip} className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sectors.map((s) => {
            const on = active === s.id;
            return (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  aria-current={on ? "location" : undefined}
                  className={cn(
                    "block whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                    on ? "border-blue-700 bg-blue-700 text-white" : "border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white",
                  )}
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
