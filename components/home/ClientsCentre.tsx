"use client";

import { useEffect } from "react";

/**
 * Highlights the logo card nearest the middle of the Clients row (mockup 05). It renders nothing; it only sets
 * `data-center="true"` on that card (and its duplicate in the looping copy), and CSS draws the blue border and the slight scale.
 *
 * It is cheap by design: the row's position is derived from the CSS animation's own clock (no layout reads while it runs), the
 * card sizes are measured once and again only when the row is resized, it updates about ten times a second, and it does
 * nothing while the row is off screen. With reduced motion the row does not move, so nothing is highlighted.
 */
export function ClientsCentre({ rowId }: { rowId: string }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const row = document.getElementById(rowId);
    const list = row?.querySelector("ul");
    if (!row || !list) return;
    const items = Array.from(list.children) as HTMLElement[];
    const n = items.length / 2;
    if (n < 2 || !Number.isInteger(n)) return;

    let pitch = 0;
    let cardW = 0;
    let padLeft = 0;
    let viewW = 0;
    const measure = () => {
      pitch = items[1].offsetLeft - items[0].offsetLeft;
      cardW = items[0].offsetWidth;
      padLeft = items[0].offsetLeft;
      viewW = row.clientWidth;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);

    let current = -1;
    const tick = () => {
      const anim = list.getAnimations()[0];
      const duration = Number(anim?.effect?.getTiming().duration);
      if (!anim || !duration || !pitch) return;
      const progress = (Number(anim.currentTime) % duration) / duration;
      const offset = progress * n * pitch; // how far the row has moved left
      const index = Math.round((viewW / 2 + offset - padLeft - cardW / 2) / pitch);
      const next = ((index % n) + n) % n;
      if (next === current) return;
      if (current >= 0) {
        items[current].removeAttribute("data-center");
        items[current + n].removeAttribute("data-center");
      }
      items[next].setAttribute("data-center", "true");
      items[next + n].setAttribute("data-center", "true");
      current = next;
    };

    let timer: number | undefined;
    const start = () => {
      if (timer === undefined) {
        tick();
        timer = window.setInterval(tick, 100);
      }
    };
    const stop = () => {
      if (timer !== undefined) window.clearInterval(timer);
      timer = undefined;
    };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(row);
    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
    };
  }, [rowId]);
  return null;
}
