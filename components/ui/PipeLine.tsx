"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Thin cyan "pipe run" that draws itself when it enters the viewport, with
 * circular valve/joint nodes at turns (§3.3). Decorative only.
 *
 * `points` are [x, y] pairs in a 0–100 space mapped onto the element's real
 * pixel size, so strokes keep a constant width and the draw animation stays
 * accurate (non-scaling strokes break `pathLength` in some browsers). Nodes
 * are HTML elements so they stay perfectly round.
 */
export function PipeLine({
  points = [
    [0, 50],
    [100, 50],
  ],
  nodes = "ends",
  className,
  tone = "cyan",
  height = 24,
  progress,
}: {
  points?: [number, number][];
  nodes?: "none" | "ends" | "all";
  className?: string;
  tone?: "cyan" | "light";
  height?: number;
  /** Drive the draw from scroll (0–1) instead of the in-view trigger. */
  progress?: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const shown = reduce || inView;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.clientWidth);
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const px = (x: number, y: number): [number, number] => [(x / 100) * width, (y / 100) * height];
  const d = points
    .map(([x, y], i) => {
      const [X, Y] = px(x, y);
      return `${i === 0 ? "M" : "L"}${X.toFixed(1)} ${Y.toFixed(1)}`;
    })
    .join(" ");
  const stroke = tone === "light" ? "#5cc4ee" : "#008ccb";
  const nodePts =
    nodes === "none"
      ? []
      : nodes === "all"
        ? points
        : [points[0], points[points.length - 1]];

  return (
    <div ref={ref} aria-hidden style={{ height }} className={cn("relative w-full", className)}>
      {width > 0 && (
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="absolute inset-0 overflow-visible"
        >
          <motion.path
            d={d}
            fill="none"
            stroke={stroke}
            strokeWidth={2}
            {...(progress && !reduce
              ? { style: { pathLength: progress } }
              : {
                  initial: { pathLength: reduce ? 1 : 0 },
                  animate: { pathLength: shown ? 1 : 0 },
                  transition: { duration: 1.4, ease: [0.65, 0, 0.35, 1] as const },
                })}
          />
        </svg>
      )}
      {nodePts.map(([x, y], i) => (
        <motion.span
          key={i}
          initial={false}
          animate={{ opacity: shown ? 1 : 0, scale: shown ? 1 : 0.4 }}
          transition={{ delay: reduce ? 0 : 1.1, duration: 0.3 }}
          style={{ left: `${x}%`, top: `${y}%`, borderColor: stroke }}
          className={cn(
            "absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2",
            tone === "light" ? "bg-navy-900" : "bg-white",
          )}
        />
      ))}
    </div>
  );
}
