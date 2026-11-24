# PROJECT_SPEC.md — UMS Website V2 ("Advanced Edition")

> This file **replaces** the previous PROJECT_SPEC.md completely. Ignore any earlier spec, phase list or design rule not written here. The old spec stays only in git history.

---

## 0. Mission

Build an **award-level, advanced frontend** for **Ultimate Mechanical Solutions (UMS)** — a Pakistani MEP contracting company (HVAC, Fire Fighting, Electrical & ELV, Plumbing, Integrated MEP, Pools & Fountains), offices in Islamabad and Lahore, domain umss.pk.

The bar: someone opening the site should stop and stare. It must feel like an **engineering firm that builds the hidden systems inside buildings** — precise, technical, alive — not a corporate template. Think Awwwards "Site of the Day" quality, while staying fast, accessible and conversion-focused (RFQ / tender enquiries).

**Core rule — no repetition:** no two sections on any page may share the same layout, shape or card style. Every section has its own geometry (see Section 4, Shape Library).

---

## 1. Relationship to existing code

- Work on a new branch **`feature/ums-v2`**, created from the current `feature/ums-website`.
- **Keep and reuse** working logic: Next.js setup, `/content` data model, zod schemas, `/api/rfq`, `/api/contact`, `/api/careers`, search index, SEO helpers, routes.
- **Replace** the visual layer: design tokens, section components and page layouts are rebuilt to this spec. Delete old components once their V2 replacements are in use — no dead code, no two versions of the same component.
- The RFQ / contact / careers form *logic* stays; their *UI* gets redesigned in their phase.

---

## 2. Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 App Router, React 19, TypeScript strict |
| Styling | Tailwind CSS v4 + CSS variables |
| Motion | **GSAP + ScrollTrigger** (scroll choreography, pinning, scrubbing) and **Framer Motion** (component/state animation) |
| Smooth scroll | Lenis (synced with ScrollTrigger) |
| 3D | **three + @react-three/fiber + @react-three/drei** (hero building, lazy-loaded) |
| Shapes | Hand-written SVG, CSS `clip-path`, SVG `mask`, `flubber` for SVG path morphing |
| Icons | lucide-react + custom animated SVG MEP icons |
| Forms | react-hook-form + zod (existing) |
| Search | Fuse.js (existing) |
| Fonts | Barlow Semi Condensed (headings), Inter (body), **JetBrains Mono** (technical labels, coordinates, specs) |

If any package install fails (network), **stop and tell me the exact `npm install` command** so I can run it myself. Never silently replace a required library.

---

## 3. Design system

### 3.1 Colours
```
--navy-950: #06141F   /* deepest backgrounds */
--navy-900: #0B2236
--navy:     #173F60   /* brand navy */
--cyan:     #008CCB   /* brand cyan */
--cyan-300: #5CC4EE   /* glows on dark */
--cyan-100: #D6F0FB
--white:    #FFFFFF
--offwhite: #F4F8FB
--steel:    #8A9BAA   /* metallic mid-grey */
--line:     #D9E4EC
--text:     #1E2B37
--muted:    #5B6B7A
/* discipline accents (used only on their own service content) */
--hvac:     #00A8E8   /* cool blue */
--fire:     #E0322B   /* red */
--electric: #F5B700   /* amber */
--plumbing: #00B3A4   /* teal */
--mep:      #008CCB
--pools:    #3FA9F5
```
All text pairs must meet WCAG AA.

### 3.2 Typography
- Display headings: Barlow Semi Condensed 700/800, tight leading (0.95), huge sizes on hero (clamp 56→140px).
- Body: Inter 400/500.
- Technical labels: JetBrains Mono, uppercase, 11–13px, tracking 0.12em — used for coordinates, spec tags, section indexes (`[ 03 / INDUSTRIES ]`), stats units.
- Split-text animations on major headings (per-word or per-line mask reveal).

### 3.3 Visual language — "Inside the building"
The site's concept: **we reveal the hidden systems inside buildings.** Recurring motifs:
- **Blueprint layer:** technical grid, dimension lines with arrows and measurements, coordinate labels in mono font.
- **Pipe network:** animated SVG pipes that flow between sections, with "fluid" moving inside (animated dash) — colour changes per discipline.
- **X-ray reveal:** hovering or scrolling peels a photo to reveal a technical line-drawing version underneath (SVG mask).
- **Grain + light:** subtle noise texture on dark sections, soft cyan radial glows, metallic gradients on numbers.
- **Precision details:** corner brackets, crosshair markers, tick-mark rulers along section edges.
- **Custom cursor** (desktop only): small crosshair that grows into a labelled circle ("View", "Drag", "Open") over interactive elements. Hidden on touch and reduced-motion.

### 3.4 Motion principles
- Every section has an **entrance choreography** (not one generic fade). Use GSAP timelines with ScrollTrigger.
- Pinned storytelling where specified; scrubbed animations tied to scroll.
- Hover states are rich: magnetic buttons, tilt (max 6°), image zoom with mask, underline draws.
- 60fps target: animate only `transform`, `opacity`, `clip-path`, SVG stroke.
- `prefers-reduced-motion`: disable 3D rotation, pinning, scrubbing, cursor, Lenis, marquees, counters (show final values). Content must still be fully readable and usable.

---

## 4. Shape Library (use each at least once; never repeat on adjacent sections)

| ID | Shape | Description |
|---|---|---|
| S1 | **Diagonal cut** | Section with `clip-path` slanted top/bottom edge (6–8°) |
| S2 | **Notched corners** | Cards with chamfered corners like steel plates (`clip-path: polygon`) |
| S3 | **Hexagon grid** | Honeycomb tiles (industries / capabilities) |
| S4 | **Circular orbit** | Items arranged on a rotating ring around a central element |
| S5 | **Pipe-bend card** | Card whose border is an SVG pipe with an elbow joint at one corner |
| S6 | **Curved wave divider** | Animated SVG wave transition between sections |
| S7 | **Stacked sticky cards** | Cards that stack and scale as you scroll (pinned deck) |
| S8 | **Horizontal track** | Pinned section that scrolls horizontally |
| S9 | **Split diagonal panels** | Two panels divided by an angled line, hover shifts the divide |
| S10 | **Isometric tiles** | 30° isometric blocks (process steps, floors) |
| S11 | **Masked text window** | Giant heading with video/image playing *inside* the letters |
| S12 | **Radial gauge** | Circular dial/gauge used for stats |
| S13 | **Blueprint frame** | Content framed by dimension lines and measurements |
| S14 | **Morphing blob/shape** | SVG shape that morphs between discipline icons on scroll (flubber) |
| S15 | **Asymmetric bento** | Mixed-size grid with varied radii and one cut-out tile |
| S16 | **Ticket / tab card** | Cards with a tab notch (articles, careers) |

Each page section in Section 6 names its shape ID. Build each shape as a reusable component in `/components/shapes`.

---

## 5. Dummy data (use everywhere — no "To be confirmed" badges)

Replace every "TODO / To be confirmed / —" placeholder in the UI with realistic dummy data from a single file **`/content/dummy.ts`**, exported and consumed by the other content files. Keep `TODO.md` updated with a "Replace before launch" list referencing this file. Do not show any "dummy" label in the UI.

```ts
company: {
  name: "Ultimate Mechanical Solutions",
  shortName: "UMS",
  tagline: "MEP Contracting for Complex Buildings",
  founded: 2009,
  pecRegistration: "PEC Reg. No. C-6/ME-2047",
  ntn: "NTN 4219876-3",
}
offices: [
  { city: "Islamabad", label: "Head Office",
    address: "Office 12, 3rd Floor, Plot 21, Sector I-9/3, Islamabad 44000",
    phone: "+92 51 4567 890", email: "info@umss.pk",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM", mapQuery: "I-9/3 Islamabad" },
  { city: "Lahore", label: "Regional Office",
    address: "45-B, Main Boulevard, Gulberg III, Lahore 54660",
    phone: "+92 42 3578 1200", email: "lahore@umss.pk",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM", mapQuery: "Gulberg III Lahore" },
]
emails: { general: "info@umss.pk", tenders: "tenders@umss.pk",
          careers: "careers@umss.pk", support: "support@umss.pk" }
whatsapp: "+92 300 1234567"
social: { linkedin: "https://linkedin.com/company/umss", facebook: "https://facebook.com/umss.pk",
          instagram: "https://instagram.com/umss.pk", youtube: "https://youtube.com/@umss" }
stats: [
  { value: 15, suffix: "+", label: "Years of MEP delivery" },
  { value: 37, suffix: "+", label: "Projects delivered" },
  { value: 250, suffix: "+", label: "Engineers & technicians" },
  { value: 2.4, suffix: "M sq ft", label: "Building area serviced" },
  { value: 0, label: "Lost-time incidents in 2025", note: "HSE record" },
  { value: 98, suffix: "%", label: "On-time handover rate" },
]
leadership: [
  { name: "Engr. Ahmed Raza", role: "Chief Executive Officer" },
  { name: "Engr. Sana Malik", role: "Director, Projects" },
  { name: "Engr. Bilal Chaudhry", role: "Head of HVAC" },
  { name: "Engr. Usman Tariq", role: "Head of Fire Protection" },
  { name: "Engr. Ayesha Khan", role: "QA/QC Manager" },
  { name: "Engr. Hamza Iqbal", role: "HSE Manager" },
]
clients: 10 fictional developer/contractor names styled as wordmarks
  (e.g. "Crescent Developers", "Indus Builders", "Margalla Estates", "Ravi Construct",
   "Karakoram Infra", "Summit Healthcare Group", "Jinnah Retail Holdings",
   "Pak Steel Structures", "Capital Smart Towers", "Northern Hospitality")
testimonials: 4 quotes from fictional people at those fictional companies
certifications: ISO 9001:2015, ISO 45001:2018, ISO 14001:2015, PEC C-6, NFPA-aligned practices
timeline: 2009 founded (Islamabad) · 2012 first hospital MEP package · 2015 Lahore office ·
          2018 fire protection division · 2021 integrated MEP delivery · 2025 37+ projects
careers: 4 dummy open positions (Site MEP Engineer – HVAC, Fire Protection Supervisor,
          Electrical Design Engineer, QA/QC Inspector) with location, type, experience
```

**Projects:** expand `/content/projects.ts` to **12 projects** — the 6 featured (Lady Reading Hospital, Buch International Hospital, Elanza Mall, Pakistan Cricket Board House, CGGC Head Office at Eighteen, Jazz Destiny) + 6 dummy ones. Every project gets dummy sector, city, status (completed/ongoing), year, services, area (sq ft), UMS package description, challenge/solution/outcome copy and key facts — so filters, related projects and service preselection all work.

**Insights:** 6 full dummy articles (from the earlier topic list) with author, date, read time and real, useful body copy (600–900 words each).

---

## 6. Pages

### 6.1 HOME — very detailed (the showpiece)

Order of sections. Each must have its own shape and entrance choreography.

**H0. Preloader (first visit only, ≤1.8s)**
- Navy screen; a blueprint line draws the UMS logo outline, a pressure-gauge needle sweeps 0→100 as the counter loads, then the screen splits diagonally (S1) to reveal the hero. Skipped on repeat visits (sessionStorage) and with reduced motion.

**H1. Hero — "The building, X-rayed" (3D)**
- Full-viewport dark hero. Center/right: a **low-poly isometric 3D building** (React Three Fiber) — glass shell with internal MEP systems visible: blue ducts (HVAC), red sprinkler pipes (Fire), amber cable trays (Electrical), teal water pipes (Plumbing).
- Slow auto-rotation; mouse moves the camera slightly (parallax). On scroll the building **explodes into floors** (layers separate vertically).
- Left: mono label `[ 33.6844° N, 73.0479° E — ISLAMABAD ]`, giant split-text H1 **"We engineer what buildings breathe, drink and run on."**, subline "HVAC, fire protection, electrical and plumbing for complex buildings across Pakistan.", CTAs **Request a Quote** (magnetic, cyan) and **Explore Projects** (outline with arrow draw).
- Bottom: **discipline switcher** — 4 chips (HVAC / Fire / Electrical / Plumbing). Selecting one highlights that system in the 3D model (others fade to 15%), changes the accent colour and updates the CTA to `/request-a-quote?service=…`. Auto-cycles every 6s with a progress ring; pause button.
- Blueprint grid + noise + cyan glow behind. Scroll cue: animated pipe dropping down.
- Fallback: static high-quality render image (WebP) on mobile < 768px, low-power devices and reduced motion. 3D chunk lazy-loaded after first paint; LCP element is the H1.

**H2. Trust ribbon — infinite marquee (S6 wave edge)**
- Two rows moving opposite directions: client wordmarks (row 1), certifications + "PEC Registered • ISO 9001 • ISO 45001 • 24/7 Maintenance" (row 2). Pauses on hover. Wave-shaped top edge.

**H3. Manifesto — masked text (S11)**
- Giant statement filling the viewport: **"Behind every wall, above every ceiling — UMS."** Video loop of pipework/plant room plays *inside* the letters. Words light up one by one as you scroll (scrubbed). Small mono annotation lines point to words with tiny specs.

**H4. Stats — radial gauges (S12)**
- 6 stats from dummy data shown as engineering gauges/dials: needle sweeps and number counts up when in view. Metallic gradient numbers. Dark section with ruler tick marks on edges. One gauge is larger (feature: "37+ projects delivered").

**H5. Services — morph + stacked deck (S14 + S7)**
- Pinned section. Left: a large SVG shape that **morphs** between the 6 discipline icons (fan → flame → lightning → droplet → network → fountain) as you scroll. Right: **stacked sticky cards**, one per service; each new card slides over the previous one, which scales down and dims.
- Each card: discipline colour accent, service name, one-line value, 4 systems as mono tags, mini animated diagram, "Explore" + "Get a quote for this" links.
- Mobile: no pinning — swipeable card carousel with the morphing icon on top.

**H6. "Inside a building" interactive cross-section (S13 blueprint frame)**
- A large **SVG cross-section** of a multi-storey building (basement plant room, typical floors, roof). Hotspots (pulsing dots) on: chillers, AHUs, sprinkler mains, fire pump room, LT panels, water tanks, STP, rooftop cooling towers, pool.
- Hover/tap a hotspot → tooltip card with system name, what it does, which UMS service covers it, link to service page.
- Toggle buttons to show/hide each discipline's layer (pipes recolour). Framed by blueprint dimension lines and measurements.

**H7. Featured projects — horizontal track (S8)**
- Pinned horizontal scroll through 6 featured projects. Each panel: large image with **X-ray hover** (photo peels to line drawing), project name in huge outlined text, sector/city/year mono tags, UMS package chips, area figure, "View case study". Progress bar + counter (`03 / 06`). Custom cursor says "Drag".
- Mobile: snap carousel.

**H8. Industries — hexagon grid (S3)**
- 6 hexagons (Healthcare, Commercial & Retail, Residential & Mixed-Use, Hospitality, Education & Institutional, Industrial & Warehousing) with icons. Hover a hex → it lifts, neighbours dim, a side panel shows relevant services (coloured chips) and 1–2 related projects. Light section, diagonal-cut top (S1).

**H9. Delivery process — isometric steps (S10) on a pipeline**
- 6 isometric blocks (Tender Review → Drawings & Coordination → Procurement → Installation → Testing & Commissioning → Handover) connected by a pipe; fluid flows through the pipe as you scroll, lighting each step. Each block: step number, title, 2-line description, deliverable tag (e.g. "Shop drawings", "T&C reports").

**H10. Why UMS — split diagonal panels (S9)**
- Left panel "Quality & Safety" (QA/QC, HSE, 0 LTI, ISO), right panel "Integrated Delivery" (single point of responsibility, in-house teams, 24/7 maintenance). Moving the mouse shifts the diagonal divide toward the hovered side; each panel has an image + 4 checklist items with animated ticks.

**H11. Capabilities orbit (S4)**
- Center: UMS emblem in a glowing ring. Around it, 12 capability nodes orbit slowly (BIM coordination, VRF, chilled water, fire pumps, FM-200 suppression, LT panels, ELV, BMS, STP, rainwater harvesting, LPG/NG, pools & fountains). Hover a node → orbit pauses, a connector line draws to an info card.

**H12. Testimonials — notched cards (S2)**
- 4 testimonials on steel-plate notched cards with a large quote mark, person name, role, company wordmark, project tag. Auto-advancing with drag; the active card is larger and tilted 0°, others ±3°.

**H13. Insights — ticket cards (S16) in an asymmetric bento (S15)**
- 1 featured large article + 3 smaller, ticket-notch cards with category colour tab, read time, date. One bento tile is a cut-out "Subscribe to technical notes" mini form (email only, no backend — success toast).

**H14. Tender CTA — blueprint stamp**
- Bold dark section: heading **"Have a tender or BOQ? Get a response within 48 hours."** A rotating circular stamp ("UMS • TENDER DESK • 48H RESPONSE •") beside the CTA. Buttons: Request a Quote, WhatsApp, Call. Shows `tenders@umss.pk`. Background: animated drawing of a floor plan.

**H15. Footer — pipe network**
- Dark navy-950. Large outlined "UMS" wordmark across the bottom that fills with cyan on hover. Columns: Company, Services, Industries, Resources, Offices (both dummy offices with address/phone/email/hours), social icons, newsletter, legal links, back-to-top button shaped as a valve wheel that rotates on click.

Homepage acceptance: Lighthouse mobile Performance ≥ 85 (3D lazy, fallback on mobile), Accessibility 100, CLS < 0.05, no horizontal overflow at 360/390/768/1024/1440/1920px.

### 6.2 Services overview — `/services`
- Hero: S11 masked text "SYSTEMS" with plant-room video inside.
- 6 disciplines as an asymmetric bento (S15) with discipline colours; each tile has a mini looping animated diagram (fan spinning, flame flicker, current pulse, water flow).
- "Integrated MEP" explainer: S4 orbit showing how disciplines connect.
- CTA: S1 diagonal band.

### 6.3 Service detail template — `/services/[slug]` (6 pages)
Each page themed by its discipline colour. Sections:
1. Hero: discipline icon morph-in (S14), big title, value line, image with X-ray hover, CTA with `?service=`.
2. Systems we deliver: S2 notched cards with icons and specs.
3. How it works: animated technical diagram specific to the discipline (e.g. chilled-water loop for HVAC, sprinkler riser for Fire, single-line diagram for Electrical, water supply path for Plumbing).
4. Applications: S3 hexagons linking to industries.
5. UMS scope: S10 isometric steps.
6. Related projects: S8 horizontal track (filtered).
7. FAQ: accordion with pipe-joint icon, FAQPage JSON-LD.
8. CTA band (S9 split).
Sticky in-page nav (desktop) styled as a vertical pipe with valves as section markers.

### 6.4 Projects — `/projects`
- Hero: counter strip (completed / ongoing / cities / sq ft) on S13 blueprint frame.
- Tabs (All / Completed / Ongoing / Featured) + filters (sector, city, service, year) — URL-synced, animated reflow.
- **Map view toggle**: stylised SVG map of Pakistan with project pins by city (Islamabad, Lahore, Peshawar, Multan, Karachi…); clicking a pin filters the grid.
- Grid cards alternate two shapes (S2 notched / S5 pipe-bend) — never the same shape side by side.

### 6.5 Case study — `/projects/[slug]`
- Hero: full-bleed image with S11 masked project name, mono key facts bar.
- Key facts panel on a blueprint frame (S13).
- Challenge → Solution → Outcome as S7 stacked sticky cards.
- Systems installed: S10 isometric floor stack with per-floor system labels.
- Before/after or render/site comparison slider.
- Gallery: masonry with lightbox.
- Results: S12 gauges (area, duration, systems, team size — dummy).
- "Need similar work?" CTA with `?service=&project=`. Prev/next project with image preview on hover.

### 6.6 About — `/about` (+ mission-values, team, credentials)
- Overview: S11 masked hero, story timeline as a horizontal pipeline (S8) with milestones from dummy data, office cards.
- Mission & Values: values as S3 hexagons with flip interaction.
- Team: leadership in S2 notched cards with duotone photo placeholders (generated initials avatars, no real faces), org chart as an animated pipe-network diagram.
- Credentials: certificates as S16 ticket cards with "View certificate" modal, PEC badge, company profile download (dummy PDF link).

### 6.7 Quality, Safety & Delivery — `/quality-safety-delivery`
- Hero with animated hard-hat/shield line icon. Sticky side TOC.
- QA/QC: inspection checklist with ticks that animate in.
- HSE: 0 LTI gauge (S12), safety pillars as S2 cards.
- Testing & Commissioning: S10 isometric steps.
- Handover: documentation stack visual (S7).

### 6.8 Industries — `/industries`
- Hero: S3 hexagon mosaic of 6 sectors.
- Each sector: anchored section, alternating shapes (S9 split, S1 diagonal, S5 pipe-bend…), relevant services, related projects, sector-specific challenges (e.g. medical gas & isolation rooms for healthcare).
- `scroll-margin-top` for `/industries#<sector>` anchors.

### 6.9 Insights — `/insights`, `/insights/category/[category]`, `/insights/[slug]`
- Hub: featured article in S11 hero, category filter pills, S16 ticket card grid.
- Article: reading progress as a pipe filling with water, TOC, mono meta line, pull quotes in notched cards, related services and articles, Article JSON-LD.

### 6.10 Careers — `/careers`
- Hero: "Build the systems inside Pakistan's landmark buildings."
- Culture: S15 bento with dummy perks (training, site exposure, PEC support, health cover).
- Open positions: S16 ticket cards with location/type/experience, expandable details, "Apply" scrolls to form with position preselected.
- How to apply: S10 steps. Existing application form, redesigned.

### 6.11 Contact — `/contact`
- Split hero (S9): Islamabad | Lahore — hover reveals each office photo and details.
- Office cards with dummy address, phone (click-to-call), email (mailto), hours, "Open in Google Maps" link (`https://maps.google.com/?q=<mapQuery>`), lazy map embed.
- WhatsApp button, existing contact form redesigned, "Have a tender?" card → RFQ.

### 6.12 Request a Quote — `/request-a-quote`
- Keep all Phase 6 logic. Redesign UI: left side a **live "tender sheet"** preview (blueprint-styled document) that fills in as the user types; right side the multi-step form. Step indicator as a pipe with valves that open as steps complete. Service selection as large discipline-coloured tiles with animated icons.

### 6.13 Search, 404, Privacy
- Search palette: dark glass panel, results with discipline colour bars.
- 404: animated "pipe leak" illustration — "This line doesn't connect." + links home/services/contact.
- Privacy Policy: clean long-form typography with sticky TOC (dummy legal text, flagged in TODO.md for legal review).

---

## 7. Global components
- **Header:** transparent over dark heroes → glass (backdrop-blur) on scroll; hides on scroll down, shows on scroll up. Mega menus: Services menu shows the 6 disciplines with colour bars and a live mini 3D/animated icon preview; About menu with descriptions. Request a Quote magnetic button.
- **Mobile nav:** full-screen with staggered big links, accordion submenus, offices + WhatsApp at bottom.
- **AI assistant** (built in its own phase): floating valve-wheel launcher; panel with quick actions; answers from `/content`; mock replies without API key.
- **Page transitions:** navy panel wipe with a pipe line drawing across (≤600ms).

---

## 8. Performance, SEO, accessibility (non-negotiable)
- 3D, GSAP-heavy sections and assistant are dynamically imported; mobile gets lighter fallbacks.
- Images: next/image, AVIF/WebP, correct `sizes`, blur placeholders. Videos: muted, `playsInline`, poster, lazy, < 3MB each.
- Metadata + JSON-LD (Organization, LocalBusiness ×2, Service, Article, FAQPage, BreadcrumbList) on every relevant page; sitemap, robots, OG images.
- WCAG 2.2 AA: keyboard access to every interactive shape (hotspots, hexagons, orbit nodes, sliders), visible focus, `aria-*` on custom widgets, alt text, pause controls for anything that auto-moves > 5s, full reduced-motion support.
- Targets: Lighthouse mobile Performance ≥ 85 on Home, ≥ 90 elsewhere; Accessibility, Best Practices, SEO = 100.

---

## 9. Phases (one at a time — STOP after each for my approval)

| Phase | Scope |
|---|---|
| **V2-1** | Branch `feature/ums-v2`, replace spec, install deps, new design tokens, fonts, `/content/dummy.ts` wired into all content (12 projects, 6 articles, careers, team…), remove all "To be confirmed" UI, Shape Library components (S1–S16) + `/dev/shapes` showcase page, custom cursor, Lenis+ScrollTrigger setup |
| **V2-2** | Header, mega menus, mobile nav, footer (H15), page transitions, preloader (H0), search palette, 404 |
| **V2-3** | Home part 1: H1 3D hero (with fallbacks), H2, H3, H4, H5 |
| **V2-4** | Home part 2: H6 cross-section, H7, H8, H9, H10, H11, H12, H13, H14 + full homepage performance pass |
| **V2-5** | Services overview + 6 service pages |
| **V2-6** | Projects library (with map view) + 12 case studies |
| **V2-7** | About (4 pages), Quality/Safety, Industries |
| **V2-8** | Careers, Contact, Request a Quote redesign (logic kept), Privacy |
| **V2-9** | Insights hub, categories, 6 articles |
| **V2-10** | AI assistant |
| **V2-11** | Final polish: SEO, Lighthouse, accessibility and reduced-motion audit, cross-browser check, remove dead code, README + TODO.md "Replace before launch" list |

At the end of every phase:
1. `npm run lint`, typecheck and `npm run build` — zero errors.
2. Verify in a real browser at 360, 390, 768, 1024, 1440, 1920px, keyboard-only and with reduced motion. Take screenshots of new sections and list what you checked.
3. Commit (Section 10), tag, push.
4. Summary: what was built, commits, what I should check, open issues. Then **STOP**.
5. Stop every server you started. Never start a server on port 3000 if one is already running — use another port.

---

## 10. Git workflow
- Work directly on `main`. Before starting: `git checkout main` then `git pull origin main`. Do not create new feature branches; old ones stay as they are and are never deleted.
- Commit and push as you go: after every logical piece of work (one component, one section, one fix) run lint, typecheck and `npm run build`. If they pass, make a Conventional Commit and push straight away with `git push origin main`. Do not save everything for the end of a phase.
- Run `git pull --rebase origin main` before every push. Never force-push to `main` and never rewrite history. If a push is rejected or there is a conflict, stop and tell the owner.
- Conventional Commits: `type(scope): imperative summary` — types feat, fix, style, refactor, perf, docs, chore, test. Scopes: setup, tokens, shapes, motion, layout, nav, home, hero, services, projects, about, quality, industries, careers, contact, rfq, insights, assistant, seo, content.
- Commits are authored only by the owner (check `git config user.name` and `git config user.email` match the owner's GitHub identity; if not, tell them, never change global config). No AI-tool attribution anywhere: no `Co-Authored-By` trailers, no "Generated with" lines, and no mention of AI tooling in commit messages, PR descriptions, tags, README or code comments.
- Review `git diff --staged` before each commit. Never commit `.env*` (except `.env.example`), `node_modules`, `.next`.
- Tag the end of each phase: `git tag -a v2-phase-N -m "V2 Phase N: <name>"`, then `git push origin main --follow-tags`.
- After V2-11, prepare the release notes and wait for the owner.
