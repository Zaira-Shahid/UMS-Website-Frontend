import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Grid spans for a tile on the 6-column bento. */
export interface BentoSpan {
  cols: 1 | 2 | 3 | 4 | 5 | 6;
  rows?: 1 | 2 | 3;
}

const colClass: Record<BentoSpan["cols"], string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
};
const rowClass: Record<NonNullable<BentoSpan["rows"]>, string> = {
  1: "md:row-span-1",
  2: "md:row-span-2",
  3: "md:row-span-3",
};

/** Radius presets: varied corners are what make the grid read as "bento" rather than uniform cards. */
const radii = {
  soft: "rounded-[1.25rem]",
  sharp: "rounded-[2px]",
  leaf: "rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-[2px] rounded-bl-[2px]",
  pill: "rounded-[2.5rem]",
} as const;

/**
 * S15 · Asymmetric bento. A 6-column grid of mixed-size tiles with varied radii and one optional
 * cut-out tile (a circular bite taken out of a corner with a CSS mask, e.g. for a small form
 * that sits in the notch). Collapses to a single column on phones.
 */
export function AsymmetricBento({
  children,
  className,
  rowHeight = "11rem",
}: {
  children: ReactNode;
  className?: string;
  /** Height of one grid row. */
  rowHeight?: string;
}) {
  return (
    <div
      className={cn("grid grid-cols-1 gap-4 md:grid-cols-6", className)}
      style={{ gridAutoRows: `minmax(${rowHeight}, auto)` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function BentoTile({
  span,
  radius = "soft",
  cutout,
  className,
  children,
  as: Tag = "div",
}: {
  span: BentoSpan;
  radius?: keyof typeof radii;
  /** Take a circular bite (px radius) out of one corner. */
  cutout?: { corner: "tr" | "br" | "tl" | "bl"; size: number };
  className?: string;
  children: ReactNode;
  as?: "div" | "article" | "li";
}) {
  const style: CSSProperties = {};
  if (cutout) {
    const pos = { tr: "100% 0", br: "100% 100%", tl: "0 0", bl: "0 100%" }[cutout.corner];
    const mask = `radial-gradient(circle at ${pos}, transparent ${cutout.size}px, #000 ${cutout.size + 1}px)`;
    style.maskImage = mask;
    style.WebkitMaskImage = mask;
  }
  return (
    <Tag
      className={cn("relative overflow-hidden", colClass[span.cols], rowClass[span.rows ?? 1], radii[radius], className)}
      style={style}
    >
      {children}
    </Tag>
  );
}
