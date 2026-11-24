import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Arrow head pointing along an axis. */
function Arrow({ dir, color }: { dir: "left" | "right" | "up" | "down"; color: string }) {
  const pts = {
    left: "8,0 0,4 8,8",
    right: "0,0 8,4 0,8",
    up: "0,8 4,0 8,8",
    down: "0,0 4,8 8,0",
  }[dir];
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" className="shrink-0">
      <polygon points={pts} fill={color} />
    </svg>
  );
}

/** A dimension line with arrow heads at both ends and a mono label in the middle. */
function DimLine({
  label,
  orientation,
  tone,
}: {
  label: string;
  orientation: "h" | "v";
  tone: "light" | "dark";
}) {
  const color = tone === "dark" ? "#5cc4ee" : "#008ccb";
  const text = tone === "dark" ? "text-cyan-300" : "text-[#00608c]";
  const bg = tone === "dark" ? "bg-navy-950" : "bg-white";
  const rule = tone === "dark" ? "bg-cyan-300/70" : "bg-cyan/70";
  const horizontal = orientation === "h";
  return (
    <div aria-hidden className={cn("flex items-center", horizontal ? "h-6 flex-row" : "w-6 flex-col")}>
      <Arrow dir={horizontal ? "left" : "up"} color={color} />
      <span className={cn(horizontal ? "h-px flex-1" : "w-px flex-1", rule)} />
      <span
        className={cn("mono-label px-2 py-1 text-[0.6875rem]", text, bg)}
        style={horizontal ? undefined : { writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        {label}
      </span>
      <span className={cn(horizontal ? "h-px flex-1" : "w-px flex-1", rule)} />
      <Arrow dir={horizontal ? "right" : "down"} color={color} />
    </div>
  );
}

/**
 * S13 · Blueprint frame. Content framed by dimension lines with arrows and measurements, crosshair
 * markers on the corners and a mono title block. Purely decorative framing: the measurements are
 * `aria-hidden` and the content keeps its own semantics.
 */
export function BlueprintFrame({
  children,
  widthLabel = "12,400 mm",
  heightLabel = "8,200 mm",
  title,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  widthLabel?: string;
  heightLabel?: string;
  /** Mono title block in the bottom-right corner, e.g. "SECTION A–A". */
  title?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  const line = dark ? "border-cyan-300/50" : "border-cyan/50";
  return (
    <div className={cn("grid grid-cols-[1.5rem_1fr] grid-rows-[1.5rem_1fr] gap-2", className)}>
      <span aria-hidden />
      <DimLine label={widthLabel} orientation="h" tone={tone} />
      <DimLine label={heightLabel} orientation="v" tone={tone} />
      <div className={cn("relative border", line, dark ? "bg-navy-950/60" : "bg-white")}>
        {(["left-0 top-0", "right-0 top-0", "left-0 bottom-0", "right-0 bottom-0"] as const).map((pos) => (
          <span key={pos} aria-hidden className={cn("absolute size-3", pos, dark ? "text-cyan-300" : "text-cyan")}>
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
          </span>
        ))}
        {children}
        {title && (
          <span
            aria-hidden
            className={cn("mono-label absolute bottom-0 right-0 border-l border-t px-3 py-1 text-[0.625rem]", line, dark ? "text-cyan-300" : "text-[#00608c]")}
          >
            {title}
          </span>
        )}
      </div>
    </div>
  );
}
