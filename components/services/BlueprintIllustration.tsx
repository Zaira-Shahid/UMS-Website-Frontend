import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Styled blueprint illustration used where no suitable stock photo exists, so
 * two services never share the same picture. It is a schematic, not a photo of
 * UMS work. Decorative (aria-hidden); fills its container like object-cover.
 *
 * All meaningful drawing sits inside x 180–620 of the 800×600 viewBox, so it
 * survives both wide (4:3, 16:10) and tall (4:5) crops. The grid bleeds to the edges.
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

  const mono = {
    fontFamily: "ui-monospace, Menlo, monospace",
    letterSpacing: 2,
  } as const;
  const floors = [150, 290, 430];

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

      {/* Floor lines + labels */}
      <g stroke="#5cc4ee" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="2 8">
        <path d="M40 150H760M40 290H760M40 430H760" />
      </g>
      <g fill="#5cc4ee" fillOpacity="0.7" fontSize="12" {...mono}>
        {floors.map((y, i) => (
          <text key={y} x="240" y={y - 10}>
            {`LEVEL 0${3 - i}`}
          </text>
        ))}
      </g>

      {/* Roof tank */}
      <g stroke="#5cc4ee" strokeWidth="3">
        <rect x="495" y="38" width="130" height="64" rx="3" fill="#0b2236" />
        <path d="M495 74c21-8 32 8 54 0s32 8 54 0 14 2 22-2" stroke="#008ccb" />
      </g>
      <text x="495" y="28" fill="#5cc4ee" fillOpacity="0.8" fontSize="12" {...mono}>
        STORAGE TANK
      </text>

      {/* Cold-water riser */}
      <path d="M560 102V520" stroke="#5cc4ee" strokeWidth="9" />
      <path d="M560 102V520" stroke="#0b2236" strokeWidth="3" />
      <path className="pipe-flow" d="M560 108V514" stroke="#5cc4ee" strokeWidth="2" />

      {/* Branches to fixtures, each with a gate valve */}
      {floors.map((y, i) => (
        <g key={y}>
          <path d={`M560 ${y}H400V${y + 34}`} stroke="#5cc4ee" strokeWidth="6" />
          <path className="pipe-flow" d={`M554 ${y}H406V${y + 28}`} stroke="#5cc4ee" strokeWidth="1.5" />
          <path
            d={`M440 ${y - 11}L460 ${y}L440 ${y + 11}Z M480 ${y - 11}L460 ${y}L480 ${y + 11}Z`}
            fill="#0b2236"
            stroke="#008ccb"
            strokeWidth="2.5"
          />
          <path d={`M460 ${y}V${y - 22}M450 ${y - 22}H470`} stroke="#008ccb" strokeWidth="2.5" />
          {/* fixture */}
          <path d={`M376 ${y + 34}H424M384 ${y + 34}v22h32v-22`} stroke="#5cc4ee" strokeWidth="3" />
          <text x="336" y={y + 80} fill="#5cc4ee" fillOpacity="0.55" fontSize="12" {...mono}>
            {`Ø${25 + i * 5}`}
          </text>
        </g>
      ))}

      {/* Soil / waste stack with sloped branch drains and a manhole */}
      <path d="M215 92V500" stroke="#008ccb" strokeWidth="9" />
      <path d="M215 92V500" stroke="#0b2236" strokeWidth="3" />
      {[190, 330, 470].map((y) => (
        <path key={y} d={`M376 ${y}H236`} stroke="#008ccb" strokeWidth="5" />
      ))}
      <circle cx="215" cy="522" r="22" fill="#0b2236" stroke="#008ccb" strokeWidth="3" />
      <path d="M203 522h24M215 510v24" stroke="#008ccb" strokeWidth="2" />
      <g fill="#5cc4ee" fillOpacity="0.7" fontSize="12" {...mono}>
        <text x="236" y="84">SOIL / WASTE STACK</text>
        <text x="248" y="527">MANHOLE</text>
        <text x="252" y="452" fillOpacity="0.55">FALL 1:60</text>
      </g>

      {/* Booster pump */}
      <g stroke="#5cc4ee" strokeWidth="3">
        <path d="M560 520H470" />
        <circle cx="444" cy="520" r="26" fill="#0b2236" />
        <path d="M432 508l24 12-24 12z" fill="#5cc4ee" fillOpacity="0.5" />
        <path d="M418 520h-24" />
      </g>
      <text x="396" y="572" fill="#5cc4ee" fillOpacity="0.8" fontSize="12" {...mono}>
        BOOSTER SET
      </text>

      <text x="400" y="592" textAnchor="middle" fill="#5cc4ee" fillOpacity="0.5" fontSize="11" {...mono}>
        SCHEMATIC — NOT TO SCALE
      </text>
    </svg>
  );
}
