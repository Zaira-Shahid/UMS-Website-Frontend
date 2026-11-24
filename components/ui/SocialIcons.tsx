/** Minimal brand glyphs (lucide-react no longer ships brand icons). Decorative: always inside a labelled link. */
const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v7M8 7.2v.01M12 17v-4.5a2.5 2.5 0 0 1 5 0V17M12 10v7" />
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <path d="M14 8h2.5V4.5H14a4 4 0 0 0-4 4V11H7.5v3.5H10V21h3.5v-6.5H16l.5-3.5h-3V8.5A.5.5 0 0 1 14 8Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M17.2 6.8v.01" />
    </svg>
  );
}

export function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.2 9.4 4.6 2.6-4.6 2.6Z" />
    </svg>
  );
}
