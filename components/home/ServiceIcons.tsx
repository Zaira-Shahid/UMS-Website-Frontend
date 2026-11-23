import type { ServiceSlug } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Custom service icons. Each has one animated part (class `icon-*`) that moves
 * when an ancestor `.group` is hovered or focused — see globals.css. All motion
 * is disabled under prefers-reduced-motion.
 */
const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function Hvac({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="5" width="38" height="38" rx="3" />
      <circle cx="24" cy="24" r="14" />
      <g className="icon-fan">
        <path d="M24 24c-1-6 1-10 5-11 3 3 2 8-5 11Z" />
        <path d="M24 24c6-1 10 1 11 5-3 3-8 2-11-5Z" />
        <path d="M24 24c1 6-1 10-5 11-3-3-2-8 5-11Z" />
        <path d="M24 24c-6 1-10-1-11-5 3-3 8-2 11 5Z" />
      </g>
      <circle cx="24" cy="24" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Fire({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <g className="icon-flame">
        <path d="M24 6c1 6 8 9 8 18a8 8 0 0 1-16 0c0-4 2-6 3-8 1 3 2 4 3 4 0-5-1-9 2-14Z" />
        <path d="M24 42a4.5 4.5 0 0 1-4.5-4.5c0-3 3-4 4.5-7 1.5 3 4.5 4 4.5 7A4.5 4.5 0 0 1 24 42Z" />
      </g>
      <path d="M8 44h32" />
    </svg>
  );
}

function Electrical({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <circle cx="24" cy="24" r="19" />
      <path className="icon-bolt" d="M27 8 14 27h9l-2 13 13-19h-9l2-13Z" />
    </svg>
  );
}

function Plumbing({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M4 14h22v20h18" />
      <path d="M4 20h16v20h24" />
      <path
        className="icon-flow"
        d="M6 17h17v20h19"
        strokeDasharray="4 4"
        strokeWidth={1.25}
      />
      <circle cx="26" cy="24" r="3.5" fill="currentColor" stroke="none" />
      <path d="M22.5 24h7M26 20.5V10M22 10h8" />
    </svg>
  );
}

function Integrated({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="5" />
      <circle cx="36" cy="12" r="5" />
      <circle cx="24" cy="37" r="5" />
      <path d="M17 12h14M14.5 16.5l7 16M33.5 16.5l-7 16" />
    </svg>
  );
}

function Pools({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M14 8v18M30 8v18M14 12h16M14 19h16" />
      <g className="icon-wave">
        <path d="M-6 31c4 0 4 3 8 3s4-3 8-3 4 3 8 3 4-3 8-3 4 3 8 3 4-3 8-3 4 3 8 3 4-3 8-3" />
        <path d="M-6 39c4 0 4 3 8 3s4-3 8-3 4 3 8 3 4-3 8-3 4 3 8 3 4-3 8-3 4 3 8 3 4-3 8-3" />
      </g>
    </svg>
  );
}

const icons: Record<ServiceSlug, (p: { className?: string }) => React.ReactElement> = {
  hvac: Hvac,
  "fire-fighting": Fire,
  "electrical-elv": Electrical,
  plumbing: Plumbing,
  "integrated-mep": Integrated,
  "pools-fountains": Pools,
};

export function ServiceIcon({ slug, className }: { slug: ServiceSlug; className?: string }) {
  const Icon = icons[slug];
  return <Icon className={cn("size-10", className)} />;
}
