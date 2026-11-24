"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion/gsap";
import { getLenis } from "@/lib/motion/lenis-store";

export const PRELOADER_KEY = "ums-preloaded";

/**
 * Runs before first paint (inline in <head>): marks the document so the preloader overlay is hidden
 * by CSS on repeat visits, with reduced motion, and without JavaScript.
 */
export const PRELOADER_GUARD = `try{if(sessionStorage.getItem("${PRELOADER_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.preloader="skip"}catch(e){}`;

/**
 * H0 · Preloader (first visit of a session only, about 1.5s): a blueprint line draws the UMS
 * outline while a pressure-gauge needle sweeps 0 to 100 with the counter; then the screen splits
 * along a diagonal and the halves slide away. Skipped on repeat visits and with reduced motion.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const topLeft = useRef<HTMLDivElement>(null);
  const bottomRight = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const needle = useRef<SVGGElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const outline = useRef<SVGTextElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (document.documentElement.dataset.preloader === "skip") {
      setDone(true);
      return;
    }

    const html = document.documentElement;
    const lenis = getLenis();
    lenis?.stop();
    html.style.overflow = "hidden";

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      try {
        sessionStorage.setItem(PRELOADER_KEY, "1");
      } catch {}
      html.style.overflow = "";
      getLenis()?.start();
      setDone(true);
    };

    const len = outline.current?.getComputedTextLength?.() ?? 400;
    const state = { n: 0 };
    const tl = gsap.timeline({ onComplete: finish });
    gsap.set(outline.current, { strokeDasharray: len * 4, strokeDashoffset: len * 4 });
    gsap.set(needle.current, { rotation: -120, transformOrigin: "50% 50%" });
    tl.to(outline.current, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, 0)
      .to(needle.current, { rotation: 120, duration: 0.8, ease: "power2.inOut" }, 0)
      .to(
        state,
        {
          n: 100,
          duration: 0.8,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counter.current) counter.current.textContent = String(Math.round(state.n));
          },
        },
        0,
      )
      .to(outline.current, { fill: "#ffffff", duration: 0.2 }, 0.75)
      .to(content.current, { opacity: 0, scale: 0.96, duration: 0.2, ease: "power1.in" }, 0.95)
      .to(topLeft.current, { xPercent: -105, yPercent: -105, duration: 0.45, ease: "power3.inOut" }, 1.0)
      .to(bottomRight.current, { xPercent: 105, yPercent: 105, duration: 0.45, ease: "power3.inOut" }, 1.0);

    // Never trap a visitor behind the overlay.
    const safety = window.setTimeout(finish, 2600);
    return () => {
      window.clearTimeout(safety);
      tl.kill();
      if (!finished) {
        html.style.overflow = "";
        getLenis()?.start();
      }
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="preloader pointer-events-auto fixed inset-0 z-[300] overflow-hidden"
    >
      <div
        ref={topLeft}
        className="bg-blueprint-dark absolute inset-0 bg-navy-950"
        style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
      />
      <div
        ref={bottomRight}
        className="bg-blueprint-dark absolute inset-0 bg-navy-950"
        // Overlaps the other half by 2px so no hairline shows along the diagonal.
        style={{ clipPath: "polygon(calc(100% + 1px) -1px, calc(100% + 1px) calc(100% + 1px), -1px calc(100% + 1px), -1px calc(100% - 2px), calc(100% - 2px) -1px)" }}
      />
      <div ref={content} className="absolute inset-0 flex flex-col items-center justify-center gap-8">
        <svg viewBox="0 0 320 110" className="w-[min(70vw,20rem)]" fill="none">
          <text
            ref={outline}
            x="160"
            y="88"
            textAnchor="middle"
            fontFamily="var(--font-barlow), sans-serif"
            fontWeight="800"
            fontSize="100"
            stroke="var(--cyan-300)"
            strokeWidth="1.6"
            fill="transparent"
          >
            UMS
          </text>
        </svg>

        <div className="flex items-center gap-6">
          <svg viewBox="0 0 120 80" className="w-28" fill="none">
            <path d="M12 68 A48 48 0 0 1 108 68" stroke="rgb(255 255 255 / 0.18)" strokeWidth="5" strokeLinecap="round" />
            {Array.from({ length: 9 }, (_, i) => {
              const a = ((-120 + (240 / 8) * i - 90) * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={60 + 40 * Math.cos(a)}
                  y1={68 + 40 * Math.sin(a)}
                  x2={60 + 46 * Math.cos(a)}
                  y2={68 + 46 * Math.sin(a)}
                  stroke="rgb(255 255 255 / 0.5)"
                />
              );
            })}
            <g ref={needle} style={{ transformBox: "view-box", transformOrigin: "60px 68px" }}>
              <line x1="60" y1="68" x2="60" y2="26" stroke="var(--cyan-300)" strokeWidth="2.5" strokeLinecap="round" />
            </g>
            <circle cx="60" cy="68" r="5" fill="var(--navy-900)" stroke="var(--cyan-300)" strokeWidth="2" />
          </svg>
          <p className="mono-label w-20 text-cyan-300">
            <span ref={counter} className="tabular-nums">
              0
            </span>
            <span> %</span>
          </p>
        </div>
      </div>
    </div>
  );
}
