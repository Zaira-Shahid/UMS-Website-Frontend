import { cn } from "@/lib/utils";

/** Decorative 24px technical grid. Place inside a `relative` container. */
export function BlueprintGrid({
  variant = "light",
  fade = true,
  className,
}: {
  variant?: "light" | "dark";
  /** Fade the grid out toward the edges so it never feels boxed in. */
  fade?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0",
        variant === "dark" ? "bg-blueprint-dark" : "bg-blueprint",
        fade &&
          "[mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]",
        className,
      )}
    />
  );
}
