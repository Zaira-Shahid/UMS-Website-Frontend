"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { SiteImage } from "@/components/ui/SiteImage";
import type { ImageAsset } from "@/types";

/**
 * Image gallery with an accessible lightbox.
 * - Built on a native <dialog> opened with showModal(): the page behind is inert,
 *   focus is trapped, Esc closes, and focus returns to the thumbnail that opened it.
 * - ← → keys, the arrow buttons and horizontal swipe move between images.
 * - The current position is announced politely ("Image 2 of 3").
 * Images are stock placeholders (TODO: replace with approved UMS photography).
 */
export function Gallery({ images, projectName }: { images: ImageAsset[]; projectName: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState(0);
  const swipeStart = useRef<number | null>(null);
  const n = images.length;

  const step = useCallback((dir: 1 | -1) => setCurrent((c) => (c + dir + n) % n), [n]);

  const open = (i: number) => {
    setCurrent(i);
    dialog.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };

  // Unlock page scroll whenever the dialog closes (Esc, button, backdrop) or the page unmounts.
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const unlock = () => {
      document.documentElement.style.overflow = "";
    };
    el.addEventListener("close", unlock);
    return () => {
      el.removeEventListener("close", unlock);
      unlock();
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    // Keep Tab / Shift+Tab inside the dialog: wrap from last to first and back.
    if (e.key === "Tab") {
      const items = [...e.currentTarget.querySelectorAll<HTMLElement>("button:not([disabled])")];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
      return;
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  const img = images[current];

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((g, i) => (
          <li key={g.src + i}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`Open image ${i + 1} of ${n} for ${projectName}: ${g.alt}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden bg-navy"
            >
              <SiteImage
                asset={g}
                fill
                sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-105"
              />
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center bg-navy-900/0 transition-colors group-hover:bg-navy-900/40"
              >
                <Expand className="size-7 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={`${projectName} image gallery`}
        data-lenis-prevent
        onKeyDown={onKeyDown}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto h-dvh max-h-none w-screen max-w-none border-0 bg-navy-900/[0.97] p-0 text-white backdrop:bg-navy-900"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <p role="status" aria-live="polite" className="font-heading text-sm font-semibold uppercase tracking-[0.14em]">
              Image {current + 1} of {n}
            </p>
            <button
              type="button"
              autoFocus
              onClick={() => dialog.current?.close()}
              aria-label="Close gallery"
              className="flex size-11 items-center justify-center rounded-ums border border-white/40 transition-colors hover:bg-white hover:text-navy"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <div
            className="relative min-h-0 flex-1 touch-pan-y select-none"
            onPointerDown={(e) => {
              swipeStart.current = e.clientX;
            }}
            onPointerUp={(e) => {
              if (swipeStart.current === null) return;
              const dx = e.clientX - swipeStart.current;
              swipeStart.current = null;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            }}
            onPointerCancel={() => {
              swipeStart.current = null;
            }}
          >
            <SiteImage
              key={img.src + current}
              asset={img}
              fill
              sizes="100vw"
              draggable={false}
              className="object-contain"
              style={{ objectPosition: "center" }}
            />
            {n > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-navy-900/70 transition-colors hover:bg-white hover:text-navy sm:left-6"
                >
                  <ChevronLeft className="size-6" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-navy-900/70 transition-colors hover:bg-white hover:text-navy sm:right-6"
                >
                  <ChevronRight className="size-6" aria-hidden />
                </button>
              </>
            )}
          </div>

          <p className="px-4 py-4 text-center text-sm text-white/75 sm:px-6">
            {img.alt}
            <span className="block text-xs text-white/50">
              Placeholder photograph — it does not show this project.
            </span>
          </p>
        </div>
      </dialog>
    </>
  );
}
