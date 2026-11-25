"use client";

import { Minus, Plus } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types";

/**
 * Accordion of white rounded cards (mockup 07): the open one shows a divider, the answer and a minus; closed ones a
 * plus. One panel open at a time. Up/Down/Home/End move between questions. The page emits any FAQPage JSON-LD.
 */
export function FaqAccordion({ faqs, className }: { faqs: readonly FaqItem[]; className?: string }) {
  const base = useId();
  const [open, setOpen] = useState<number | null>(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const n = faqs.length;
    const to = e.key === "ArrowDown" ? (i + 1) % n : e.key === "ArrowUp" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : null;
    if (to === null) return;
    e.preventDefault();
    buttons.current[to]?.focus();
  };

  return (
        <ul className={cn("space-y-3 lg:space-y-4", className)}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.question} className="rounded-card bg-white shadow-card">
                <h3 className="text-base">
                  <button
                    ref={(el) => {
                      buttons.current[i] = el;
                    }}
                    type="button"
                    id={`${base}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${base}-a${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className="flex w-full items-center justify-between gap-4 rounded-card px-5 py-5 text-left font-heading text-[1.0625rem] font-bold text-navy lg:px-7 lg:py-6 lg:text-[1.625rem]"
                  >
                    {f.question}
                    {isOpen ? <Minus aria-hidden strokeWidth={2.5} className="size-6 shrink-0 text-blue" /> : <Plus aria-hidden strokeWidth={2.5} className="size-6 shrink-0 text-blue" />}
                  </button>
                </h3>
                <div
                  id={`${base}-a${i}`}
                  role="region"
                  aria-labelledby={`${base}-q${i}`}
                  className={cn("grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                >
                  <div className="overflow-hidden">
                    <p className="mx-5 border-t border-border py-5 text-base leading-relaxed text-navy/80 lg:mx-7 lg:text-xl">{f.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
  );
}
