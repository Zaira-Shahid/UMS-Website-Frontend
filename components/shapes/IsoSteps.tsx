"use client";

import { useRef } from "react";
import { gsap } from "@/lib/motion/gsap";
import { useGsap } from "@/lib/motion/use-gsap";
import { cn } from "@/lib/utils";

export interface IsoStep {
  title: string;
  text: string;
  /** Deliverable tag, e.g. "Shop drawings". */
  tag?: string;
}

/** One isometric block: a 30° cube with top, left and right faces and a step number on the top face. */
export function IsoBlock({
  n,
  color = "var(--cyan)",
  lit = true,
  className,
}: {
  n: number;
  color?: string;
  lit?: boolean;
  className?: string;
}) {
  // A cube in a 120×120 box. Top face is a rhombus; the sides are parallelograms.
  const top = "60,10 110,38 60,66 10,38";
  const left = "10,38 60,66 60,114 10,86";
  const right = "110,38 60,66 60,114 110,86";
  return (
    <svg aria-hidden viewBox="0 0 120 120" className={cn("block", className)}>
      <polygon points={left} fill={color} opacity={lit ? 0.55 : 0.18} />
      <polygon points={right} fill={color} opacity={lit ? 0.8 : 0.28} />
      <polygon points={top} fill={color} opacity={lit ? 1 : 0.4} />
      <polygon points={top} fill="none" stroke="rgb(255 255 255 / 0.55)" strokeWidth="1" />
      <text
        x="60"
        y="44"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="var(--font-barlow), sans-serif"
        fontWeight="800"
        fontSize="22"
        fill="var(--navy-950)"
        style={{ transform: "scaleY(0.58)", transformBox: "fill-box", transformOrigin: "center" }}
      >
        {String(n).padStart(2, "0")}
      </text>
    </svg>
  );
}

/**
 * S10 · Isometric steps. Process steps drawn as 30° isometric blocks on a pipeline. The pipe
 * fills as the section scrolls through view (scrubbed) and each block lights up when the fluid
 * reaches it. With reduced motion every block is lit and the pipe is full.
 */
export function IsoSteps({
  steps,
  color = "var(--cyan)",
  tone = "dark",
  className,
}: {
  steps: IsoStep[];
  color?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const root = useRef<HTMLOListElement>(null);
  const dark = tone === "dark";

  useGsap(
    root,
    ({ reduceMotion }) => {
      const el = root.current;
      if (!el) return;
      const fills = gsap.utils.toArray<HTMLElement>("[data-pipe-fill]", el);
      const blocks = gsap.utils.toArray<HTMLElement>("[data-iso]", el);
      if (reduceMotion) {
        gsap.set(fills, { scaleX: 1, scaleY: 1 });
        gsap.set(blocks, { opacity: 1 });
        return;
      }
      gsap.set(blocks, { opacity: 0.35 });
      fills.forEach((f) => gsap.set(f, { scaleX: 0, scaleY: 0 }));
      blocks.forEach((b, i) => {
        gsap.to(b, {
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: b, start: "top 78%", end: "top 55%", scrub: true },
        });
        const fill = fills[i];
        if (fill) {
          gsap.to(fill, {
            scaleX: 1,
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: b, start: "top 70%", end: "bottom 45%", scrub: true },
          });
        }
      });
    },
    [steps.length],
  );

  return (
    <ol ref={root} className={cn("relative grid gap-10 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-5">
          {/* Pipe connecting this block to the next (horizontal on wide screens, vertical on narrow) */}
          {i < steps.length - 1 && (
            <>
              <span aria-hidden className={cn("absolute left-[3.75rem] top-[4.25rem] hidden h-[calc(100%-2rem)] w-[3px] sm:hidden", dark ? "bg-white/15" : "bg-navy/15")} />
              <span aria-hidden className={cn("absolute left-8 top-[7.5rem] block h-[calc(100%-4rem)] w-[3px] sm:hidden", dark ? "bg-white/15" : "bg-navy/15")}>
                <span data-pipe-fill className="block h-full w-full origin-top" style={{ background: color }} />
              </span>
            </>
          )}
          <div data-iso className="shrink-0">
            <IsoBlock n={i + 1} color={color} className="size-24 sm:size-28" />
          </div>
          <div className="min-w-0 pb-8 pt-2">
            <h3 className={cn("text-xl", dark ? "text-white" : "text-navy")}>{s.title}</h3>
            <p className={cn("mt-2 text-[0.9375rem]", dark ? "text-white/70" : "text-muted")}>{s.text}</p>
            {s.tag && (
              <span className="mono-label mt-3 inline-block border px-2 py-1 text-[0.6875rem]" style={{ borderColor: color, color }}>
                {s.tag}
              </span>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
