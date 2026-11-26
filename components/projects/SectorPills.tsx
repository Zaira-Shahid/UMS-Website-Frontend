import Link from "next/link";
import { cn } from "@/lib/utils";

const pill =
  "inline-flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-lg border-2 px-5 font-heading text-[0.9375rem] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue lg:min-w-[10rem]";

/** The "All Projects / Healthcare / …" pills (mockups 19 and 21). Links to /projects?sector=…; `active` is "all", a sector value, or null for none. */
export function SectorPills({ sectors, active }: { sectors: { param: string; label: string }[]; active: string | null }) {
  return (
    <nav aria-label="Filter projects by sector" className="-mx-[var(--wrap-pad)] overflow-x-auto px-[var(--wrap-pad)] pb-2 [scrollbar-width:none] lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden">
      <ul className="flex gap-3 lg:gap-4">
        {[{ param: "all", label: "All Projects" }, ...sectors].map((s) => {
          const on = s.param === active;
          return (
            <li key={s.param} className="shrink-0">
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
