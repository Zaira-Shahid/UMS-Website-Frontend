"use client";

import { useId, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types";

/**
 * FAQ accordion following the WAI-ARIA accordion pattern: each question is a
 * button with aria-expanded/aria-controls; ↑ ↓ Home End move between questions;
 * Enter / Space toggle. The state icon rotates its glyph, not its box, so it never leaves the column. Panels animate via grid rows (disabled for reduced motion
 * by the global rule). The matching FAQPage JSON-LD is emitted by the page.
 */
export function FaqSection({
  faqs,
  accent = "cyan",
  index = "06",
  title = "Frequently asked questions",
  description,
}: {
  faqs: FaqItem[];
  accent?: "cyan" | "fire";
  index?: string;
  title?: string;
  description?: string;
}) {
  const base = useId();
  const [open, setOpen] = useState<number | null>(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const n = faqs.length;
    const to =
      e.key === "ArrowDown" ? (i + 1) % n : e.key === "ArrowUp" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : null;
    if (to === null) return;
    e.preventDefault();
    buttons.current[to]?.focus();
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-32 bg-offwhite py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div id="faq-title" className="lg:sticky lg:top-40">
            <SectionHeading accent={accent} index={index} label="FAQ" title={title} description={description} />
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t-2 border-navy">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const btnId = `${base}-q${i}`;
              const panelId = `${base}-a${i}`;
              return (
                <li key={f.question} className="border-b border-line">
                  <h3 className="text-base font-normal normal-case tracking-normal">
                    <button
                      ref={(el) => {
                        buttons.current[i] = el;
                      }}
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      onKeyDown={(e) => onKeyDown(e, i)}
                      className="group flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left"
                    >
                      <span className="font-heading text-[1.25rem] font-semibold leading-snug text-navy transition-colors group-hover:text-blue sm:text-[1.375rem]">
                        {f.question}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center border transition-all duration-300",
                          isOpen
                            ? accent === "fire"
                              ? "border-fire bg-fire text-white"
                              : "border-blue bg-blue text-white"
                            : "border-navy/30 text-navy group-hover:border-navy",
                        )}
                      >
                        <Plus className={cn("size-4 transition-transform duration-300", isOpen && "rotate-45")} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden" inert={!isOpen}>
                      <p className="max-w-2xl pb-6 pr-12 text-[0.9375rem] text-muted">{f.answer}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
