import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

/** Accessible breadcrumb trail. The last item is the current page. */
export function Breadcrumbs({
  items,
  tone = "dark",
  className,
}: {
  items: Crumb[];
  tone?: "dark" | "light";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    light ? "text-white/70 hover:text-white" : "text-muted hover:text-navy",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={light ? "text-white" : "text-navy"}
                >
                  {item.label}
                </span>
              )}
              {!last && (
                <ChevronRight
                  aria-hidden
                  className={cn("size-3.5", light ? "text-white/40" : "text-muted/60")}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
