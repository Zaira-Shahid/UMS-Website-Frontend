# MASTER PROMPT — UMS (Ultimate Mechanical Solutions) Corporate Website

> **How to use:** Save this file in the project root as `PROJECT_SPEC.md`. Then paste the **"Kickoff prompt"** (Section 0) into Claude Code. After each phase, review in the browser, then paste the next phase prompt from Section 12.

---

## 0. Kickoff prompt (paste this into Claude Code first)

```
You are a senior frontend engineer and award-level web designer. We are building the
complete, production-grade corporate website for Ultimate Mechanical Solutions (UMS),
a Pakistani MEP contracting company (HVAC, Fire Fighting, Electrical & ELV, Plumbing,
Integrated MEP, Pools & Fountains) with offices in Islamabad and Lahore. Domain: umss.pk.

Read PROJECT_SPEC.md in the project root fully before writing any code. It is the single
source of truth for stack, design system, sitemap, page content, components and rules.

Work strictly phase by phase (Section 12 of the spec). Right now do ONLY Phase 1.
At the end of every phase (Section 13.4):
  1. Run `npm run build` and `npm run lint` and fix every error.
  2. Commit the work in logical Conventional Commits, tag `phase-N`, and push
     `feature/ums-website` with tags.
  3. Give me a short summary: files created, commit hashes, what to check in the
     browser, open TODOs.
  4. STOP and wait for my approval before the next phase.
Follow the Git workflow in Section 13 at all times.

Rules: never invent company facts (PEC numbers, phone numbers, addresses, client claims,
project figures). Use clearly marked placeholders `{/* TODO: client to confirm */}` and
keep all content in /content data files so it can be moved to a CMS later.
The site must look premium and memorable — not like a template — while staying
corporate, fast and accessible.
```

---

## 1. Project goal

A website that:
1. **Explains** UMS's engineering scope clearly (6 service disciplines).
2. **Proves** it through project evidence (case studies with UMS's exact package and role).
3. **Converts** buyers into tender / RFQ submissions, and candidates into job applications.

**Signature feature ("The UMS difference"):** every service, industry and project page connects to the others, and every "Request a Quote" button deep-links to the RFQ form with the relevant service pre-selected, e.g. `/request-a-quote?service=hvac&project=elanza-mall`.

Visitor flow to design for: **Home → HVAC service → related HVAC case study → RFQ with HVAC pre-selected.**

---

## 2. Tech stack (use exactly this)

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4 + CSS variables for design tokens |
| UI primitives | shadcn/ui (Radix) — restyle to UMS brand, never default look |
| Animation | Framer Motion (`motion`) + Lenis smooth scroll |
| Icons | lucide-react + custom SVG icons for each MEP service |
| Forms | react-hook-form + zod |
| Search | Fuse.js (client-side index built from /content) |
| Images | next/image, AVIF/WebP, blur placeholders |
| Fonts | `next/font/google`: Barlow Semi Condensed (600/700/800) for headings, Inter (400/500/600) for body |
| Content | Typed TS data files in `/content` (CMS-ready shape; Sanity can be plugged in later) |
| Email / form delivery | Next.js Route Handlers + Resend (env-driven; log to console if no key) |
| AI assistant | Route Handler `/api/assistant`, provider-agnostic; mock replies when no API key |
| Lint/format | ESLint + Prettier |
| Deployment | Vercel |

---

## 3. Design system

### 3.1 Brand colours (CSS variables)
```
--ums-navy:      #173F60   /* headings, primary buttons, dark sections */
--ums-navy-900:  #0B2236   /* deep backgrounds, footer */
--ums-cyan:      #008CCB   /* accents, icons, links, focus rings */
--ums-cyan-300:  #5CC4EE   /* glows, hover states on dark */
--ums-white:     #FFFFFF
--ums-offwhite:  #F4F8FB   /* alternate sections, panels */
--ums-line:      #D9E4EC   /* borders, dividers */
--ums-text:      #1E2B37
--ums-muted:     #5B6B7A
--ums-fire:      #D9342B   /* ONLY for Fire Fighting service accent */
```
All text/background pairs must meet WCAG AA contrast.

### 3.2 Typography
- Headings: Barlow Semi Condensed, tight tracking, uppercase eyebrow labels (letter-spacing 0.14em, cyan, with a short cyan rule before it).
- Fluid type scale with `clamp()`: H1 48→88px, H2 36→56px, H3 24→32px, body 16→18px.
- Large numerals (stats) in Barlow 800.

### 3.3 Visual language — "Engineered precision"
The site must feel like a precision engineering firm, not a generic template:
- **Blueprint grid:** subtle 24px technical grid lines (navy at 4–6% opacity) behind hero and dark sections.
- **Pipe-line motif:** thin cyan SVG lines that "draw" themselves (stroke-dashoffset) as sections enter the viewport, connecting section headings like piping runs. Small circular "valve/joint" nodes at turns.
- **Corner brackets:** technical-drawing corner marks on image cards and stat panels.
- **Section index numbers:** `01 / Services`, `02 / Projects` style labels.
- **Dark navy feature sections** alternating with white/off-white for rhythm.
- **Photography:** large, high-quality MEP imagery (plant rooms, chillers, pipework, ducting, sprinklers). Duotone navy overlay on hover-states. Use Unsplash placeholders via `remotePatterns`, every image marked `// TODO: replace with approved UMS photography`.
- Border radius small and precise (4–8px). No bubbly shapes.

### 3.4 Motion rules
- Section reveals: fade + 24px rise, staggered children (0.06s), triggered once.
- Hero: slow Ken Burns zoom on the active slide + text mask reveal.
- Animated number counters for stats.
- Magnetic hover on primary CTAs; card hover = lift 4px + cyan border glow + image zoom 1.05.
- Page transitions: subtle fade.
- Everything respects `prefers-reduced-motion` (disable Lenis, counters show final values, no parallax).

---

## 4. Sitemap and routes (32 launch pages)

```
/                                   Home
/about                              About UMS (Overview)
/about/mission-values               Mission & Values         (section anchor or page)
/about/team                         Team & Organization
/about/credentials                  Credentials (PEC etc.)
/quality-safety-delivery            Quality, Safety & Delivery (QA/QC, HSE, inspection, testing, handover)
/services                           Services overview
/services/integrated-mep
/services/hvac
/services/fire-fighting
/services/plumbing
/services/electrical-elv
/services/pools-fountains
/industries                         Industries (6 sectors, anchor sections)
/projects                           Project library with filters (All / Completed / Ongoing / Featured)
/projects/[slug]                    Case study (6 featured at launch)
/insights                           Blog & Insights hub
/insights/category/[category]       safety-compliance | mep-systems | maintenance-operations
/insights/[slug]                    Article (6 at launch)
/careers                            Working at UMS, Open Positions, How to Apply
/contact                            Islamabad office, Lahore office, General enquiries form
/request-a-quote                    RFQ / tender form
/search                             Full search results
/privacy-policy
```
Plus `not-found.tsx`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`.

---

## 5. Global layout

### 5.1 Header
- Sticky. Transparent over the hero, turns solid white with shadow after 40px scroll.
- Left: UMS logo (`/public/brand/ums-logo.svg` — TODO: client file).
- Nav: Home, About UMS ▾, Services ▾, Industries, Projects, Insights, Careers, Contact.
- Right: search icon (opens command-palette style search, ⌘K / Ctrl+K), **Request a Quote** button (navy, magnetic).
- **About mega-dropdown:** Overview, Mission & Values, Team & Organization, Quality Safety & Delivery, Credentials — each with an icon and one-line description.
- **Services mega-dropdown:** 6 photo-led cards in a 3×2 grid (image, name, one-line scope) + "View all services" link + side panel with "Not sure which service? Request a quote."
- Dropdowns: open on hover (desktop, with intent delay) and on click/keyboard; full ARIA support; Esc closes.

### 5.2 Mobile navigation
- Compact header: logo, search icon, menu icon.
- Full-screen menu sheet with accordion sections (About, Services), big tap targets, Request a Quote fixed at the bottom, both office phone shortcuts.

### 5.3 Footer (dark navy-900, blueprint grid background)
- Large CTA band above footer: "Have a tender or project brief?" + Request a Quote + Download Company Profile (PDF, TODO).
- Columns: Company, Services, Industries, Resources; Islamabad office and Lahore office cards (address, phone, email, map link — all TODO placeholders).
- Bottom bar: © UMS, Privacy Policy, social links (TODO).

### 5.4 Floating AI assistant (see Section 9)

---

## 6. Page-by-page specification

### 6.1 Home
1. **Hero carousel** (full viewport height minus header):
   - Slides: Integrated MEP, HVAC, Fire Protection, Electrical & ELV (Fire slide uses red pipework imagery and the `--ums-fire` accent).
   - H1: **"MEP Contracting for Complex Buildings"**; subline: "HVAC, fire protection, electrical and plumbing services for complex developments."
   - CTAs: **Request a Quote** (pre-selects the active slide's service) and **Explore Projects**.
   - Bottom control bar: service tabs with animated progress underline, prev / next, **pause/play** (accessibility requirement), "Next: Fire Protection" preview thumbnail.
   - Auto-rotate 7s, pauses on hover/focus, swipe on mobile.
2. **Service shortcuts strip** overlapping the hero bottom: 4 cards (HVAC, Fire Protection, Electrical, Plumbing) with custom animated SVG icons.
3. **Credentials / stats band:** animated counters — e.g. "37+ project entries", "6 service disciplines", "2 offices", "PEC registered" (all values TODO: client to confirm).
4. **Services section** `01 / Services`: 6 offerings in an asymmetric bento grid, each with image, scope bullets and "Explore" link.
5. **Featured projects** `02 / Projects`: horizontal scroll-snap carousel of the 6 case studies (sector tag, location, UMS package chips, image).
6. **Industries** `03 / Industries`: 6 sectors (Healthcare, Commercial & Retail, Residential & Mixed-Use, Hospitality, Education & Institutional, Industrial & Warehousing) as interactive tiles; hovering a tile highlights which services apply.
7. **Delivery process** `04 / How we deliver`: animated pipe-line timeline — Tender Review → Drawings & Coordination → Procurement → Installation → Testing & Commissioning → Handover. Line draws as you scroll.
8. **Quality & safety teaser:** split section with QA/QC and HSE highlights, link to the full page.
9. **Clients / collaborators:** grayscale logo marquee (TODO: approved logos only).
10. **Latest insights:** 3 article cards.
11. **Enquiry CTA band** (shared with footer CTA).

### 6.2 About UMS
- Overview: hero with company intro, story/timeline component, office presence.
- Mission & Values: values as icon cards.
- Team & Organization: org-structure diagram + leadership cards (TODO data).
- Credentials: PEC registration card with verification placeholder, certifications grid.

### 6.3 Quality, Safety & Delivery
- Sections: QA/QC, HSE, Inspection & Testing, Commissioning, Handover Documentation.
- Each with checklist-style content and a supporting image; sticky side table-of-contents on desktop.

### 6.4 Services overview + 6 service pages (one shared template)
Template sections:
1. Hero: service name, one-line value statement, image, breadcrumb, CTA "Request a Quote for {Service}" (pre-selected).
2. **Systems we deliver:** grid of systems (from Section 7 data) with icons.
3. **Typical applications:** building types → links to Industries anchors.
4. **UMS scope:** design support / supply / installation / testing & commissioning / maintenance — checklist.
5. **Related projects:** filtered case-study cards for this service.
6. **Related insights:** articles tagged with this service.
7. FAQ accordion (with FAQPage JSON-LD).
8. Service-specific RFQ CTA band.

### 6.5 Industries
- 6 anchored sections (`/industries#healthcare` etc.), sticky sector switcher, each sector shows relevant services and approved projects.

### 6.6 Projects library
- Tabs: All, Completed, Ongoing, Featured Case Studies.
- Filters: sector, location, service, status — URL-synced query params, animated layout transitions (Framer `layout`), result count, clear-all.
- Grid/list toggle. Empty state.

### 6.7 Case study page (`/projects/[slug]`)
- Hero image, project name, sector, location, status badge.
- Key facts panel: client/developer, main contractor, consultant, **UMS role & package**, timeline (all TODO-safe fields; hide when empty).
- Scope delivered (service chips linking to service pages), challenge → solution → outcome narrative, image gallery with lightbox.
- "Need similar work?" CTA → RFQ pre-filled with this project's services and sector.
- Next / previous project.

### 6.8 Insights
- Hub: featured article + grid, category filter chips, search.
- Category pages: Safety & Compliance, MEP Systems, Maintenance & Operations.
- Article: reading progress bar, TOC, author/date, related service links, related articles, Article JSON-LD.

### 6.9 Careers
- Working at UMS (culture, benefits), Open Positions list (from data; show a clear "No openings right now — send your CV" message when empty), How to Apply steps, application form (name, email, phone, position, CV upload PDF ≤5MB, message).

### 6.10 Contact
- Two office cards (Islamabad, Lahore) with map embed/links, phone, email (TODO), general enquiry form (separate from RFQ), WhatsApp click-to-chat (TODO number).

### 6.11 Request a Quote (RFQ) — most important conversion page
- Multi-step form with progress indicator:
  1. Contact: name, company, email, phone.
  2. Project: project name, location (city), sector (select), project stage.
  3. Services: multi-select cards (6 services) — **pre-selected from `?service=` param**; scope description textarea.
  4. Tender: tender/submission deadline (date), optional BOQ & drawing upload (PDF/DWG/ZIP, size limit, behind a feature flag `NEXT_PUBLIC_ENABLE_UPLOADS`).
  5. Review & submit.
- zod validation, inline errors, autosave draft to localStorage (try/catch), success screen with reference number and "what happens next".
- POST to `/api/rfq` → email to UMS team + confirmation email to visitor (Resend; console fallback). Honeypot + rate-limit for spam.

### 6.12 Search
- Command-palette modal (⌘K) with live results grouped as Services / Projects / Insights / Pages, each with thumbnail + short description; "View all results" → `/search?q=`.

### 6.13 Privacy Policy
- Clean long-form typography template (content TODO).

---

## 7. Content data (create in `/content`)

Create typed files: `services.ts`, `industries.ts`, `projects.ts`, `insights.ts`, `careers.ts`, `offices.ts`, `site.ts`, `navigation.ts`. Shared types in `/types`.

**Services (systems lists — use these):**
- **Integrated MEP:** tender review, drawings, coordination, procurement, installation, commissioning, handover.
- **HVAC:** central plants, VRF systems, ductwork, chilled-water piping, boilers.
- **Fire Fighting & Suppression:** sprinklers, hydrants, hose reels & cabinets, pump rooms, suppression systems.
- **Plumbing & Public Health:** water supply, filtration, drainage, rainwater, irrigation, sewage treatment, LPG/NG systems.
- **Electrical & ELV:** LT panels, ELV systems, fire alarm & detection, public address.
- **Pools & Fountains:** pools, fountains, water features (supply & installation scope).

**Featured case studies (names only; all other details TODO):**
Lady Reading Hospital, Buch International Hospital, Elanza Mall, Pakistan Cricket Board House, CGGC Head Office at Eighteen, Jazz Destiny.

**Insight articles (6):**
- Safety & Compliance: "Site Safety Planning for MEP Works", "Fire Protection Inspection Records"
- MEP Systems: "VRF and Chilled-Water Systems", "Coordinating MEP Shop Drawings"
- Maintenance & Operations: "HVAC Maintenance Planning", "MEP Handover Documentation"

Write professional, specific English copy for services and articles (general engineering knowledge is fine). **Never** invent UMS-specific facts — numbers, client names beyond the list above, certifications, addresses, phones.

---

## 8. Component architecture

```
/app                     routes (Section 4)
/components
  /layout                Header, MegaMenu, MobileNav, Footer, CTABand
  /home                  HeroCarousel, ServiceShortcuts, StatsBand, ServicesBento,
                         FeaturedProjects, IndustriesGrid, DeliveryTimeline, ...
  /services, /projects, /insights, /careers, /rfq
  /ui                    Button, Badge, Card, Chip, Accordion, Tabs, Dialog, Sheet,
                         SectionHeading (eyebrow + index + pipe line), Counter,
                         Reveal, BlueprintGrid, PipeLine, CornerBrackets, Breadcrumbs
  /search                SearchPalette, SearchResults
  /assistant             AssistantLauncher, AssistantPanel, MessageList, QuickActions
/content                 data files
/lib                     utils, search index, seo helpers, schema (JSON-LD), validations
/public                  brand, images, icons
```
Server Components by default; `"use client"` only where interaction is needed.

---

## 9. AI assistant ("UMS AI Assistant")

- Desktop: floating launcher bottom-right → panel (380×560) with header "UMS AI Assistant", minimise/close.
- Mobile: bottom sheet, opens below the hero actions, swipe-down to close.
- Greeting: "How can I help with your project?" + quick actions: **Explore services**, **Request a quote**, **View projects**.
- Message input, streaming responses, typing indicator, suggested follow-ups.
- `/api/assistant`: answers ONLY from `/content` data (services, projects, offices); if `AI_API_KEY` is missing, return scripted mock answers. Detect quote intent → reply with a button linking to `/request-a-quote?service=…`.
- Disclaimer line: "AI answers may be inaccurate. For tenders, contact our team."

---

## 10. SEO, performance, accessibility

**SEO**
- `generateMetadata` per page: unique title, description, canonical, Open Graph, Twitter.
- JSON-LD: Organization + LocalBusiness (both offices), Service, BreadcrumbList, Article, FAQPage.
- `sitemap.ts`, `robots.ts`, dynamic OG images.
- Internal linking: services ↔ industries ↔ projects ↔ insights.
- Keyword themes: "MEP contracting in Pakistan", "HVAC contracting in Islamabad", "fire fighting contractors Lahore", etc.

**Performance targets**
- Lighthouse ≥ 95 Performance, 100 Accessibility, 100 Best Practices, 100 SEO (mobile).
- LCP < 2.5s, CLS < 0.05. Hero first image `priority`; others lazy. Lazy-load the assistant and search palette.

**Accessibility**
- WCAG 2.2 AA: semantic landmarks, skip link, visible cyan focus rings, full keyboard nav for menus, carousel and filters, carousel pause control, alt text on every image, form labels and error announcements (aria-live), reduced-motion support.

**Responsive**
- Breakpoints: 360, 768, 1024, 1280, 1536. Mobile homepage: 2-column service grid, prominent hero CTAs.

---

## 11. Quality rules for Claude Code
- TypeScript strict, no `any`. Small, reusable components.
- No placeholder "Lorem ipsum" — write real copy or mark `TODO: client to confirm`.
- Consistent naming: use "Fire Fighting" for the service page and "Fire Protection" only as the hero slide label; use "Insights" in nav, "Blog & Insights" as the hub page title.
- Every phase must pass `npm run build` and `npm run lint` with zero errors, then end with
  logical commits → tag → push → summary (with commit hashes) → STOP (Section 13).
- Keep a `TODO.md` listing every client-dependent item (logo, photos, PEC details, phones, addresses, client logos, project facts, company profile PDF).

---

## 12. Build phases (paste one at a time after approving the previous)

**Phase 1 — Foundation**
```
Do Phase 1: set up Next.js 15 + TS + Tailwind v4 + shadcn/ui + Framer Motion + Lenis.
Implement the design tokens, fonts, global styles, and the UI primitives
(Button, SectionHeading, Reveal, BlueprintGrid, PipeLine, CornerBrackets, Counter, Badge, Chip).
Create all /content data files and types from Section 7. Create /dev/ui showcase page
displaying all primitives. Build, lint, commit, tag, push, summarise (with commit hashes), stop.
```

**Phase 2 — Header, mega menus, mobile nav, footer, search palette**
```
Do Phase 2 from PROJECT_SPEC.md: Header (sticky/transparent behaviour), About and Services
mega-dropdowns, mobile full-screen nav, Footer with CTA band, and the ⌘K search palette
with Fuse.js. Fully keyboard accessible. Build, lint, commit, tag, push, summarise (with commit hashes), stop.
```

**Phase 3 — Homepage**
```
Do Phase 3: build the complete Home page per Section 6.1 with all motion from Section 3.4.
Hero carousel must have pause/play, service tabs with progress, swipe, and the service-aware
Request a Quote link. Check at 360px, 768px and 1440px. Build, lint, commit, tag, push, summarise (with commit hashes), stop.
```

**Phase 4 — Services**
```
Do Phase 4: Services overview + the shared service template + all 6 service pages
(Section 6.4) with related projects/insights, FAQ + JSON-LD. Build, lint, commit, tag, push, summarise (with commit hashes), stop.
```

**Phase 5 — Projects & case studies**
```
Do Phase 5: Projects library with URL-synced filters and tabs, and the case study template
with the 6 featured projects (Sections 6.6, 6.7). Build, lint, commit, tag, push, summarise (with commit hashes), stop.
```

**Phase 6 — RFQ & forms**
```
Do Phase 6: multi-step Request a Quote form with service pre-selection from query params,
/api/rfq with Resend (console fallback), honeypot and rate limit; also the Contact form and
Careers application form. Build, lint, commit, tag, push, summarise (with commit hashes), stop.
```

**Phase 7 — About, Quality/Safety, Industries, Careers, Contact, Privacy**
```
Do Phase 7: all remaining corporate pages (Sections 6.2, 6.3, 6.5, 6.9, 6.10, 6.13).
Build, lint, commit, tag, push, summarise (with commit hashes), stop.
```

**Phase 8 — Insights**
```
Do Phase 8: Insights hub, 3 category pages, 6 articles with TOC, reading progress,
related content and Article JSON-LD. Build, lint, commit, tag, push, summarise (with commit hashes), stop.
```

**Phase 9 — AI assistant**
```
Do Phase 9: the UMS AI Assistant (Section 9) — desktop panel, mobile bottom sheet,
quick actions, streaming /api/assistant with mock fallback, quote-intent deep links.
Build, lint, commit, tag, push, summarise (with commit hashes), stop.
```

**Phase 10 — SEO, performance, accessibility polish**
```
Do Phase 10: metadata on every page, sitemap, robots, OG images, all JSON-LD, image
optimisation, lazy loading, reduced-motion audit, keyboard audit, contrast audit.
Run Lighthouse on Home, a service page and a case study and fix issues to hit Section 10
targets. Update TODO.md. Build, lint, commit, tag, push, final summary (with commit hashes).
```

---

## 13. Git workflow (mandatory, every phase)

### 13.1 Branching
- `main` = stable, reviewed code only. Never commit or push directly to `main`.
- All work happens on `feature/ums-website`:
    git checkout -b feature/ums-website
    git push -u origin feature/ums-website
- If the repo has no commits yet, first make an initial commit on `main`
  (`chore: initial commit` with README + .gitignore), push `main`, then create the branch.
- If `git remote -v` is empty, stop and ask me for the GitHub repository URL.
  Never create a remote repo yourself.

### 13.2 Commit messages — Conventional Commits
Format: `type(scope): short imperative summary` (max ~72 chars, lowercase, no full stop),
optional body explaining what and why.
Types: feat, fix, style, refactor, perf, docs, chore, test (accessibility = fix(a11y)/feat(a11y)).
Scopes: setup, ui, layout, nav, search, home, services, projects, rfq, forms, about,
industries, careers, contact, insights, assistant, seo, content.
Examples:
  chore(setup): initialise next.js 15 with typescript, tailwind v4 and shadcn/ui
  feat(ui): add design tokens, fonts and section heading primitive
  feat(home): build hero carousel with service tabs and pause control
  feat(rfq): pre-select service from query params in quote form
  fix(nav): close mega menu on escape and restore focus

### 13.3 Commit discipline
- Several small, logical commits per phase — never one giant commit.
- Only commit code that passes `npm run build` and `npm run lint`.
- Stage files deliberately (`git add <paths>`) and review `git diff --staged` first.
- Never commit secrets: .env* (except .env.example), API keys, node_modules, .next.
  Keep .gitignore correct and maintain .env.example with every required variable.
- No force-push or history rewriting unless I explicitly ask.

### 13.4 End of every phase
1. `npm run build && npm run lint` → zero errors.
2. Commit remaining work in logical commits.
3. Tag the milestone: `git tag -a phase-N -m "Phase N: <name> complete"`.
4. `git push origin feature/ums-website --follow-tags`
5. In the summary, list this phase's commits (`git log --oneline`) and confirm the push.

### 13.5 Merging to main
- Never merge yourself. After the final phase (or when I ask), prepare a Pull Request
  description from feature/ums-website → main summarising all phases and wait for me.
- If gh CLI is available and I ask, open the PR with `gh pr create`.

### 13.6 README
Keep README.md updated: overview, stack, setup (npm install, .env.example, npm run dev),
scripts, folder structure, and these branch/commit conventions.
