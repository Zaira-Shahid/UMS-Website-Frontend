"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/** Gauge sweep: 240° arc from the lower left to the lower right. */
const START = -120;
const SWEEP = 240;

const polar = (cx: number, cy: number, r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
};

const arc = (cx: number, cy: number, r: number, from: number, to: number) => {
  const [x0, y0] = polar(cx, cy, r, from);
  const [x1, y1] = polar(cx, cy, r, to);
  return `M ${x0} ${y0} A ${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x1} ${y1}`;
};

/**
 * S12 · Radial gauge. An engineering dial: tick marks, a metallic number, and a needle that
 * sweeps from zero to the value (and counts up) when the gauge enters view. With reduced motion
 * it renders the final state immediately. Exposed to assistive tech as a single `meter`.
 */
export function RadialGauge({
  value,
  max = 100,
  suffix = "",
  label,
  note,
  size = 220,
  color = "var(--cyan-300)",
  decimals = Number.isInteger(value) ? 0 : 1,
  className,
}: {
  value: number;
  /** Value at the end of the dial. */
  max?: number;
  suffix?: string;
  label: string;
  note?: string;
  size?: number;
  color?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [t, setT] = useState(reduce ? 1 : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, 1, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: setT });
    return () => controls.stop();
  }, [inView, reduce]);

  const frac = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0;
  const cur = frac * t;
  const needle = START + SWEEP * cur;
  const shown = (value * t).toFixed(decimals);
  const cx = 100;
  const cy = 100;
  const ticks = Array.from({ length: 25 }, (_, i) => START + (SWEEP / 24) * i);

  return (
    <div
      ref={ref}
      role="meter"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={`${value}${suffix}`}
      aria-label={label}
      className={cn("text-center", className)}
      style={{ width: size }}
    >
      <svg aria-hidden viewBox="0 0 200 180" width={size} height={(size * 180) / 200} className="block overflow-visible">
        <defs>
          <linearGradient id="gauge-metal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" />
            <stop offset=".5" stopColor="#cfe7f4" />
            <stop offset="1" stopColor="#8a9baa" />
          </linearGradient>
        </defs>
        {/* Track and value arc */}
        <path d={arc(cx, cy, 78, START, START + SWEEP)} fill="none" stroke="rgb(255 255 255 / 0.14)" strokeWidth="6" strokeLinecap="round" />
        {cur > 0.004 && <path d={arc(cx, cy, 78, START, needle)} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" />}
        {/* Ticks */}
        {ticks.map((deg, i) => {
          const major = i % 6 === 0;
          const [x0, y0] = polar(cx, cy, major ? 62 : 66, deg);
          const [x1, y1] = polar(cx, cy, 72, deg);
          return <line key={deg} x1={x0} y1={y0} x2={x1} y2={y1} stroke="rgb(255 255 255 / 0.5)" strokeWidth={major ? 1.6 : 0.8} />;
        })}
        {/* Needle */}
        <g transform={`rotate(${needle} ${cx} ${cy})`}>
          <line x1={cx} y1={cy + 10} x2={cx} y2={cy - 70} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx={cx} cy={cy} r="7" fill="var(--navy-900)" stroke={color} strokeWidth="2" />
        </g>
        {/* Metallic number */}
        <text
          x={cx}
          y={cy + 48}
          textAnchor="middle"
          fontFamily="var(--font-barlow), sans-serif"
          fontWeight="800"
          fontSize="34"
          fill="url(#gauge-metal)"
        >
          {shown}
          {suffix && <tspan fontSize="14" dx="3">{suffix}</tspan>}
        </text>
      </svg>
      <p className="mt-1 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white/85">{label}</p>
      {note && <p className="mono-label mt-1 text-cyan-300">{note}</p>}
    </div>
  );
}
