"use client";

import Link from "next/link";
import { useRef } from "react";
import { useScrollRow } from "@/lib/use-scroll-row";
import { cn } from "@/lib/utils";

const pill =
  "inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-lg border px-5 font-heading text-[0.9375rem] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue lg:min-w-[9rem]";

/** The "All Projects / Healthcare / …" pills (mockups 19 and 21). Links to /projects?sector=…; `active` is "all", a sector value, or null for none. */
export function SectorPills({ sectors, active }: { sectors: { param: string; label: string }[]; active: string | null }) {
  const row = useRef<HTMLElement>(null);
  // On phones the pills stay on one row and scroll sideways: the active one is centred and a fade hints at more on the right.
  const more = useScrollRow(row, active);
  return (
    <nav
      ref={row}
      aria-label="Filter projects by sector"
      className={cn(
        "-mx-[var(--wrap-pad)] snap-x snap-proximity overflow-x-auto px-[var(--wrap-pad)] pb-2 [scrollbar-width:none] lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden",
        more && "max-md:[mask-image:linear-gradient(to_right,black_86%,transparent)]",
      )}
    >
      <ul className="flex w-max gap-3 lg:w-full lg:justify-center lg:gap-4">
        {[{ param: "all", label: "All Projects" }, ...sectors].map((s) => {
          const on = s.param === active;
          return (
            <li key={s.param} className="shrink-0 snap-center">
              <Link
                href={s.param === "all" ? "/projects" : `/projects?sector=${s.param}`}
                scroll={false}
                aria-current={on ? "true" : undefined}
                className={cn(pill, on ? "border-navy bg-navy text-white" : "border-navy/70 bg-white text-navy hover:border-navy hover:bg-sky-50")}
              >
                {s.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
