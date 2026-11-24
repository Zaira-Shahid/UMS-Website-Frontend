"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface OrbitNode {
  id: string;
  label: string;
  description?: string;
}

/**
 * S4 · Circular orbit. Capability nodes sit on a slowly rotating ring around a central emblem.
 * Hovering or focusing a node pauses the ring and draws a connector to an info card. Nodes
 * counter-rotate so labels stay upright, and the ring is static for reduced motion. Every node is
 * a button, so the orbit is keyboard accessible (the ring also pauses while focus is inside it).
 */
export function OrbitRing({
  nodes,
  center,
  className,
  tone = "dark",
}: {
  nodes: OrbitNode[];
  /** Emblem in the middle (an icon or wordmark). */
  center: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  const [active, setActive] = useState<string | null>(null);
  const dark = tone === "dark";
  const activeNode = nodes.find((n) => n.id === active);
  const activeIndex = activeNode ? nodes.indexOf(activeNode) : -1;
  const angle = (i: number) => (i / nodes.length) * Math.PI * 2 - Math.PI / 2;

  return (
    <div className={cn("mx-auto w-full max-w-[34rem]", className)}>
      <div
        className="orbit relative aspect-square w-full"
        data-paused={active ? "true" : "false"}
        onMouseLeave={() => setActive(null)}
      >
        {/* Orbit track */}
        <span aria-hidden className={cn("absolute inset-[8%] rounded-full border border-dashed", dark ? "border-white/20" : "border-navy/20")} />
        <span aria-hidden className={cn("absolute inset-[26%] rounded-full border", dark ? "border-white/10" : "border-navy/10")} />

        {/* Centre emblem */}
        <div className="absolute inset-[34%] z-10 flex items-center justify-center rounded-full shadow-[0_0_60px_rgb(0_140_203/0.45)] ring-1 ring-cyan-300/60 bg-navy text-white">
          {center}
        </div>

        {/* Rotating ring of nodes */}
        <ul className="orbit-ring animate-orbit absolute inset-0 m-0 list-none p-0">
          {nodes.map((n, i) => {
            const x = 50 + 42 * Math.cos(angle(i));
            const y = 50 + 42 * Math.sin(angle(i));
            return (
              <li key={n.id} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}>
                <button
                  type="button"
                  data-cursor="Open"
                  aria-describedby={active === n.id ? "orbit-card" : undefined}
                  onMouseEnter={() => setActive(n.id)}
                  onFocus={() => setActive(n.id)}
                  onBlur={() => setActive(null)}
                  className={cn(
                    "orbit-node animate-orbit-reverse flex size-[3.25rem] items-center justify-center rounded-full border text-center font-heading text-[0.5625rem] font-bold uppercase leading-[1.05] tracking-[0.03em] transition-colors duration-200 sm:size-16 sm:text-[0.625rem]",
                    active === n.id
                      ? "border-cyan-300 bg-cyan text-navy-950"
                      : dark
                        ? "border-white/30 bg-navy-900 text-white hover:border-cyan-300"
                        : "border-navy/30 bg-white text-navy hover:border-cyan",
                  )}
                >
                  <span className="px-1">{n.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Connector to the active node (drawn in the un-rotated frame, so it is shown only while paused) */}
        {activeNode && (
          <svg aria-hidden viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 z-20 h-full w-full">
            <line x1="50" y1="50" x2={50 + 42 * Math.cos(angle(activeIndex))} y2={50 + 42 * Math.sin(angle(activeIndex))} stroke="var(--cyan-300)" strokeWidth="0.4" strokeDasharray="1.2 1" />
          </svg>
        )}
      </div>

      {/* Info card */}
      <div
        id="orbit-card"
        role="status"
        aria-live="polite"
        className={cn(
          "mt-6 min-h-[5.5rem] border p-4 text-sm",
          dark ? "border-white/20 bg-white/5 text-white" : "border-line bg-white text-ink",
        )}
      >
        {activeNode ? (
          <>
            <p className="mono-label text-cyan-300">{activeNode.label}</p>
            <p className={cn("mt-1", dark ? "text-white/80" : "text-muted")}>{activeNode.description}</p>
          </>
        ) : (
          <p className={dark ? "text-white/60" : "text-muted"}>Hover or focus a node to see what it covers.</p>
        )}
      </div>
    </div>
  );
}
