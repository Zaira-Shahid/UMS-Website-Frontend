"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "./gsap";

export interface GsapConditions {
  /** true when the visitor prefers reduced motion: skip pinning, scrubbing and rotation. */
  reduceMotion: boolean;
  /** true from 1024px up. */
  isDesktop: boolean;
}

/**
 * Run GSAP / ScrollTrigger setup inside a scoped `gsap.matchMedia()` context.
 * - Everything created in `setup` is reverted on unmount and whenever a media condition flips.
 * - `scope` limits selector strings to the component's subtree.
 * Keep `setup` free of React state reads; pass what it needs through refs or the deps array.
 */
export function useGsap(
  scope: RefObject<HTMLElement | null>,
  setup: (conditions: GsapConditions) => void,
  deps: unknown[] = [],
) {
  useEffect(() => {
    if (!scope.current) return;
    const mm = gsap.matchMedia(scope.current);
    mm.add(
      { reduceMotion: "(prefers-reduced-motion: reduce)", isDesktop: "(min-width: 1024px)" },
      (ctx) => {
        const c = ctx.conditions as unknown as GsapConditions;
        setup({ reduceMotion: !!c.reduceMotion, isDesktop: !!c.isDesktop });
      },
    );
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
