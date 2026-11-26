import { cn } from "@/lib/utils";
import type { ServiceSlug } from "@/types";
import { ServiceIcon, serviceColor } from "./ServiceIcon";

/**
 * Service chip for navy backgrounds (hero bottom): a compact outlined pill with the service's coloured icon and its label.
 * It is a toggle button, not a link: pressing it highlights that system in the hero building. The active chip gets a fill
 * of its service colour at about 20% and a brighter border.
 */
export function ServiceChip({
  slug,
  label,
  pressed,
  onToggle,
  onPreload,
  className,
}: {
  slug: ServiceSlug;
  label: string;
  pressed: boolean;
  onToggle: () => void;
  onPreload?: () => void;
  className?: string;
}) {
  const color = serviceColor(slug);
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onToggle}
      onPointerEnter={onPreload}
      onFocus={onPreload}
      className={cn(
        "group inline-flex h-[38px] items-center gap-2 whitespace-nowrap rounded-xl border px-[14px] py-2 max-sm:gap-1.5 max-sm:px-2.5 text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan motion-reduce:transition-none",
        pressed ? "border-2" : "border-white/70 bg-white/[0.04]",
        className,
      )}
      style={pressed ? { borderColor: color, backgroundColor: `color-mix(in srgb, ${color} 22%, transparent)` } : undefined}
    >
      <span className="flex size-6 shrink-0 items-center justify-center rounded-md border-[1.5px]" style={{ borderColor: color, color }}>
        <ServiceIcon slug={slug} className="size-3.5" />
      </span>
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}
