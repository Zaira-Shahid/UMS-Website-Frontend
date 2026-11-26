"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ServiceIcon, serviceColor } from "@/components/ui/ServiceIcon";
import { sliderArt, sliderLine, sliderOrder, sliderTitle } from "@/content/home";
import { cn } from "@/lib/utils";
import type { ServiceSlug } from "@/types";

/** One full loop of the six cards, in seconds (constant speed). */
const LOOP_S = 40;
/** After the visitor stops touching or dragging, the ticker waits this long before it moves again. */
const RESUME_MS = 3000;
/** The list is shown twice (a third copy appears only on screens 1700px and wider), so the loop never runs out. */
const COPIES = [0, 1, 2];

/** One service as one card: the picture on top and, inside the same card, the title, the line and "Explore Service". */
function ServiceTile({ slug }: { slug: ServiceSlug }) {
  const art = sliderArt[slug];
  const color = serviceColor(slug);
  return (
    <article className="group relative flex w-[260px] shrink-0 flex-col overflow-hidden rounded-2xl border border-[#dce7f1] bg-white shadow-card transition-shadow duration-200 hover:shadow-lg md:w-[300px]">
      {/* Picture: fixed 4:3 frame on a light background, picture contained inside it */}
      <div className="relative aspect-[4/3] bg-[#f2f7fb]">
        {art ? (
          <Image src={art.src} alt="" fill sizes="300px" draggable={false} className="object-contain p-4" />
        ) : (
          <span className="absolute inset-4 flex items-center justify-center rounded-xl" style={{ background: `color-mix(in srgb, ${color} 12%, white)`, color }}>
            <ServiceIcon slug={slug} className="size-20" />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-[1.5rem] font-bold leading-tight text-navy">{sliderTitle[slug]}</h3>
        <p className="mt-2 text-base leading-snug text-muted">{sliderLine[slug]}</p>
        <Link
          href={`/services/${slug}`}
          draggable={false}
          className="mt-4 inline-flex items-center gap-1.5 pt-1 font-heading text-[1.0625rem] font-bold text-blue-700 after:absolute after:inset-0 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
        >
          Explore Service
          <span className="sr-only"> {sliderTitle[slug]}</span>
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
        </Link>
      </div>
    </article>
  );
}

/**
 * H2 Services: a continuous, news-ticker-style loop of the six service cards. A CSS transform animation moves the list at
 * a constant speed (about 40 seconds a loop). It pauses on hover (on devices that hover), on keyboard focus, off-screen and
 * with the pause button. Touch dragging hands the row over to native scrolling and the ticker resumes 3 seconds after the
 * last touch. With reduced motion there is no animation: the cards are a normal horizontally scrollable row.
 */
export function ServicesTicker() {
  const box = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const firstCopy = useRef<HTMLUListElement>(null);
  const manual = useRef(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      clearTimeout(idleTimer.current);
    };
  }, []);

  const loopWidth = () => firstCopy.current?.offsetWidth ?? 1;
  /** Where the row is now, in pixels from its start, whether it is animating or has been scrolled by hand. */
  const offset = () => {
    const t = track.current;
    const b = box.current;
    if (!t || !b) return 0;
    const m = new DOMMatrix(getComputedStyle(t).transform);
    return b.scrollLeft - m.m41;
  };
  /** Put the animation back at the current position (scrollLeft returns to 0) so the loop continues from there. */
  const rebase = useCallback(() => {
    const t = track.current;
    const b = box.current;
    if (!t || !b) return;
    const w = loopWidth();
    const off = ((offset() % w) + w) % w;
    b.scrollLeft = 0;
    t.style.transform = "";
    t.style.animation = "";
    t.style.animationDelay = `${-(off / w) * LOOP_S}s`;
    manual.current = false;
  }, []);
  /** Switch to native scrolling at the current position so a finger can drag the row. */
  const takeOver = useCallback(() => {
    const t = track.current;
    const b = box.current;
    if (!t || !b || manual.current) return;
    const off = offset();
    t.style.animation = "none";
    t.style.transform = "none";
    b.scrollLeft = off;
    manual.current = true;
  }, []);
  const touched = () => {
    takeOver();
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      if (manual.current) rebase();
    }, RESUME_MS);
  };
  const onScroll = () => {
    const b = box.current;
    if (!b || !manual.current) return;
    const w = loopWidth();
    // The copies are identical, so jumping by one copy's width is invisible and keeps the row endless by hand.
    if (b.scrollLeft >= w) b.scrollLeft -= w;
    else if (b.scrollLeft <= 0) b.scrollLeft += w;
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => manual.current && rebase(), RESUME_MS);
  };

  const paused = userPaused || !inView || !tabVisible;

  return (
    <section aria-labelledby="services-title" className="bg-sky-50 pb-9 pt-7 md:py-10">
      <div className="wrap md:sr-only">
        <h2 id="services-title" className="text-[1.375rem] font-extrabold text-navy">
          Our Services
        </h2>
      </div>
      <h2 className="sr-only max-md:hidden">Our Services</h2>

      <div
        ref={box}
        role="region"
        aria-roledescription="carousel"
        aria-label="Our services"
        data-paused={paused}
        onTouchStart={touched}
        onPointerDown={(e) => e.pointerType !== "mouse" && touched()}
        onScroll={onScroll}
        onBlur={(e) => {
          // Focus left the row: pick the loop up again where the browser left it.
          if (!e.currentTarget.contains(e.relatedTarget) && !manual.current) rebase();
        }}
        className="ticker mt-4 overflow-x-auto overscroll-x-contain [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)] [scrollbar-width:none] md:mt-0 [&::-webkit-scrollbar]:hidden"
      >
        <div ref={track} className="ticker-track flex w-max" style={{ ["--ticker-dur" as string]: `${LOOP_S}s` }}>
          {COPIES.map((c) => (
            <ul
              key={c}
              ref={c === 0 ? firstCopy : undefined}
              aria-label={c === 0 ? "Services" : undefined}
              aria-hidden={c === 0 ? undefined : true}
              inert={c !== 0}
              className={cn("flex gap-5 py-3 pl-0 pr-5", c !== 0 && "ticker-dup", c === 2 && "hidden min-[1700px]:flex")}
            >
              {sliderOrder.map((slug) => (
                <li key={slug}>
                  <ServiceTile slug={slug} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="wrap relative mt-5 flex items-center justify-center">
        <Button href="/services" variant="outline" size="md">
          View All Services
          <ArrowRight aria-hidden className="size-5" />
        </Button>
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-pressed={userPaused}
          aria-label={userPaused ? "Play the moving list of services" : "Pause the moving list of services"}
          className="ticker-ctl absolute right-[var(--wrap-pad)] flex size-10 items-center justify-center rounded-full border border-[#c9d8e6] bg-white text-navy transition-colors hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        >
          {userPaused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
        </button>
      </div>
    </section>
  );
}
