"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { LogoMark } from "@/components/layout/Logo";
import { homeFaqs } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * H7 FAQ (mockup 07). Logo, heading and sketch on the left; an accordion of white cards on the right (open one shows a
 * divider, the answer and a minus; closed ones a plus). One panel open at a time. Up/Down/Home/End move between
 * questions. The page emits the matching FAQPage JSON-LD.
 */
export function HomeFaq() {
  const base = useId();
  const [open, setOpen] = useState<number | null>(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const n = homeFaqs.length;
    const to = e.key === "ArrowDown" ? (i + 1) % n : e.key === "ArrowUp" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : null;
    if (to === null) return;
    e.preventDefault();
    buttons.current[to]?.focus();
  };

  return (
    <section aria-labelledby="faq-title" className="relative overflow-hidden bg-[#f2f7fb]">
      <div className="wrap grid gap-8 py-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-14 lg:py-16">
        <div className="flex flex-col">
          <LogoMark className="h-12 w-auto self-start lg:h-14" />
          <p className="mt-1 font-heading text-[0.6875rem] font-bold uppercase tracking-wide text-navy lg:text-xs">Ultimate Mechanical Solutions</p>
          <span aria-hidden className="accent-bar mt-8 lg:mt-12" />
          <h2 id="faq-title" className="mt-4 text-[clamp(2rem,1rem+3vw,3.5rem)] font-extrabold max-w-[8em] leading-[1.1] text-navy">
            Frequently Asked Questions
          </h2>
          <Image
            src="/images/sections/faq-building-sketch.png"
            alt=""
            width={530}
            height={349}
            sizes="(min-width: 1024px) 30vw, 70vw"
            className="mt-6 hidden h-auto w-full max-w-[26rem] lg:block"
          />
        </div>

        <ul className="space-y-3 lg:space-y-4 lg:pt-2">
          {homeFaqs.map((f, i) => {
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
      </div>
    </section>
  );
}
