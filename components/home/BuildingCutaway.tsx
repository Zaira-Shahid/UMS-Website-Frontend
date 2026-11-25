import type { ReactNode } from "react";

/**
 * Original illustration: an isometric cutaway of a four-storey building with its MEP systems routed
 * through it (HVAC ducts, fire-protection pipework, electrical trays and risers, plumbing risers).
 * Everything is generated from the geometry constants below, so there is no image asset to load and
 * the drawing stays crisp at any size. It is an illustration of the *kinds* of systems in a building,
 * not a drawing of any UMS project.
 *
 * Projection: x runs right-down, y runs left-down, z is up. The two back walls are shown, the two
 * front faces are drawn as faint glass, so the interior reads as a cutaway.
 */

export type SystemKey = "hvac" | "fire" | "elec" | "plumb";

type V3 = [number, number, number];

/* ---- geometry ---- */
const S = 60; // px per unit
const C = 0.866; // cos 30deg
const W = 5.2; // width  (x)
const D = 2.7; // depth  (y)
const H = 1.25; // storey height
const N = 4; // storeys
const M = 0.55; // ground platform margin
const PAD = 30;
const LABEL_MARGIN = 96; // empty space either side of the building for the callout labels
const GEAR = 1.0; // headroom above the roof for plant

const OX = PAD + LABEL_MARGIN + (D + 2 * M) * C * S;
const OY = PAD + (N * H + GEAR) * S;

export const CUTAWAY_VIEWBOX = {
  w: Math.round(2 * (PAD + LABEL_MARGIN) + (W + D + 4 * M) * C * S),
  h: Math.round(OY + (W + D + 2 * M) * 0.5 * S + 0.25 * S + PAD),
};

const p = (x: number, y: number, z: number): [number, number] => [
  OX + (x - y) * C * S,
  OY + (x + y) * 0.5 * S - z * S,
];
const f1 = (n: number) => n.toFixed(1);
const poly = (pts: V3[]) => pts.map(([x, y, z]) => p(x, y, z).map(f1).join(",")).join(" ");
const path = (pts: V3[]) => pts.map(([x, y, z], i) => `${i ? "L" : "M"}${p(x, y, z).map(f1).join(" ")}`).join("");

/* ---- palette (discipline colours match the site tokens, desaturated for the dark field) ---- */
type Shade = { top: string; left: string; right: string };
const COL: Record<SystemKey, Shade> = {
  hvac: { top: "#7fd3f2", left: "#2f9fd0", right: "#12688f" },
  fire: { top: "#ff9a94", left: "#e8453d", right: "#a8231d" },
  elec: { top: "#ffd978", left: "#f0b429", right: "#b07a0c" },
  plumb: { top: "#7ceedb", left: "#22c1a9", right: "#0f8572" },
};
const GLASS_EDGE = "rgba(150, 215, 245, 0.55)";

/* ---- primitives ---- */
function Box({
  x,
  y,
  z,
  dx,
  dy,
  dz,
  c,
  edge = "rgba(6, 20, 31, 0.55)",
  sw = 0.6,
}: {
  x: number;
  y: number;
  z: number;
  dx: number;
  dy: number;
  dz: number;
  c: Shade;
  edge?: string;
  sw?: number;
}) {
  return (
    <g stroke={edge} strokeWidth={sw} strokeLinejoin="round">
      <polygon points={poly([[x, y, z + dz], [x + dx, y, z + dz], [x + dx, y + dy, z + dz], [x, y + dy, z + dz]])} fill={c.top} />
      <polygon points={poly([[x, y + dy, z], [x + dx, y + dy, z], [x + dx, y + dy, z + dz], [x, y + dy, z + dz]])} fill={c.left} />
      <polygon points={poly([[x + dx, y, z], [x + dx, y + dy, z], [x + dx, y + dy, z + dz], [x + dx, y, z + dz]])} fill={c.right} />
    </g>
  );
}

function Pipe({ pts, color, w = 3 }: { pts: V3[]; color: string; w?: number }) {
  const d = path(pts);
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke="rgba(6, 20, 31, 0.6)" strokeWidth={w + 1.6} />
      <path d={d} stroke={color} strokeWidth={w} />
    </g>
  );
}

/** Animated dashes showing the direction of flow along a run. */
function Flow({ pts, w = 1.3 }: { pts: V3[]; w?: number }) {
  return (
    <path
      d={path(pts)}
      className="cutaway-flow"
      fill="none"
      stroke="#ffffff"
      strokeOpacity={0.8}
      strokeWidth={w}
      strokeLinecap="round"
    />
  );
}

/** Circle lying on a horizontal plane, drawn as an isometric ellipse. */
function Disc({ cx, cy, z, r, fill, stroke }: { cx: number; cy: number; z: number; r: number; fill: string; stroke?: string }) {
  const [sx, sy] = p(cx, cy, z);
  return <ellipse cx={sx} cy={sy} rx={r * 1.2247 * S} ry={r * 0.7071 * S} fill={fill} stroke={stroke} strokeWidth={0.7} />;
}

function Tank({ cx, cy, z, r, h, c }: { cx: number; cy: number; z: number; r: number; h: number; c: Shade }) {
  const [sx, sy] = p(cx, cy, z);
  const rx = r * 1.2247 * S;
  const ry = r * 0.7071 * S;
  const top = sy - h * S;
  return (
    <g stroke="rgba(6, 20, 31, 0.55)" strokeWidth={0.6}>
      <path d={`M${f1(sx - rx)} ${f1(top)}V${f1(sy)}A${f1(rx)} ${f1(ry)} 0 0 0 ${f1(sx + rx)} ${f1(sy)}V${f1(top)}Z`} fill={c.left} />
      <ellipse cx={sx} cy={top} rx={rx} ry={ry} fill={c.top} />
    </g>
  );
}

/** A slab: top face plus the two visible edges. */
function Slab({ z, t = 0.07 }: { z: number; t?: number }) {
  return (
    <Box
      x={0}
      y={0}
      z={z - t}
      dx={W}
      dy={D}
      dz={t}
      c={{ top: "rgba(150, 210, 240, 0.10)", left: "rgba(120, 190, 225, 0.34)", right: "rgba(80, 150, 200, 0.34)" }}
      edge={GLASS_EDGE}
      sw={0.8}
    />
  );
}

function Sys({ k, onHover, children }: { k: SystemKey; onHover?: (k: SystemKey | null) => void; children: ReactNode }) {
  return (
    <g className={`cutaway-sys cutaway-sys-${k}`} onPointerEnter={() => onHover?.(k)} onPointerLeave={() => onHover?.(null)}>
      {children}
    </g>
  );
}

function Leader({
  label,
  color,
  tx,
  ty,
  lx,
  ly,
  side,
}: {
  label: string;
  color: string;
  tx: number;
  ty: number;
  lx: number;
  ly: number;
  side: "left" | "right";
}) {
  const ex = side === "left" ? tx - 26 : tx + 26;
  return (
    <g>
      <path d={`M${f1(lx)} ${f1(ly + 8)}H${f1(ex)}L${f1(tx)} ${f1(ty)}`} fill="none" stroke={color} strokeOpacity={0.85} strokeWidth={1.3} />
      <circle cx={tx} cy={ty} r={4} fill="#06141f" stroke={color} strokeWidth={1.8} />
      <text
        x={lx}
        y={ly}
        textAnchor={side === "left" ? "start" : "end"}
        fill="#ffffff"
        stroke="#06141f"
        strokeWidth={4}
        paintOrder="stroke"
        strokeLinejoin="round"
        fontSize={13.5}
        fontWeight={500}
        letterSpacing="0.12em"
        fontFamily="var(--font-jetbrains), ui-monospace, monospace"
      >
        {label}
      </text>
    </g>
  );
}

/* ---- the drawing ---- */
export function BuildingCutaway({
  active,
  onHover,
  className,
  showLabels = true,
}: {
  /** The system to keep bright; the others dim (see `.cutaway` in globals.css). */
  active?: SystemKey | null;
  /** Callout labels with leader lines. The explainer section labels the systems with tabs instead. */
  showLabels?: boolean;
  onHover?: (k: SystemKey | null) => void;
  className?: string;
}) {
  const { w: VW, h: VH } = CUTAWAY_VIEWBOX;
  const TOP = N * H;
  const floors = Array.from({ length: N }, (_, f) => f);
  const mullions = (len: number, step = 1) => Array.from({ length: Math.floor(len / step) - 1 }, (_, i) => (i + 1) * step);

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      role="img"
      aria-label="Illustration: a cutaway of a four-storey building showing HVAC ducts, fire-protection pipework, electrical cable trays and plumbing risers routed through every floor."
      className={className}
      data-active={active ?? undefined}
      fill="none"
    >
      <defs>
        <linearGradient id="cw-wall-l" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2f78a8" stopOpacity="0.34" />
          <stop offset="1" stopColor="#173f60" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id="cw-wall-r" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4b9ccb" stopOpacity="0.26" />
          <stop offset="1" stopColor="#173f60" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* Ground platform with a faint site grid */}
      <g>
        <Box
          x={-M}
          y={-M}
          z={-0.25}
          dx={W + 2 * M}
          dy={D + 2 * M}
          dz={0.25}
          c={{ top: "#0c2a40", left: "#0a2236", right: "#081a2a" }}
          edge="rgba(92, 196, 238, 0.35)"
          sw={0.8}
        />
        <g stroke="rgba(92, 196, 238, 0.16)" strokeWidth={0.7}>
          {Array.from({ length: Math.floor((W + 2 * M) / 0.7) + 1 }, (_, i) => -M + i * 0.7).map((x) => (
            <path key={`gx${x}`} d={path([[x, -M, 0], [x, D + M, 0]])} />
          ))}
          {Array.from({ length: Math.floor((D + 2 * M) / 0.7) + 1 }, (_, i) => -M + i * 0.7).map((y) => (
            <path key={`gy${y}`} d={path([[-M, y, 0], [W + M, y, 0]])} />
          ))}
        </g>
      </g>

      {/* Back walls (the cut-away interior faces) */}
      <polygon points={poly([[0, 0, 0], [0, D, 0], [0, D, TOP], [0, 0, TOP]])} fill="url(#cw-wall-l)" stroke={GLASS_EDGE} strokeWidth={0.8} />
      <polygon points={poly([[0, 0, 0], [W, 0, 0], [W, 0, TOP], [0, 0, TOP]])} fill="url(#cw-wall-r)" stroke={GLASS_EDGE} strokeWidth={0.8} />
      <g stroke="rgba(190, 235, 255, 0.13)" strokeWidth={0.7}>
        {mullions(D).map((y) => (
          <path key={`ml${y}`} d={path([[0, y, 0], [0, y, TOP]])} />
        ))}
        {mullions(W).map((x) => (
          <path key={`mr${x}`} d={path([[x, 0, 0], [x, 0, TOP]])} />
        ))}
      </g>

      <Slab z={0} />

      {/* Ground-floor plant */}
      <Sys k="hvac" onHover={onHover}>
        <Box x={2.6} y={0.45} z={0} dx={1.5} dy={0.7} dz={0.5} c={COL.hvac} />
        <Box x={2.6} y={0.45} z={0.5} dx={0.5} dy={0.7} dz={0.18} c={COL.hvac} />
        <Disc cx={3.75} cy={0.8} z={0.5} r={0.22} fill="#0b2236" stroke="rgba(255,255,255,0.5)" />
      </Sys>
      <Sys k="elec" onHover={onHover}>
        <Box x={0.55} y={0.4} z={0} dx={1.0} dy={0.4} dz={0.75} c={COL.elec} />
      </Sys>
      <Sys k="fire" onHover={onHover}>
        <Box x={0.3} y={1.75} z={0} dx={0.9} dy={0.45} dz={0.35} c={COL.fire} />
      </Sys>
      <Sys k="plumb" onHover={onHover}>
        <Box x={W - 1.7} y={1.3} z={0} dx={0.8} dy={0.5} dz={0.4} c={COL.plumb} />
      </Sys>

      {/* Storeys, bottom to top: services under each ceiling, then that ceiling slab */}
      {floors.map((f) => {
        const z0 = f * H;
        const zc = (f + 1) * H;
        const FY = D - 0.28;
        return (
          <g key={f}>
            <Sys k="plumb" onHover={onHover}>
              <Pipe pts={[[W - 0.75, 0.5, z0], [W - 0.75, 0.5, zc]]} color="#5b8aa0" w={3.4} />
              <Pipe pts={[[W - 0.45, 0.5, z0], [W - 0.45, 0.5, zc]]} color={COL.plumb.left} w={3} />
              <Flow pts={[[W - 0.45, 0.5, zc], [W - 0.45, 0.5, z0]]} />
              <Pipe pts={[[W - 0.45, 0.5, z0 + 0.5], [W - 2.0, 0.5, z0 + 0.5]]} color={COL.plumb.top} w={1.8} />
              <Pipe pts={[[W - 0.45, 0.5, z0 + 0.38], [W - 2.0, 0.5, z0 + 0.38]]} color="#ff9a94" w={1.4} />
              <Box x={W - 2.55} y={0.2} z={z0} dx={0.5} dy={0.5} dz={0.38} c={{ top: "#d4fbf4", left: "#8fe3d3", right: "#4cb7a5" }} />
            </Sys>

            <Sys k="elec" onHover={onHover}>
              <Pipe pts={[[0.3, 0.3, z0], [0.3, 0.3, zc]]} color={COL.elec.left} w={3.6} />
              <Flow pts={[[0.3, 0.3, z0], [0.3, 0.3, zc]]} />
              <Box x={0.04} y={0.95} z={z0 + 0.15} dx={0.14} dy={0.55} dz={0.62} c={COL.elec} />
              <Pipe pts={[[0.14, 0.3, zc - 0.3], [0.14, D - 0.5, zc - 0.3]]} color={COL.elec.top} w={2.2} />
              <Pipe pts={[[0.3, 0.14, zc - 0.3], [W - 0.5, 0.14, zc - 0.3]]} color={COL.elec.top} w={2.2} />
              {[2.0, 3.4].map((x) => (
                <Disc key={x} cx={x} cy={0.85} z={zc - 0.08} r={0.09} fill="#fff4cf" stroke="rgba(6,20,31,0.5)" />
              ))}
            </Sys>

            <Sys k="hvac" onHover={onHover}>
              <Box x={0.95} y={1.2} z={z0} dx={0.42} dy={0.4} dz={H} c={COL.hvac} />
              <Box x={1.4} y={1.2} z={zc - 0.52} dx={W - 1.9} dy={0.4} dz={0.28} c={COL.hvac} />
              <Flow pts={[[1.16, 1.4, zc - 0.24], [W - 0.55, 1.4, zc - 0.24]]} />
              {[2.5, 4.0].map((x) => (
                <g key={x}>
                  <Box x={x} y={1.6} z={zc - 0.5} dx={0.26} dy={0.8} dz={0.22} c={COL.hvac} />
                  <Box x={x - 0.09} y={2.2} z={zc - 0.56} dx={0.44} dy={0.44} dz={0.05} c={{ top: "#d6f0fb", left: "#9ee3fb", right: "#6cc8ea" }} />
                </g>
              ))}
            </Sys>

            <Sys k="fire" onHover={onHover}>
              <Pipe pts={[[0.55, FY, z0], [0.55, FY, zc]]} color={COL.fire.left} w={4} />
              <Pipe pts={[[0.55, FY, zc - 0.2], [W - 0.5, FY, zc - 0.2]]} color={COL.fire.left} w={2.8} />
              <Pipe pts={[[3.2, FY, zc - 0.2], [3.2, 1.9, zc - 0.2]]} color={COL.fire.left} w={2} />
              {[1.7, 3.2, 4.6].map((x) => (
                <g key={x}>
                  <Pipe pts={[[x, FY, zc - 0.2], [x, FY, zc - 0.4]]} color={COL.fire.top} w={1.5} />
                  <Disc cx={x} cy={FY} z={zc - 0.42} r={0.07} fill={COL.fire.top} stroke="rgba(6,20,31,0.5)" />
                </g>
              ))}
            </Sys>

            <Slab z={zc} />
          </g>
        );
      })}

      {/* Roof plant */}
      <Sys k="hvac" onHover={onHover}>
        <Box x={0.7} y={0.55} z={TOP} dx={1.3} dy={0.85} dz={0.55} c={COL.hvac} />
        <Box x={0.95} y={1.2} z={TOP} dx={0.42} dy={0.4} dz={0.2} c={COL.hvac} />
        {[2.9, 4.0].map((x) => (
          <g key={x}>
            <Box x={x} y={0.45} z={TOP} dx={1.0} dy={1.0} dz={0.4} c={COL.hvac} />
            <Disc cx={x + 0.5} cy={0.95} z={TOP + 0.4} r={0.36} fill="#0b2236" stroke="rgba(255,255,255,0.55)" />
            <Disc cx={x + 0.5} cy={0.95} z={TOP + 0.4} r={0.12} fill="#9ee3fb" />
          </g>
        ))}
      </Sys>
      <Sys k="plumb" onHover={onHover}>
        <Tank cx={W - 1.15} cy={1.7} z={TOP} r={0.5} h={0.6} c={COL.plumb} />
      </Sys>
      <Sys k="elec" onHover={onHover}>
        <Pipe pts={[[0.3, 0.3, TOP], [0.3, 0.3, TOP + 0.4]]} color={COL.elec.top} w={2} />
        <Disc cx={0.3} cy={0.3} z={TOP + 0.4} r={0.08} fill={COL.elec.top} />
      </Sys>

      {/* Front faces drawn as faint glass over the interior */}
      <polygon points={poly([[W, 0, 0], [W, D, 0], [W, D, TOP], [W, 0, TOP]])} fill="rgba(150, 210, 240, 0.045)" stroke={GLASS_EDGE} strokeWidth={0.8} />
      <polygon points={poly([[0, D, 0], [W, D, 0], [W, D, TOP], [0, D, TOP]])} fill="rgba(170, 220, 245, 0.06)" stroke={GLASS_EDGE} strokeWidth={0.8} />
      <g stroke="rgba(190, 235, 255, 0.10)" strokeWidth={0.7}>
        {mullions(D).map((y) => (
          <path key={`fr${y}`} d={path([[W, y, 0], [W, y, TOP]])} />
        ))}
        {mullions(W).map((x) => (
          <path key={`fl${x}`} d={path([[x, D, 0], [x, D, TOP]])} />
        ))}
      </g>

      {/* Callouts (desktop only) */}
      <g className={showLabels ? "max-md:hidden" : "hidden"}>
        <Leader label="ELECTRICAL & ELV" color={COL.elec.left} tx={p(0.3, 0.3, TOP + 0.4)[0]} ty={p(0.3, 0.3, TOP + 0.4)[1]} lx={PAD} ly={PAD + 22} side="left" />
        <Leader label="HVAC" color={COL.hvac.left} tx={p(3.5, 0.95, TOP + 0.45)[0]} ty={p(3.5, 0.95, TOP + 0.45)[1]} lx={VW - PAD} ly={PAD + 22} side="right" />
        <Leader label="PLUMBING" color={COL.plumb.left} tx={p(W - 0.45, 0.5, 2.5 * H)[0]} ty={p(W - 0.45, 0.5, 2.5 * H)[1]} lx={VW - PAD} ly={p(W - 0.45, 0.5, 2.5 * H)[1] - 40} side="right" />
        <Leader label="FIRE PROTECTION" color={COL.fire.left} tx={p(0.55, D - 0.28, 1.5 * H)[0]} ty={p(0.55, D - 0.28, 1.5 * H)[1]} lx={PAD} ly={p(0.55, D - 0.28, 1.5 * H)[1] - 40} side="left" />
      </g>
    </svg>
  );
}
