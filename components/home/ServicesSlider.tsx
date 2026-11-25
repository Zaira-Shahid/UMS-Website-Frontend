"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ServiceCard } from "@/components/ui/Card";
import { ServiceIcon, serviceColor } from "@/components/ui/ServiceIcon";
import { sliderArt, sliderLine, sliderOrder, sliderTitle } from "@/content/home";
import { chipOrder, serviceLabel } from "@/content/service-labels";
import { cn } from "@/lib/utils";

/**
 * H2 Services (mockups 01 and 02). Desktop: a slider with the active service large, a progress bar and an arrow, and
 * the next service peeking in from the right. Mobile: the "Our Services" 2-column grid.
 * Controls: the arrow buttons, the left/right arrow keys, swiping, or clicking the peeking slide.
 */
export function ServicesSlider() {
  const [index, setIndex] = useState(0);
  const count = sliderOrder.length;
  const startX = useRef<number | null>(null);
  const region = useRef<HTMLDivElement>(null);
  const refocus = useRef<"next" | "prev" | null>(null);

  // The arrow buttons live inside the active slide, so give focus back to the new slide's button after a move.
  useEffect(() => {
    if (!refocus.current) return;
    const dir = refocus.current;
    refocus.current = null;
    const root = region.current;
    (root?.querySelector<HTMLElement>(`[data-active] [data-dir="${dir}"]`) ?? root?.querySelector<HTMLElement>("[data-active] [data-dir=next]"))?.focus();
  }, [index]);

  const go = (i: number) => setIndex(Math.min(count - 1, Math.max(0, i)));
  const next = () => {
    refocus.current = "next";
    setIndex((i) => (i + 1) % count);
  };
  const prev = () => {
    refocus.current = "prev";
    setIndex((i) => (i - 1 + count) % count);
  };

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
  };
  const onPointerUp = (e: PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (dx < -50) go(index + 1);
    else if (dx > 50) go(index - 1);
  };

  return (
    <section aria-labelledby="services-title" className="bg-sky-50">
      {/* Mobile: Our Services grid */}
      <div className="wrap py-7 md:hidden">
        <h2 id="services-title" className="text-[1.375rem] font-extrabold text-navy">
          Our Services
        </h2>
        <ul className="mt-4 grid grid-cols-2 gap-3">
          {chipOrder.map((slug) => (
            <li key={slug}>
              <ServiceCard slug={slug} label={serviceLabel[slug]} compact className="h-full" />
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop and tablet: slider */}
      <div
        ref={region}
        role="region"
        aria-roledescription="carousel"
        aria-label="Our services"
        onKeyDown={onKeyDown}
        className="relative hidden overflow-hidden md:block"
      >
        <h2 className="sr-only">Our Services</h2>
        <div
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (startX.current = null)}
          onDragStart={(e) => e.preventDefault()}
          className="flex touch-pan-y select-none py-8 transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 74}%)` }}
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
                  "flex w-[74%] shrink-0 items-center gap-[3%] transition-opacity duration-500 motion-reduce:transition-none",
                  !active && "cursor-pointer opacity-70",
                  i > index && "border-l border-border pl-8",
                )}
              >
                {/* Illustration, or the service icon large until artwork is supplied */}
                {art ? (
                  <div className="shrink-0" style={{ width: art.width, maxWidth: "52%" }}>
                    <Image
                      src={art.src}
                      alt=""
                      width={art.width}
                      height={art.height}
                      sizes="(min-width: 1024px) 40vw, 38vw"
                      draggable={false}
                      className="h-auto w-full mix-blend-multiply"
                    />
                  </div>
                ) : (
                  <span
                    className="flex size-36 shrink-0 items-center justify-center rounded-3xl lg:size-44"
                    style={{ background: `color-mix(in srgb, ${color} 12%, white)`, color }}
                  >
                    <ServiceIcon slug={slug} className="size-20 lg:size-24" />
                  </span>
                )}

                <div className="min-w-0 max-w-[28rem] flex-1">
                  <div className="flex items-center gap-4">
                    <div className={cn("min-w-0 flex-1 border-l-4 pl-4", active ? "border-blue" : "border-transparent")}>
                      <h3 className="text-[clamp(1.5rem,0.9rem+1.6vw,2.25rem)] font-extrabold leading-tight text-navy">
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
                      <div className="flex shrink-0 flex-col items-center gap-1">
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
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#c9d8e6]" role="presentation">
                      <div
                        className="h-full rounded-full bg-blue transition-[width] duration-500 motion-reduce:transition-none"
                        style={{ width: `${((index + 1) / count) * 100}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          {sliderTitle[sliderOrder[index]]}, {index + 1} of {count}
        </p>
      </div>
    </section>
  );
}
