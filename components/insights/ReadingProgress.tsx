"use client";

import { useEffect, useRef } from "react";

/**
 * A thin bar at the top of the window showing how far through the article you are. It follows the element with the
 * given id, is hidden from assistive technology (the text is the content), and has no animation of its own.
 */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.getElementById(targetId);
    const node = bar.current;
    if (!el || !node) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      node.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [targetId]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-1 bg-transparent">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-cyan" />
    </div>
  );
}
