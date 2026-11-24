"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * Animated number counter. Shows the final value immediately for users who
 * prefer reduced motion (§3.4). Server-renders the final value so there is
 * no layout shift and the number is available without JavaScript.
 */
export function Counter({
  value,
  suffix = "",
  duration = 1.8,
  decimals = Number.isInteger(value) ? 0 : 1,
  className,
}: {
  value: number;
  suffix?: string;
  /** Decimal places shown; defaults to 1 for non-integer values. */
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Number(v.toFixed(decimals))),
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration, decimals]);

  return (
    <span ref={ref} className={className} aria-label={`${value}${suffix}`}>
      <span aria-hidden>
        {display.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
}
