"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface HexItem {
  id: string;
  label: string;
  icon?: ReactNode;
  /** Short caption under the label. */
  caption?: string;
}

const HEX = "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)";

/** Tiles per row: 2 on phones, 3 from 640px. Server render assumes 3. */
function usePerRow() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(min-width: 640px)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => (window.matchMedia("(min-width: 640px)").matches ? 3 : 2),
    () => 3,
  );
}

/**
 * S3 · Hexagon grid. Honeycomb tiles in offset rows. Hovering or focusing a hexagon lifts it and
 * dims its neighbours; `onActiveChange` lets a side panel follow the active tile. Every tile is a
 * button, so the grid is fully keyboard accessible.
 */
export function HexGrid({
  items,
  onActiveChange,
  tone = "light",
  accent = "var(--cyan)",
  className,
}: {
  items: HexItem[];
  onActiveChange?: (id: string | null) => void;
  tone?: "light" | "dark";
  accent?: string;
  className?: string;
}) {
  const perRow = usePerRow();
  const [active, setActive] = useState<string | null>(null);
  const dark = tone === "dark";

  const set = (id: string | null) => {
    setActive(id);
    onActiveChange?.(id);
  };

  const rows: HexItem[][] = [];
  for (let i = 0; i < items.length; i += perRow) rows.push(items.slice(i, i + perRow));

  // Hex width as a function of how many fit across; height is width × 1.1547 (pointy-top hexagon).
  const w = `min(${Math.floor(100 / perRow)}%, 11.5rem)`;

  return (
    <div role="group" aria-label="Choose an item" className={cn("mx-auto w-full max-w-xl", className)}>
      {rows.map((row, r) => (
        <div
          key={r}
          className="flex justify-center"
          style={{ marginTop: r === 0 ? 0 : "calc(var(--hex-w) * -0.2887)", ["--hex-w" as string]: w, paddingLeft: r % 2 ? `calc(${w} / 2)` : 0, paddingRight: r % 2 ? 0 : `calc(${w} / 2)` }}
        >
          {row.map((item) => {
            const isActive = active === item.id;
            const dim = active !== null && !isActive;
            return (
              <button
                key={item.id}
                type="button"
                data-cursor="Open"
                aria-pressed={isActive}
                onMouseEnter={() => set(item.id)}
                onMouseLeave={() => set(null)}
                onFocus={() => set(item.id)}
                onBlur={() => set(null)}
                className="group relative block transition duration-300 ease-out"
                style={{
                  width: "var(--hex-w)",
                  aspectRatio: "1 / 1.1547",
                  // The hexagon draws its own focus ring; the rectangular outline would not follow the shape.
                  outline: "none",
                  transform: isActive ? "translateY(-6px) scale(1.04)" : undefined,
                  opacity: dim ? 0.4 : 1,
                  zIndex: isActive ? 2 : 1,
                  filter: isActive ? `drop-shadow(0 14px 18px rgb(6 20 31 / 0.28))` : undefined,
                }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 transition-colors duration-300"
                  style={{ clipPath: HEX, background: isActive ? accent : dark ? "rgb(255 255 255 / 0.25)" : "var(--line)" }}
                />
                <span
                  aria-hidden
                  className="absolute inset-[1.5px] transition-colors duration-300"
                  style={{
                    clipPath: HEX,
                    background: isActive ? (dark ? "var(--navy)" : "var(--cyan-100)") : dark ? "var(--navy-900)" : "var(--white)",
                  }}
                />
                <span
                  className={cn(
                    "absolute inset-0 flex flex-col items-center justify-center gap-1 px-[16%] text-center",
                    dark ? "text-white" : "text-navy",
                  )}
                >
                  {item.icon && <span className="text-cyan [&_svg]:size-6 sm:[&_svg]:size-7">{item.icon}</span>}
                  <span className="font-heading text-[0.8125rem] font-bold uppercase leading-[1.05] tracking-[0.04em] sm:text-sm">
                    {item.label}
                  </span>
                  {item.caption && <span className="mono-label hidden text-[0.625rem] text-steel sm:block">{item.caption}</span>}
                </span>
                {/* Focus ring follows the hexagon, not the bounding box */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-1 hidden group-focus-visible:block"
                  style={{ clipPath: HEX, background: "var(--cyan)", zIndex: -1 }}
                />
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
