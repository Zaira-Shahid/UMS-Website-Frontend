"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

/** Lenis smooth scroll. Disabled entirely for prefers-reduced-motion (§3.4). */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const tick = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onChange = () => {
      if (mq.matches) lenis.destroy();
    };
    mq.addEventListener("change", onChange);

    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", onChange);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
