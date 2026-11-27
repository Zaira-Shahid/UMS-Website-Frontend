"use client";

import { whenPressed } from "@/lib/hydration-gate";
import { Suspense, use, useEffect, useRef, useState, type ReactNode } from "react";

type Latch = { promise: Promise<void>; open: () => void };

function makeLatch(): Latch {
  let open!: () => void;
  const promise = new Promise<void>((r) => (open = r));
  return { promise, open };
}

function Gate({ latch, children }: { latch?: Latch; children: ReactNode }) {
  // While the latch is closed, React leaves this section as the plain HTML the server sent; opening it hydrates the section.
  if (latch) use(latch.promise);
  return <>{children}</>;
}

/**
 * Wraps a section that needs no interaction (or that has its own small island) so React does not hydrate it during the first
 * paint. The server sends its full HTML, so it looks and reads the same before and after. It hydrates when it is about to scroll
 * into view (300px ahead); any click, tap or key press on the page opens it too (a link press starts a page change, which cannot finish while a section is held back).
 */
export function Defer({ children }: { children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [latch] = useState<Latch | undefined>(() => (typeof window === "undefined" ? undefined : makeLatch()));

  useEffect(() => {
    const el = box.current;
    if (!latch || !el) return;
    whenPressed().then(latch.open);
    if (!("IntersectionObserver" in window)) return latch.open();
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          latch.open();
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [latch]);

  return (
    <div ref={box}>
      <Suspense fallback={null}>
        <Gate latch={latch}>{children}</Gate>
      </Suspense>
    </div>
  );
}
