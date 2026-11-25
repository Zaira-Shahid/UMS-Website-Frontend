"use client";

import { useRef, useState, type ReactNode } from "react";
import { gsap } from "@/lib/motion/gsap";
import { useGsap } from "@/lib/motion/use-gsap";
import { cn } from "@/lib/utils";

/**
 * S8 · Horizontal track. On desktop the section is pinned while vertical scroll drives a
 * horizontal sweep through the panels, with a progress bar and a `03 / 06` counter. On touch /
 * narrow screens, and with reduced motion, it is a native scroll-snap carousel instead (no
 * pinning, no scrubbing). Panels are plain nodes sized by the caller (e.g. `w-[80vw]`).
 */
export function HorizontalTrack({
  panels,
  label,
  className,
  trackClassName,
  tone = "dark",
}: {
  panels: ReactNode[];
  /** Accessible name for the scrolling region. */
  label: string;
  className?: string;
  trackClassName?: string;
  tone?: "light" | "dark";
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(1);
  const total = panels.length;
  const pad = (n: number) => String(n).padStart(2, "0");
  const dark = tone === "dark";

  useGsap(
    root,
    ({ reduceMotion, isDesktop }) => {
      const el = track.current;
      if (!el || reduceMotion || !isDesktop) return;

      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          scrub: 0.6,
          start: "top top",
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${Math.max(self.progress, 0.02)})`;
            setIndex(Math.min(total, Math.floor(self.progress * total) + 1));
          },
        },
      });
      return () => tween.kill();
    },
    [total],
  );

  return (
    <div
      ref={root}
      className={cn("relative flex min-h-svh flex-col justify-center overflow-hidden", className)}
      role="region"
      aria-label={label}
    >
      <ul
        ref={track}
        tabIndex={0}
        className={cn(
          "flex w-max gap-6 px-5 sm:px-8",
          // Narrow screens and reduced motion: a native snap carousel.
          "max-lg:w-full max-lg:snap-x max-lg:snap-mandatory max-lg:overflow-x-auto max-lg:pb-4",
          "motion-reduce:w-full motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:overflow-x-auto motion-reduce:pb-4",
          trackClassName,
        )}
      >
        {panels.map((p, i) => (
          <li key={i} className="shrink-0 snap-start">
            {p}
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-8 flex w-full max-w-7xl items-center gap-6 px-5 sm:px-8" aria-hidden>
        <div className={cn("h-px flex-1", dark ? "bg-white/20" : "bg-navy/20")}>
          <div ref={bar} className="h-full origin-left bg-cyan-300" style={{ transform: "scaleX(0.02)" }} />
        </div>
        <span className={cn("mono-label tabular-nums", dark ? "text-white/70" : "text-navy/70")}>
          {pad(index)} / {pad(total)}
        </span>
      </div>
    </div>
  );
}
