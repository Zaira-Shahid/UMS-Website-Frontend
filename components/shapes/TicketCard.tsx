import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Tab width: 42% of the card, but never narrower than a long category label needs. */
const TAB_W = "max(42%, 9.5rem)";
const TAB_H = "2rem";

const SHAPE = `polygon(0 0, ${TAB_W} 0, calc(${TAB_W} + 14px) ${TAB_H}, 100% ${TAB_H}, 100% 100%, 0 100%)`;

/**
 * S16 · Ticket / tab card. A card with a notched tab on top (the tab carries a category label
 * and an accent colour) like a file divider. Used for articles, certificates and careers.
 */
export function TicketCard({
  tab,
  accent = "var(--cyan)",
  tabText = "var(--navy-950)",
  children,
  className,
  bodyClassName,
  as: Tag = "article",
  tone = "light",
}: {
  /** Text in the tab (category, department). */
  tab: ReactNode;
  /** Tab colour: a CSS colour or a discipline variable such as `var(--fire)`. */
  accent?: string;
  /** Tab label colour; keep it AA-contrast against `accent`. */
  tabText?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  as?: "article" | "li" | "div";
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const outer: CSSProperties = { clipPath: SHAPE, background: dark ? "rgb(255 255 255 / 0.18)" : "var(--line)" };
  const inner: CSSProperties = {
    clipPath: SHAPE,
    background: dark ? "var(--navy-900)" : "var(--white)",
  };
  return (
    <Tag className={cn("relative p-px", className)} style={outer}>
      <div className="relative h-full" style={inner}>
        <span
          className="mono-label absolute left-0 top-0 flex items-center px-4"
          style={{ height: TAB_H, width: TAB_W, background: accent, color: tabText }}
        >
          <span className="truncate">{tab}</span>
        </span>
        <div className={cn("p-5 pt-[calc(2rem+1.25rem)]", bodyClassName)}>{children}</div>
      </div>
    </Tag>
  );
}
