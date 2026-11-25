import { disciplineColor } from "@/lib/discipline";
import type { ServiceSlug } from "@/types";

/**
 * The six service icons (MEP network, fan, sprinkler, tap, lightning, fountain). Line icons in `currentColor`, so
 * set the colour on the parent; `serviceColor(slug)` gives the service's own colour. Decorative.
 */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const blade = "M12 12c-.7-3.4.5-5.5 2.7-6.2 1.7 1.5 1.1 4.3-2.7 6.2Z";

const icons: Record<ServiceSlug, React.ReactNode> = {
  "integrated-mep": (
    <>
      <circle cx="12" cy="5.5" r="2.5" />
      <circle cx="5.5" cy="17.5" r="2.5" />
      <circle cx="18.5" cy="17.5" r="2.5" />
      <path d="m10.7 7.7-4 7.6M13.3 7.7l4 7.6M8 17.5h8" />
    </>
  ),
  hvac: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3.5" />
      <circle cx="12" cy="12" r="7" />
      <path d={blade} />
      <path d={blade} transform="rotate(90 12 12)" />
      <path d={blade} transform="rotate(180 12 12)" />
      <path d={blade} transform="rotate(270 12 12)" />
    </>
  ),
  "fire-fighting": (
    <>
      <rect x="6.5" y="3" width="11" height="3" rx="1" />
      <path d="M12 6v3.5M7 9.5h10l-2 3.2H9z" />
      <path d="M12 15v3.2M8.2 14.4l-1.8 3M15.8 14.4l1.8 3M5.2 12.6l-1.6 1.6M18.8 12.6l1.6 1.6" />
    </>
  ),
  plumbing: (
    <>
      <path d="M3 8.5h9a3.5 3.5 0 0 1 3.5 3.5v.5" />
      <path d="M8.5 8.5V5.5M6.5 5.5h4" />
      <path d="M15.5 15.4c-1.2 1.6-2 2.6-2 3.6a2 2 0 0 0 4 0c0-1-.8-2-2-3.6Z" />
    </>
  ),
  "electrical-elv": (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3.5" />
      <path d="M13.2 6.5 8 13.2h3.8L10.8 17.5 16 10.8h-3.8z" />
    </>
  ),
  "pools-fountains": (
    <>
      <path d="M12 19.5V8.5" />
      <path d="M12 8.5c-1.4-3.4-5.2-3.6-6.6-.6M12 8.5c1.4-3.4 5.2-3.6 6.6-.6" />
      <path d="M12 12.5c-1.3-2.4-3.6-2.6-4.6-.6M12 12.5c1.3-2.4 3.6-2.6 4.6-.6" />
      <path d="M3.5 19.5h17" />
    </>
  ),
};

export const serviceColor = (slug: ServiceSlug) => disciplineColor[slug];

export function ServiceIcon({ slug, className }: { slug: ServiceSlug; className?: string }) {
  return (
    <svg {...base} className={className}>
      {icons[slug]}
    </svg>
  );
}
