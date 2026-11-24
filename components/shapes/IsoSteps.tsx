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
  className,
}: {
  n: number;
  color?: string;
  className?: string;
}) {
  // A cube in a 120×120 box. The top face is a rhombus; the sides are parallelograms.
  const top = "60,10 110,38 60,66 10,38";
  const left = "10,38 60,66 60,114 10,86";
  const right = "110,38 60,66 60,114 110,86";
  return (
    <svg aria-hidden viewBox="0 0 120 120" className={cn("block", className)}>
      <polygon points={left} fill={color} opacity={0.55} />
      <polygon points={right} fill={color} opacity={0.8} />
      <polygon points={top} fill={color} />
      <polygon points={top} fill="none" stroke="rgb(255 255 255 / 0.55)" strokeWidth="1" />
      <text
        x="60"
        y="38"
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
 * S10 · Isometric tiles. Process steps drawn as 30° isometric blocks connected by one pipe:
 * a single row on wide screens, a vertical run on narrow ones. As the section scrolls through
 * view the pipe fills (scrubbed) and each block lights up when the fluid reaches it. With reduced
 * motion the pipe is full and every block is lit.
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
      const blocks = gsap.utils.toArray<HTMLElement>("[data-iso]", el);
      const lightUp = (p: number) =>
        blocks.forEach((b, i) => {
          b.dataset.lit = String(p >= (blocks.length === 1 ? 0 : i / (blocks.length - 1)) - 0.001);
        });

      if (reduceMotion) {
        el.style.setProperty("--p", "1");
        lightUp(1);
        return;
      }
      el.style.setProperty("--p", "0");
      lightUp(0);
      gsap.to(el, {
        "--p": 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "bottom 60%",
          scrub: true,
          onUpdate: (self) => lightUp(self.progress),
        },
      });
    },
    [steps.length],
  );

  return (
    <ol
      ref={root}
      className={cn("relative grid gap-y-10 xl:grid-cols-6 xl:gap-x-6", className)}
      style={{ ["--p" as string]: 1 }}
    >
      {/* The pipe: vertical on narrow screens, horizontal on xl. Runs behind the blocks. */}
      <span
        aria-hidden
        className={cn(
          "absolute left-12 top-12 h-[calc(100%-6rem)] w-[4px] rounded-full xl:left-12 xl:right-12 xl:top-12 xl:h-[4px] xl:w-auto",
          dark ? "bg-white/15" : "bg-navy/15",
        )}
      >
        <span
          className="block h-full w-full origin-top rounded-full max-xl:[transform:scaleY(var(--p))] xl:origin-left xl:[transform:scaleX(var(--p))]"
          style={{ background: color, boxShadow: `0 0 12px ${color}` }}
        />
      </span>

      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-5 xl:flex-col xl:gap-4">
          <div
            data-iso
            data-lit="true"
            className="shrink-0 opacity-40 transition-opacity duration-300 data-[lit=true]:opacity-100 motion-reduce:opacity-100"
          >
            <IsoBlock n={i + 1} color={color} className="size-24" />
          </div>
          <div className="min-w-0 pt-2 xl:pt-0">
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
