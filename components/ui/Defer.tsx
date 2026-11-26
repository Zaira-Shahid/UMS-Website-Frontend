"use client";

import { Suspense, use, type ReactNode } from "react";
import { whenReady } from "@/lib/hydration-gate";

function Gate({ children }: { children: ReactNode }) {
  // In the browser this holds back hydration of the section until the visitor is about to reach it (see lib/hydration-gate.ts).
  // The server never waits, so the section's full HTML is always on the page; React simply leaves it as plain HTML until then.
  if (typeof window !== "undefined") use(whenReady());
  return <>{children}</>;
}

/**
 * Wraps a section that needs no interaction (or that has its own small island) so React does not spend the first seconds of the
 * page hydrating it. It looks and reads the same before and after; a tap or scroll inside it brings it to life straight away.
 */
export function Defer({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <Gate>{children}</Gate>
    </Suspense>
  );
}
