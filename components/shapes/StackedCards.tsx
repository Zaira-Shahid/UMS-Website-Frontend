"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { useGsap } from "@/lib/motion/use-gsap";
import { cn } from "@/lib/utils";

export interface StackedCard {
  id: string;
  content: ReactNode;
}

/**
 * S7 · Stacked sticky cards. Cards stick to the top of the viewport one after another; as the next
 * card slides over, the previous one scales down and dims (scrubbed with ScrollTrigger).
 * With reduced motion the cards are an ordinary vertical list: no sticking, scaling or dimming.
 */
export function StackedCards({
  cards,
  topOffset = 96,
  step = 18,
  className,
  cardClassName,
}: {
  cards: StackedCard[];
  /** Distance from the viewport top where the first card sticks (px). */
  topOffset?: number;
  /** Extra offset per card so the stack's edges stay visible (px). */
  step?: number;
  className?: string;
  cardClassName?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    root,
    ({ reduceMotion }) => {
      if (reduceMotion) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-stack-card]", root.current);
      items.forEach((el, i) => {
        const next = items[i + 1];
        if (!next) return;
        const inner = el.querySelector<HTMLElement>("[data-stack-inner]");
        gsap.to(inner, {
          scale: 0.93,
          opacity: 0.5,
          transformOrigin: "50% 0%",
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: `top bottom-=10%`,
            end: `top top+=${topOffset + (i + 1) * step}`,
            scrub: true,
          },
        });
      });
      ScrollTrigger.refresh();
    },
    [cards.length, topOffset, step],
  );

  return (
    <div ref={root} className={cn("relative", className)}>
      {cards.map((c, i) => (
        <div
          key={c.id}
          data-stack-card
          className="mb-6 motion-safe:sticky last:mb-0"
          style={{ top: topOffset + i * step }}
        >
          <div data-stack-inner className={cn("will-change-transform", cardClassName)}>
            {c.content}
          </div>
        </div>
      ))}
    </div>
  );
}
