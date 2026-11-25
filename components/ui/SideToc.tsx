"use client";

import { useMemo } from "react";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
}

/**
 * Table of contents for long pages.
 * - ≥1024px: sticky side list under the header; the section in view is highlighted.
 * - below 1024px: a collapsible "On this page" list at the top of the content.
 * Plain anchor links, so it works by keyboard and without JavaScript; target sections
 * must use scroll-margin-top to clear the fixed header.
 */
export function SideToc({ items, title = "On this page" }: { items: TocItem[]; title?: string }) {
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const active = useActiveSection(ids);

  const list = (
    <ol className="space-y-1">
      {items.map((item, i) => {
        const on = active === item.id;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={on ? "location" : undefined}
              className={cn(
                "flex items-baseline gap-3 border-l-2 py-2 pl-4 text-[0.9375rem] transition-colors",
                on ? "border-blue font-semibold text-navy" : "border-line text-muted hover:border-navy/40 hover:text-navy",
              )}
            >
              <span aria-hidden className="font-heading text-xs tabular-nums text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      <nav aria-label={title} className="hidden lg:sticky lg:top-28 lg:block">
        <p className="mb-3 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-navy">
          {title}
        </p>
        {list}
      </nav>
      <details className="border border-line bg-white lg:hidden">
        <summary className="cursor-pointer px-4 py-3 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-navy">
          {title}
        </summary>
        <nav aria-label={`${title} (mobile)`} className="border-t border-line px-4 py-3">
          {list}
        </nav>
      </details>
    </>
  );
}
