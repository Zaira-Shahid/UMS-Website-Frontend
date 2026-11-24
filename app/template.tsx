"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "@/lib/motion/gsap";

/** Counts page mounts in this tab. The first mount is the initial load, which has the preloader instead. */
let mounts = 0;

/**
 * Page transition (spec §7): on every client navigation a navy panel covers the new page, a pipe
 * line draws across it, and the panel wipes upward. The whole sequence runs in 0.6s. Skipped for the
 * initial load and with reduced motion. (`template.tsx` remounts on each navigation.)
 */
export default function Template({ children }: { children: ReactNode }) {
  // Server render and hydration both see `mounts === 0`, so the markup always matches.
  const [panel, setPanel] = useState(
    () => mounts > 0 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const panelRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    mounts += 1;
    const el = panelRef.current;
    if (!panel || !el) return;
    gsap.set(lineRef.current, { strokeDasharray: 1, strokeDashoffset: 1 });
    const tl = gsap.timeline({ onComplete: () => setPanel(false) });
    tl.to(lineRef.current, { strokeDashoffset: 0, duration: 0.22, ease: "power2.out" })
      .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.38, ease: "power3.inOut" }, 0.2);
    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {panel && (
        <div
          ref={panelRef}
          aria-hidden
          className="bg-blueprint-dark pointer-events-none fixed inset-0 z-[90] bg-navy-950"
          style={{ clipPath: "inset(0 0 0 0)" }}
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line
              ref={lineRef}
              x1="0"
              y1="50"
              x2="100"
              y2="50"
              pathLength={1}
              stroke="var(--cyan-300)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      )}
      {children}
    </>
  );
}
