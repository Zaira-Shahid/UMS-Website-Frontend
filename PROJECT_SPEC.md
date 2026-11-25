# PROJECT_SPEC.md — UMS Website: Final Design Build (Mockup-Exact)

> This file **replaces every earlier spec** (master prompt, V2, Visual Overhaul). Ignore all earlier specs, phase lists, shape libraries, dummy-data rules and design decisions. Only this file counts.

---

## 0. Mission

Rebuild the frontend of the existing UMS (Ultimate Mechanical Solutions) website so that it looks **the same as the approved mockups** in `docs/reference/mockups/`. The owner has approved these mockups, and the goal is a faithful, production-quality implementation: same layout, same section order, same visual style, colours, typography feel, spacing rhythm, component shapes and imagery. Match them as closely as you can.

Add a **floating AI chatbot** on the side (Section 7).

The site remains a Next.js app, deployed on Vercel from `main` at https://ums-website-frontend.vercel.app/.

---

## 1. Reference material (read these before coding)

### 1.1 Approved mockups — `docs/reference/mockups/`
| File | Shows |
|---|---|
| `01-home-desktop-hero-services.jpg` | Desktop header, hero, service chips, services slider |
| `02-home-mobile.jpg` | Mobile header, hero and "Our Services" grid |
| `03-how-we-deliver.jpg` | "How We Deliver" 5-step section |
| `04-featured-projects.jpg` | "Featured Projects" with sector tabs and slanted image cards |
| `05-clients-partners.jpg` | "Clients & Project Partners" logo carousel |
| `06-credentials.jpg` | "Credentials & Milestones" dark section |
| `07-faq.jpg` | "Frequently Asked Questions" |
| `08-cta.jpg` | "Let's Discuss Your Project" CTA band |
| `09-footer.jpg` | Footer |

Open every image with your image-reading tool and study it before building each section. If you can't open them, stop and tell me.

### 1.2 Image assets — `public/images/` (cropped from the approved mockups)
| Path | Use |
|---|---|
| `brand/ums-logo-from-mockup.png` | Temporary logo (low-res). Replace with the official SVG when supplied. Rebuild it as a clean SVG if you can reproduce it faithfully (gear + speed lines + italic "UMS"); otherwise use the PNG. |
| `hero/hero-building-desktop.png` | Hero building cutaway (desktop) |
| `hero/hero-building-mobile.png` | Hero building cutaway (mobile) |
| `services/hvac.png` | HVAC illustration (services slider) |
| `services/fire-fighting.png` | Fire sprinkler illustration (services slider) |
| `delivery/01-planning.png` … `05-handover.png` | How We Deliver illustrations |
| `projects/illustrative-hospital-1.png`, `-2.png` | Illustrative project images (keep the "Illustrative imagery" label) |
| `sections/wireframe-building-projects.png` | Line-art building, top right of Featured Projects |
| `sections/credentials-folder.png` | Folder illustration, Credentials section |
| `sections/faq-building-sketch.png` | Line sketch, FAQ section |
| `sections/cta-wireframe-building.png` | Wireframe building, CTA band |
| `sections/footer-building.png` | Small building illustration, footer |

These crops are low resolution. Use `next/image` with correct `sizes`, never upscale beyond their natural size on desktop, and use CSS backgrounds/gradients to blend their edges into the section background. Plumbing, Electrical & ELV, Integrated MEP and Pools & Fountains have no illustration yet: draw clean SVG illustrations in the same light-blue isometric style as `hvac.png`, or show the service icon large until real artwork is supplied. List every asset needing a high-res replacement in `CONTENT_TO_VERIFY.md`.

---

## 2. Cleanup first (remove the previous design)

1. `git status`; never discard uncommitted work without telling me.
2. Tag the current state: `git tag -a backup/pre-final-design -m "Before final mockup design"` and push the tag.
3. Delete old spec and prompt files (`UMS_*.md`, any old spec copies). This file is the only spec.
4. Remove the old homepage sections and visual components that the mockup design replaces (old hero cutaway SVG, section drawing, old services rows, industries list, delivery spine, projects index, shape library, unused motion helpers). Remove unused dependencies (`three`, `@react-three/*`, `flubber`, etc.) after confirming via import search. No dead code and no two competing design systems.
5. **Keep** working infrastructure: routes, `content/` data model, forms + their APIs (`/api/rfq`, `/api/contact`, `/api/careers`) and their validation, search index, SEO helpers, sitemap, honest 503 behaviour when mail isn't configured.
6. Commit the cleanup in logical commits and push.

---

## 3. Design system (extracted from the mockups)

### 3.1 Colours
```
--navy-950: #071B33   /* footer / darkest */
--navy-900: #0B2545   /* hero + dark sections */
--navy-800: #10305A
--navy:     #0F2A4A   /* headings on light, dark pill buttons */
--blue:     #1BA6E8   /* primary bright blue: buttons, accents, active states */
--blue-600: #0E8BD0   /* hover */
--cyan:     #22D3EE   /* outline buttons on dark, footer dividers */
--sky-50:   #EEF5FB   /* light section backgrounds */
--white:    #FFFFFF
--text:     #0F2A4A
--muted:    #52657A
--border:   #DCE7F1
/* service accent colours (chips/icons) */
--mep:      #8B3FD9   /* Integrated MEP – purple */
--hvac:     #14B8C4   /* HVAC – teal */
--fire:     #E53935   /* Fire Fighting – red */
--plumbing: #14B8A6   /* Plumbing – teal-green */
--electric: #F5B400   /* Electrical & ELV – amber */
--pools:    #1BA6E8   /* Pools & Fountains – blue */
```
Sample exact values from the mockups with an eyedropper-style check (read the images) and adjust if needed. Keep WCAG AA contrast.

### 3.2 Typography
- Headings: **Montserrat** 700/800 (bold geometric, as in "MEP Contracting for Complex Buildings", "How We Deliver"). Two-tone headings where the mockup does it: "How We **Deliver**", "Clients & **Project Partners**" (second part in `--blue`).
- Body/UI: **Inter** 400/500/600.
- Short accent bar (about 70×5px, `--blue`, rounded) above section titles, as in the mockups.

### 3.3 Components
- **Primary button:** solid `--blue`, white bold text, ~10px radius.
- **Outline button on dark:** white/cyan 2px border, white text.
- **Dark pill button (header):** `--navy` pill, document icon + "Request a Quote".
- **Slanted buttons/tabs (Projects section):** parallelogram (skewed) shapes, blue fill for active tab and "Explore Project", outlined for "View All Projects".
- **Service chips (hero bottom):** outlined rounded rectangles on navy with a coloured service icon + label.
- **Cards:** white, ~16px radius, very soft shadow, used for the mobile service grid, client logos and FAQ items.
- Icons: lucide-react plus custom SVG service icons (MEP network, fan, sprinkler, tap, lightning, fountain) coloured per service.

---

## 4. Global layout

### 4.1 Header (mockups 01, 02)
- White background, subtle bottom shadow, sticky.
- Left: UMS logo. Nav: Home, About, Services, Industries, Projects, Insights, Careers, Contact. Active item in `--blue` with a thick rounded underline.
- Right: circular search button (light blue background), dark navy pill "Request a Quote" with a document icon, round green WhatsApp button.
- **WhatsApp button renders only when `contact.whatsapp` in `content/site.ts` has a value.** Until then, hide it.
- Services and About keep the light dropdown panels already built (vertical rows with thumbnails/icons, "Services overview ↗"), restyled to these colours and fonts.
- Mobile: logo, "Get a Quote" navy pill, WhatsApp (only if configured), hamburger opening the existing full-screen menu restyled.

### 4.2 Footer (mockup 09)
- Dark navy. Left column: white rounded logo badge, "Ultimate Mechanical Solutions" with blue underline, social icons in outlined rounded squares (LinkedIn, Facebook, Instagram, YouTube, X, TikTok, WhatsApp), and `footer-building.png` underneath.
- **Each social icon renders only when its URL is set in `content/site.ts`.**
- Columns separated by thin cyan vertical lines, headings with cyan underline bars: **Explore** (About UMS, Projects, Industries, Insights, Careers), **Services** (6 services), **Offices** (Islamabad, Lahore, View Office Locations → /contact), **Contact Us** (Head Office Location and Get Directions only when an address/map URL is configured; otherwise link to /contact; plus a cyan outlined "Request a Quote" button).
- Bottom bar with a cyan line: "Ultimate Mechanical Solutions" left, "Privacy Policy" right.

---

## 5. Homepage — exactly this order (and nothing else)

### H1. Hero (mockups 01, 02)
- Navy background (`--navy-900`) with a subtle radial glow behind the building.
- Left: H1 **"MEP Contracting for Complex Buildings"** (white, Montserrat 800), subline **"Six disciplines. One coordinated delivery."**, buttons **Explore Projects** (solid blue → /projects) and **Request a Quote** (outline → /request-a-quote), then text link **"Explore Building Systems →"** with a blue underline (→ /services).
- Right: `hero-building-desktop.png`, large (about 60% of the width), with the edges blended into the navy. Optional: gentle float animation (2–4px), disabled for reduced motion.
- Bottom: a row of 6 **service chips** (Integrated MEP, HVAC, Fire Fighting, Plumbing, Electrical & ELV, Pools & Fountains), each linking to its service page.
- Mobile (mockup 02): headline, subline, the two buttons side by side, the text link, then `hero-building-mobile.png` full-width. Chips are replaced by the "Our Services" grid below.

### H2. Services (mockups 01 bottom, 02 bottom)
- Desktop: light `--sky-50` background. A **services slider**: the active service shown large (illustration left, blue accent bar + title "HVAC Systems" + short line + a progress bar showing the position), a `>` arrow, and the next service peeking on the right (illustration + title + short line). Arrow, swipe and keyboard navigation; auto-advance is optional and must pause on hover/focus, with a pause control if it auto-advances.
- Short lines: use concise, non-factual descriptions (e.g. HVAC "Comfort, air quality and plant that runs efficiently.", Fire "Life-safety systems tested and documented.") and write matching ones for the other four.
- Mobile: "Our Services" heading + 2-column grid of 6 white cards (coloured icon tile + name), each linking to its service page. The active/hovered card gets a blue border.

### H3. How We Deliver (mockup 03)
- Light background, two-tone heading "How We **Deliver**".
- 5 columns: illustration on top (`delivery/01–05`), a dashed blue connector line with circles under the images, then step title and a 2-line description: Planning, Coordination, Installation, Testing, Handover (copy as in the mockup).
- Mobile: vertical list with the connector line on the left.

### H4. Featured Projects (mockup 04)
- Heading "Featured Projects", subline "Explore our work by sector.", wireframe building image top right.
- Slanted sector tabs: Healthcare, Commercial & Retail, Residential, Institutional. Tabs filter which projects show.
- Large slanted image card (left) + smaller card (right) with a diagonal divide: project name, location pin + city, short blue bar, slanted "Explore Project" button, and an **"Illustrative imagery"** label on images that are not real project photos.
- Slanted outlined **"View All Projects"** button below.
- Data: only the 6 real project names. Buch International Hospital (Multan) and Lady Reading Hospital (Peshawar) are Healthcare. Add a sector/city for the others only when confirmed; projects without a confirmed sector appear under no tab except on /projects. Never invent scope, dates or values.

### H5. Clients & Project Partners (mockup 05)
- Heading "Clients & **Project Partners**" with a blue underline, then a horizontal carousel of white rounded logo cards (centre card highlighted with a blue border), sliding/looping, pause on hover.
- **Content rule:** logos come ONLY from `content/clients.ts`, where each entry has `name`, `logo` and `verified: boolean`. Render only entries with `verified: true`. Ship the file with the entries shown in the mockup (BNP, Venture Engineering, Banu Mukhtar, Mecatech, Gold Roof) set to `verified: false` and no logo files, and list them in `CONTENT_TO_VERIFY.md` ("confirm the client relationship and supply logo files"). If no verified clients exist, hide the whole section.

### H6. Credentials & Milestones (mockup 06)
- Dark navy with faint blueprint lines. Left: heading, then 3 rows (icon + vertical divider + title + one line): Professional Credentials, Project Milestones, Quality & Safety (copy as in the mockup, general wording only). "View Credentials" outlined button → `/quality-safety-delivery` (until a credentials page with verified documents exists).
- Right: `credentials-folder.png`.

### H7. FAQ (mockup 07)
- Light background. Left: UMS logo + "ULTIMATE MECHANICAL SOLUTIONS", blue bar, big heading "Frequently Asked Questions", `faq-building-sketch.png` below.
- Right: accordion of white rounded cards (the open one shows a divider and the answer, "−" icon; closed ones "+"). Questions: What services does UMS provide? / How do I request a project quote? / Can I review projects by sector? / What should I include in my project brief? Write accurate answers based on the site's own features. FAQPage JSON-LD.

### H8. CTA band (mockup 08)
- Navy, blue bar, "Let's Discuss Your Project", subline as in the mockup, **Request a Quote** (solid blue) + **Contact UMS** (outline), and `cta-wireframe-building.png` on the right.

### H9. Footer (Section 4.2)

---

## 6. Inner pages

Restyle every existing route in the same design system (navy hero banner with a breadcrumb + light content sections, Montserrat headings with the blue accent bar, the same buttons, cards and slanted elements, illustrations where relevant):
`/about`, `/about/mission-values`, `/quality-safety-delivery`, `/services`, `/services/[slug]` (6), `/industries`, `/projects`, `/projects/[slug]`, `/insights` (+ category + article pages, attribution "UMS Engineering Team", no fake dates), `/careers` (no fake listings), `/contact` (fields from `content/site.ts` only), `/request-a-quote` (keep all logic), `/search`, `/privacy-policy` (neutral template, flagged for legal review), 404.
The existing 2D technical section drawing may be reused on `/services` (not on the homepage).

---

## 7. AI chatbot (floating, side)

- Floating round button fixed bottom-right (blue, chat icon), with a small "Ask UMS" tooltip on first view. On mobile it sits above the bottom safe area and doesn't cover the "Request a Quote" button.
- Opens a side panel (desktop ~380×560, rounded, shadow; mobile bottom sheet ~85vh): header with the UMS logo + "UMS Assistant" + minimise/close, a greeting ("Hi! How can I help with your project?"), quick-reply chips (Our services, Request a quote, View projects, Contact us), a message list, a typing indicator and an input with a send button.
- Backend `/api/chat`:
  - If `OPENAI_API_KEY` (or `ANTHROPIC_API_KEY`) is set, call the model with a system prompt that allows answers **only from the site's own content** (services, industries, delivery steps, FAQs, the real project names, routes). The bot must not invent prices, timelines, certifications, contact details or project facts. When it doesn't know, it says so and points to /contact or /request-a-quote.
  - If no key is set, use a rule-based responder: keyword-match the question against services/FAQ content and reply with short answers + links. Never pretend to be a human.
  - Rate limit per IP, input length cap, no logging of personal data, streaming responses when using a model.
  - Quote intent ("quote", "price", "tender", "BOQ") → reply with a button to `/request-a-quote?service=<detected service>`.
- Footer line in the panel: "AI answers may be inaccurate. For tenders, contact our team."
- Accessible: focus trap in the open panel, Esc closes, `aria-live` for new messages, keyboard-usable chips.
- Add the env vars to `.env.example`. Lazy-load the chatbot after page load.

---

## 8. Content integrity (no hallucination)
- Never invent addresses, phone numbers, emails, WhatsApp numbers, PEC/ISO numbers, team names, client relationships, statistics, testimonials, dates or project details.
- All contact/social data lives in `content/site.ts` (empty until supplied) and renders only when filled.
- Client logos render only when `verified: true`.
- Mark illustrative images "Illustrative imagery" where they could be mistaken for real project photos.
- Keep `CONTENT_TO_VERIFY.md` updated (contacts, socials, client list + logos, project sectors/cities, official logo SVG, high-res artwork, privacy text, articles).

---

## 9. Quality bar
- Visually match the mockups at 1440px (desktop) and 390px (mobile). Also check 360, 768, 1024 and 1920px for no overflow and a sensible layout.
- After each section, take a screenshot at the mockup width and compare it side by side with the mockup image. List remaining differences in the report.
- Lighthouse mobile on Home: Performance ≥ 85, Accessibility ≥ 95, CLS < 0.05.
- Keyboard and reduced-motion support everywhere. No console errors. Link crawl with zero 404s.
- Don't claim testing you didn't run.

---

## 10. Phases (STOP after each and wait for approval)

| Phase | Scope |
|---|---|
| **F1** | Cleanup (Section 2), design tokens, fonts, buttons/chips/cards, header, footer |
| **F2** | Homepage H1–H4 (hero, service chips, services slider + mobile grid, How We Deliver, Featured Projects) |
| **F3** | Homepage H5–H8 (Clients with the verified rule, Credentials, FAQ, CTA) |
| **F4** | AI chatbot |
| **F5** | Inner pages |
| **F6** | QA, Lighthouse, link crawl, dead-code and dependency cleanup, README + CONTENT_TO_VERIFY.md |

Each phase report: what changed, files, commits, real test results, mockup-vs-build screenshots, remaining differences, content to verify.

---

## 11. Git workflow
- Work on `main`. Before each push: `git pull --rebase origin main`, then lint + typecheck + build (`NEXT_DIST_DIR=.next-test`). Commit only if all pass.
- Commit and push after every completed piece of work (Conventional Commits, e.g. `feat(home): build hero to match mockup`).
- Tag each phase: `final-phase-F1` … `final-phase-F6`, push with `--follow-tags`.
- Never force-push or rewrite history. Never commit secrets or `.env*` (except `.env.example`).
- No AI or Claude attribution in commits, tags, PRs or files.
- Stop every server you start, and never use port 3000 if it's busy.
