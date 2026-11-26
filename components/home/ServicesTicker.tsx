"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, type FocusEvent as ReactFocusEvent, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { sliderLine, sliderOrder, sliderTitle } from "@/content/home";
import { cn } from "@/lib/utils";
import type { ServiceSlug } from "@/types";

/** One full loop of the six cards, in seconds, at full speed. */
const LOOP_S = 40;
/** While the mouse is over the ticker it moves at this fraction of full speed, so a card can be read and clicked. */
const HOVER_SPEED = 0.4;
/** After a drag, a wheel, an arrow or the end of keyboard focus, the ticker waits this long before moving on by itself. */
const RESUME_MS = 1500;
/** A press that moves less than this many pixels is a click, not a drag. */
const DRAG_PX = 6;
/** Time for the glide after a drag (ease-out). The time constant is a third of it. */
const GLIDE_S = 0.6;
/** Time for an arrow or keyboard step of one card. */
const STEP_MS = 450;
/** Copies of the list: two cover every screen up to 1536px; a third is shown only on wider ones. */
const COPIES = [0, 1, 2];

/** One service as one card: a photo on top and, inside the same card, the title, a short line and "Explore Service". */
function ServiceTile({ slug, hidden }: { slug: ServiceSlug; hidden: boolean }) {
  return (
    <article className="group relative flex h-full w-[210px] shrink-0 flex-col overflow-hidden rounded-2xl border border-[#dce7f1] bg-white shadow-card transition-shadow duration-200 hover:shadow-lg md:w-[240px]">
      <div className="relative h-[120px] shrink-0 overflow-hidden rounded-t-2xl bg-[#e4eef7] md:h-[140px]">
        {/* The photos are wide (about 3:1) and the frame is shorter than wide, so ask for a source wide enough to stay sharp when scaled to the frame's height. */}
        <Image src={`/images/services/${slug}/card.jpg`} alt="" fill sizes="(min-width: 768px) 420px, 380px" draggable={false} className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-[14px]">
        <h3 className="font-heading text-[17px] font-bold leading-tight text-navy">{sliderTitle[slug]}</h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-muted">{sliderLine[slug]}</p>
        <Link
          href={`/services/${slug}`}
          draggable={false}
          tabIndex={hidden ? -1 : undefined}
          className="mt-auto inline-flex items-center gap-1 pt-3 font-heading text-[13px] font-bold text-blue-700 after:absolute after:inset-0 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
        >
          Explore Service
          <span className="sr-only"> {sliderTitle[slug]}</span>
          <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
        </Link>
      </div>
    </article>
  );
}

interface Motion {
  /** Distance the row has moved left, in pixels; always kept between 0 and one loop's width. */
  pos: number;
  mode: "free" | "drag" | "glide";
  vel: number;
  idleUntil: number;
  tween: { from: number; to: number; start: number; dur: number } | null;
  speed: number;
  last: number;
  loop: number;
  pitch: number;
  hover: boolean;
  kbFocus: boolean;
  reduced: boolean;
  onScreen: boolean;
  tabVisible: boolean;
  raf: number;
}

/**
 * H2 Services: a continuous, news-ticker-style loop of the six service cards that is also under the visitor's hand.
 * One animation loop owns the row's position, so everything works together:
 * - it moves on its own at a constant speed (about 40 s a loop) and slows to 40% while the mouse is over it;
 * - mouse drag, touch swipe (vertical page scrolling is untouched), horizontal wheel or trackpad, the arrow buttons and the
 *   left/right keys all move it by hand; after a drag it glides to a stop; it moves on by itself 1.5 s after the last touch;
 * - a press that moves less than 6 px is a click and opens the service; a drag never does;
 * - the loop is endless in both directions;
 * - with reduced motion it never moves by itself and has no glide, but every manual control still works.
 * Keyboard focus inside a card stops the automatic motion until focus leaves.
 */
export function ServicesTicker() {
  const box = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const firstCopy = useRef<HTMLUListElement>(null);
  const m = useRef<Motion>({
    pos: 0,
    mode: "free",
    vel: 0,
    idleUntil: 0,
    tween: null,
    speed: 1,
    last: 0,
    loop: 1,
    pitch: 1,
    hover: false,
    kbFocus: false,
    reduced: false,
    onScreen: true,
    tabVisible: true,
    raf: 0,
  });
  const press = useRef<{ id: number; x: number; y: number; pos: number; moved: boolean; samples: { t: number; x: number }[] } | null>(null);
  const suppressClick = useRef(false);

  const apply = useCallback(() => {
    const s = m.current;
    s.pos = ((s.pos % s.loop) + s.loop) % s.loop;
    if (track.current) track.current.style.transform = `translate3d(${-s.pos}px,0,0)`;
  }, []);

  const needsFrames = () => {
    const s = m.current;
    if (!s.onScreen || !s.tabVisible) return false;
    return !s.reduced || s.tween !== null || s.mode === "glide";
  };

  const tick = useCallback(
    (t: number) => {
      const s = m.current;
      s.raf = 0;
      const dt = Math.min(t - (s.last || t), 50) / 1000;
      s.last = t;
      if (s.tween) {
        const k = Math.min(1, (t - s.tween.start) / s.tween.dur);
        const e = 1 - Math.pow(1 - k, 3);
        s.pos = s.tween.from + (s.tween.to - s.tween.from) * e;
        if (k >= 1) {
          s.tween = null;
          s.idleUntil = t + RESUME_MS;
        }
      } else if (s.mode === "glide") {
        s.pos += s.vel * dt;
        s.vel *= Math.exp(-dt / (GLIDE_S / 3));
        if (Math.abs(s.vel) < 8) {
          s.mode = "free";
          s.vel = 0;
        }
      } else if (s.mode === "free" && !s.reduced && !s.kbFocus && t >= s.idleUntil) {
        // Constant speed; it eases toward 40% while the mouse is over the ticker and back to 100% when it leaves.
        const target = s.hover ? HOVER_SPEED : 1;
        s.speed += (target - s.speed) * Math.min(1, dt * 8);
        s.pos += (s.loop / LOOP_S) * s.speed * dt;
      }
      apply();
      if (needsFrames()) s.raf = requestAnimationFrame(tick);
      else s.last = 0;
    },
    [apply],
  );
  const kick = useCallback(() => {
    const s = m.current;
    if (!s.raf && needsFrames()) {
      s.last = 0;
      s.raf = requestAnimationFrame(tick);
    }
  }, [tick]);

  /** Move by a distance in pixels with an ease-out (an arrow, a key, or bringing a focused card into view). */
  const tweenBy = useCallback(
    (dx: number) => {
      const s = m.current;
      // Quick repeated presses add up: each starts from where the last one is going.
      const from = s.tween ? s.tween.to : s.pos;
      if (s.reduced) {
        s.pos = from + dx;
        s.tween = null;
        s.idleUntil = performance.now() + RESUME_MS;
        apply();
        return;
      }
      s.mode = "free";
      s.vel = 0;
      s.tween = { from: s.pos, to: from + dx, start: performance.now(), dur: STEP_MS };
      kick();
    },
    [apply, kick],
  );

  const measure = useCallback(() => {
    const s = m.current;
    const first = firstCopy.current;
    if (!first) return;
    s.loop = first.offsetWidth || 1;
    const items = first.children;
    s.pitch = items.length > 1 ? (items[1] as HTMLElement).offsetLeft - (items[0] as HTMLElement).offsetLeft : 256;
    apply();
  }, [apply]);

  useEffect(() => {
    const s = m.current;
    const el = box.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => {
      s.reduced = mq.matches;
      kick();
    };
    onMq();
    mq.addEventListener("change", onMq);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(firstCopy.current!);
    const io = new IntersectionObserver(([e]) => {
      s.onScreen = e.isIntersecting;
      kick();
    }, { threshold: 0.05 });
    io.observe(el);
    const onVis = () => {
      s.tabVisible = !document.hidden;
      kick();
    };
    document.addEventListener("visibilitychange", onVis);
    // Horizontal wheel or trackpad (and shift + wheel) move the row; an ordinary vertical wheel still scrolls the page.
    const onWheel = (e: WheelEvent) => {
      const dx = e.shiftKey ? e.deltaY : e.deltaX;
      if (!e.shiftKey && Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? el.clientWidth : 1;
      s.mode = "free";
      s.tween = null;
      s.pos += dx * unit;
      s.idleUntil = performance.now() + RESUME_MS;
      apply();
      kick();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      mq.removeEventListener("change", onMq);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      el.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(s.raf);
      s.raf = 0;
    };
  }, [apply, kick, measure]);

  /* ---------- drag (mouse) and swipe (touch and pen) ---------- */
  const onPointerDown = (e: ReactPointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const s = m.current;
    suppressClick.current = false;
    press.current = { id: e.pointerId, x: e.clientX, y: e.clientY, pos: s.pos, moved: false, samples: [{ t: performance.now(), x: e.clientX }] };
    const move = (ev: PointerEvent) => {
      const p = press.current;
      if (!p || ev.pointerId !== p.id) return;
      const dx = ev.clientX - p.x;
      if (!p.moved && Math.abs(dx) >= DRAG_PX) {
        p.moved = true;
        suppressClick.current = true;
        s.mode = "drag";
        s.tween = null;
        s.vel = 0;
        box.current?.setAttribute("data-dragging", "true");
        window.getSelection()?.removeAllRanges();
      }
      if (p.moved) {
        s.pos = p.pos - dx;
        const now = performance.now();
        p.samples.push({ t: now, x: ev.clientX });
        while (p.samples.length > 2 && now - p.samples[0].t > 100) p.samples.shift();
        apply();
      }
    };
    const end = (ev: PointerEvent) => {
      const p = press.current;
      if (!p || ev.pointerId !== p.id) return;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
      press.current = null;
      box.current?.removeAttribute("data-dragging");
      if (!p.moved) return;
      const now = performance.now();
      const first = p.samples[0];
      const last = p.samples[p.samples.length - 1];
      const span = last.t - first.t;
      // Velocity in pixels per second (dragging left moves the row forward), capped so a flick is never wild. A pause before
      // letting go, a cancelled gesture or reduced motion means no glide.
      const flick = ev.type === "pointerup" && !s.reduced && now - last.t < 120 && span > 10;
      const v = flick ? Math.max(-3000, Math.min(3000, ((first.x - last.x) / span) * 1000)) : 0;
      // The ticker moves on by itself again 1.5 s after the finger or mouse is let go (the glide fits inside that time).
      s.idleUntil = now + RESUME_MS;
      if (Math.abs(v) > 40) {
        s.mode = "glide";
        s.vel = v;
      } else {
        s.mode = "free";
      }
      kick();
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  };

  /* ---------- keyboard ---------- */
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      tweenBy(e.key === "ArrowRight" ? m.current.pitch : -m.current.pitch);
    }
  };
  const onFocusCapture = (e: ReactFocusEvent) => {
    const t = e.target as HTMLElement;
    if (!t.matches(":focus-visible")) return; // a mouse click on an arrow must not stop the ticker
    const s = m.current;
    s.kbFocus = true;
    // Bring a card that is partly out of sight fully into view.
    const card = t.closest("article");
    const b = box.current;
    if (card && b) {
      const r = card.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      if (r.left < br.left + 8 || r.right > br.right - 8) tweenBy(r.left - br.left - (br.width - r.width) / 2);
    }
  };
  const onBlurCapture = (e: ReactFocusEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
    const s = m.current;
    s.kbFocus = false;
    s.idleUntil = performance.now() + RESUME_MS;
    kick();
  };

  const step = (dir: 1 | -1) => tweenBy(dir * m.current.pitch);

  return (
    <section aria-labelledby="services-title" className="bg-sky-50 pb-9 pt-14 md:pb-10">
      {/* Section heading, in the style of the other homepage sections: accent bar, two-tone title, a short line and one link. */}
      <div className="wrap flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionTitle id="services-title" lead="Our" accent="Services" />
          <p className="mt-2 text-[1.0625rem] text-muted">Six MEP disciplines, delivered as one coordinated scope.</p>
        </div>
        <Link
          href="/services"
          className="group inline-flex items-center gap-1.5 self-start font-heading text-[1.0625rem] font-bold text-blue-700 transition-colors hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue md:self-auto md:pb-1"
        >
          View all services
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
        </Link>
      </div>

      <div className="relative mt-8">
        <div
          ref={box}
          role="region"
          aria-roledescription="carousel"
          aria-labelledby="services-title"
          onPointerDown={onPointerDown}
          onClickCapture={(e) => {
            // A drag must never open a card: swallow the click that follows it.
            if (suppressClick.current) {
              e.preventDefault();
              e.stopPropagation();
              suppressClick.current = false;
            }
          }}
          onDragStart={(e) => e.preventDefault()}
          onKeyDown={onKeyDown}
          onFocusCapture={onFocusCapture}
          onBlurCapture={onBlurCapture}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") m.current.hover = true;
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") m.current.hover = false;
          }}
          className="ticker cursor-grab touch-pan-y select-none overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]"
        >
          <div ref={track} className="flex w-max will-change-transform">
            {COPIES.map((c) => (
              <ul
                key={c}
                ref={c === 0 ? firstCopy : undefined}
                aria-label={c === 0 ? "Services" : undefined}
                aria-hidden={c === 0 ? undefined : true}
                className={cn("flex gap-4 py-3 pr-4", c === 2 && "hidden min-[1537px]:flex")}
              >
                {sliderOrder.map((slug) => (
                  <li key={slug} className="flex">
                    <ServiceTile slug={slug} hidden={c !== 0} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Arrow buttons: one card per press (desktop; on phones the row is swiped) */}
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous service"
          className="absolute left-3 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#dce7f1] bg-white text-navy shadow-card transition-colors hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue md:flex"
        >
          <ChevronLeft aria-hidden className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next service"
          className="absolute right-3 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#dce7f1] bg-white text-navy shadow-card transition-colors hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue md:flex"
        >
          <ChevronRight aria-hidden className="size-5" />
        </button>
      </div>
    </section>
  );
}
