"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * For a row of tabs or pills that scrolls sideways on small screens.
 * - Returns `more`: true while there is more to scroll to on the right, so a fade can hint at it (and disappear at the end).
 * - Whenever `activeKey` changes (and on first render) the active item ([aria-selected="true"] or [aria-current="true"]) is
 *   scrolled to the middle of the row. The page itself never scrolls, only the row.
 */
export function useScrollRow(ref: RefObject<HTMLElement | null>, activeKey: string | number | null) {
  const [more, setMore] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setMore(el.scrollWidth - el.clientWidth - el.scrollLeft > 4);
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    const item = el.querySelector<HTMLElement>('[aria-selected="true"], [aria-current="true"]');
    if (!item) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // offsetLeft is measured from the row's offset parent, so use bounding boxes to stay independent of positioning.
    const box = el.getBoundingClientRect();
    const target = item.getBoundingClientRect();
    const left = el.scrollLeft + (target.left - box.left) - (box.width - target.width) / 2;
    el.scrollTo({ left: Math.max(0, left), behavior: reduced ? "auto" : "smooth" });
  }, [ref, activeKey]);

  return more;
}
