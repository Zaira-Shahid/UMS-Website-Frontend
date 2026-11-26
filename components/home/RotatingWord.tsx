"use client";

import { useEffect, useRef, useState } from "react";

/** The words that follow "Complex" in the hero headline, in order. The first one is what the page and screen readers show. */
const WORDS = ["Buildings", "Hospitals", "Towers", "Malls", "Factories"];
const EVERY_MS = 2500;

/**
 * The rotating word in the hero headline. All the words sit in one grid cell, so the box is as wide as the longest word and
 * nothing around it moves. The current word slides up and fades in, the previous one slides up and out, and a hand-drawn
 * underline draws itself under each new word. It is hidden from assistive technology (the headline carries its own label),
 * does not rotate with reduced motion, and waits while it is off-screen or the tab is hidden.
 */
export function RotatingWord() {
  const [s, setS] = useState<{ i: number; prev: number | null }>({ i: 0, prev: null });
  const box = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(el);
    const id = setInterval(() => {
      if (!visible || document.hidden) return;
      setS((cur) => ({ i: (cur.i + 1) % WORDS.length, prev: cur.i }));
    }, EVERY_MS);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, []);

  return (
    <span ref={box} aria-hidden className="relative inline-grid align-baseline">
      {WORDS.map((w, k) => (
        <span key={w} className="rw-word col-start-1 row-start-1" data-state={k === s.i ? "in" : k === s.prev ? "out" : "idle"}>
          {w}
        </span>
      ))}
      {/* Hand-drawn underline: a slightly wavy stroke that draws itself whenever the word changes */}
      <svg key={s.i} className="rw-underline absolute -bottom-[0.14em] left-0 h-[0.3em] w-full overflow-visible" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none">
        <path d="M2 8.5C32 3 62 11 98 6.5S168 3.5 198 7.5" pathLength={1} stroke="#5CC4EE" strokeWidth="3.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  );
}
