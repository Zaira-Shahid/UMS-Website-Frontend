"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { setLenis } from "@/lib/motion/lenis-store";

/**
 * Lenis smooth scroll driven by the GSAP ticker so ScrollTrigger and Lenis share one clock.
 * Disabled entirely for prefers-reduced-motion (spec §3.4); ScrollTrigger still works there
 * for non-scrubbed logic, but sections are expected to skip pinning/scrubbing themselves.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    };
    const stop = () => {
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
      tick = null;
      setLenis(null);
    };

    if (!mq.matches) start();
    const onChange = () => (mq.matches ? stop() : start());
    mq.addEventListener("change", onChange);

    return () => {
      mq.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return <>{children}</>;
}
