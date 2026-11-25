"use client";

import { ArrowUp } from "lucide-react";
import { getLenis } from "@/lib/motion/lenis-store";
import { cn } from "@/lib/utils";

/** Small "Back to top" text link. Scrolls smoothly, or instantly with reduced motion. */
export function BackToTop({ className }: { className?: string }) {
  const onClick = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: reduce, duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 self-start text-white/70 transition-colors hover:text-cyan-300 sm:self-auto",
        className,
      )}
    >
      Back to top <ArrowUp aria-hidden className="size-4" />
    </button>
  );
}
