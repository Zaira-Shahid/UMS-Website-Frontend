import type { ServiceSlug } from "@/types";

/**
 * Small isometric line drawings, one per discipline, in the same visual language as the hero cutaway.
 * Pure line work in `currentColor`: set the colour on the parent. Decorative, so hidden from assistive tech.
 */

const S = 19; // px per unit
const C = 0.866;
const OX = 96;
const OY = 52;
const P = (x: number, y: number, z: number): [number, number] => [OX + (x - y) * C * S, OY + (x + y) * 0.5 * S - z * S];
const f = (n: number) => n.toFixed(1);
const pt = (x: number, y: number, z: number) => P(x, y, z).map(f).join(" ");
const line = (...pts: [number, number, number][]) => pts.map(([x, y, z], i) => `${i ? "L" : "M"}${pt(x, y, z)}`).join("");

/** Visible edges of a box: top face plus the two front faces. */
function box(x: number, y: number, z: number, dx: number, dy: number, dz: number) {
  return [
    `M${pt(x, y, z + dz)}L${pt(x + dx, y, z + dz)}L${pt(x + dx, y + dy, z + dz)}L${pt(x, y + dy, z + dz)}Z`,
    `M${pt(x, y + dy, z + dz)}L${pt(x, y + dy, z)}L${pt(x + dx, y + dy, z)}L${pt(x + dx, y + dy, z + dz)}`,
    `M${pt(x + dx, y, z + dz)}L${pt(x + dx, y, z)}L${pt(x + dx, y + dy, z)}`,
  ].join("");
}

function disc(cx: number, cy: number, z: number, r: number) {
  const [sx, sy] = P(cx, cy, z);
  return <ellipse cx={sx} cy={sy} rx={r * 1.2247 * S} ry={r * 0.7071 * S} />;
}

const drawings: Record<ServiceSlug, React.ReactNode> = {
  hvac: (
    <>
      <path d={box(0, 0.2, 0, 1.5, 1.4, 1.1)} />
      {disc(0.75, 0.9, 1.1, 0.42)}
      <path d={box(1.5, 0.55, 0.45, 3.2, 0.6, 0.5)} />
      <path d={box(4.1, 0.2, 0.05, 1.1, 1.3, 0.08)} />
      <path d={line([1.7, 0.85, 0.95], [4.5, 0.85, 0.95])} strokeDasharray="1.5 4" />
    </>
  ),
  "fire-fighting": (
    <>
      <path d={line([0.4, 0.5, 0], [0.4, 0.5, 3.1], [4.6, 0.5, 3.1])} />
      <path d={box(-0.1, 0, 0, 1, 1, 0.3)} />
      {[1.6, 2.9, 4.2].map((x) => (
        <g key={x}>
          <path d={line([x, 0.5, 3.1], [x, 0.5, 2.45])} />
          {disc(x, 0.5, 2.4, 0.12)}
        </g>
      ))}
      <path d={line([2.9, 0.5, 3.1], [2.9, 2.6, 3.1])} />
      <path d={line([2.9, 1.6, 3.1], [2.9, 1.6, 2.55])} />
      {disc(2.9, 1.6, 2.5, 0.12)}
    </>
  ),
  "electrical-elv": (
    <>
      <path d={box(0, 0, 0, 0.7, 1.3, 2.2)} />
      <path d={line([0.7, 0.2, 1.9], [5, 0.2, 1.9])} />
      <path d={line([0.7, 0.75, 1.9], [5, 0.75, 1.9])} />
      {[1.2, 1.9, 2.6, 3.3, 4, 4.7].map((x) => (
        <path key={x} d={line([x, 0.2, 1.9], [x, 0.75, 1.9])} />
      ))}
      <path d={line([4.9, 0.5, 1.9], [4.9, 0.5, 0.2])} strokeDasharray="1.5 4" />
      {disc(2.6, 0.5, 1.5, 0.12)}
      {disc(4, 0.5, 1.5, 0.12)}
    </>
  ),
  plumbing: (
    <>
      <path d={line([3.4, 0.6, 0], [3.4, 0.6, 3.1])} />
      <path d={line([3.1, 0.6, 0], [3.1, 0.6, 3.1])} strokeDasharray="3 3" />
      {[0.9, 2.1].map((z) => (
        <g key={z}>
          <path d={line([3.4, 0.6, z], [0.9, 0.6, z])} />
          <path d={box(0.1, 0.25, z - 0.9, 0.8, 0.7, 0.55)} />
        </g>
      ))}
      <path d={line([3.4, 0.6, 3.1], [3.4, 0.6, 3.5])} />
      {disc(3.4, 0.6, 3.5, 0.3)}
      <path d={line([3.25, 0.6, 1.55], [3.55, 0.6, 1.55])} />
    </>
  ),
  "integrated-mep": (
    <>
      {[0, 1.25, 2.5].map((z) => (
        <path key={z} d={box(0, 0, z, 3.8, 2.4, 0.1)} />
      ))}
      <path d={line([0.4, 0.4, 0], [0.4, 0.4, 3.4])} />
      <path d={line([0.9, 0.4, 0], [0.9, 0.4, 3.4])} strokeDasharray="3 3" />
      {[1.25, 2.5].map((z) => (
        <path key={z} d={line([0.4, 0.4, z - 0.3], [3.4, 0.4, z - 0.3])} />
      ))}
      <path d={line([0.4, 0.4, 3.2], [3.4, 0.4, 3.2])} />
    </>
  ),
  "pools-fountains": (
    <>
      <path d={box(0, 0, 0, 5, 3, 0.08)} />
      <path d={box(0.5, 0.5, 0, 4, 2, 0.08)} />
      <path d={line([1, 1.5, 0.05], [4, 1.5, 0.05])} strokeDasharray="1.5 4" />
      {[2, 2.5, 3].map((x, i) => (
        <path
          key={x}
          d={`M${pt(x, 1.5, 0.08)}Q${pt(x + 0.3, 1.5, 1.2 + i * 0.1)} ${pt(x + 0.6, 1.5, 0.08)}`}
        />
      ))}
    </>
  ),
};

export function DisciplineSketch({ slug, className }: { slug: ServiceSlug; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 130"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {drawings[slug]}
    </svg>
  );
}
