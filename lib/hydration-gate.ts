/**
 * `whenInteracted()` resolves on the visitor's first scroll, wheel, tap, mouse move or key press (and never on a timer). It is
 * used for work that nothing on the first screen needs, such as the chat assistant and the code of the full-screen menu: it
 * stays out of the way of the first paint, and is ready by the time anyone could use it. On the server it never resolves.
 * (Sections of a page hydrate when they come into view instead; see components/ui/Defer.tsx.)
 */
function gateOn(events: readonly string[]): () => Promise<void> {
  let gate: Promise<void> | undefined;
  return () => {
    if (typeof window === "undefined") return new Promise<void>(() => {});
    gate ??= new Promise<void>((resolve) => {
      const go = () => {
        for (const e of events) window.removeEventListener(e, go, true);
        resolve();
      };
      for (const e of events) window.addEventListener(e, go, { capture: true, passive: true });
    });
    return gate;
  };
}

/** First scroll, wheel, tap, mouse move or key press. */
export const whenInteracted = gateOn(["scroll", "wheel", "pointerdown", "pointermove", "touchstart", "keydown"]);

/**
 * First press: a click, tap or key press (not a scroll or a mouse move). Deferred sections open on it as well as on becoming
 * visible: a link press starts a page change, and a page change cannot finish while a section that React still has to
 * hydrate is held back.
 */
export const whenPressed = gateOn(["pointerdown", "touchstart", "keydown"]);
