"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { PipeLine } from "@/components/ui/PipeLine";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { deliverySteps } from "@/content/home";


/**
 * Delivery process. The pipe draws as the section scrolls through the viewport
 * (horizontal run on desktop, a vertical spine on mobile). With reduced motion
 * the pipe is simply drawn in full.
 */
export function DeliveryTimeline() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <section
      aria-labelledby="delivery-title"
      className="relative isolate overflow-hidden bg-navy py-20 text-white md:py-28"
    >
      <BlueprintGrid variant="dark" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div id="delivery-title">
          <SectionHeading
            tone="light"
            index="04"
            label="How we deliver"
            title="From tender to handover, in a straight line"
            description="Six stages that keep drawings, procurement and site work moving together."
          />
        </div>

        <div ref={ref} className="relative mt-14 md:mt-20">
          {/* Desktop: horizontal pipe run from the first joint to the last. Each joint
              is the left edge of a column (6 columns, 24px gaps), so the run ends one
              column-width (calc((100% - 5 gaps) / 6)) short of the right edge. */}
          <div className="absolute left-[5px] right-[calc((100%-120px)/6-5px)] top-2 hidden lg:block">
            <PipeLine tone="light" nodes="none" height={12} progress={progress} />
          </div>

          {/* Mobile / tablet: vertical spine */}
          <div
            aria-hidden
            className="absolute bottom-2 left-[0.9rem] top-2 w-px bg-white/15 lg:hidden"
          >
            <motion.div
              className="h-full origin-top bg-cyan-300"
              style={{ scaleY: reduce ? 1 : progress }}
            />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-6 lg:gap-6">
            {deliverySteps.map((step, i) => (
              <li key={step.title} className="relative pl-12 lg:pl-0 lg:pt-12 lg:text-left">
                {/* Desktop joint — sits on the pipe run, above the step's text */}
                <span
                  aria-hidden
                  className="absolute left-0 top-[0.8rem] hidden size-2.5 rounded-full border-2 border-cyan-300 bg-navy lg:block"
                />
                {/* Mobile joint */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 flex size-[1.85rem] items-center justify-center rounded-full border-2 border-cyan-300 bg-navy font-heading text-[0.7rem] font-bold tabular-nums text-cyan-300 lg:hidden"
                >
                  {i + 1}
                </span>
                <span
                  aria-hidden
                  className="mb-3 hidden font-heading text-5xl font-extrabold leading-none text-white/15 lg:block"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[1.375rem] font-semibold uppercase leading-tight tracking-[0.03em] text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] text-white/70">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
