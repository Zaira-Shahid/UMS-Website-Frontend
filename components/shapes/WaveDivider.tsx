import { cn } from "@/lib/utils";

/**
 * S6 · Curved wave divider. Two drifting SVG wave layers that sit on the edge between sections.
 * `fill` is the colour of the section the wave belongs to. The drift stops for reduced motion.
 * Decorative: hidden from assistive technology.
 */
export function WaveDivider({
  fill = "var(--white)",
  backFill,
  flip = false,
  height = 72,
  className,
}: {
  fill?: string;
  /** Colour of the slower, lighter back layer (defaults to `fill` at 35% opacity). */
  backFill?: string;
  /** Flip vertically so the wave hangs from the top of the section instead of rising from the bottom. */
  flip?: boolean;
  height?: number;
  className?: string;
}) {
  // One wavelength is 720 units wide; the path is repeated so a 50% shift loops seamlessly.
  const wave =
    "M0 40 C 90 0, 180 0, 270 40 S 450 80, 540 40 S 630 0, 720 40 C 810 0, 900 0, 990 40 S 1170 80, 1260 40 S 1350 0, 1440 40 V 80 H 0 Z";
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none relative w-full overflow-hidden leading-[0]", className)}
      style={{ height, transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        className="animate-wave-drift absolute bottom-0 left-0 h-full w-[200%]"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{ animationDuration: "22s" }}
      >
        <path d={wave} fill={backFill ?? fill} opacity={backFill ? 1 : 0.35} transform="translate(0 6)" />
      </svg>
      <svg
        className="animate-wave-drift absolute bottom-0 left-0 h-full w-[200%]"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{ animationDuration: "14s" }}
      >
        <path d={wave} fill={fill} />
      </svg>
    </div>
  );
}
