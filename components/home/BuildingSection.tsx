import type { ReactNode } from "react";

/**
 * A 2D architectural section (a front cut-through, not isometric) of a typical building, drawn like an
 * engineering sheet: levels B1 to ROOF, slabs, ceiling voids, risers and plant, with the four MEP systems
 * placed where they sit in a real building. Everything is generated from the constants below, so the drawing
 * is plain inline SVG: no image, no dependency. It is a generic illustration, not a drawing of any UMS project.
 *
 * Horizontal layout, left to right: level markers, the service shaft (risers), the open floor plate, the lift
 * core. Vertical layout: basement plant rooms, ground floor, five typical floors, roof plant.
 */

export type SystemKey = "hvac" | "fire" | "elec" | "plumb";

/* ---- geometry (SVG units; 1 m = S) ---- */
const S = 24;
const VW = 800;
const GL = 790; // y of the ground floor level (FFL ±0.000)
const BX0 = 150; // building, left face
const BX1 = 720; // building, right face
const SHAFT = 304; // right wall of the service shaft
const VH = GL + 4.6 * S + 56; // bottom of the sheet

const Y = (elev: number) => GL - elev * S;
const f1 = (n: number) => +n.toFixed(1);

type Level = { id: string; e: number };
const LEVELS: Level[] = [
  { id: "B1", e: -4.2 },
  { id: "GF", e: 0 },
  { id: "L1", e: 5.0 },
  { id: "L2", e: 8.8 },
  { id: "L3", e: 12.6 },
  { id: "L4", e: 16.4 },
  { id: "L5", e: 20.2 },
  { id: "ROOF", e: 24.0 },
];
const ROOF = 24.0;
/** Storeys above ground: floor level `f` to the underside-level `n` of the slab above. */
const STOREYS = LEVELS.slice(1, -1).map((l, i) => ({ id: l.id, f: l.e, n: LEVELS[i + 2].e }));

/* ---- palette: navy linework on a white sheet, colour-coded systems ---- */
const INK = "#173f60";
const FAINT = "#8aa0b2";
const SLAB = "#cfdce6";
const SHAFT_FILL = "#eef3f7";
const COL: Record<SystemKey, { line: string; tint: string }> = {
  hvac: { line: "#0a8fcf", tint: "#d9f0fb" },
  fire: { line: "#d8322b", tint: "#fde3e1" },
  elec: { line: "#d99a00", tint: "#fdf0c4" },
  plumb: { line: "#00998b", tint: "#d1f3ef" },
};

/* ---- riser x positions (left to right) ---- */
const R = { elec: 168, fire: 190, supply: 212, drain: 234, duct0: 256, duct1: 286 };
/* ---- vertical structure columns, ceiling devices ---- */
const COLS = [392, 552];
const HEADS = [420, 480, 600, 660];
const DIFFUSERS = [450, 520, 630];
const DETECTORS = [500, 580];
/* ---- basement rooms (left to right) ---- */
const ROOMS = {
  lt: { x0: 312, x1: 382 },
  pump: { x0: 388, x1: 466 },
  tank: { x0: 472, x1: 572 },
  stp: { x0: 578, x1: 660 },
};

/** The callouts: numbered badges on the drawing, shown for the selected system only. */
export const SECTION_CALLOUTS: Record<SystemKey, { n: number; label: string; x: number; y: number; tx: number; ty: number; anchor: "start" | "middle" | "end" }[]> = {
  hvac: [
    { n: 1, label: "Chillers & cooling towers", x: 500, y: Y(26.2), tx: 540, ty: Y(28.5), anchor: "end" },
    { n: 2, label: "AHU & supply riser", x: 284, y: Y(25.5), tx: 270, ty: Y(25.5) - 14, anchor: "end" },
    { n: 3, label: "Supply & return ducts", x: 470, y: Y(12.6 + 3.8 - 0.95), tx: 484, ty: Y(12.6 + 3.8 - 0.95) - 8, anchor: "start" },
    { n: 4, label: "Ceiling diffusers", x: 520, y: Y(8.8 + 3.8 - 1.2) + 12, tx: 534, ty: Y(8.8 + 3.8 - 1.2) + 20, anchor: "start" },
  ],
  fire: [
    { n: 1, label: "Fire pump room", x: 427, y: Y(-3.2), tx: 427, ty: Y(-4.2) + 28, anchor: "middle" },
    { n: 2, label: "Wet riser", x: R.fire, y: Y(10.2), tx: R.fire - 16, ty: Y(10.2) + 4, anchor: "end" },
    { n: 3, label: "Sprinkler main & heads", x: 540, y: Y(16.4 + 3.8 - 0.68) + 0, tx: 554, ty: Y(16.4 + 3.8 - 0.68) - 8, anchor: "start" },
    { n: 4, label: "Hose reel cabinet", x: 373, y: Y(5.0 + 1.5), tx: 396, ty: Y(5.0 + 1.5) + 4, anchor: "start" },
  ],
  elec: [
    { n: 1, label: "LT panel room", x: 347, y: Y(-3.2), tx: 347, ty: Y(-4.2) + 28, anchor: "middle" },
    { n: 2, label: "Busbar / cable riser", x: R.elec, y: Y(18.2), tx: R.elec + 16, ty: Y(18.2) + 5, anchor: "start" },
    { n: 3, label: "Floor distribution board", x: 317, y: Y(12.6 + 1.6), tx: 340, ty: Y(12.6 + 1.6) + 4, anchor: "start" },
    { n: 4, label: "Fire alarm devices", x: 540, y: Y(20.2 + 3.8 - 1.2) + 4, tx: 554, ty: Y(20.2 + 3.8 - 1.2) + 10, anchor: "start" },
  ],
  plumb: [
    { n: 1, label: "Underground tank & pumps", x: 522, y: Y(-3.2), tx: 548, ty: Y(-4.2) + 28, anchor: "end" },
    { n: 2, label: "Rooftop water tank", x: 206, y: Y(25.2), tx: 192, ty: Y(25.2) - 20, anchor: "end" },
    { n: 3, label: "Supply & drainage risers", x: R.supply + 11, y: Y(10.4), tx: R.supply + 4, ty: Y(10.4) + 34, anchor: "start" },
    { n: 4, label: "Sewage treatment plant", x: 619, y: Y(-3.2), tx: 596, ty: Y(-4.2) + 28, anchor: "start" },
  ],
};

/* ---- small drawing helpers ---- */
const fmtFFL = (e: number) => (e === 0 ? "±0.000" : `${e > 0 ? "+" : "−"}${Math.abs(e).toFixed(3)}`);

function Pump({ cx, cy, color }: { cx: number; cy: number; color: string }) {
  return (
    <g stroke={color} strokeWidth={1.4} fill="#fff">
      <circle cx={cx} cy={cy} r={8} />
      <path d={`M${cx - 6} ${cy + 8}v6h12v-6M${cx + 8} ${cy - 3}h10v6h-10`} fill="none" />
      <path d={`M${cx - 10} ${cy + 14}h20`} fill="none" />
    </g>
  );
}

function Sys({ k, children }: { k: SystemKey; children: ReactNode }) {
  return <g className={`sec-sys sec-sys-${k}`}>{children}</g>;
}

export function BuildingSection({ active, className }: { active?: SystemKey | null; className?: string }) {
  const baseTop = Y(ROOF);
  const baseBot = Y(-4.2) + 0.3 * S;

  return (
    <svg
      viewBox={`0 0 ${VW} ${f1(VH)}`}
      role="img"
      aria-label="Technical drawing: a typical building in section, from a basement plant room to the roof, showing where the HVAC, fire protection, electrical and plumbing systems sit on each level."
      className={className}
      data-active={active ?? undefined}
      fill="none"
      fontFamily="var(--font-jetbrains), ui-monospace, monospace"
    >
      <defs>
        <pattern id="bs-soil" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0v9" stroke={FAINT} strokeWidth="0.7" />
        </pattern>
        <pattern id="bs-water" width="10" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 3q2.5-2.5 5 0t5 0" stroke={COL.plumb.line} strokeWidth="0.7" opacity="0.6" />
        </pattern>
      </defs>

      {/* sheet frame */}
      <rect x="6" y="6" width={VW - 12} height={f1(VH) - 12} stroke={INK} strokeWidth="1" opacity="0.35" />

      {/* ground and soil */}
      <path d={`M40 ${GL}H${BX0}M${BX1} ${GL}H${VW - 20}`} stroke={INK} strokeWidth="1.6" />
      <rect x="40" y={GL} width={BX0 - 40} height={4.6 * S} fill="url(#bs-soil)" />
      <rect x={BX1} y={GL} width={VW - 20 - BX1} height={4.6 * S} fill="url(#bs-soil)" />

      {/* service shaft */}
      <rect x={BX0} y={baseTop} width={SHAFT - BX0} height={Y(0) - baseTop} fill={SHAFT_FILL} />

      {/* storeys: light panelling, lift core, ceiling lines */}
      {STOREYS.map((s) => (
        <g key={s.id}>
          <path d={`M${SHAFT} ${Y(s.f)}V${Y(s.n)}`} stroke={INK} strokeWidth="1" opacity="0.7" />
          <path d={`M${SHAFT} ${f1(Y(s.n - 1.2))}H${BX1 - 60}`} stroke={FAINT} strokeWidth="0.8" strokeDasharray="5 3" />
          {/* lift core cross */}
          <path d={`M${BX1 - 52} ${Y(s.f)}L${BX1} ${Y(s.n - 0.3)}M${BX1} ${Y(s.f)}L${BX1 - 52} ${Y(s.n - 0.3)}`} stroke={FAINT} strokeWidth="0.6" opacity="0.7" />
        </g>
      ))}
      <rect x={BX1 - 52} y={Y(ROOF)} width={52} height={Y(0) - Y(ROOF)} stroke={INK} strokeWidth="1" />
      {/* basement core */}
      <rect x={BX1 - 52} y={Y(0)} width={52} height={4.2 * S} stroke={INK} strokeWidth="1" fill={SHAFT_FILL} />

      {/* columns */}
      {COLS.map((x) => (
        <rect key={x} x={x} y={Y(ROOF)} width={8} height={Y(-4.2) - Y(ROOF)} fill="#e3ecf2" stroke={INK} strokeWidth="0.8" />
      ))}

      {/* slabs at every level */}
      {LEVELS.map((l) => (
        <rect key={l.id} x={BX0} y={Y(l.e)} width={BX1 - BX0} height={0.3 * S} fill={SLAB} stroke={INK} strokeWidth="0.9" />
      ))}

      {/* external walls: retaining below ground, glazed above */}
      <rect x={BX0 - 8} y={Y(0)} width={8} height={baseBot - Y(0)} fill="#b9cbd9" stroke={INK} strokeWidth="1" />
      <rect x={BX1} y={Y(0)} width={8} height={baseBot - Y(0)} fill="#b9cbd9" stroke={INK} strokeWidth="1" />
      <path d={`M${BX0} ${baseTop}V${Y(0)}M${BX1} ${baseTop}V${Y(0)}`} stroke={INK} strokeWidth="1.8" />
      <path d={`M${BX0 - 4} ${baseTop - 14}V${baseTop}M${BX1 + 4} ${baseTop - 14}V${baseTop}`} stroke={INK} strokeWidth="1.6" />

      {/* level markers */}
      {LEVELS.map((l) => (
        <g key={l.id}>
          <path d={`M60 ${Y(l.e)}H${VW - 20}`} stroke={FAINT} strokeWidth="0.6" strokeDasharray="10 4 2 4" opacity="0.8" />
          <path d={`M${BX0 - 30} ${Y(l.e)}l-8 -10h16z`} fill={INK} />
          <text className="sec-lvl" x="14" y={Y(l.e) - 6} fontSize="17" fontWeight="600" fill={INK}>
            {l.id}
          </text>
          <text className="max-md:hidden" x="14" y={Y(l.e) + 12} fontSize="12" fill={INK} opacity="0.7">
            FFL {fmtFFL(l.e)}
          </text>
        </g>
      ))}

      {/* ===================== HVAC ===================== */}
      <Sys k="hvac">
        {/* supply duct down the shaft */}
        <rect x={R.duct0} y={Y(ROOF + 0.4)} width={R.duct1 - R.duct0} height={Y(0.6) - Y(ROOF + 0.4)} fill={COL.hvac.tint} stroke={COL.hvac.line} strokeWidth="1.4" />
        {STOREYS.map((s) => {
          const yc = f1(Y(s.n - 1.2));
          return (
            <g key={s.id}>
              {/* supply duct in the ceiling void */}
              <rect x={R.duct1} y={f1(Y(s.n - 1.12))} width={650 - R.duct1} height={0.32 * S} fill={COL.hvac.tint} stroke={COL.hvac.line} strokeWidth="1.2" />
              {/* return air path (dashed) */}
              <path d={`M640 ${yc}V${f1(Y(s.n - 0.52))}H${R.duct1}`} stroke={COL.hvac.line} strokeWidth="1.1" strokeDasharray="6 3" />
              <path d={`M630 ${yc}h20`} stroke={COL.hvac.line} strokeWidth="1.4" />
              {/* diffusers */}
              {DIFFUSERS.map((x) => (
                <g key={x} stroke={COL.hvac.line} strokeWidth="1.2">
                  <path d={`M${x} ${f1(Y(s.n - 0.8))}V${yc}`} />
                  <path d={`M${x - 11} ${yc + 4}h22l-3 -4h-16z`} fill="#fff" />
                </g>
              ))}
            </g>
          );
        })}
        {/* roof plant: AHU, chillers, cooling towers */}
        <g stroke={COL.hvac.line} strokeWidth="1.4">
          <rect x="244" y={Y(ROOF + 2.3)} width="80" height={2.3 * S} fill={COL.hvac.tint} />
          <path d={`M256 ${Y(ROOF + 2.3)}v${2.3 * S}M312 ${Y(ROOF + 2.3)}v${2.3 * S}`} strokeWidth="0.8" />
          <circle cx="284" cy={Y(ROOF + 1.15)} r="11" fill="#fff" />
          <path d={`M284 ${Y(ROOF + 1.15) - 9}v18M275 ${Y(ROOF + 1.15)}h18`} strokeWidth="0.9" />
          {[342, 392].map((x) => (
            <g key={x}>
              <rect x={x} y={Y(ROOF + 1.7)} width="44" height={1.7 * S} rx="8" fill={COL.hvac.tint} />
              <circle cx={x + 12} cy={Y(ROOF + 0.85)} r="4" fill="#fff" />
              <circle cx={x + 32} cy={Y(ROOF + 0.85)} r="4" fill="#fff" />
            </g>
          ))}
          {[452, 556].map((x) => (
            <g key={x}>
              <path d={`M${x} ${Y(ROOF)}V${Y(ROOF + 2.8)}H${x + 96}V${Y(ROOF)}`} fill={COL.hvac.tint} />
              <path d={`M${x + 6} ${Y(ROOF + 2.8)}h84`} strokeWidth="2" />
              <ellipse cx={x + 48} cy={Y(ROOF + 3.2)} rx="34" ry="5" fill="#fff" />
              <path d={`M${x + 10} ${Y(ROOF + 0.5)}h76M${x + 10} ${Y(ROOF + 1.1)}h76M${x + 10} ${Y(ROOF + 1.7)}h76M${x + 10} ${Y(ROOF + 2.3)}h76`} strokeWidth="0.8" />
            </g>
          ))}
          {/* chilled and condenser water between the plant items */}
          <path d={`M324 ${Y(ROOF + 0.5)}H342M386 ${Y(ROOF + 0.5)}H392M436 ${Y(ROOF + 0.5)}H452`} strokeDasharray="4 3" />
        </g>
      </Sys>

      {/* ===================== FIRE ===================== */}
      <Sys k="fire">
        {/* wet riser from the pump room to the roof */}
        <path d={`M${R.fire} ${Y(ROOF + 1.2)}V${Y(-0.6)}`} stroke={COL.fire.line} strokeWidth="4.5" />
        <circle cx={R.fire} cy={Y(ROOF + 1.2)} r="4.5" fill="#fff" stroke={COL.fire.line} strokeWidth="1.4" />
        {/* pump room */}
        <g stroke={COL.fire.line} strokeWidth="1.4">
          <rect x={ROOMS.pump.x0} y={Y(-1.05)} width={ROOMS.pump.x1 - ROOMS.pump.x0} height={Y(-4.2) - Y(-1.05)} fill={COL.fire.tint} />
          <Pump cx={ROOMS.pump.x0 + 22} cy={Y(-3.2)} color={COL.fire.line} />
          <Pump cx={ROOMS.pump.x0 + 56} cy={Y(-3.2)} color={COL.fire.line} />
          <path d={`M${ROOMS.pump.x0 + 14} ${Y(-2.4)}V${Y(-1.5)}H${ROOMS.pump.x0 + 70}V${Y(-2.4)}`} strokeWidth="1" />
          <path d={`M${(ROOMS.pump.x0 + ROOMS.pump.x1) / 2} ${Y(-1.05)}V${f1(Y(-0.75))}H${R.fire}`} strokeWidth="2" />
        </g>
        <text className="max-md:hidden" x={ROOMS.pump.x0 + 4} y={Y(-1.05) + 14} fontSize="11" fill={COL.fire.line}>
          FIRE PUMPS
        </text>
        {STOREYS.map((s) => {
          const yc = f1(Y(s.n - 1.2));
          const ym = f1(Y(s.n - 0.68));
          return (
            <g key={s.id} stroke={COL.fire.line}>
              <path d={`M${R.fire} ${ym}H660`} strokeWidth="2" />
              {HEADS.map((x) => (
                <g key={x} strokeWidth="1.1">
                  <path d={`M${x} ${ym}V${yc}`} />
                  <circle cx={x} cy={+yc + 3.5} r="2.8" fill="#fff" />
                </g>
              ))}
              {/* hose reel cabinet */}
              <g strokeWidth="1.2">
                <rect x="366" y={Y(s.f + 2.0)} width="14" height={1.1 * S} fill={COL.fire.tint} />
                <circle cx="373" cy={Y(s.f + 1.45)} r="3.6" fill="#fff" />
              </g>
            </g>
          );
        })}
      </Sys>

      {/* ===================== ELECTRICAL & ELV ===================== */}
      <Sys k="elec">
        <rect x={R.elec - 4} y={Y(ROOF + 0.6)} width="8" height={Y(-0.6) - Y(ROOF + 0.6)} fill={COL.elec.tint} stroke={COL.elec.line} strokeWidth="1.4" />
        {/* LT panel room */}
        <g stroke={COL.elec.line} strokeWidth="1.4">
          <rect x={ROOMS.lt.x0} y={Y(-1.05)} width={ROOMS.lt.x1 - ROOMS.lt.x0} height={Y(-4.2) - Y(-1.05)} fill={COL.elec.tint} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={ROOMS.lt.x0 + 8 + i * 20} y={Y(-1.4)} width="16" height={2.5 * S} fill="#fff" />
              <path d={`M${ROOMS.lt.x0 + 16 + i * 20} ${Y(-1.4)}v${2.5 * S}`} strokeWidth="0.7" />
            </g>
          ))}
          <path d={`M${(ROOMS.lt.x0 + ROOMS.lt.x1) / 2} ${Y(-1.05)}V${f1(Y(-0.9))}H${R.elec}`} strokeWidth="2" />
        </g>
        <text className="max-md:hidden" x={ROOMS.lt.x0 + 4} y={Y(-1.05) + 14} fontSize="11" fill={COL.elec.line}>
          LT ROOM
        </text>
        {STOREYS.map((s) => {
          const yt = f1(Y(s.n - 0.38));
          const yc = f1(Y(s.n - 1.2));
          return (
            <g key={s.id} stroke={COL.elec.line}>
              {/* cable tray in the ceiling void */}
              <path d={`M${R.elec} ${yt}H660`} strokeWidth="1" />
              <path d={`M${R.elec} ${yt}H660`} strokeWidth="4" strokeDasharray="1.4 9" opacity="0.8" />
              {/* floor DB */}
              <g strokeWidth="1.2">
                <rect x="310" y={Y(s.f + 2.1)} width="14" height={1.2 * S} fill={COL.elec.tint} />
                <path d={`M317 ${Y(s.f + 2.1)}v${1.2 * S}`} strokeWidth="0.7" />
              </g>
              {/* fire alarm detectors */}
              {DETECTORS.map((x) => (
                <g key={x} strokeWidth="1.2">
                  <path d={`M${x} ${yt}V${yc}`} strokeDasharray="2 2" />
                  <circle cx={x} cy={+yc + 3.5} r="3" fill="#fff" />
                </g>
              ))}
            </g>
          );
        })}
        {/* roof: lightning finial on the busbar riser */}
        <path d={`M${R.elec} ${Y(ROOF + 0.6)}v-10`} stroke={COL.elec.line} strokeWidth="1.4" />
      </Sys>

      {/* ===================== PLUMBING ===================== */}
      <Sys k="plumb">
        {/* risers: supply (solid) and drainage (heavier, dashed) */}
        <path d={`M${R.supply} ${Y(ROOF + 0.1)}V${Y(-0.6)}`} stroke={COL.plumb.line} strokeWidth="3" />
        <path d={`M${R.drain} ${Y(ROOF - 0.4)}V${Y(-0.45)}`} stroke={COL.plumb.line} strokeWidth="5" strokeDasharray="9 3" />
        {/* roof tank */}
        <g stroke={COL.plumb.line} strokeWidth="1.4">
          <rect x="176" y={Y(ROOF + 2.2)} width="60" height={2.2 * S} fill={COL.plumb.tint} />
          <rect x="178" y={Y(ROOF + 1.5)} width="56" height={1.5 * S - 2} fill="url(#bs-water)" stroke="none" />
          <path d={`M176 ${Y(ROOF + 1.5)}h60`} strokeWidth="1" />
        </g>
        {/* underground tank and booster pumps */}
        <g stroke={COL.plumb.line} strokeWidth="1.4">
          <rect x={ROOMS.tank.x0} y={Y(-1.05)} width={ROOMS.tank.x1 - ROOMS.tank.x0} height={Y(-4.2) - Y(-1.05)} fill={COL.plumb.tint} />
          <rect x={ROOMS.tank.x0 + 8} y={Y(-1.5)} width="48" height={2.4 * S} fill="#fff" />
          <rect x={ROOMS.tank.x0 + 10} y={Y(-2.1)} width="44" height={1.8 * S - 1} fill="url(#bs-water)" stroke="none" />
          <path d={`M${ROOMS.tank.x0 + 8} ${Y(-2.1)}h48`} strokeWidth="1" />
          <Pump cx={ROOMS.tank.x0 + 72} cy={Y(-3.2)} color={COL.plumb.line} />
          <path d={`M${ROOMS.tank.x0 + 72} ${Y(-1.05)}V${f1(Y(-0.6))}H${R.supply}`} strokeWidth="2" />
        </g>
        <text className="max-md:hidden" x={ROOMS.tank.x0 + 4} y={Y(-1.05) + 14} fontSize="11" fill={COL.plumb.line}>
          TANK + BOOSTER
        </text>
        {/* sewage treatment plant */}
        <g stroke={COL.plumb.line} strokeWidth="1.4">
          <rect x={ROOMS.stp.x0} y={Y(-1.05)} width={ROOMS.stp.x1 - ROOMS.stp.x0} height={Y(-4.2) - Y(-1.05)} fill={COL.plumb.tint} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={ROOMS.stp.x0 + 6 + i * 25} y={Y(-1.5)} width="22" height={2.4 * S} fill="#fff" />
          ))}
          {[0, 1, 2].map((i) => (
            <rect key={`w${i}`} x={ROOMS.stp.x0 + 8 + i * 25} y={Y(-2.4) + i * 3} width="18" height={1.5 * S - i * 3 - 1} fill="url(#bs-water)" stroke="none" />
          ))}
          <path d={`M${(ROOMS.stp.x0 + ROOMS.stp.x1) / 2} ${Y(-1.05)}V${f1(Y(-0.45))}H${R.drain}`} strokeWidth="2" strokeDasharray="8 3" />
        </g>
        <text className="max-md:hidden" x={ROOMS.stp.x0 + 4} y={Y(-1.05) + 14} fontSize="11" fill={COL.plumb.line}>
          STP
        </text>
        {STOREYS.map((s) => (
          <g key={s.id} stroke={COL.plumb.line}>
            {/* branch to the toilet block, and drain back to the riser */}
            <path d={`M${R.supply} ${Y(s.f + 0.7)}H352`} strokeWidth="1.4" />
            <path d={`M${R.drain} ${Y(s.f + 0.18)}H346`} strokeWidth="2.2" strokeDasharray="6 3" />
            <g strokeWidth="1.2">
              <path d={`M330 ${Y(s.f + 0.9)}h12v${0.9 * S}h-12z`} fill="#fff" />
              <path d={`M346 ${Y(s.f + 0.45)}h12v${0.45 * S}h-12z`} fill="#fff" />
            </g>
          </g>
        ))}
      </Sys>

      {/* roof parapet + lift overrun (structure, drawn last so it stays on top) */}
      <rect x={BX1 - 52} y={Y(ROOF + 1.3)} width="52" height={1.3 * S} fill={SHAFT_FILL} stroke={INK} strokeWidth="1" />

      {/* callouts: numbered badges for the selected system only */}
      {active &&
        SECTION_CALLOUTS[active].map((c) => (
          <g key={c.n}>
            <g className="sec-badge">
              <circle cx={c.x} cy={c.y} r="11" fill={COL[active].line} stroke="#fff" strokeWidth="2" />
              <text x={c.x} y={c.y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">
                {c.n}
              </text>
            </g>
            <text
              className="max-md:hidden"
              x={c.tx}
              y={c.ty}
              textAnchor={c.anchor}
              fontSize="15"
              fontWeight="600"
              fill={INK}
              stroke="#fff"
              strokeWidth="4"
              paintOrder="stroke"
              strokeLinejoin="round"
            >
              {c.label}
            </text>
          </g>
        ))}

      {/* title block */}
      <g className="max-md:hidden">
        <rect x={VW - 250} y="22" width="232" height="72" stroke={INK} strokeWidth="1" />
        <path d={`M${VW - 250} 46H${VW - 18}`} stroke={INK} strokeWidth="0.8" />
        <text x={VW - 238} y="40" fontSize="13" fontWeight="700" fill={INK} letterSpacing="1.2">
          MEP SERVICES
        </text>
        <text x={VW - 238} y="64" fontSize="12" fill={INK}>
          TYPICAL BUILDING SECTION
        </text>
        <text x={VW - 238} y="84" fontSize="12" fill={INK} opacity="0.75">
          NOT TO SCALE
        </text>
      </g>
    </svg>
  );
}
