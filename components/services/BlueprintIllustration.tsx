import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Styled blueprint illustration used where no suitable stock photo exists, so
 * two services never share the same picture. It is a schematic, not a photo of
 * UMS work. Decorative (aria-hidden); fills its container like object-cover.
 */
export function BlueprintIllustration({
  name,
  className,
}: {
  name: "plumbing";
  className?: string;
}) {
  // Only one illustration so far; the prop keeps room for more.
  void name;
  // Unique pattern ids: the same illustration can appear several times on a page.
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const minor = `${uid}-minor`;
  const major = `${uid}-major`;
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={cn("block bg-navy-900", className)}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <pattern id={minor} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" stroke="#5cc4ee" strokeOpacity="0.1" />
        </pattern>
        <pattern id={major} width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M120 0H0V120" stroke="#5cc4ee" strokeOpacity="0.18" />
        </pattern>
      </defs>
      <rect width="800" height="600" fill={`url(#${minor})`} />
      <rect width="800" height="600" fill={`url(#${major})`} />

      {/* Floor lines */}
      <g stroke="#5cc4ee" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="2 8">
        <path d="M40 150H760M40 290H760M40 430H760" />
      </g>
      <g fill="#5cc4ee" fillOpacity="0.7" fontFamily="ui-monospace, Menlo, monospace" fontSize="13" letterSpacing="2">
        <text x="48" y="140">LEVEL 03</text>
        <text x="48" y="280">LEVEL 02</text>
        <text x="48" y="420">LEVEL 01</text>
      </g>

      {/* Roof tank */}
      <g stroke="#5cc4ee" strokeWidth="3">
        <rect x="548" y="38" width="124" height="64" rx="3" fill="#0b2236" />
        <path d="M548 74c20-8 30 8 50 0s30 8 50 0 14 2 24-2" stroke="#008ccb" />
      </g>
      <text x="548" y="28" fill="#5cc4ee" fillOpacity="0.8" fontFamily="ui-monospace, Menlo, monospace" fontSize="13" letterSpacing="2">
        STORAGE TANK
      </text>

      {/* Cold-water riser */}
      <path d="M610 102V520" stroke="#5cc4ee" strokeWidth="9" />
      <path d="M610 102V520" stroke="#0b2236" strokeWidth="3" />
      <path className="pipe-flow" d="M610 108V514" stroke="#5cc4ee" strokeWidth="2" />

      {/* Branches to fixtures, with valves */}
      {[150, 290, 430].map((y, i) => (
        <g key={y}>
          <path d={`M610 ${y}H420V${y + 34}`} stroke="#5cc4ee" strokeWidth="6" />
          <path className="pipe-flow" d={`M604 ${y}H426V${y + 28}`} stroke="#5cc4ee" strokeWidth="1.5" />
          {/* gate valve */}
          <path d={`M520 ${y - 11}L540 ${y}L520 ${y + 11}Z M560 ${y - 11}L540 ${y}L560 ${y + 11}Z`} fill="#0b2236" stroke="#008ccb" strokeWidth="2.5" />
          <path d={`M540 ${y}V${y - 22}M530 ${y - 22}H550`} stroke="#008ccb" strokeWidth="2.5" />
          {/* fixture */}
          <path d={`M396 ${y + 34}H444M404 ${y + 34}v22h32v-22`} stroke="#5cc4ee" strokeWidth="3" />
          <text x="368" y={y + 80} fill="#5cc4ee" fillOpacity="0.55" fontFamily="ui-monospace, Menlo, monospace" fontSize="12" letterSpacing="2">
            {`Ø${25 + i * 5}`}
          </text>
        </g>
      ))}

      {/* Drain stack — sloped runs to a manhole */}
      <path d="M220 92V500" stroke="#008ccb" strokeWidth="9" />
      <path d="M220 92V500" stroke="#0b2236" strokeWidth="3" />
      <path d="M220 500H90" stroke="#008ccb" strokeWidth="9" />
      <path d="M220 500H90" stroke="#0b2236" strokeWidth="3" />
      {[210, 350, 490].map((y) => (
        <path key={y} d={`M396 ${y - 20}H240`} stroke="#008ccb" strokeWidth="5" strokeDasharray="1 0" />
      ))}
      <circle cx="90" cy="500" r="22" fill="#0b2236" stroke="#008ccb" strokeWidth="3" />
      <path d="M78 500h24M90 488v24" stroke="#008ccb" strokeWidth="2" />
      <g fill="#5cc4ee" fillOpacity="0.7" fontFamily="ui-monospace, Menlo, monospace" fontSize="13" letterSpacing="2">
        <text x="170" y="82">SOIL / WASTE STACK</text>
        <text x="48" y="548">MANHOLE</text>
      </g>
      <path d="M312 478l-18 6 6-18" stroke="#5cc4ee" strokeOpacity="0.7" strokeWidth="2" />
      <text x="262" y="520" fill="#5cc4ee" fillOpacity="0.55" fontFamily="ui-monospace, Menlo, monospace" fontSize="12" letterSpacing="2">
        FALL 1:60
      </text>

      {/* Booster pump */}
      <g stroke="#5cc4ee" strokeWidth="3">
        <path d="M610 520H690" />
        <circle cx="712" cy="520" r="26" fill="#0b2236" />
        <path d="M700 508l24 12-24 12z" fill="#5cc4ee" fillOpacity="0.5" />
        <path d="M738 520h24" />
      </g>
      <text x="640" y="572" fill="#5cc4ee" fillOpacity="0.8" fontFamily="ui-monospace, Menlo, monospace" fontSize="13" letterSpacing="2">
        BOOSTER SET
      </text>

      {/* Title block */}
      <g stroke="#5cc4ee" strokeOpacity="0.5">
        <rect x="560" y="470" width="0" height="0" />
      </g>
      <text x="760" y="40" textAnchor="end" fill="#5cc4ee" fillOpacity="0.55" fontFamily="ui-monospace, Menlo, monospace" fontSize="12" letterSpacing="3">
        SCHEMATIC — NOT TO SCALE
      </text>
    </svg>
  );
}
