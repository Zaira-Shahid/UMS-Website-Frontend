"use client";

import { useRef, type ReactNode } from "react";
import { useElementSize } from "@/lib/use-element-size";
import { cn } from "@/lib/utils";

/**
 * S5 · Pipe-bend card. The card's border is a pipe with a rounded elbow at one corner and flanged
 * joints at the others; fluid moves along it (stroke-dashoffset only). The SVG is drawn from the
 * measured size so line widths and radii never distort.
 */
export function PipeBendCard({
  children,
  color = "var(--cyan)",
  elbow = "tl",
  radius = 36,
  className,
  bodyClassName,
  tone = "light",
}: {
  children: ReactNode;
  /** Pipe colour: brand cyan or a discipline variable. */
  color?: string;
  /** Which corner carries the elbow. */
  elbow?: "tl" | "tr" | "br" | "bl";
  radius?: number;
  className?: string;
  bodyClassName?: string;
  tone?: "light" | "dark";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { width: w, height: h } = useElementSize(ref);
  const inset = 6;
  const r = Math.min(radius, (Math.min(w, h) - inset * 2) / 2);
  const x0 = inset;
  const y0 = inset;
  const x1 = Math.max(w - inset, x0);
  const y1 = Math.max(h - inset, y0);

  // Square corners except the elbow corner, which is rounded.
  const rr = (c: typeof elbow) => (c === elbow ? r : 0);
  const d = [
    `M ${x0 + rr("tl")} ${y0}`,
    `H ${x1 - rr("tr")}`,
    rr("tr") ? `A ${r} ${r} 0 0 1 ${x1} ${y0 + r}` : `L ${x1} ${y0}`,
    `V ${y1 - rr("br")}`,
    rr("br") ? `A ${r} ${r} 0 0 1 ${x1 - r} ${y1}` : `L ${x1} ${y1}`,
    `H ${x0 + rr("bl")}`,
    rr("bl") ? `A ${r} ${r} 0 0 1 ${x0} ${y1 - r}` : `L ${x0} ${y1}`,
    `V ${y0 + rr("tl")}`,
    rr("tl") ? `A ${r} ${r} 0 0 1 ${x0 + r} ${y0}` : `L ${x0} ${y0}`,
    "Z",
  ].join(" ");

  const joints: [number, number, typeof elbow][] = [
    [x0, y0, "tl"],
    [x1, y0, "tr"],
    [x1, y1, "br"],
    [x0, y1, "bl"],
  ];

  return (
    <div ref={ref} className={cn("relative", className)}>
      {w > 0 && (
        <svg aria-hidden width={w} height={h} className="pointer-events-none absolute inset-0 overflow-visible">
          <path d={d} fill="none" stroke={color} strokeOpacity={tone === "dark" ? 0.35 : 0.3} strokeWidth={6} strokeLinejoin="round" />
          <path d={d} fill="none" stroke={color} strokeWidth={1.75} strokeLinejoin="round" className="pipe-fluid" />
          {joints
            .filter(([, , c]) => c !== elbow)
            .map(([x, y, c]) => (
              <g key={c}>
                <circle cx={x} cy={y} r={6} fill={tone === "dark" ? "var(--navy-900)" : "var(--white)"} stroke={color} strokeWidth={2} />
                <circle cx={x} cy={y} r={2} fill={color} />
              </g>
            ))}
        </svg>
      )}
      <div className={cn("relative p-7", bodyClassName)}>{children}</div>
    </div>
  );
}
