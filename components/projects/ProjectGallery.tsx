"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface GalleryImage {
  src: string;
  /** Short italic caption on the light bar under the image. */
  caption: string;
}

const roundBtn =
  "flex size-11 items-center justify-center rounded-full border border-white/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";

/**
 * Project gallery (mockup 21): a large image on the left and up to two stacked on the right, each with a light caption
 * bar. Clicking an image opens a simple lightbox: Esc closes, the arrow keys (or the buttons) switch images, and Tab
 * stays inside it.
 */
export function ProjectGallery({ images, badge }: { images: GalleryImage[]; badge?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const count = images.length;

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + count) % count)), [count]);
  const isOpen = open !== null;

  useEffect(() => {
    if (!isOpen) return;
    const returnTo = opener.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab" && dialog.current) {
        const items = Array.from(dialog.current.querySelectorAll<HTMLElement>("button:not([disabled])"));
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnTo?.focus();
    };
  }, [isOpen, close, step]);

  const tile = (img: GalleryImage, i: number, className: string, sizes: string) => (
    <figure key={img.src} className={cn("relative overflow-hidden rounded-2xl bg-sky-50", className)}>
      <button
        type="button"
        onClick={(e) => {
          opener.current = e.currentTarget;
          setOpen(i);
        }}
        aria-label={`View larger: ${img.caption}`}
        className="group absolute inset-0 block size-full focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-blue"
      >
        <Image
          src={img.src}
          alt=""
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </button>
      {i === 0 && badge && <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy">{badge}</span>}
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-white/85 px-3 py-1.5 text-sm italic text-navy">{img.caption}</figcaption>
    </figure>
  );

  const [main, ...side] = images;
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
        {tile(main, 0, "aspect-[16/10] lg:aspect-auto lg:min-h-[22rem]", "(min-width: 1024px) 60vw, 96vw")}
        {side.length > 0 && (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:grid-rows-2">
            {side.map((img, i) => tile(img, i + 1, "aspect-[4/3] lg:aspect-auto", "(min-width: 1024px) 34vw, 48vw"))}
          </div>
        )}
      </div>

      {isOpen && (
        <div ref={dialog} role="dialog" aria-modal="true" aria-label="Project images" className="fixed inset-0 z-[70] flex flex-col bg-navy-950/95 p-4 text-white md:p-8">
          <div className="flex justify-end">
            <button type="button" data-autofocus onClick={close} aria-label="Close image" className={roundBtn}>
              <X aria-hidden className="size-5" />
            </button>
          </div>
          <div className="relative mx-auto my-4 w-full max-w-5xl flex-1">
            <Image src={images[open].src} alt={images[open].caption} fill sizes="90vw" className="object-contain" />
          </div>
          <p aria-live="polite" className="text-center text-base italic">
            {images[open].caption} ({open + 1} of {count})
          </p>
          {count > 1 && (
            <div className="mt-3 flex justify-center gap-4">
              <button type="button" onClick={() => step(-1)} aria-label="Previous image" className={roundBtn}>
                <ChevronLeft aria-hidden className="size-5" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next image" className={roundBtn}>
                <ChevronRight aria-hidden className="size-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
