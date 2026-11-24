import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

const polygon = (n: string, corners: "all" | "diagonal") =>
  corners === "all"
    ? `polygon(${n} 0, calc(100% - ${n}) 0, 100% ${n}, 100% calc(100% - ${n}), calc(100% - ${n}) 100%, ${n} 100%, 0 calc(100% - ${n}), 0 ${n})`
    : `polygon(${n} 0, 100% 0, 100% calc(100% - ${n}), calc(100% - ${n}) 100%, 0 100%, 0 ${n})`;

/**
 * S2 · Notched corners. A steel-plate card with chamfered corners. A `clip-path` removes the
 * border, so the border is an outer plate of `borderColor` with the same notch and an inner plate
 * inset by 1px.
 */
export function NotchedCard({
  children,
  notch = 18,
  corners = "all",
  borderColor = "var(--line)",
  background = "var(--white)",
  className,
  innerClassName,
  as: Tag = "div",
}: {
  children: ReactNode;
  /** Chamfer size in px. */
  notch?: number;
  /** "all": four chamfered corners. "diagonal": top-left and bottom-right only. */
  corners?: "all" | "diagonal";
  borderColor?: string;
  background?: string;
  className?: string;
  innerClassName?: string;
  as?: "div" | "article" | "li";
}) {
  const outer: CSSProperties = { clipPath: polygon(`${notch}px`, corners), background: borderColor };
  const inner: CSSProperties = { clipPath: polygon(`${Math.max(notch - 1, 0)}px`, corners), background };
  return (
    <Tag className={cn("relative p-px", className)} style={outer}>
      <div className={cn("h-full", innerClassName)} style={inner}>
        {children}
      </div>
    </Tag>
  );
}
