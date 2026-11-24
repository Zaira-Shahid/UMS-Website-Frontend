"use client";

import { useRef, useState, type ReactNode } from "react";
import { Building2, Factory, GraduationCap, Hospital, Hotel, Store } from "lucide-react";
import {
  AsymmetricBento,
  BentoTile,
  BlueprintFrame,
  DiagonalSection,
  HexGrid,
  HorizontalTrack,
  IsoSteps,
  MaskedTextWindow,
  MORPH_SHAPES,
  MorphShape,
  NotchedCard,
  OrbitRing,
  PipeBendCard,
  RadialGauge,
  SplitDiagonalPanels,
  StackedCards,
  TicketCard,
  WaveDivider,
} from "@/components/shapes";
import { SiteImage } from "@/components/ui/SiteImage";
import { deliverySteps } from "@/content/home";
import { dummyStats } from "@/content/dummy";
import { photo } from "@/content/images";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { gsap } from "@/lib/motion/gsap";
import { useGsap } from "@/lib/motion/use-gsap";

/* ------------------------------------------------------------------ helpers */

function Label({ id, name, tone = "dark", children }: { id: string; name: string; tone?: "light" | "dark"; children?: ReactNode }) {
  return (
    <header className="mb-10 max-w-2xl">
      <p className={`mono-label ${tone === "dark" ? "text-cyan-300" : "text-[#00608c]"}`}>
        [ {id} / {name} ]
      </p>
      {children && <p className={`mt-3 ${tone === "dark" ? "text-white/70" : "text-muted"}`}>{children}</p>}
    </header>
  );
}

const wrap = "mx-auto max-w-7xl px-5 sm:px-8";

const industryIcons = {
  healthcare: <Hospital />,
  "commercial-retail": <Store />,
  "residential-mixed-use": <Building2 />,
  hospitality: <Hotel />,
  "education-institutional": <GraduationCap />,
  "industrial-warehousing": <Factory />,
} as const;

const capabilities = [
  ["BIM coordination", "Clash-free shop drawings from a combined model."],
  ["VRF", "Variable refrigerant flow for zoned comfort."],
  ["Chilled water", "Central plant and distribution for large buildings."],
  ["Fire pumps", "Duty and standby pump sets with controllers."],
  ["FM-200", "Clean-agent suppression for data and control rooms."],
  ["LT panels", "Low-tension distribution built to the single-line diagram."],
  ["ELV", "Fire alarm, PA, CCTV and access control."],
  ["BMS", "Controls that tie plant and alarms together."],
  ["STP", "Sewage treatment plant supply and installation."],
  ["Rainwater", "Harvesting, storage and reuse."],
  ["LPG / NG", "Gas distribution to kitchens and plant."],
  ["Pools & fountains", "Circulation, filtration and features."],
].map(([label, description], i) => ({ id: `c${i}`, label, description }));

/* ---------------------------------------------------------------- showcase */

export function ShapesShowcase() {
  const [hexActive, setHexActive] = useState<string | null>(null);
  const hexIndustry = industries.find((i) => i.slug === hexActive);

  // S14: scroll-driven morph. Scroll through the tall block to scrub; the slider is the keyboard alternative.
  const morphRoot = useRef<HTMLDivElement>(null);
  const [morph, setMorph] = useState(0);
  useGsap(
    morphRoot,
    ({ reduceMotion }) => {
      if (reduceMotion || !morphRoot.current) return;
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: morphRoot.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: true,
            onUpdate: (self) => setMorph(self.progress * (MORPH_SHAPES.length - 0.001)),
          },
        },
      );
    },
    [],
  );
  const morphIndex = Math.round(morph) % MORPH_SHAPES.length;

  const cards = ["Tender review", "Coordination", "Procurement"].map((t, i) => ({
    id: t,
    content: (
      <NotchedCard notch={22} background="var(--navy)" borderColor="rgb(255 255 255 / 0.2)" innerClassName="p-8 text-white">
        <p className="mono-label text-cyan-300">Step 0{i + 1}</p>
        <h3 className="mt-2 text-3xl text-white">{t}</h3>
        <p className="mt-2 max-w-md text-white/70">Each card slides over the previous one, which scales down and dims.</p>
      </NotchedCard>
    ),
  }));

  const trackPanels = projects.slice(0, 6).map((p, i) => (
    <article key={p.slug} className="relative h-[60svh] w-[78vw] overflow-hidden border border-white/15 bg-navy sm:w-[46vw] lg:w-[34vw]">
      <SiteImage asset={p.image} fill sizes="(min-width:1024px) 34vw, 78vw" className="object-cover opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="mono-label text-cyan-300">
          0{i + 1} · {p.location} · {p.year}
        </p>
        <h3 className="text-outline mt-2 text-[clamp(1.75rem,1.2rem+2vw,3rem)] uppercase text-white">{p.name}</h3>
      </div>
    </article>
  ));

  return (
    <div className="bg-navy-950 pt-[var(--header-h)]">
      {/* ---------- intro */}
      <section className={`${wrap} py-16`}>
        <p className="mono-label text-cyan-300">[ DEV / SHAPE LIBRARY ]</p>
        <h1 className="mt-4 text-white">Shape Library S1–S16</h1>
        <p className="mt-4 max-w-2xl text-white/70">
          Reusable shapes for the V2 build (spec §4). Every shape lives in <code className="mono-label">components/shapes</code> and
          is imported from its index. Move the cursor to see the custom cursor; toggle reduced motion in your OS to check the fallbacks.
        </p>
      </section>

      {/* ---------- S1 */}
      <DiagonalSection edge="both" angle={6} className="bg-navy py-24">
        <div className={wrap}>
          <Label id="S1" name="Diagonal cut">
            A section with a 6° slanted top and bottom edge, made with clip-path. Padding is added for the cut.
          </Label>
          <p className="text-white/80">
            Content sits clear of the slant. Use <code className="mono-label">angle=8</code> for a sharper cut and
            <code className="mono-label"> slantDirection=&quot;up&quot;</code> to flip it.
          </p>
        </div>
      </DiagonalSection>

      {/* ---------- S2 */}
      <section className={`${wrap} py-24`}>
        <Label id="S2" name="Notched corners">
          Steel-plate cards with chamfered corners; the border is an outer plate so the notch keeps its outline.
        </Label>
        <div className="grid gap-6 md:grid-cols-3">
          <NotchedCard notch={18} background="var(--navy-900)" borderColor="rgb(255 255 255 / 0.2)" innerClassName="p-6 text-white">
            <p className="mono-label text-cyan-300">All corners</p>
            <h3 className="mt-2 text-2xl text-white">Chiller plant</h3>
            <p className="mt-2 text-white/70">Four chamfered corners.</p>
          </NotchedCard>
          <NotchedCard notch={26} corners="diagonal" background="var(--navy-900)" borderColor="var(--cyan)" innerClassName="p-6 text-white">
            <p className="mono-label text-cyan-300">Diagonal</p>
            <h3 className="mt-2 text-2xl text-white">Fire pump set</h3>
            <p className="mt-2 text-white/70">Top-left and bottom-right only.</p>
          </NotchedCard>
          <NotchedCard notch={12} background="var(--offwhite)" innerClassName="p-6">
            <p className="mono-label text-[#00608c]">Light</p>
            <h3 className="mt-2 text-2xl text-navy">LT panel</h3>
            <p className="mt-2 text-muted">On a light surface.</p>
          </NotchedCard>
        </div>
      </section>

      {/* ---------- S3 */}
      <DiagonalSection edge="top" angle={8} slantDirection="up" className="bg-offwhite pb-24">
        <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2`}>
          <div>
            <Label id="S3" name="Hexagon grid" tone="light">
              Honeycomb tiles. Hover or focus one to lift it, dim its neighbours and update the side panel.
            </Label>
            <HexGrid
              items={industries.map((i) => ({ id: i.slug, label: i.name, icon: industryIcons[i.slug] }))}
              onActiveChange={setHexActive}
            />
          </div>
          <div className="min-h-[12rem] border border-line bg-white p-6" aria-live="polite">
            {hexIndustry ? (
              <>
                <p className="mono-label text-[#00608c]">{hexIndustry.name}</p>
                <p className="mt-2 text-ink">{hexIndustry.summary}</p>
              </>
            ) : (
              <p className="text-muted">Hover a hexagon.</p>
            )}
          </div>
        </div>
      </DiagonalSection>

      {/* ---------- S4 */}
      <section className="bg-grain bg-navy-950 py-24">
        <div className={wrap}>
          <Label id="S4" name="Circular orbit">
            Twelve capability nodes orbit a central emblem. Hover or focus a node: the ring pauses and a connector draws to the card.
          </Label>
          <OrbitRing
            nodes={capabilities}
            center={<span className="font-heading text-3xl font-extrabold tracking-wide">UMS</span>}
          />
        </div>
      </section>

      {/* ---------- S5 */}
      <section className="bg-navy-900 py-24">
        <div className={wrap}>
          <Label id="S5" name="Pipe-bend card">
            The border is a pipe with an elbow at one corner and flanged joints at the others; fluid runs through it.
          </Label>
          <div className="grid gap-8 md:grid-cols-3">
            <PipeBendCard tone="dark" color="var(--hvac)" elbow="tl">
              <p className="mono-label text-white/60">HVAC</p>
              <h3 className="mt-2 text-2xl text-white">Chilled-water loop</h3>
            </PipeBendCard>
            <PipeBendCard tone="dark" color="var(--fire)" elbow="br">
              <p className="mono-label text-white/60">Fire fighting</p>
              <h3 className="mt-2 text-2xl text-white">Sprinkler riser</h3>
            </PipeBendCard>
            <PipeBendCard tone="dark" color="var(--plumbing)" elbow="tr">
              <p className="mono-label text-white/60">Plumbing</p>
              <h3 className="mt-2 text-2xl text-white">Cold-water main</h3>
            </PipeBendCard>
          </div>
        </div>
      </section>

      {/* ---------- S6 */}
      <section className="relative bg-navy-900">
        <div className={`${wrap} pb-4`}>
          <Label id="S6" name="Curved wave divider">
            Two drifting wave layers on the seam between sections (this one is white over navy).
          </Label>
        </div>
        <WaveDivider fill="var(--offwhite)" backFill="var(--cyan-100)" height={96} />
      </section>

      {/* ---------- S7 */}
      <section className="bg-offwhite py-24">
        <div className={wrap}>
          <Label id="S7" name="Stacked sticky cards" tone="light">
            Scroll: each card slides over the previous one, which scales down and dims.
          </Label>
          <StackedCards cards={cards} topOffset={96} step={16} />
        </div>
      </section>

      {/* ---------- S8 */}
      <section className="bg-navy-950">
        <div className={`${wrap} pt-24`}>
          <Label id="S8" name="Horizontal track">
            Pinned on desktop: vertical scroll sweeps horizontally. A native snap carousel on phones and with reduced motion.
          </Label>
        </div>
        <HorizontalTrack panels={trackPanels} label="Featured projects" />
      </section>

      {/* ---------- S9 */}
      <section className="py-24">
        <div className={wrap}>
          <Label id="S9" name="Split diagonal panels">
            Two panels on an angled divide. Move the pointer across to shift the divide, or tab into a panel.
          </Label>
          <SplitDiagonalPanels
            leftLabel="Quality and safety"
            rightLabel="Integrated delivery"
            left={
              <>
                <p className="mono-label text-cyan-300">Quality & safety</p>
                <h3 className="mt-3 text-4xl text-white">Zero lost-time incidents</h3>
                <p className="mt-3 text-white/70">QA/QC at every hold point, ISO-certified systems and a safe site every day.</p>
                <ul className="mt-6 space-y-2 text-white/80">
                  {["Inspection and test plans", "Permit-to-work", "Daily toolbox talks", "ISO 45001 certified"].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-300" />
                      {t}
                    </li>
                  ))}
                </ul>
              </>
            }
            right={
              <>
                <p className="mono-label text-cyan-300">Integrated delivery</p>
                <h3 className="mt-3 text-4xl text-white">One accountable team</h3>
                <p className="mt-3 text-white/70">In-house trades, single-point responsibility and 24/7 maintenance.</p>
                <ul className="mt-6 space-y-2 text-white/80">
                  {["One contract, six disciplines", "In-house engineers", "Coordinated shop drawings", "24/7 maintenance"].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-300" />
                      {t}
                    </li>
                  ))}
                </ul>
              </>
            }
          />
        </div>
      </section>

      {/* ---------- S10 */}
      <section className="bg-navy-900 py-24">
        <div className={wrap}>
          <Label id="S10" name="Isometric tiles">
            Process steps as 30° isometric blocks. They light up as the pipe fills while you scroll.
          </Label>
          <IsoSteps
            steps={deliverySteps.map((s, i) => ({
              title: s.title,
              text: s.text,
              tag: ["Tender report", "Shop drawings", "Approved submittals", "Inspection records", "T&C reports", "O&M manuals"][i],
            }))}
          />
        </div>
      </section>

      {/* ---------- S11 */}
      <section className="bg-navy-950 py-24">
        <div className={wrap}>
          <Label id="S11" name="Masked text window">
            A giant heading with the photograph playing inside the letters (an image here; a video via <code className="mono-label">videoSrc</code>).
          </Label>
          <MaskedTextWindow text="Systems" image={photo("ceilingServices").src} />
        </div>
      </section>

      {/* ---------- S12 */}
      <section className="bg-grain bg-navy-950 py-24">
        <div className={wrap}>
          <Label id="S12" name="Radial gauge">
            Needle sweeps and the number counts up when the dial enters view. Metallic numerals on a dark panel.
          </Label>
          <div className="flex flex-wrap items-end justify-center gap-10">
            <RadialGauge value={dummyStats[1].value} max={50} suffix="+" label={dummyStats[1].label} size={300} />
            {[dummyStats[0], dummyStats[2], dummyStats[5]].map((s) => (
              <RadialGauge
                key={s.label}
                value={s.value}
                max={s.label.includes("Engineers") ? 300 : s.suffix === "%" ? 100 : 20}
                suffix={s.suffix}
                label={s.label}
                size={190}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- S13 */}
      <section className="bg-navy-950 py-24">
        <div className={wrap}>
          <Label id="S13" name="Blueprint frame">
            Content framed by dimension lines with arrows and measurements, crosshair corners and a title block.
          </Label>
          <BlueprintFrame widthLabel="24,600 mm" heightLabel="14,200 mm" title="SECTION A–A">
            <div className="relative aspect-[16/8]">
              <SiteImage asset={photo("pumpRoom", "center 35%")} fill sizes="(min-width:1280px) 70vw, 100vw" className="object-cover opacity-80" />
            </div>
          </BlueprintFrame>
        </div>
      </section>

      {/* ---------- S14 */}
      <section className="bg-navy-900 py-24">
        <div className={wrap}>
          <Label id="S14" name="Morphing shape">
            One path morphs between the six discipline silhouettes (flubber). Scroll to scrub, or use the slider.
          </Label>
          <div ref={morphRoot} className="grid min-h-[90svh] items-start gap-10 lg:grid-cols-2">
            <div className="sticky top-28 flex flex-col items-center gap-6">
              <MorphShape progress={morph} size={300} label={MORPH_SHAPES[morphIndex].label} />
              <p className="mono-label text-cyan-300" aria-live="polite">
                {MORPH_SHAPES[morphIndex].label}
              </p>
              <label className="flex w-full max-w-xs flex-col gap-2 text-white/70">
                <span className="mono-label">Morph progress</span>
                <input
                  type="range"
                  min={0}
                  max={MORPH_SHAPES.length - 0.01}
                  step={0.01}
                  value={morph}
                  onChange={(e) => setMorph(Number(e.target.value))}
                  className="accent-cyan"
                />
              </label>
            </div>
            <ol className="space-y-24 pt-24">
              {MORPH_SHAPES.map((s) => (
                <li key={s.id} className="font-heading text-3xl font-bold uppercase text-white/80">
                  {s.label}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- S15 */}
      <section className="bg-offwhite py-24">
        <div className={wrap}>
          <Label id="S15" name="Asymmetric bento" tone="light">
            Mixed-size tiles, varied radii and one cut-out tile with a circular bite taken from its corner.
          </Label>
          <AsymmetricBento>
            <BentoTile span={{ cols: 3, rows: 2 }} radius="leaf" className="bg-navy p-8 text-white">
              <p className="mono-label text-cyan-300">Featured</p>
              <h3 className="mt-3 text-4xl text-white">Site Safety Planning for MEP Works</h3>
            </BentoTile>
            <BentoTile span={{ cols: 3 }} radius="soft" className="border border-line bg-white p-6">
              <p className="mono-label text-[#00608c]">MEP systems</p>
              <h3 className="mt-2 text-2xl text-navy">VRF and chilled-water</h3>
            </BentoTile>
            <BentoTile span={{ cols: 2 }} radius="pill" className="bg-cyan p-6 text-navy-950">
              <p className="mono-label">Maintenance</p>
              <h3 className="mt-2 text-xl text-navy-950">HVAC planning</h3>
            </BentoTile>
            <BentoTile span={{ cols: 1 }} radius="sharp" className="bg-navy-900 p-4 text-white">
              <span className="font-heading text-4xl font-extrabold">6</span>
            </BentoTile>
            <BentoTile span={{ cols: 3 }} radius="soft" cutout={{ corner: "tr", size: 40 }} className="bg-navy-900 p-6 text-white">
              <p className="mono-label text-cyan-300">Cut-out tile</p>
              <h3 className="mt-2 text-xl text-white">Technical notes</h3>
              <p className="mt-1 text-white/70">A circular bite is masked out of the top-right corner.</p>
            </BentoTile>
          </AsymmetricBento>
        </div>
      </section>

      {/* ---------- S16 */}
      <section className="bg-navy-950 py-24">
        <div className={wrap}>
          <Label id="S16" name="Ticket / tab card">
            Cards with a tab notch carrying the category, used for articles, certificates and careers.
          </Label>
          <ul className="grid gap-6 md:grid-cols-3">
            <TicketCard as="li" tone="dark" tab="Safety" accent="var(--cyan)">
              <h3 className="text-2xl text-white">Site Safety Planning for MEP Works</h3>
              <p className="mono-label mt-3 text-white/60">4 min read · 18 Sep 2026</p>
            </TicketCard>
            <TicketCard as="li" tone="dark" tab="Fire fighting" accent="var(--fire)" tabText="#fff">
              <h3 className="text-2xl text-white">Fire Protection Inspection Records</h3>
              <p className="mono-label mt-3 text-white/60">4 min read · 6 Aug 2026</p>
            </TicketCard>
            <TicketCard as="li" tone="dark" tab="Electrical" accent="var(--electric)">
              <h3 className="text-2xl text-white">Electrical Design Engineer</h3>
              <p className="mono-label mt-3 text-white/60">Islamabad · Full-time</p>
            </TicketCard>
          </ul>
        </div>
      </section>

      <WaveDivider fill="var(--white)" height={64} />
      <div className="h-16 bg-white" />
    </div>
  );
}
