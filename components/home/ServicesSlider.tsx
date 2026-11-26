"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ServiceCard } from "@/components/ui/Card";
import { ServiceIcon, serviceColor } from "@/components/ui/ServiceIcon";
import { sliderArt, sliderLine, sliderOrder, sliderTitle } from "@/content/home";
import { chipOrder, serviceLabel } from "@/content/service-labels";
import { cn } from "@/lib/utils";

/** How long each service stays on screen, and how long after the last interaction autoplay waits before it resumes. */
const SLIDE_MS = 4000;
const RESUME_MS = 3000;

/**
 * H2 Services (mockups 01 and 02). A slider on every screen size: the active service large, with the next one peeking in
 * from the right (desktop and tablet) or stacked under its picture (phones). It advances by itself every 4 seconds; the
 * progress bar fills over those 4 seconds and its end moves the slider on. Autoplay pauses on hover, on focus inside the
 * slider, while swiping and when the visitor presses the pause button, and resumes 3 seconds after the interaction ends.
 * With reduced motion it never autoplays. Other controls: the arrow buttons, the left/right keys, swiping, or clicking the
 * peeking slide. On phones the "Our Services" grid of links stays below the slider.
 */
export function ServicesSlider() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(true); // assume reduced until measured, so nothing animates before we know
  const [userPaused, setUserPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const count = sliderOrder.length;
  const startX = useRef<number | null>(null);
  const region = useRef<HTMLDivElement>(null);
  const refocus = useRef<"next" | "prev" | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  // The arrow buttons live inside the active slide, so give focus back to the new slide's button after a manual move.
  useEffect(() => {
    if (!refocus.current) return;
    const dir = refocus.current;
    refocus.current = null;
    const root = region.current;
    const visible = (sel: string) => Array.from(root?.querySelectorAll<HTMLElement>(sel) ?? []).find((el) => el.offsetParent !== null);
    (visible(`[data-active] [data-dir="${dir}"]`) ?? visible("[data-active] [data-dir=next]"))?.focus();
  }, [index]);

  const hold = useCallback(() => {
    clearTimeout(resumeTimer.current);
    setInteracting(true);
  }, []);
  const release = useCallback(() => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setInteracting(false), RESUME_MS);
  }, []);

  const go = (i: number) => setIndex(Math.min(count - 1, Math.max(0, i)));
  const next = () => {
    refocus.current = "next";
    setIndex((i) => (i + 1) % count);
  };
  const prev = () => {
    refocus.current = "prev";
    setIndex((i) => (i - 1 + count) % count);
  };
  // The progress bar finished its 4 seconds: move on (and loop back to the first service after the last).
  const advance = () => setIndex((i) => (i + 1) % count);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };
  const onPointerDown = (e: PointerEvent) => {
    startX.current = e.clientX;
    hold();
  };
  const endSwipe = (e?: PointerEvent) => {
    if (e && startX.current !== null) {
      const dx = e.clientX - startX.current;
      if (dx < -50) go(index + 1);
      else if (dx > 50) go(index - 1);
    }
    startX.current = null;
    release();
  };

  const running = !reduced && !userPaused && !interacting;

  return (
    <section aria-labelledby="services-title" className="bg-sky-50">
      <div className="wrap pt-7 md:hidden">
        <h2 id="services-title" className="text-[1.375rem] font-extrabold text-navy">
          Our Services
        </h2>
      </div>

      <div
        ref={region}
        role="region"
        aria-roledescription="carousel"
        aria-label="Our services"
        onKeyDown={onKeyDown}
        onMouseEnter={hold}
        onMouseLeave={release}
        onFocusCapture={hold}
        onBlurCapture={release}
        className="relative overflow-hidden"
      >
        <h2 className="sr-only max-md:hidden">Our Services</h2>
        <div
          onPointerDown={onPointerDown}
          onPointerUp={endSwipe}
          onPointerCancel={() => endSwipe()}
          onDragStart={(e) => e.preventDefault()}
          className="flex touch-pan-y select-none py-6 transition-transform duration-[450ms] ease-out [--slide:88%] motion-reduce:transition-none md:py-8 md:[--slide:74%]"
          style={{ transform: `translateX(calc(${index} * -1 * var(--slide)))` }}
        >
          {sliderOrder.map((slug, i) => {
            const art = sliderArt[slug];
            const active = i === index;
            const color = serviceColor(slug);
            return (
              <div
                key={slug}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={active ? undefined : true}
                data-active={active ? "" : undefined}
                onClick={!active ? () => go(i) : undefined}
                className={cn(
                  "flex w-[var(--slide)] shrink-0 flex-col gap-4 px-4 transition-opacity duration-500 motion-reduce:transition-none md:flex-row md:items-center md:gap-[3%] md:px-0",
                  !active && "cursor-pointer",
                  i > index && "md:border-l md:border-line md:pl-8",
                  active && "md:pl-[clamp(1.25rem,3.2vw,3rem)]",
                )}
              >
                {/* Picture container: white, rounded, thin border, soft shadow, padded, fixed 4:3 ratio, picture contained inside */}
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl border border-[#dce7f1] bg-white p-5 shadow-card md:w-[38%] md:max-w-[26rem] md:p-6">
                  {art ? (
                    <Image src={art.src} alt="" fill sizes="(min-width: 1024px) 26rem, (min-width: 768px) 38vw, 88vw" draggable={false} className="object-contain p-5 md:p-6" />
                  ) : (
                    <span
                      className="flex size-full items-center justify-center rounded-xl"
                      style={{ background: `color-mix(in srgb, ${color} 12%, white)`, color }}
                    >
                      <ServiceIcon slug={slug} className="size-20 lg:size-24" />
                    </span>
                  )}
                </div>

                <div className="min-w-0 max-w-[28rem] flex-1">
                  <div className="flex items-center gap-4">
                    <div className={cn("min-w-0 flex-1 border-l-4 pl-4", active ? "border-blue" : "border-transparent")}>
                      <h3 className="text-[clamp(1.75rem,1rem+1.8vw,2.5rem)] font-extrabold leading-tight text-navy">
                        {active ? (
                          <Link href={`/services/${slug}`} draggable={false} className="hover:text-blue-700">
                            {sliderTitle[slug]}
                          </Link>
                        ) : (
                          sliderTitle[slug]
                        )}
                      </h3>
                      <p className="mt-2 text-[1.0625rem] leading-snug text-muted">{sliderLine[slug]}</p>
                    </div>
                    {active && (
                      <div className="flex shrink-0 items-center gap-1 max-md:hidden md:flex-col">
                        <button
                          type="button"
                          data-dir="next"
                          onClick={next}
                          aria-label="Next service"
                          className="flex size-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-white hover:text-blue-700"
                        >
                          <ChevronRight aria-hidden className="size-6" />
                        </button>
                        {index > 0 && (
                          <button
                            type="button"
                            data-dir="prev"
                            onClick={prev}
                            aria-label="Previous service"
                            className="flex size-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-white hover:text-blue-700"
                          >
                            <ChevronLeft aria-hidden className="size-6" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {active && (
                    <div className="mt-4 flex items-center gap-3">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#c9d8e6]" role="presentation">
                        {reduced ? (
                          // Reduced motion: no autoplay, so the bar shows the position in the list.
                          <div className="h-full rounded-full bg-blue" style={{ width: `${((index + 1) / count) * 100}%` }} />
                        ) : (
                          <div
                            key={index}
                            onAnimationEnd={advance}
                            className="slider-progress h-full rounded-full bg-blue"
                            style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: running ? "running" : "paused" }}
                          />
                        )}
                      </div>
                      {!reduced && (
                        <button
                          type="button"
                          onClick={() => setUserPaused((p) => !p)}
                          aria-label={userPaused ? "Play automatic slide show" : "Pause automatic slide show"}
                          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#c9d8e6] bg-white text-navy transition-colors hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                        >
                          {userPaused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
                        </button>
                      )}
                      <span className="flex gap-1 md:hidden">
                        <button type="button" onClick={prev} aria-label="Previous service" className="flex size-9 items-center justify-center rounded-full border border-[#c9d8e6] bg-white text-navy">
                          <ChevronLeft aria-hidden className="size-5" />
                        </button>
                        <button type="button" data-dir="next" onClick={next} aria-label="Next service" className="flex size-9 items-center justify-center rounded-full border border-[#c9d8e6] bg-white text-navy">
                          <ChevronRight aria-hidden className="size-5" />
                        </button>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          {running ? "" : `${sliderTitle[sliderOrder[index]]}, ${index + 1} of ${count}`}
        </p>
      </div>

      {/* Phones: the grid of links to every service stays under the slider */}
      <div className="wrap pb-7 md:hidden">
        <ul className="grid grid-cols-2 gap-3">
          {chipOrder.map((slug) => (
            <li key={slug}>
              <ServiceCard slug={slug} label={serviceLabel[slug]} compact className="h-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
