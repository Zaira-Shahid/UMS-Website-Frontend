"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion/gsap";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/motion/use-reduced-motion";

/**
 * Desktop-only custom cursor (spec §3.3): a small crosshair that grows into a labelled circle
 * over anything with `data-cursor="Label"`, and into a larger ring over links and buttons.
 * Hidden on touch devices and with reduced motion. The native cursor is hidden only after the
 * first mouse move, so nothing breaks if scripts fail.
 */
export function CustomCursor() {
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const enabled = fine && !reduce;

  const root = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [mode, setMode] = useState<"idle" | "link" | "label">("idle");

  useEffect(() => {
    if (!enabled || !root.current) return;
    const el = root.current;
    const x = gsap.quickTo(el, "x", { duration: 0.18, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.18, ease: "power3" });
    let shown = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!shown) {
        shown = true;
        gsap.set(el, { x: e.clientX, y: e.clientY });
        document.documentElement.classList.add("has-custom-cursor");
        gsap.to(el, { opacity: 1, duration: 0.2 });
      }
      x(e.clientX);
      y(e.clientY);

      const target = (e.target as Element | null)?.closest<HTMLElement>(
        "[data-cursor], a, button, summary, [role='button'], input, select, textarea, label",
      );
      if (target?.dataset.cursor) {
        setLabel(target.dataset.cursor);
        setMode("label");
      } else if (target) {
        setLabel("");
        setMode("link");
      } else {
        setLabel("");
        setMode("idle");
      }
    };
    const onLeave = () => gsap.to(el, { opacity: 0, duration: 0.2 });
    const onEnter = () => {
      if (shown) gsap.to(el, { opacity: 1, duration: 0.2 });
    };

    const html = document.documentElement;
    window.addEventListener("pointermove", onMove, { passive: true });
    html.addEventListener("pointerleave", onLeave);
    html.addEventListener("pointerenter", onEnter);
    return () => {
      window.removeEventListener("pointermove", onMove);
      html.removeEventListener("pointerleave", onLeave);
      html.removeEventListener("pointerenter", onEnter);
      html.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = mode === "label" ? 84 : mode === "link" ? 44 : 22;

  return (
    <div ref={root} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[200] opacity-0">
      <div
        className="absolute flex items-center justify-center rounded-full border border-cyan-300 bg-navy-950/40 backdrop-blur-[2px] transition-[width,height,background-color] duration-300 ease-out"
        style={{
          width: size,
          height: size,
          left: -size / 2,
          top: -size / 2,
          backgroundColor: mode === "label" ? "rgb(0 140 203 / 0.92)" : undefined,
        }}
      >
        {mode === "label" ? (
          <span className="mono-label text-[0.6875rem] text-white">{label}</span>
        ) : (
          <>
            <span className="absolute h-px w-[140%] bg-cyan-300/70" />
            <span className="absolute h-[140%] w-px bg-cyan-300/70" />
          </>
        )}
      </div>
    </div>
  );
}
