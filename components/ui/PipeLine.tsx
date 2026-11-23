"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Thin cyan "pipe run" that draws itself when it enters the viewport, with
 * circular valve/joint nodes at turns (§3.3). Decorative only.
 *
 * `points` are [x, y] pairs in a 0–100 coordinate space; segments are
 * straight, so it reads like orthogonal piping. Nodes are HTML elements so
 * they stay perfectly round regardless of the container's aspect ratio.
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
}: {
  points?: [number, number][];
  nodes?: "none" | "ends" | "all";
  className?: string;
  tone?: "cyan" | "light";
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const shown = reduce || inView;

  const d = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");
  const stroke = tone === "light" ? "#5cc4ee" : "#008ccb";
  const nodePts =
    nodes === "none"
      ? []
      : nodes === "all"
        ? points
        : [points[0], points[points.length - 1]];

  return (
    <div
      ref={ref}
      aria-hidden
      style={{ height }}
      className={cn("relative w-full", className)}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full overflow-visible"
      >
        <motion.path
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: shown ? 1 : 0 }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
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
