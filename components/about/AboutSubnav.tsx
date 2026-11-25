import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { href: "/about", label: "Overview" },
  { href: "/about/mission-values", label: "Mission & Values" },
  { href: "/quality-safety-delivery", label: "Quality, Safety & Delivery" },
] as const;

/** Secondary navigation shared by the About pages. The current page is marked aria-current. */
export function AboutSubnav({ current }: { current: (typeof links)[number]["href"] }) {
  return (
    <div className="border-b border-line bg-white">
      <nav aria-label="About UMS" className="mx-auto max-w-7xl px-5 sm:px-8">
        <ul className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((l) => {
            const on = l.href === current;
            return (
              <li key={l.href} className="shrink-0">
                <Link
                  href={l.href}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "relative block whitespace-nowrap px-4 py-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] transition-colors",
                    on ? "text-navy" : "text-muted hover:text-navy",
                  )}
                >
                  {l.label}
                  <span
                    aria-hidden
                    className={cn("absolute inset-x-4 bottom-0 h-0.5 bg-cyan transition-transform", on ? "scale-x-100" : "scale-x-0")}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
