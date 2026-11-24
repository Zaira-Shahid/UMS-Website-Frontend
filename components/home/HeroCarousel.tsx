"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Button } from "@/components/ui/Button";
import { SiteImage } from "@/components/ui/SiteImage";
import { heroSlides } from "@/content/home";
import { quoteHref } from "@/content/navigation";
import { cn } from "@/lib/utils";

const LINES = ["MEP Contracting", "for Complex", "Buildings"];
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Cinematic hero. The 7s autoplay timer IS the progress bar: when its CSS
 * animation ends the slide advances, and pausing just pauses that animation —
 * so what you see and what happens can never drift apart. Under
 * prefers-reduced-motion the animation is disabled, so nothing auto-rotates.
 */
export function HeroCarousel() {
  const reduce = useReducedMotion();
  const n = heroSlides.length;
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const swipeStart = useRef<number | null>(null);

  const paused = userPaused || hovered || focused;
  const slide = heroSlides[active];
  const next = heroSlides[(active + 1) % n];
  const fire = slide.accent === "fire";

  const go = (i: number) => setActive(((i % n) + n) % n);

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const to =
      e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : null;
    if (to === null) return;
    e.preventDefault();
    const idx = ((to % n) + n) % n;
    go(idx);
    tabRefs.current[idx]?.focus();
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="UMS services"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-900 text-white"
      style={{ touchAction: "pan-y" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      onPointerDown={(e) => {
        if (e.pointerType === "touch") swipeStart.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (swipeStart.current === null) return;
        const dx = e.clientX - swipeStart.current;
        swipeStart.current = null;
        if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
      }}
    >
      {/* Slides */}
      <div className="absolute inset-0 -z-10">
        {heroSlides.map((s, i) => {
          const on = i === active;
          return (
            <div
              key={s.service}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}: ${s.label}`}
              aria-hidden={!on}
              className={cn(
                "absolute inset-0 transition-opacity duration-[1100ms] ease-out",
                on ? "z-[1] opacity-100" : "opacity-0",
              )}
            >
              <div className={cn("absolute inset-0", on && "animate-ken-burns")}>
                {/* TODO: replace with approved UMS photography */}
                <SiteImage
                  asset={s.image}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  // Per-breakpoint focal point comes from content (heroSlides[].objectPosition).
                  style={
                    {
                      "--pos-m": s.objectPosition.mobile,
                      "--pos-d": s.objectPosition.desktop,
                    } as React.CSSProperties
                  }
                  className="object-cover [object-position:var(--pos-m)] md:[object-position:var(--pos-d)]"
                />
              </div>
            </div>
          );
        })}
        {/* Readability overlays */}
        <div aria-hidden className="absolute inset-0 z-[2] bg-gradient-to-r from-navy-900/90 via-navy-900/60 to-navy-900/25" />
        <div aria-hidden className="absolute inset-0 z-[2] bg-gradient-to-t from-navy-900 via-transparent to-navy-900/50" />
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 z-[2] bg-fire/20 mix-blend-multiply transition-opacity duration-[1100ms]",
            fire ? "opacity-100" : "opacity-0",
          )}
        />
        <BlueprintGrid variant="dark" className="z-[3] opacity-60" />
      </div>

      {/* Announce changes only when not auto-rotating (WAI carousel pattern). */}
      <p className="sr-only" aria-live={paused ? "polite" : "off"}>
        {`Slide ${active + 1} of ${n}: ${slide.label}`}
      </p>

      {/* Copy */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-10 pt-[calc(var(--header-h)+2.5rem)] sm:px-8">
        <div className="h-6 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={active}
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: 0 }}
              exit={reduce ? undefined : { y: "-110%" }}
              transition={{ duration: 0.45, ease: EASE }}
              className="flex items-center gap-3 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.14em]"
            >
              <span aria-hidden className={cn("h-px w-8 transition-colors", fire ? "bg-fire" : "bg-cyan-300")} />
              <span className={fire ? "text-[#ff8a82]" : "text-cyan-300"}>{slide.label}</span>
            </motion.p>
          </AnimatePresence>
        </div>

        <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,1.5rem+4.8vw,5.75rem)] text-white">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.1em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.15 + i * 0.1, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          className="mt-6 max-w-xl text-lg text-white/80"
        >
          HVAC, fire protection, electrical and plumbing services for complex developments.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Button
            href={quoteHref({ service: slide.service })}
            variant={fire ? "fire" : "accent"}
            size="lg"
            magnetic
            arrow
            className="w-full sm:w-auto"
          >
            Request a Quote
          </Button>
          <Button href="/projects" variant="outline-light" size="lg" className="w-full sm:w-auto">
            Explore Projects
          </Button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div aria-hidden className="absolute bottom-44 right-8 hidden items-center gap-3 xl:flex">
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-white/60 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="relative h-16 w-px overflow-hidden bg-white/20">
          <span className="animate-scroll-cue absolute inset-x-0 top-0 h-full bg-cyan-300" />
        </span>
      </div>

      {/* Control bar — bottom margin reserves the space the shortcut cards overlap */}
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-28 sm:px-8 md:pb-32">
        {/* Below 640px the tabs get their own full-width row so short labels never truncate. */}
        <div className="flex flex-col gap-3 border-t border-white/20 pt-4 sm:flex-row sm:items-end sm:gap-6">
          <div
            role="tablist"
            aria-label="Choose a service slide"
            className="grid w-full flex-1 grid-cols-4 gap-3 sm:gap-4"
          >
            {heroSlides.map((s, i) => {
              const on = i === active;
              const barFire = s.accent === "fire";
              return (
                <button
                  key={s.service}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`hero-tab-${i}`}
                  aria-selected={on}
                  aria-label={s.label}
                  tabIndex={on ? 0 : -1}
                  onClick={() => go(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={cn(
                    "group/tab min-h-11 pt-1 text-left transition-colors",
                    on ? "text-white" : "text-white/55 hover:text-white",
                  )}
                >
                  {/* Short label below 1280px, number + full label above. Never truncated. */}
                  <span className="flex items-baseline gap-2 whitespace-nowrap font-heading text-[0.6875rem] font-semibold uppercase tracking-[0.06em] sm:text-xs xl:text-[0.8125rem] xl:tracking-[0.1em]">
                    <span className="hidden tabular-nums xl:inline">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="xl:hidden">{s.shortLabel}</span>
                    <span className="hidden xl:inline">{s.label}</span>
                  </span>
                  <span className="relative mt-2 block h-0.5 w-full overflow-hidden bg-white/25">
                    {on && (
                      <span
                        key={active}
                        onAnimationEnd={() => go(active + 1)}
                        style={{ animationPlayState: paused ? "paused" : "running" }}
                        className={cn(
                          "animate-hero-progress absolute inset-0",
                          barFire ? "bg-fire" : "bg-cyan-300",
                        )}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Next preview */}
          <button
            type="button"
            onClick={() => go(active + 1)}
            className="group/next hidden items-center gap-3 text-left xl:flex"
            aria-label={`Next slide: ${next.label}`}
          >
            <span className="relative h-12 w-20 overflow-hidden border border-white/30">
              <SiteImage
                asset={{ ...next.image, position: next.objectPosition.desktop }}
                fill
                sizes="80px"
                className="object-cover transition-transform duration-500 group-hover/next:scale-110"
              />
            </span>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.12em]">
              <span className="block text-white/55">Next</span>
              <span className="block text-white">{next.label}</span>
            </span>
          </button>

          {/* Controls */}
          <div className="flex gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous slide"
              className="flex size-11 items-center justify-center rounded-ums border border-white/30 transition-colors hover:border-white hover:bg-white hover:text-navy"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            {!reduce && (
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
                className="flex size-11 items-center justify-center rounded-ums border border-white/30 transition-colors hover:border-white hover:bg-white hover:text-navy"
              >
                {userPaused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
              </button>
            )}
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next slide"
              className="flex size-11 items-center justify-center rounded-ums border border-white/30 transition-colors hover:border-white hover:bg-white hover:text-navy"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
