import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { CornerBrackets } from "@/components/ui/CornerBrackets";
import { Counter } from "@/components/ui/Counter";
import { PipeLine } from "@/components/ui/PipeLine";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "UI primitives",
  robots: { index: false, follow: false },
};

const swatches = [
  { name: "navy", cls: "bg-navy", hex: "#173F60", light: false },
  { name: "navy-900", cls: "bg-navy-900", hex: "#0B2236", light: false },
  { name: "cyan", cls: "bg-cyan", hex: "#008CCB", light: false },
  { name: "cyan-300", cls: "bg-cyan-300", hex: "#5CC4EE", light: true },
  { name: "offwhite", cls: "bg-offwhite", hex: "#F4F8FB", light: true },
  { name: "line", cls: "bg-line", hex: "#D9E4EC", light: true },
  { name: "fire", cls: "bg-fire", hex: "#D9342B", light: false },
];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-14">
      <p className="mb-8 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-muted">
        {title}
      </p>
      {children}
    </section>
  );
}

export default function UiShowcase() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-[calc(var(--header-h)+4rem)] sm:px-8">
      <Eyebrow>Internal · Phase 1</Eyebrow>
      <h1 className="mt-4">UMS UI primitives</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Design tokens and building blocks. This route is hidden from search engines and is
        for review only.
      </p>

      <Block title="Colour tokens">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {swatches.map((s) => (
            <div key={s.name} className="overflow-hidden rounded-ums border border-line">
              <div className={`${s.cls} h-20`} />
              <div className="p-3 text-xs">
                <p className="font-semibold text-ink">{s.name}</p>
                <p className="text-muted">{s.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Typography — fluid scale">
        <h1>H1 Engineered for scale</h1>
        <h2 className="mt-6">H2 Integrated MEP solutions</h2>
        <h3 className="mt-6">H3 Heating, ventilation and air-conditioning</h3>
        <p className="mt-6 max-w-2xl">
          Body — Inter. UMS delivers MEP contracting for complex buildings, coordinating
          HVAC, fire protection, electrical and plumbing as one disciplined package.
        </p>
        <p className="mt-8 font-heading text-7xl font-extrabold text-navy">
          <Counter value={6} />
        </p>
      </Block>

      <Block title="Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/dev/ui" magnetic arrow>
            Request a Quote
          </Button>
          <Button href="/dev/ui" variant="accent" arrow>
            Explore Projects
          </Button>
          <Button href="/dev/ui" variant="outline">
            Outline
          </Button>
          <Button href="/dev/ui" variant="fire">
            Fire Fighting
          </Button>
          <Button href="/dev/ui" variant="ghost">
            Ghost
          </Button>
          <Button href="/dev/ui" size="sm">
            Small
          </Button>
          <Button href="/dev/ui" size="lg">
            Large
          </Button>
        </div>
        <div className="mt-6 bg-navy-900 p-6">
          <Button href="/dev/ui" variant="outline-light" arrow>
            Outline on dark
          </Button>
        </div>
      </Block>

      <Block title="Badges & chips">
        <div className="flex flex-wrap gap-3">
          <Badge tone="navy">Completed</Badge>
          <Badge tone="cyan">Healthcare</Badge>
          <Badge tone="fire">Fire Fighting</Badge>
          <Badge tone="outline">Ongoing</Badge>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Chip>HVAC</Chip>
          <Chip active>Active filter</Chip>
          <Chip href="/dev/ui">Link chip</Chip>
        </div>
      </Block>

      <Block title="Section heading + pipe line">
        <SectionHeading
          index="01"
          label="Services"
          title="Six disciplines, one coordinated delivery"
          description="Scroll this block into view to see the pipe line draw itself."
        />
        <div className="mt-10">
          <PipeLine
            height={60}
            nodes="all"
            points={[
              [0, 20],
              [35, 20],
              [35, 80],
              [70, 80],
              [70, 30],
              [100, 30],
            ]}
          />
        </div>
      </Block>

      <Block title="Dark section · blueprint grid">
        <div className="relative isolate overflow-hidden bg-navy-900 p-10 sm:p-14">
          <BlueprintGrid variant="dark" />
          <div className="relative">
            <SectionHeading
              tone="light"
              index="02"
              label="Projects"
              title="Dark feature section"
              description="Navy-900 with the cyan blueprint grid."
            />
          </div>
        </div>
      </Block>

      <Block title="Corner brackets · Reveal (staggered)">
        <Reveal stagger className="grid gap-6 sm:grid-cols-3">
          {services.slice(0, 3).map((s) => (
            <RevealItem key={s.slug}>
              <CornerBrackets className="bg-offwhite p-6">
                <Badge tone={s.accent === "fire" ? "fire" : "cyan"}>{s.shortName}</Badge>
                <h3 className="mt-4">{s.name}</h3>
                <p className="mt-2 text-sm text-muted">{s.tagline}</p>
              </CornerBrackets>
            </RevealItem>
          ))}
        </Reveal>
      </Block>
    </div>
  );
}
