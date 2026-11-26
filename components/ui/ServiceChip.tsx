import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ServiceSlug } from "@/types";
import { ServiceIcon, serviceColor } from "./ServiceIcon";

/**
 * Service chip for navy backgrounds (hero bottom): an outlined rounded rectangle with the service's coloured icon
 * and its label. A link to the service page.
 */
export function ServiceChip({ slug, label, className }: { slug: ServiceSlug; label: string; className?: string }) {
  const color = serviceColor(slug);
  return (
    <Link
      href={`/services/${slug}`}
      className={cn(
        "group flex items-center h-11 gap-2 rounded-xl border border-white/70 bg-white/[0.04] px-2.5 text-white whitespace-nowrap transition-colors hover:bg-white/10 focus-visible:bg-white/10",
        className,
      )}
      style={{ ["--chip" as string]: color }}
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-md border-[1.5px] transition-colors group-hover:bg-white/10" style={{ borderColor: color, color }}>
        <ServiceIcon slug={slug} className="size-4" />
      </span>
      <span className="text-[0.9375rem] font-semibold">{label}</span>
    </Link>
  );
}
