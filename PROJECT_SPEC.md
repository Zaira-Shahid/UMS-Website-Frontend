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

---

## 12. Design principle — match the mockups, simple, neat and clean (owner priority)
- The final website must look like the images I provided in docs/reference/mockups/
  (same layout, section order, colours, fonts, buttons and imagery). When unsure,
  open the mockup and copy what it shows.
- The site must be SIMPLE, NEAT and CLEAN:
  - generous white space, aligned grids, consistent spacing between sections
  - one clear heading style, one primary button style and one outline button style
  - no extra decoration, effects, animations or sections that are not in the mockups
  - no clutter: fewer elements, done well
  - subtle motion only (fade/slide on scroll, gentle hover), switched off with
    reduced motion
- Before reporting any section or page as done, compare a screenshot of it with the
  matching mockup and fix visible differences in layout, spacing, size and colour.
  If a page has no mockup, follow the same visual style as the homepage mockups.
- If anything in the code conflicts with this section, this section wins.


---

## 13. Services pages + dropdown icons (mockups 10 and 11)

New mockups: docs/reference/mockups/10-services-overview.jpg and 11-service-detail.jpg. Match them closely, following
Section 12. Keep the site's normal header and footer (the mockups show a simplified header).

### 13.1 /services: Services overview (mockup 10)
- Centred intro: UMS logo + "Ultimate Mechanical Solutions" between two blue lines, big "Our Services" heading with a
  blue underline, and the subline "Mechanical, electrical and plumbing services for complex buildings."
- 2-column grid (1 column on mobile) of 6 service cards: a photo on top, then the title, a one-line description and
  "Explore Service →". White cards with a thin blue border, rounded corners and a hover lift. Titles: Integrated MEP /
  HVAC Systems / Fire Fighting & Protection / Plumbing & Public Health / Electrical & ELV / Pools & Fountains, with the
  lines as in the mockup. Clicking a card opens that service's page.
- "Explore Our Project Experience": 3 circular building images (label "Illustrative imagery"), a vertical divider, and
  "View Projects →" linking to /projects.
- Navy rounded CTA bar: "Let's Discuss Your Project" | "Request a Quote" button.

### 13.2 /services/[slug]: Service detail (mockup 11), the same template for all 6
- Centred intro: logo line, breadcrumb "Services / <Service>", big service title, and a 2–3 line intro paragraph
  (general, accurate wording; no company claims).
- Wide rounded hero photo for the service with a small italic caption.
- Two columns: a photo on the left and "What's Included" on the right, as a list of 4–6 rows with a light-blue icon tile
  + text and thin dividers. Write service-specific items (e.g. HVAC: chillers & central plant, VRF/split systems,
  ductwork & air distribution, chilled-water piping, testing & balancing).
- "Scope Agreed Separately" light-blue info bar (icon | title | text), plus the italic note "Final inclusions and
  exclusions are confirmed in your proposal."
- "<Service> Typical Applications" (the mockup says "Project Previews"; rename it so it isn't presented as real
  projects): 2 cards with photo, building type (e.g. Commercial Building, Industrial Facility, Hospital, Hotel), 2–3
  lines on how the service applies, and "Learn more →" linking to the matching /industries#anchor. Caption:
  "Illustrative previews". Pick sensible building types per service.
- Navy CTA bar: "Discuss Your <Service short name> Project" | "Request a Quote" linking to
  /request-a-quote?service=<slug>.
- Keep the existing FAQ + FAQPage JSON-LD below the CTA if it fits cleanly; otherwise remove it. Remove the old flow
  animations and numbered diagrams.
- Unique metadata + BreadcrumbList JSON-LD per service.

### 13.3 Images
- Download high-resolution, free-licence (Unsplash/Pexels, commercial use allowed) photos for each service: plant
  rooms, ductwork, fire pump rooms, sprinkler/red pipework, blue water pipework and valves, LT panels and cable trays,
  pools and fountains, engineers reviewing BIM models, and building exteriors for the applications. No visible brand
  names or company logos on people's clothing.
- Save them under public/images/services/<slug>/ (overview card, hero, included, applications) and record source URL +
  photographer in CONTENT_TO_VERIFY.md.
- Mark generic building photos "Illustrative imagery" / "Illustrative previews".
- If downloads are blocked, give the owner the list of URLs to download.

### 13.4 Services dropdown icons
- In the navbar Services dropdown, each row shows its coloured service icon (the same icon set as the hero chips: MEP
  network purple, HVAC fan teal, Fire sprinkler red, Plumbing tap teal, Electrical bolt amber, Pools fountain blue) in
  a rounded light tile, then the name and one-line description, as in mockup 01's chips. Same icons in the mobile
  menu. About dropdown rows also get clean line icons.

### 13.5 Responsive
- Check 360/390/768/1024/1440/1920: the card grid goes to 1 column on mobile, the "What's Included" columns stack
  (photo first), the CTA bar stacks with a full-width button, the circles shrink in a row or scroll sideways, and there
  is no overflow.
- Compare /services and /services/hvac with mockups 10 and 11 at 1440px and 390px, and fix the differences.

Git: commit + push per piece to main, no AI attribution. Tag final-phase-F3b when Section 13 is done. Report with
comparison screenshots and STOP before F4. Order: finish F3, then Section 13, then F4.


---

## 14. Navigation click + Projects page (mockups 19, 20)

New mockups: docs/reference/mockups/19-projects-page.jpg (desktop) and 20-projects-mobile.jpg (mobile).

### 14.1 "Services" nav click
- Clicking the "Services" label navigates to /services (mockup 10 page). Hovering still opens the dropdown. The chevron is
  a separate button that toggles the dropdown for keyboard and touch users. Same for "About" → /about.
- Mobile menu: tapping "Services" opens /services; the chevron expands the accordion.

### 14.2 /projects (mockup 19, desktop)
- Banner: "Our Projects" + "Explore our work by sector." over a wide building photo with a navy gradient on the left.
  Use projects-banner.jpg if it's sharp; otherwise the best larger building photo we have, with the same overlay.
- Filter pills: All Projects (navy, active) / Healthcare / Commercial & Retail / Residential / Institutional (white with
  border). Small italic "Illustrative projects" note below.
- "All Projects" shows each category as its own section, one after another: Healthcare Projects, Commercial & Retail
  Projects, Residential Projects, Institutional Projects, each with a blue accent bar and 3 cards in a row. Clicking a
  pill filters to that category (?sector=…, back button works).
- Card: photo, title, one-line description, 3 service chips with coloured icons (HVAC, Fire, Plumbing, Electrical), and
  "More Details →". White, thin border, rounded, soft shadow, hover lift.

### 14.3 Mobile (mockup 20)
- Banner image fills the background behind the title (combined), with a dark overlay.
- Pills scroll horizontally in one row.
- Categories stack one after another; cards are full-width, one per row.

### 14.4 Content (honesty rules)
- content/projects.ts fields: slug, name, sector, description, services[], image, illustrative: boolean.
- Add the 12 sample projects from the mockup with illustrative: true, matching photos and services as shown.
- Real projects go first in their category (Buch International Hospital and Lady Reading Hospital in Healthcare, with an
  existing photo and the "Illustrative imagery" label).
- Every illustrative card shows a small "Illustrative" badge on the photo.
- `showIllustrativeProjects = true` in content/projects.ts; false hides all sample cards. Note this in CONTENT_TO_VERIFY.md.

### 14.5 "More Projects" section (after the categories)
- Heading "More Projects" with the blue bar and the line "Further work across our sectors."
- Compact layout, different from the big cards: a 2-column list (1 column on mobile) of rows with a small square
  thumbnail, name, sector tag, service chips and an arrow link. Show 4 rows, then a "Load more projects" button that
  reveals 4 more without a reload; hide the button when nothing is left.
- For now it lists the real projects without a confirmed sector (Elanza Mall, Pakistan Cricket Board House, CGGC Head
  Office at Eighteen, Jazz Destiny) with a neutral building icon instead of a photo and no sector tag.

### 14.6 Project detail page (mockup 21), one template for every project
- Top: the same sector pills as /projects (All Projects / Healthcare / Commercial & Retail / Residential / Institutional),
  with the project's sector highlighted. Each pill links back to /projects?sector=….
- Breadcrumb: Projects / <Sector> / <Project name>.
- Title block: project name (large Montserrat), a one-line subtitle (e.g. "Coordinated building services for a healthcare
  facility"), the blue accent bar, and an italic "Illustrative project" note on the right for sample projects.
- Image gallery: one large image on the left (project exterior) and two stacked images on the right with small italic
  captions (e.g. "HVAC Installation", "Mechanical Pipework"). Use the project card photo for the large one and the matching
  service photos we already have (public/images/services/<slug>/…) for the two small ones, chosen from the project's
  services. Rounded corners, light caption bar. Clicking an image opens a simple lightbox (Esc closes, arrow keys switch).
- Two columns: "Project Overview" (2 short paragraphs) on the left, then a vertical divider, then "Project Snapshot" on the
  right: a light card with rows Sector and Scope (the services list), plus Location only when confirmed.
- "Services Delivered": centred heading + 3 cards (icon + service name + 2-line description), one per service of the
  project; each card links to its service page.
- "Delivery Approach": centred heading + a light-blue band with 4 outlined steps Coordination → Installation → Testing →
  Handover, with blue arrows (wraps on mobile).
- Bottom buttons: "Back to Projects" (outline) and "Request a Quote" (solid blue, links to
  /request-a-quote?service=<first service>&project=<slug>).
- Then the standard navy CTA band and footer.

Honesty rules:
- Illustrative (sample) projects: write the overview in neutral, typical-approach wording ("Building services are routed
  around clinical and support spaces…"), NOT "We planned/We delivered", so it isn't presented as UMS's real work. Keep the
  "Illustrative project" note visible.
- Real projects (Buch International Hospital, Lady Reading Hospital, etc.): show only confirmed fields; hide Overview,
  Services Delivered and Scope until confirmed, and show a short line: "Project details will be published soon."
- Add the overview text and subtitle to content/projects.ts for all 12 sample projects (sector-appropriate wording).

Mobile: pills scroll horizontally, the gallery stacks (large image, then the two small side by side), the columns stack
(Overview, then Snapshot), the service cards go full width, the delivery steps form a 2×2 grid, and the buttons are full
width and stacked.
