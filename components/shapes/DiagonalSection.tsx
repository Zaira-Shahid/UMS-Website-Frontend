import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** tan(6°) and tan(8°): the slant per unit of width. */
const TAN = { 6: 0.1051, 8: 0.1405 } as const;

/**
 * S1 · Diagonal cut. A full-width section whose top and/or bottom edge is slanted 6–8° with
 * `clip-path`. Padding is added for the cut so content never sits under the slant, and the
 * cut is capped so it stays graceful on very wide and very narrow screens.
 */
export function DiagonalSection({
  children,
  edge = "both",
  angle = 6,
  slantDirection = "down",
  className,
  as: Tag = "section",
  ...rest
}: {
  children: ReactNode;
  edge?: "top" | "bottom" | "both";
  angle?: 6 | 8;
  /** "down": the edge falls from left to right. "up": it rises. */
  slantDirection?: "down" | "up";
  className?: string;
  as?: "section" | "div";
} & Omit<React.HTMLAttributes<HTMLElement>, "children" | "className">) {
  const top = edge === "top" || edge === "both";
  const bottom = edge === "bottom" || edge === "both";
  const cut = `clamp(1.5rem, calc(100vw * ${TAN[angle]}), 7.5rem)`;
  const down = slantDirection === "down";

  const points = [
    top ? (down ? `0 var(--cut)` : `0 0`) : `0 0`,
    top ? (down ? `100% 0` : `100% var(--cut)`) : `100% 0`,
    bottom ? (down ? `100% calc(100% - var(--cut))` : `100% 100%`) : `100% 100%`,
    bottom ? (down ? `0 100%` : `0 calc(100% - var(--cut))`) : `0 100%`,
  ].join(", ");

  const style = {
    "--cut": cut,
    clipPath: `polygon(${points})`,
    paddingTop: top ? "var(--cut)" : undefined,
    paddingBottom: bottom ? "var(--cut)" : undefined,
  } as CSSProperties;

  return (
    <Tag {...rest} className={cn("relative", className)} style={style}>
      {children}
    </Tag>
  );
}
