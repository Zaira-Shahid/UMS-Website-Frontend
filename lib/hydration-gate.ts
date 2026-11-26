/**
 * A gate for work that should not compete with the first paint. `whenReady()` resolves on the first of:
 *   - the visitor scrolls, taps, presses a key or uses the wheel, or
 *   - 4 seconds after the page has finished loading (then at the browser's next idle moment).
 * On the server it resolves at once, so the server still renders everything.
 *
 * It is used to delay the hydration of sections below the fold (see components/home/islands.tsx) and the chat widget: their HTML
 * is already on the page, and they come alive just before the visitor can reach them.
 */
let gate: Promise<void> | undefined;

const AFTER_LOAD_MS = 4000;
const EVENTS = ["scroll", "wheel", "pointerdown", "touchstart", "keydown"] as const;

export function whenReady(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  gate ??= new Promise<void>((resolve) => {
    let done = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const go = () => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      for (const e of EVENTS) window.removeEventListener(e, go, true);
      resolve();
    };
    for (const e of EVENTS) window.addEventListener(e, go, { capture: true, passive: true });
    const afterLoad = () => {
      timer = setTimeout(() => {
        if ("requestIdleCallback" in window) window.requestIdleCallback(go, { timeout: 1000 });
        else go();
      }, AFTER_LOAD_MS);
    };
    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });
  });
  return gate;
}
