"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion/gsap";

const COVER_S = 0.26; // wipe in on leave
const REVEAL_S = 0.3; // wipe out on arrival (0.56s of animation, leaving room for route loading inside 700ms)
const GIVE_UP_MS = 2500; // reveal anyway if the next page never arrives

/**
 * Page transition (spec §7): on leaving, a navy panel wipes up over the page while a pipe line draws
 * across it; when the new page has arrived it wipes away again. Internal link clicks are intercepted;
 * browser back/forward, hash links, new-tab clicks, downloads and reduced motion navigate as usual.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const panel = useRef<HTMLDivElement>(null);
  const line = useRef<SVGLineElement>(null);
  const covered = useRef(false);
  const busy = useRef<gsap.core.Timeline | null>(null);
  const giveUp = useRef<number | undefined>(undefined);

  const reveal = () => {
    window.clearTimeout(giveUp.current);
    if (!covered.current || !panel.current) return;
    busy.current?.kill();
    busy.current = gsap
      .timeline({
        onComplete: () => {
          covered.current = false;
          busy.current = null;
          gsap.set(panel.current, { visibility: "hidden" });
        },
      })
      .to(panel.current, { clipPath: "inset(0 0 100% 0)", duration: REVEAL_S, ease: "power3.inOut" });
  };

  // The new page has arrived.
  useEffect(() => {
    reveal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Runs in the capture phase, before Next's <Link> handler; preventDefault makes Link stand down.
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.dataset.noTransition !== undefined) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page, hash or query only
      if (!panel.current || covered.current) return;

      e.preventDefault();
      covered.current = true;
      busy.current?.kill();
      gsap.set(panel.current, { visibility: "visible", clipPath: "inset(100% 0 0 0)" });
      gsap.set(line.current, { strokeDasharray: 1, strokeDashoffset: 1 });
      busy.current = gsap
        .timeline({ onComplete: () => router.push(url.pathname + url.search + url.hash) })
        .to(panel.current, { clipPath: "inset(0 0 0 0)", duration: COVER_S, ease: "power3.inOut" }, 0)
        .to(line.current, { strokeDashoffset: 0, duration: COVER_S, ease: "power2.out" }, 0.05);
      giveUp.current = window.setTimeout(reveal, GIVE_UP_MS);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(giveUp.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div
      ref={panel}
      aria-hidden
      className="bg-blueprint-dark pointer-events-none fixed inset-0 z-[90] bg-navy-950"
      style={{ visibility: "hidden", clipPath: "inset(100% 0 0 0)" }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line
          ref={line}
          x1="0"
          y1="50"
          x2="100"
          y2="50"
          pathLength={1}
          stroke="var(--cyan-300)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
