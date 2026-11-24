"use client";

import { useState } from "react";
import { getLenis } from "@/lib/motion/lenis-store";
import { cn } from "@/lib/utils";

/**
 * Back-to-top button shaped as a valve wheel: it turns a full revolution on click while the page
 * scrolls to the top. With reduced motion the wheel does not turn and the scroll is instant.
 */
export function BackToTop({ className }: { className?: string }) {
  const [turns, setTurns] = useState(0);

  const onClick = () => {
    setTurns((t) => t + 1);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0 });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back to top"
      className={cn(
        "group flex size-16 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-cyan-300 hover:text-cyan-300",
        className,
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 64 64"
        className="size-12 motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-out"
        style={{ transform: `rotate(${turns * 360}deg)` }}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <circle cx="32" cy="32" r="22" />
        <circle cx="32" cy="32" r="5" fill="currentColor" stroke="none" />
        {/* Spokes of the wheel, with knobs at the rim */}
        {[0, 60, 120].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 32 32)`}>
            <path d="M32 10v44" />
            <circle cx="32" cy="8" r="3" fill="currentColor" stroke="none" />
            <circle cx="32" cy="56" r="3" fill="currentColor" stroke="none" />
          </g>
        ))}
      </svg>
    </button>
  );
}
