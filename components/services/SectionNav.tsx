"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface NavSection {
  id: string;
  label: string;
}

/**
 * Sticky in-page navigation (desktop, ≥1024px). Highlights the section whose
 * body is crossing the middle of the viewport. Plain anchor links, so it works
 * with the keyboard and without JavaScript; sections use scroll-margin-top.
 */
export function SectionNav({
  sections,
  quoteHref,
  quoteLabel,
  accent,
}: {
  sections: NavSection[];
  quoteHref: string;
  quoteLabel: string;
  accent: "cyan" | "fire";
}) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      // A thin band across the middle of the viewport decides the active section.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <div className="sticky top-16 z-30 hidden border-b border-line bg-white shadow-[0_8px_16px_-12px_rgb(11_34_54/0.25)] lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-8">
        <nav aria-label="On this page">
          <ul className="flex items-center gap-1">
            {sections.map((s) => {
              const on = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={on ? "location" : undefined}
                    className={cn(
                      "relative block px-4 py-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] transition-colors",
                      on ? "text-navy" : "text-muted hover:text-navy",
                    )}
                  >
                    {s.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-4 bottom-0 h-0.5 origin-left transition-transform duration-300",
                        accent === "fire" ? "bg-fire" : "bg-cyan",
                        on ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <Button href={quoteHref} variant={accent === "fire" ? "fire" : "primary"} size="sm">
          {quoteLabel}
        </Button>
      </div>
    </div>
  );
}
