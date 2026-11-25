import type { ReactNode } from "react";
import type { ServiceSlug } from "@/types";

/**
 * One technical line diagram per discipline, in the same drawn style as the rest of the site: a schematic of how
 * the system works in a building, with numbered markers that match the steps listed beside it. These are generic
 * engineering schematics, not drawings of any UMS project. Text labels are hidden on phones (they would be too
 * small); the numbered steps carry the same information there.
 */

export interface DiagramStep {
  title: string;
  text: string;
}

const LINE = "#9ec4dc";
const INK = "#e8f1f7";
const WATER = "#5cc4ee";

const label = "max-md:hidden";

function T({ x, y, children, anchor = "start", dim }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end"; dim?: boolean }) {
  return (
    <text className={label} x={x} y={y} textAnchor={anchor} fontSize="15" fill={INK} stroke="none" opacity={dim ? 0.7 : 1}>
      {children}
    </text>
  );
}

function Badge({ n, x, y, c }: { n: number; x: number; y: number; c: string }) {
  return (
    <g className="sec-badge">
      <circle cx={x} cy={y} r="12" fill={c} stroke="#0b2236" strokeWidth="2" />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#0b2236" stroke="none">
        {n}
      </text>
    </g>
  );
}

function Pump({ x, y, c }: { x: number; y: number; c: string }) {
  return (
    <g stroke={c} strokeWidth="2" fill="#0b2236">
      <circle cx={x} cy={y} r="14" />
      <path d={`M${x - 6} ${y - 7}L${x + 8} ${y}L${x - 6} ${y + 7}z`} fill={c} stroke="none" />
    </g>
  );
}

function Valve({ x, y, c }: { x: number; y: number; c: string }) {
  return <path d={`M${x - 9} ${y - 7}L${x + 9} ${y + 7}V${y - 7}L${x - 9} ${y + 7}z`} stroke={c} strokeWidth="2" fill="#0b2236" />;
}

function Flow({ d, c, rev }: { d: string; c: string; rev?: boolean }) {
  return <path d={d} className={rev ? "dg-flow dg-flow-rev" : "dg-flow"} stroke={c} strokeWidth="2.4" strokeLinecap="round" fill="none" />;
}

/* ───────────── HVAC: chilled-water loop ───────────── */
function Hvac() {
  const c = "#00a8e8";
  return (
    <g fill="none" stroke={LINE} strokeWidth="2" strokeLinejoin="round">
      {/* cooling tower + condenser water */}
      <rect x="50" y="24" width="170" height="76" rx="4" />
      <circle cx="135" cy="52" r="16" />
      <path d="M70 80h130M70 90h130" strokeWidth="1.2" />
      <path d="M100 100V150M170 100V150" />
      <Pump x={100} y={125} c={c} />
      {/* chiller */}
      <rect x="50" y="150" width="170" height="150" rx="8" />
      <circle cx="100" cy="228" r="24" />
      <circle cx="170" cy="228" r="24" />
      <path d="M100 204v48M76 228h48M170 204v48M146 228h48" strokeWidth="1" />
      {/* loop */}
      <path d="M220 185H840V265H220" stroke={c} strokeWidth="3" />
      <Flow d="M222 185H838" c={INK} />
      <Flow d="M838 265H222" c={INK} rev />
      <Pump x={290} y={185} c={c} />
      <Valve x={340} y={185} c={c} />
      {[380, 540, 700].map((x) => (
        <g key={x}>
          <path d={`M${x + 25} 185V205M${x + 75} 245V265`} stroke={c} strokeWidth="3" />
          <rect x={x} y="205" width="100" height="40" rx="3" fill="#0b2236" />
          <path d={`M${x + 12} 225l8-10 8 20 8-20 8 20 8-20 8 20 8-20 8 10`} stroke={c} strokeWidth="1.6" />
        </g>
      ))}
      <T x={50} y={16}>Cooling tower</T>
      <T x={78} y={292} anchor="start">Chiller</T>
      <T x={360} y={168} dim>Chilled-water supply</T>
      <T x={360} y={290} dim>Return water</T>
      <T x={610} y={318} anchor="middle">Air handling units</T>
      <Badge n={1} x={236} y={38} c={c} />
      <Badge n={2} x={236} y={166} c={c} />
      <Badge n={3} x={290} y={152} c={c} />
      <Badge n={4} x={650} y={176} c={c} />
      <Badge n={5} x={540} y={288} c={c} />
    </g>
  );
}

/* ───────────── Fire: sprinkler riser ───────────── */
function Fire() {
  const c = "#ff6a60";
  const floors = [78, 158, 238, 318];
  return (
    <g fill="none" stroke={LINE} strokeWidth="2" strokeLinejoin="round">
      {[60, 140, 220, 300].map((y) => (
        <path key={y} d={`M410 ${y}H810`} strokeWidth="3" />
      ))}
      <path d="M40 380H870" strokeWidth="3" />
      {/* tank and pump */}
      <rect x="60" y="316" width="130" height="64" rx="3" />
      <path d="M62 340q8-6 16 0t16 0 16 0 16 0 16 0 16 0 16 0 16 0" stroke={WATER} strokeWidth="1.4" />
      <path d="M190 352H276M304 352H450" stroke={c} strokeWidth="3" />
      <Pump x={290} y={352} c={c} />
      {/* riser */}
      <path d="M450 352V78" stroke={c} strokeWidth="5" />
      <Flow d="M450 350V80" c={INK} />
      {floors.map((y) => (
        <g key={y}>
          <path d={`M450 ${y}H780`} stroke={c} strokeWidth="3" />
          <Valve x={495} y={y} c={c} />
          {[560, 630, 700, 770].map((x) => (
            <g key={x} stroke={c} strokeWidth="2">
              <path d={`M${x} ${y}v14`} />
              <circle cx={x} cy={y + 18} r="4" fill="#0b2236" />
            </g>
          ))}
          <g stroke={c} strokeWidth="2">
            <rect x="786" y={y + 30} width="22" height="36" rx="2" />
            <circle cx="797" cy={y + 48} r="7" />
          </g>
        </g>
      ))}
      {/* fire brigade inlet */}
      <path d="M450 374H820" stroke={c} strokeWidth="3" />
      <rect x="820" y="356" width="46" height="30" rx="3" stroke={c} />
      <T x={60} y={306}>Fire water tank</T>
      <T x={290} y={404} anchor="middle">Pump</T>
      <T x={470} y={50} dim>Sprinkler main</T>
      <T x={866} y={406} anchor="end">Brigade inlet</T>
      <Badge n={1} x={212} y={324} c={c} />
      <Badge n={2} x={290} y={320} c={c} />
      <Badge n={3} x={426} y={200} c={c} />
      <Badge n={4} x={495} y={108} c={c} />
      <Badge n={5} x={665} y={112} c={c} />
    </g>
  );
}

/* ───────────── Electrical: single-line diagram ───────────── */
function Elec() {
  const c = "#f5b700";
  return (
    <g fill="none" stroke={LINE} strokeWidth="2" strokeLinejoin="round">
      {/* utility and transformer */}
      <path d="M30 150H92" stroke={c} strokeWidth="3" />
      <path d="M30 150l12-9v18z" fill={c} stroke="none" />
      <circle cx="112" cy="150" r="20" stroke={c} />
      <circle cx="136" cy="150" r="20" stroke={c} />
      <path d="M156 150H196" stroke={c} strokeWidth="3" />
      <rect x="196" y="138" width="24" height="24" rx="2" fill="#0b2236" stroke={c} />
      <path d="M200 156l16-12" stroke={c} />
      <path d="M220 150H262" stroke={c} strokeWidth="3" />
      {/* generator + changeover */}
      <circle cx="350" cy="52" r="22" stroke={c} />
      <text className={label} x="350" y="58" textAnchor="middle" fontSize="17" fontWeight="700" fill={c} stroke="none">
        G
      </text>
      <path d="M350 74V92" stroke={c} strokeWidth="3" />
      <rect x="326" y="92" width="48" height="26" rx="2" fill="#0b2236" stroke={c} />
      <path d="M350 118V150" stroke={c} strokeWidth="3" />
      {/* main LT panel busbar */}
      <path d="M262 150H560" stroke={c} strokeWidth="8" strokeLinecap="round" />
      {[300, 400, 480].map((x) => (
        <g key={x}>
          <path d={`M${x} 154V182`} stroke={c} strokeWidth="3" />
          <rect x={x - 11} y="182" width="22" height="22" rx="2" fill="#0b2236" stroke={c} />
          <path d={`M${x - 6} 198l12-10`} stroke={c} />
          <path d={`M${x} 204V262`} stroke={c} strokeWidth="2.4" />
          <circle cx={x} cy="270" r="8" stroke={c} />
        </g>
      ))}
      <T x={300} y={302} anchor="middle">Plant</T>
      <T x={400} y={302} anchor="middle">Lifts</T>
      <T x={480} y={302} anchor="middle">Lighting</T>
      {/* feeder to the rising busbar */}
      <path d="M560 150H700V380" stroke={c} strokeWidth="6" strokeLinecap="round" />
      <Flow d="M562 150H700V378" c={INK} />
      {[200, 280, 360].map((y) => (
        <g key={y}>
          <path d={`M700 ${y}H740`} stroke={c} strokeWidth="3" />
          <rect x="740" y={y - 20} width="70" height="40" rx="3" fill="#0b2236" stroke={c} />
          <path d={`M752 ${y - 10}v20M770 ${y - 10}v20M788 ${y - 10}v20`} strokeWidth="1.2" />
          <path d={`M810 ${y}H862`} stroke={c} strokeWidth="1.6" />
          <circle cx="872" cy={y} r="7" stroke={c} />
        </g>
      ))}
      <T x={30} y={186}>Utility supply</T>
      <T x={92} y={224}>Transformer</T>
      <T x={392} y={60}>Standby generator</T>
      <T x={392} y={110} dim>Changeover</T>
      <T x={262} y={138}>Main LT panel</T>
      <T x={746} y={246} dim>Floor DBs</T>
      <T x={688} y={336} anchor="end" dim>Rising busbar</T>
      <Badge n={1} x={124} y={116} c={c} />
      <Badge n={2} x={350} y={22} c={c} />
      <Badge n={3} x={500} y={126} c={c} />
      <Badge n={4} x={700} y={118} c={c} />
      <Badge n={5} x={775} y={160} c={c} />
    </g>
  );
}

/* ───────────── Plumbing: supply and drainage path ───────────── */
function Plumbing() {
  const c = "#00c2b0";
  return (
    <g fill="none" stroke={LINE} strokeWidth="2" strokeLinejoin="round">
      {[60, 140, 220, 300].map((y) => (
        <path key={y} d={`M390 ${y}H680`} strokeWidth="3" />
      ))}
      <path d="M30 380H870" strokeWidth="3" />
      {/* mains and underground tank */}
      <path d="M30 346H60" stroke={c} strokeWidth="3" />
      <path d="M30 346l12-8v16z" fill={c} stroke="none" />
      <rect x="60" y="316" width="120" height="64" rx="3" />
      <path d="M62 342q8-6 16 0t16 0 16 0 16 0 16 0 16 0 16 0" stroke={WATER} strokeWidth="1.4" />
      {/* booster pump and up-feed to the roof tank */}
      <path d="M180 352H214M242 352H300V92" stroke={c} strokeWidth="3" />
      <Pump x={228} y={352} c={c} />
      <rect x="250" y="40" width="110" height="60" rx="3" />
      <path d="M252 66q8-6 16 0t16 0 16 0 16 0 16 0 16 0" stroke={WATER} strokeWidth="1.4" />
      <path d="M300 92V100" stroke={c} strokeWidth="3" />
      {/* down-feed with fixtures */}
      <path d="M360 70H430V300" stroke={c} strokeWidth="4" />
      <Flow d="M360 70H430V298" c={INK} />
      {[120, 200, 280].map((y) => (
        <g key={y}>
          <path d={`M430 ${y}H520`} stroke={c} strokeWidth="2.4" />
          <path d={`M520 ${y - 12}h22v12h-22zM548 ${y - 16}h18v16h-18z`} stroke={LINE} fill="#0b2236" />
        </g>
      ))}
      {/* drainage stack, vent, treatment */}
      <path d="M610 60V350H700" stroke={c} strokeWidth="5" strokeDasharray="12 4" />
      <path d="M610 60V30" stroke={c} strokeWidth="2" strokeDasharray="4 4" />
      {[120, 200, 280].map((y) => (
        <path key={y} d={`M566 ${y}H610`} stroke={c} strokeWidth="3" strokeDasharray="8 4" />
      ))}
      <rect x="700" y="316" width="130" height="64" rx="3" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${714 + i * 38} 326v44`} strokeWidth="1.2" />
      ))}
      <path d="M830 352H870" stroke={c} strokeWidth="3" />
      <path d="M870 352l-12-8v16z" fill={c} stroke="none" />
      {/* rainwater, separate */}
      <path d="M690 62H850V300" stroke={WATER} strokeWidth="2.4" strokeDasharray="2 6" strokeLinecap="round" />
      <T x={60} y={308}>Tank</T>
      <T x={228} y={404} anchor="middle">Booster</T>
      <T x={250} y={30}>Roof tank</T>
      <T x={440} y={264} dim>Cold water</T>
      <T x={622} y={176} dim>Waste</T>
      <T x={700} y={308}>Treatment</T>
      <T x={840} y={190} anchor="end" dim>Rainwater</T>
      <Badge n={1} x={214} y={300} c={c} />
      <Badge n={2} x={228} y={322} c={c} />
      <Badge n={3} x={376} y={52} c={c} />
      <Badge n={4} x={555} y={168} c={c} />
      <Badge n={5} x={830} y={306} c={c} />
    </g>
  );
}

/* ───────────── Integrated MEP: coordination in the ceiling void ───────────── */
function Integrated() {
  const hv = "#00a8e8";
  const fr = "#ff6a60";
  const el = "#f5b700";
  const pl = "#00c2b0";
  return (
    <g fill="none" stroke={LINE} strokeWidth="2" strokeLinejoin="round">
      <path d="M450 40V400" strokeDasharray="6 6" opacity="0.6" />
      {[0, 450].map((ox) => (
        <g key={ox}>
          <path d={`M${ox + 30} 70H${ox + 420}`} strokeWidth="4" />
          <path d={`M${ox + 30} 300H${ox + 420}`} strokeDasharray="8 5" strokeWidth="1.4" />
        </g>
      ))}
      {/* before: all four services in the same space */}
      <rect x="90" y="130" width="230" height="70" rx="3" stroke={hv} strokeWidth="2.4" />
      <circle cx="170" cy="150" r="9" stroke={fr} strokeWidth="3" />
      <path d="M60 175H380" stroke={el} strokeWidth="4" />
      <path d="M70 120L380 215" stroke={pl} strokeWidth="5" />
      <circle cx="170" cy="164" r="26" stroke="#ff6a60" strokeDasharray="4 4" />
      <circle cx="260" cy="190" r="26" stroke="#ff6a60" strokeDasharray="4 4" />
      {/* after: each service has its own level */}
      <path d="M480 98H850" stroke={el} strokeWidth="4" />
      <path d="M480 124H850" stroke={fr} strokeWidth="4" />
      <rect x="540" y="146" width="230" height="64" rx="3" stroke={hv} strokeWidth="2.4" />
      <path d="M480 234H850" stroke={pl} strokeWidth="5" />
      <rect x="480" y="304" width="370" height="64" rx="2" strokeDasharray="3 5" opacity="0.7" />
      <T x={30} y={28}>Before coordination</T>
      <T x={480} y={28}>After coordination</T>
      <T x={856} y={90} anchor="end" dim>Cable tray</T>
      <T x={856} y={116} anchor="end" dim>Sprinkler main</T>
      <T x={656} y={178} anchor="middle" dim>Duct</T>
      <T x={856} y={226} anchor="end" dim>Drain, falling</T>
      <T x={665} y={341} anchor="middle" dim>Access kept clear</T>
      <Badge n={1} x={170} y={118} c="#ff6a60" />
      <Badge n={2} x={510} y={160} c={hv} />
      <Badge n={3} x={820} y={166} c={hv} />
      <Badge n={4} x={500} y={330} c={hv} />
    </g>
  );
}

/* ───────────── Pools & fountains: circulation ───────────── */
function Pools() {
  const c = "#3fa9f5";
  return (
    <g fill="none" stroke={LINE} strokeWidth="2" strokeLinejoin="round">
      {/* pool */}
      <path d="M50 250V370H350V250" strokeWidth="3" />
      <path d="M52 276q10-7 20 0t20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0" stroke={WATER} strokeWidth="1.6" />
      <path d="M30 250H370" />
      {/* fountain nozzles */}
      {[150, 210, 270].map((x, i) => (
        <path key={x} d={`M${x} 276Q${x + 14} ${176 - i * 6} ${x + 28} 276`} stroke={WATER} strokeWidth="2" />
      ))}
      <path d="M210 330V200H560V335" stroke={c} strokeWidth="2" strokeDasharray="6 4" />
      {/* skimmer to balance tank */}
      <path d="M350 270H386" stroke={c} strokeWidth="3" />
      <rect x="386" y="290" width="90" height="80" rx="3" />
      <path d="M388 318q8-6 16 0t16 0 16 0 16 0 16 0" stroke={WATER} strokeWidth="1.4" />
      <path d="M350 270H370V330H386" stroke={c} strokeWidth="3" />
      {/* pump, filter, heater */}
      <path d="M476 335H540M572 335H620" stroke={c} strokeWidth="3" />
      <Pump x={556} y={335} c={c} />
      <rect x="620" y="290" width="70" height="90" rx="30" />
      <path d="M634 320h42M634 340h42M634 360h42" strokeWidth="1.2" />
      <path d="M690 335H730" stroke={c} strokeWidth="3" />
      <rect x="730" y="305" width="86" height="60" rx="3" />
      <path d="M744 335l8-10 8 20 8-20 8 20 8-20 8 20 8-10" stroke={c} strokeWidth="1.6" />
      {/* return to pool inlets */}
      <path d="M816 335H850V400H90V360" stroke={c} strokeWidth="3" />
      <Flow d="M818 335H848V398H92V362" c={INK} />
      <T x={50} y={240}>Pool</T>
      <T x={431} y={388} anchor="middle">Balance tank</T>
      <T x={556} y={372} anchor="middle" dim>Pump</T>
      <T x={655} y={282} anchor="middle">Filter</T>
      <T x={773} y={296} anchor="middle">Heater</T>
      <T x={200} y={192} dim>Fountain nozzles</T>
      <T x={470} y={420} dim>Return to inlets</T>
      <Badge n={1} x={100} y={300} c={c} />
      <Badge n={2} x={431} y={318} c={c} />
      <Badge n={3} x={556} y={306} c={c} />
      <Badge n={4} x={690} y={292} c={c} />
      <Badge n={5} x={816} y={305} c={c} />
    </g>
  );
}

const DRAWINGS: Record<ServiceSlug, () => React.JSX.Element> = {
  hvac: Hvac,
  "fire-fighting": Fire,
  "electrical-elv": Elec,
  plumbing: Plumbing,
  "integrated-mep": Integrated,
  "pools-fountains": Pools,
};

export const DIAGRAM_COPY: Record<ServiceSlug, { title: string; intro: string; caption: string; steps: DiagramStep[] }> = {
  hvac: {
    title: "A chilled-water loop",
    intro: "Large buildings are usually cooled by chilled water rather than by refrigerant pipework: one plant makes cold water, and pipes carry it to the coils that cool the air.",
    caption: "Schematic of a chilled-water air-conditioning loop",
    steps: [
      { title: "Cooling tower", text: "Rejects the heat collected by the chiller to the outside air through a condenser-water circuit." },
      { title: "Chiller", text: "Cools the water to a low temperature using a refrigeration cycle." },
      { title: "Pumps and valves", text: "Circulate the chilled water and balance the flow to each branch." },
      { title: "Air handling units", text: "Coils pass the cold from the water to the air, which is ducted to the rooms." },
      { title: "Return", text: "The warmed water returns to the chiller to be cooled again." },
    ],
  },
  "fire-fighting": {
    title: "A sprinkler riser",
    intro: "A wet sprinkler system keeps pipework full of water so that a heated sprinkler head can discharge straight away.",
    caption: "Schematic of a wet riser and sprinkler system over several floors",
    steps: [
      { title: "Water tank", text: "A dedicated store of fire water, separate from the domestic supply." },
      { title: "Fire pump", text: "Starts automatically when pressure drops and feeds the riser." },
      { title: "Riser", text: "The vertical main that carries water to every floor." },
      { title: "Floor control valve", text: "Isolates one floor for testing or repair without shutting down the rest." },
      { title: "Sprinkler heads and hose reels", text: "Heads open individually when heated; hose reels serve occupants and the fire service." },
    ],
  },
  "electrical-elv": {
    title: "A single-line diagram",
    intro: "Electrical engineers describe a building's power as a single line: where power comes in, how it is protected, and where it goes.",
    caption: "Single-line schematic of power distribution through a building",
    steps: [
      { title: "Utility supply and transformer", text: "Brings in the supply and steps it down to the building's low-tension voltage." },
      { title: "Standby generator", text: "Takes over through a changeover switch if the utility supply fails." },
      { title: "Main LT panel", text: "The main busbar, with protected outgoing feeders to plant, lifts and lighting." },
      { title: "Rising busbar", text: "Carries power up the building in a shaft." },
      { title: "Floor distribution boards", text: "Split the supply into final circuits for lighting, sockets and equipment on each floor." },
    ],
  },
  plumbing: {
    title: "Supply and drainage",
    intro: "Water enters a building under pressure and leaves by gravity. The two systems are designed separately and meet only at the fixtures.",
    caption: "Schematic of water supply, drainage and rainwater paths",
    steps: [
      { title: "Mains and underground tank", text: "Store incoming water so the building has a reserve." },
      { title: "Booster pumps", text: "Lift water to a tank at the top of the building." },
      { title: "Roof tank and down-feed", text: "Gravity feeds every floor at a steady pressure." },
      { title: "Fixtures", text: "Basins, toilets and taps take the supply and discharge into the drainage stack." },
      { title: "Drainage and treatment", text: "Waste falls through a vented stack to treatment or the sewer. Rainwater travels separately." },
    ],
  },
  "integrated-mep": {
    title: "Coordination in the ceiling void",
    intro: "The space above a ceiling is where every discipline competes. Coordination decides, on drawings, which service goes where.",
    caption: "Section through a ceiling void before and after coordination",
    steps: [
      { title: "Before coordination", text: "Each discipline is drawn on its own, so ducts, pipes, trays and drains can occupy the same space." },
      { title: "Coordinated routes", text: "Services are moved so that none crosses another." },
      { title: "A level for each service", text: "Falls, clearances and support zones are respected, for example a drain that must slope." },
      { title: "Access kept clear", text: "Space is left to reach valves, dampers and junction boxes after handover." },
    ],
  },
  "pools-fountains": {
    title: "A pool circulation loop",
    intro: "Pool and fountain water is cleaned by constantly circulating it through a filter, rather than by changing it.",
    caption: "Schematic of pool and fountain water circulation",
    steps: [
      { title: "Pool and skimmers", text: "Surface water is drawn off through skimmers and the main drain." },
      { title: "Balance tank", text: "Absorbs changes in water level and keeps the pump supplied." },
      { title: "Pump", text: "Moves water around the circuit; fountain nozzles can be fed from the same circuit." },
      { title: "Filter", text: "Removes suspended solids." },
      { title: "Heating, dosing and return", text: "Water is conditioned, then returned through inlets in the pool." },
    ],
  },
};

/** Height of each drawing's viewBox, so no diagram carries empty space. */
const HEIGHT: Record<ServiceSlug, number> = {
  hvac: 340,
  "fire-fighting": 410,
  "electrical-elv": 420,
  plumbing: 410,
  "integrated-mep": 390,
  "pools-fountains": 430,
};

export function ServiceDiagramSvg({ slug, className }: { slug: ServiceSlug; className?: string }) {
  const Drawing = DRAWINGS[slug];
  return (
    <svg viewBox={`0 0 900 ${HEIGHT[slug]}`} role="img" aria-label={DIAGRAM_COPY[slug].caption} className={className} fill="none" fontFamily="var(--font-jetbrains), ui-monospace, monospace">
      <Drawing />
    </svg>
  );
}
