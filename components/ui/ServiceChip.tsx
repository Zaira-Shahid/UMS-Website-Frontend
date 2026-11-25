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
        "group flex items-center gap-3 rounded-xl border border-white/55 bg-white/[0.04] px-4 py-3 text-white transition-colors hover:bg-white/10 focus-visible:bg-white/10",
        className,
      )}
      style={{ ["--chip" as string]: color }}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border-2 transition-colors group-hover:bg-white/10" style={{ borderColor: color, color }}>
        <ServiceIcon slug={slug} className="size-5" />
      </span>
      <span className="text-base font-semibold">{label}</span>
    </Link>
  );
}
