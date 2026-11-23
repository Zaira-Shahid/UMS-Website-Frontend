/**
 * Accent classes per service. Full class strings so Tailwind can see them.
 * Fire Fighting uses --ums-fire consistently; everything else uses the cyan accent.
 */
export const accents = {
  cyan: {
    text: "text-cyan",
    /** Readable on white (AA). */
    textOnLight: "text-[#00608c]",
    /** Readable on navy backgrounds. */
    textOnDark: "text-cyan-300",
    bg: "bg-cyan",
    bgSoft: "bg-cyan/10",
    border: "border-cyan",
    ring: "ring-cyan",
    rule: "bg-cyan-300",
    hoverBg: "hover:bg-cyan",
    badge: "cyan" as const,
    button: "accent" as const,
    buttonOnLight: "primary" as const,
  },
  fire: {
    text: "text-fire",
    textOnLight: "text-[#b3271f]",
    textOnDark: "text-[#ff8a82]",
    bg: "bg-fire",
    bgSoft: "bg-fire/10",
    border: "border-fire",
    ring: "ring-fire",
    rule: "bg-fire",
    hoverBg: "hover:bg-fire",
    badge: "fire" as const,
    button: "fire" as const,
    buttonOnLight: "fire" as const,
  },
};

export type Accent = keyof typeof accents;
