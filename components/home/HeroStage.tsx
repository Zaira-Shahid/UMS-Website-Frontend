"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ImgHTMLAttributes, type ReactNode } from "react";
import { ServiceChip } from "@/components/ui/ServiceChip";
import { serviceColor } from "@/components/ui/ServiceIcon";
import { HeroFx } from "./HeroFx";
import { chipOrder, serviceLabel } from "@/content/service-labels";
import type { ServiceSlug } from "@/types";

/** What the highlighted lines in the building show, per system. */
const explain: Record<ServiceSlug, string> = {
  "fire-fighting": "Red lines: sprinkler mains, risers and fire pump connections",
  hvac: "Blue ducts: air handling units, supply and return ductwork",
  "electrical-elv": "Yellow trays: cable routes, panels and distribution boards",
  plumbing: "Teal pipes: water supply, drainage and pump sets",
  "integrated-mep": "All systems coordinated as one scope",
  "pools-fountains": "Pool and fountain water circulation",
};

const maskSrc = (slug: ServiceSlug, mobile: boolean) => `/images/hero/masks/${slug}${mobile ? "-mobile" : ""}.png`;
const FADE_MS = 350;

/**
 * The hero's building, its service chips and the label card. Pressing a chip (click, Enter or Space) dims the building
 * and keeps that system's pixels bright with a glow in the service colour and a short pulse; the label card says what the
 * lines are and links to the service page. Pressing the same chip again, Esc or clicking elsewhere resets the view.
 * The overlays are pre-cut PNGs in public/images/hero/masks/ (one per system, desktop and mobile artwork).
 */
export function HeroStage({
  children,
  desktopSet,
  mobileSet,
  img,
}: {
  /** The text column (server-rendered). */
  children: ReactNode;
  desktopSet: string;
  mobileSet: string;
  img: ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string };
}) {
  const [active, setActive] = useState<ServiceSlug | null>(null);
  // The overlay stays mounted for a moment after a reset so it can fade out.
  const [shown, setShown] = useState<ServiceSlug | null>(null);
  const imageCol = useRef<HTMLDivElement>(null);
  const chipsWrap = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // The living effects load after the page has finished loading (so they never compete with the first paint), and every
  // animation pauses while the hero is off-screen or the tab is hidden.
  const [fxReady, setFxReady] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  const select = useCallback((slug: ServiceSlug | null) => {
    clearTimeout(hideTimer.current);
    setActive(slug);
    if (slug) setShown(slug);
    else hideTimer.current = setTimeout(() => setShown(null), FADE_MS + 30);
  }, []);

  const preload = useCallback((slug: ServiceSlug) => {
    const i = new window.Image();
    i.src = maskSrc(slug, !window.matchMedia("(min-width: 1024px)").matches);
  }, []);

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  useEffect(() => {
    let cancelled = false;
    const mount = () => !cancelled && setFxReady(true);
    const start = () => {
      if (cancelled) return;
      // The picture is shown first and stays still for a few seconds; then, at the browser's next idle moment, it comes alive.
      setTimeout(() => {
        if ("requestIdleCallback" in window) window.requestIdleCallback(mount, { timeout: 2500 });
        else mount();
      }, 4000);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
    };
  }, []);

  useEffect(() => {
    const el = imageCol.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Esc or a press outside the building, chips and label resets the view.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") select(null);
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!imageCol.current?.contains(t) && !chipsWrap.current?.contains(t)) select(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [active, select]);

  const color = shown ? serviceColor(shown) : undefined;

  return (
    <>
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,min(40rem,56%))_minmax(0,1fr)] lg:gap-12">
        {children}

        <div ref={imageCol} data-fx-paused={!inView || !tabVisible} className="-mx-[var(--wrap-pad)] lg:mx-0 lg:-mr-[var(--wrap-pad)]">
          <div className="relative w-full max-w-[855px] [clip-path:inset(1.5%_0.5%_0_0.5%)] [mask-image:radial-gradient(ellipse_70%_74%_at_52%_50%,black_58%,transparent_100%)] lg:ml-auto">
            <div className="hero-float">
              <picture className="block">
                <source media="(min-width: 1024px)" srcSet={desktopSet} />
                <source media="(max-width: 1023px)" srcSet={mobileSet} />
                <img
                  {...img}
                  alt={img.alt}
                  fetchPriority="high"
                  className="block h-auto w-full transition-[filter] duration-[350ms] ease-out motion-reduce:transition-none"
                  style={{ filter: active ? "brightness(0.45)" : "brightness(1)" }}
                />
              </picture>
              {fxReady && <HeroFx active={active} />}
              {shown && (
                <picture key={shown} className="pointer-events-none absolute inset-0 block">
                  <source media="(min-width: 1024px)" srcSet={maskSrc(shown, false)} />
                  <img
                    src={maskSrc(shown, true)}
                    alt=""
                    aria-hidden
                    className="hero-overlay size-full"
                    style={{ ["--glow" as string]: color, opacity: active ? 1 : 0 }}
                  />
                </picture>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Service chips: left-aligned with the text, grouped, wrapping on small screens. The label card follows them in the DOM. */}
      <div ref={chipsWrap} className="relative mt-6 pb-8 md:pb-10">
        <ul aria-label="Highlight a building system" className="flex flex-wrap justify-center gap-2">
          {chipOrder.map((slug) => (
            <li key={slug}>
              <ServiceChip
                slug={slug}
                label={serviceLabel[slug]}
                pressed={active === slug}
                onToggle={() => select(active === slug ? null : slug)}
                onPreload={() => preload(slug)}
              />
            </li>
          ))}
        </ul>

        <div aria-live="polite" className="lg:absolute lg:bottom-full lg:right-0 lg:mb-3">
          {active && (
            <div key={active} className="mt-4 max-w-[22rem] rounded-xl bg-white p-3.5 text-navy shadow-[0_12px_32px_-12px_rgb(0_0_0/0.6)] lg:mt-0 hero-label">
              <p className="flex items-start gap-2.5 text-[0.9375rem] leading-snug">
                <span aria-hidden className="mt-1.5 size-2.5 shrink-0 rounded-full" style={{ backgroundColor: serviceColor(active) }} />
                <span>
                  <span className="font-semibold">{serviceLabel[active]}: </span>
                  {explain[active]}
                </span>
              </p>
              <Link
                href={`/services/${active}`}
                className="mt-2 inline-flex min-h-8 items-center gap-1.5 font-heading text-base font-bold text-blue-700 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
              >
                View service
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
