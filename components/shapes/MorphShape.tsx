"use client";

import { useMemo } from "react";
import { interpolate } from "flubber";
import { cn } from "@/lib/utils";

/**
 * Silhouettes of the six disciplines in a 100×100 box, drawn as single closed paths so flubber can
 * morph between them: fan (HVAC) → flame (Fire) → lightning (Electrical) → droplet (Plumbing) →
 * network (Integrated MEP) → fountain (Pools & Fountains).
 */
export const MORPH_SHAPES = [
  {
    id: "hvac",
    label: "HVAC",
    color: "var(--hvac)",
    // Four-blade fan
    d: "M50 8 C66 8 72 24 62 36 C74 32 92 38 92 52 C92 66 76 72 64 62 C70 74 64 92 50 92 C36 92 30 76 38 64 C26 70 8 64 8 50 C8 36 24 30 36 38 C28 26 34 8 50 8 Z",
  },
  {
    id: "fire-fighting",
    label: "Fire Fighting",
    color: "var(--fire)",
    // Flame with a notch
    d: "M50 6 C58 24 80 34 80 60 C80 80 66 94 50 94 C34 94 20 80 20 60 C20 48 28 40 34 34 C34 44 40 48 44 48 C42 34 44 18 50 6 Z",
  },
  {
    id: "electrical-elv",
    label: "Electrical & ELV",
    color: "var(--electric)",
    // Lightning bolt
    d: "M58 4 L22 54 L46 54 L38 96 L80 40 L54 40 Z",
  },
  {
    id: "plumbing",
    label: "Plumbing",
    color: "var(--plumbing)",
    // Droplet
    d: "M50 6 C50 6 20 44 20 64 C20 82 33 94 50 94 C67 94 80 82 80 64 C80 44 50 6 50 6 Z",
  },
  {
    id: "integrated-mep",
    label: "Integrated MEP",
    color: "var(--mep)",
    // Eight-point node star (a network hub)
    d: "M50 6 L58 34 L82 18 L66 42 L94 50 L66 58 L82 82 L58 66 L50 94 L42 66 L18 82 L34 58 L6 50 L34 42 L18 18 L42 34 Z",
  },
  {
    id: "pools-fountains",
    label: "Pools & Fountains",
    color: "var(--pools)",
    // Fountain: a jet over two tiers and a basin, as one outline
    d: "M50 6 C57 20 58 30 54 40 L72 44 C84 48 90 56 88 64 L76 64 L76 72 L92 72 L90 92 L10 92 L8 72 L24 72 L24 64 L12 64 C10 56 16 48 28 44 L46 40 C42 30 43 20 50 6 Z",
  },
] as const;

/** Interpolator between consecutive shapes (built once; flubber precomputes the matching). */
function buildInterpolators() {
  return MORPH_SHAPES.map((s, i) => {
    const next = MORPH_SHAPES[(i + 1) % MORPH_SHAPES.length];
    return interpolate(s.d, next.d, { maxSegmentLength: 3 });
  });
}

/**
 * S14 · Morphing shape. One SVG path that morphs between the six discipline silhouettes.
 * `progress` runs from 0 to N (N = number of shapes): 0 is the first shape, 1 the second, and so on.
 * Drive it from scroll (ScrollTrigger scrub) or state. The colour blends to the target
 * discipline. The path itself is decorative; pass `label` to expose the current shape by name.
 */
export function MorphShape({
  progress,
  size = 280,
  label,
  className,
}: {
  progress: number;
  size?: number;
  label?: string;
  className?: string;
}) {
  const interpolators = useMemo(buildInterpolators, []);
  const n = MORPH_SHAPES.length;
  const p = ((progress % n) + n) % n;
  const i = Math.floor(p);
  const t = p - i;
  const d = interpolators[i](t);
  const from = MORPH_SHAPES[i];
  const to = MORPH_SHAPES[(i + 1) % n];
  const mix = Math.round(t * 100);

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("block overflow-visible", className)}
    >
      <defs>
        <filter id="morph-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d={d}
        fill={`color-mix(in srgb, ${to.color} ${mix}%, ${from.color})`}
        fillOpacity={0.18}
        stroke={`color-mix(in srgb, ${to.color} ${mix}%, ${from.color})`}
        strokeWidth={1.8}
        strokeLinejoin="round"
        filter="url(#morph-glow)"
      />
    </svg>
  );
}
