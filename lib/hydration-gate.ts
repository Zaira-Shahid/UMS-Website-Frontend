/**
 * `whenInteracted()` resolves on the visitor's first scroll, wheel, tap, mouse move or key press (and never on a timer). It is
 * used for work that nothing on the first screen needs, such as the chat assistant and the code of the full-screen menu: it
 * stays out of the way of the first paint, and is ready by the time anyone could use it. On the server it never resolves.
 * (Sections of a page hydrate when they come into view instead; see components/ui/Defer.tsx.)
 */
let gate: Promise<void> | undefined;

const EVENTS = ["scroll", "wheel", "pointerdown", "pointermove", "touchstart", "keydown"] as const;

export function whenInteracted(): Promise<void> {
  if (typeof window === "undefined") return new Promise<void>(() => {});
  gate ??= new Promise<void>((resolve) => {
    const go = () => {
      for (const e of EVENTS) window.removeEventListener(e, go, true);
      resolve();
    };
    for (const e of EVENTS) window.addEventListener(e, go, { capture: true, passive: true });
  });
  return gate;
}
