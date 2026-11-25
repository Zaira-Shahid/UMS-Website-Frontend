import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** Pipe-leak illustration: two pipe runs that stop short of each other, dripping into a puddle. */
function PipeLeak() {
  return (
    <svg viewBox="0 0 600 300" role="img" aria-label="A pipe broken at a joint, leaking water" className="mx-auto w-full max-w-xl">
      <defs>
        <linearGradient id="nf-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--cyan-300)" />
          <stop offset="1" stopColor="var(--cyan)" />
        </linearGradient>
      </defs>
      {/* Left run, ending in a flanged joint */}
      <g fill="none" strokeLinejoin="round">
        <path d="M0 110 H190 Q230 110 230 150 V150" stroke="var(--cyan)" strokeOpacity="0.4" strokeWidth="14" />
        <path d="M0 110 H190 Q230 110 230 150" stroke="var(--cyan-300)" strokeWidth="2.5" className="pipe-fluid" />
      </g>
      <rect x="220" y="146" width="20" height="8" fill="var(--navy-900)" stroke="var(--cyan-300)" strokeWidth="2" />
      <rect x="216" y="154" width="28" height="6" fill="var(--navy-900)" stroke="var(--cyan-300)" strokeWidth="2" />
      {/* Right run: offset, not connected */}
      <g fill="none" strokeLinejoin="round">
        <path d="M600 200 H470 Q430 200 430 160" stroke="var(--cyan)" strokeOpacity="0.4" strokeWidth="14" />
        <path d="M600 200 H470 Q430 200 430 160" stroke="var(--cyan-300)" strokeWidth="2.5" strokeDasharray="4 10" opacity="0.5" />
      </g>
      <rect x="420" y="146" width="20" height="8" fill="var(--navy-900)" stroke="var(--cyan-300)" strokeWidth="2" />
      <text x="330" y="140" textAnchor="middle" fontFamily="var(--font-inter), sans-serif" fontSize="13" letterSpacing="2" fill="var(--steel)">
        404
      </text>
      <path d="M262 150 L276 146 M388 150 L374 146" stroke="var(--fire)" strokeWidth="2" strokeLinecap="round" />
      {/* Drops falling from the open joint */}
      {[0, 0.5, 1.0].map((delay) => (
        <path
          key={delay}
          d="M230 168 q-5 9 0 12 q5 -3 0 -12 Z"
          fill="url(#nf-water)"
          className="nf-drip"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
      {/* Puddle */}
      <ellipse cx="230" cy="262" rx="52" ry="7" fill="var(--cyan)" opacity="0.35" className="nf-puddle" />
      <line x1="0" y1="270" x2="600" y2="270" stroke="rgb(255 255 255 / 0.15)" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <section className="bg-blueprint-dark relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-950 pb-16 pt-[calc(var(--header-h)+2rem)] text-white">
      <div className="mx-auto w-full max-w-5xl px-5 text-center sm:px-8">
        <PipeLeak />
        <p className="mono-label mt-8 text-cyan-300">[ Error 404 / Page not found ]</p>
        <h1 className="mt-4 text-[clamp(2.5rem,1.5rem+4.5vw,5rem)] text-white">This line doesn&rsquo;t connect.</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
          The page you were looking for has moved, or never existed. Here are three runs that do connect.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="primary" size="lg" arrow>
            Back to home
          </Button>
          <Button href="/services" variant="outline-light" size="lg">
            Services
          </Button>
          <Button href="/contact" variant="outline-light" size="lg">
            Contact
          </Button>
        </div>
        <p className="mt-6 text-sm text-white/55">
          Or <Link href="/search" className="inline-flex items-center gap-1 text-cyan-300 underline underline-offset-4">search the site <ArrowRight aria-hidden className="size-3.5" /></Link>
        </p>
      </div>
    </section>
  );
}
