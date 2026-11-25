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

export function XIcon({ className }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <path d="M4.5 4.5h3.2l11.8 15h-3.2z" />
      <path d="M19 4.5l-6.2 6.9M5 19.5l6.2-6.9" />
    </svg>
  );
}

export function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <path d="M14 4v10.2a3.4 3.4 0 1 1-3.4-3.4" />
      <path d="M14 4c.4 2.4 2 3.9 4.6 4.1" />
    </svg>
  );
}

export function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.5z" />
      <path d="M9.2 8.8c.2 2.6 2.4 5 5.3 5.9l1.2-1.3-1.9-1-.9.7c-.9-.4-1.7-1.3-2.1-2.2l.7-.9-1-1.9z" />
    </svg>
  );
}
