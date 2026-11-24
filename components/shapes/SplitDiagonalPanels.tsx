"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * S9 · Split diagonal panels. Two panels divided by an angled line. Moving the pointer (or
 * focusing a panel) shifts the divide toward the hovered side. The divide is a CSS variable
 * updated on pointer move, and each panel is clipped with `clip-path`, so only the clip animates.
 * On narrow screens the panels simply stack.
 */
export function SplitDiagonalPanels({
  left,
  right,
  leftLabel,
  rightLabel,
  className,
}: {
  left: ReactNode;
  right: ReactNode;
  leftLabel: string;
  rightLabel: string;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(50);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !root.current) return;
    const rect = root.current.getBoundingClientRect();
    const t = (e.clientX - rect.left) / rect.width;
    setSplit(Math.min(62, Math.max(38, 38 + t * 24)));
  };

  const slant = 8; // percentage points of horizontal offset between top and bottom of the divide
  const leftClip = `polygon(0 0, ${split + slant / 2}% 0, ${split - slant / 2}% 100%, 0 100%)`;
  const rightClip = `polygon(${split + slant / 2}% 0, 100% 0, 100% 100%, ${split - slant / 2}% 100%)`;

  return (
    <div
      ref={root}
      onPointerMove={onMove}
      onPointerLeave={() => setSplit(50)}
      className={cn("relative isolate overflow-hidden bg-navy-950 text-white lg:min-h-[34rem]", className)}
    >
      {/* Wide screens: two clipped, overlapping panels */}
      <div className="relative hidden min-h-[34rem] lg:block">
        <div
          role="group"
          aria-label={leftLabel}
          tabIndex={0}
          onFocus={() => setSplit(60)}
          onBlur={() => setSplit(50)}
          className="absolute inset-0 bg-navy transition-[clip-path] duration-500 ease-out"
          style={{ clipPath: leftClip } as CSSProperties}
        >
          <div className="h-full w-[34%] min-w-[15rem] py-10 pl-10">{left}</div>
        </div>
        <div
          role="group"
          aria-label={rightLabel}
          tabIndex={0}
          onFocus={() => setSplit(40)}
          onBlur={() => setSplit(50)}
          className="absolute inset-0 bg-navy-900 transition-[clip-path] duration-500 ease-out"
          style={{ clipPath: rightClip } as CSSProperties}
        >
          <div className="ml-auto h-full w-[34%] min-w-[15rem] py-10 pr-10">{right}</div>
        </div>
        {/* The divide line */}
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <line
            x1={split + slant / 2}
            y1={0}
            x2={split - slant / 2}
            y2={100}
            stroke="var(--cyan-300)"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
            className="transition-all duration-500 ease-out"
          />
        </svg>
      </div>

      {/* Narrow screens: stacked */}
      <div className="grid lg:hidden">
        <div role="group" aria-label={leftLabel} className="bg-navy p-6 sm:p-10">
          {left}
        </div>
        <div role="group" aria-label={rightLabel} className="bg-navy-900 p-6 sm:p-10">
          {right}
        </div>
      </div>
    </div>
  );
}
