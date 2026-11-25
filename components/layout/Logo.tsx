import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * UMS logo rebuilt as a clean SVG from the approved mockup: speed lines, a gear and an italic "UMS". This is a
 * stand-in until the official artwork is supplied (see CONTENT_TO_VERIFY.md). It always uses the same colours, so on
 * a dark background it sits on a white badge (as in the footer).
 */
const TEETH = 12;
const CX = 116;
const CY = 38;
const R_OUT = 36;
const R_BASE = 29.5;

function gearPath() {
  const pt = (a: number, r: number) => `${(CX + r * Math.cos(a)).toFixed(2)} ${(CY + r * Math.sin(a)).toFixed(2)}`;
  let d = "";
  for (let i = 0; i < TEETH; i++) {
    const a = (i * 2 * Math.PI) / TEETH - Math.PI / 2;
    d += `${i === 0 ? "M" : "L"}${pt(a - 0.27, R_BASE)}L${pt(a - 0.17, R_OUT)}L${pt(a + 0.17, R_OUT)}L${pt(a + 0.27, R_BASE)}`;
  }
  return `${d}Z`;
}

const GEAR = gearPath();

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 330 76" role="img" aria-label={`${site.name} logo`} className={className}>
      <defs>
        <linearGradient id="logo-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#33b8f2" />
          <stop offset="1" stopColor="#0e8bd0" />
        </linearGradient>
      </defs>
      {/* speed lines */}
      <g stroke="#1ba6e8" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M16 24H78" />
        <path d="M4 38H80" />
        <path d="M16 52H78" />
      </g>
      <g fill="#1ba6e8">
        <circle cx="11" cy="24" r="3.2" />
        <circle cx="11" cy="52" r="3.2" />
      </g>
      {/* gear */}
      <path d={GEAR} fill="#1c2430" fillRule="evenodd" />
      <circle cx={CX} cy={CY} r="19" fill="#fff" />
      <circle cx={CX} cy={CY} r="13.5" fill="#1c2430" />
      <circle cx={CX} cy={CY} r="6" fill="#1ba6e8" />
      {/* wordmark */}
      <text
        x="150"
        y="60"
        fontSize="66"
        fontWeight="800"
        fontStyle="italic"
        fill="url(#logo-blue)"
        letterSpacing="-1"
        transform="skewX(-10) translate(12 0)"
        style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
      >
        UMS
      </text>
    </svg>
  );
}

/** The logo as a link to the homepage. */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${site.name} — ${site.fullName}, home`}
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <LogoMark className="h-6 w-auto min-[380px]:h-8 min-[420px]:h-10 xl:h-11 min-[1400px]:h-14" />
    </Link>
  );
}
