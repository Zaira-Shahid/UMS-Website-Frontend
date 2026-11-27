# UMS — Ultimate Mechanical Solutions

Corporate website for **UMS**, an MEP contractor for complex buildings, with offices in **Islamabad** and **Lahore**.
Six disciplines, one coordinated delivery: Integrated MEP, HVAC, Fire Fighting, Plumbing, Electrical & ELV, and Pools & Fountains.

**Live site:** https://ums-website-frontend.vercel.app/ · deployed on Vercel from `main` · latest release `v1.3.2`

---

## Contents

1. [Rules of the project](#rules-of-the-project)
2. [What's on the site](#whats-on-the-site)
3. [Tech stack](#tech-stack)
4. [Quick start](#quick-start)
5. [Environment variables](#environment-variables)
6. [Project structure](#project-structure)
7. [Updating content](#updating-content)
8. [How the Home page stays fast](#how-the-home-page-stays-fast)
9. [The AI assistant](#the-ai-assistant)
10. [Forms](#forms)
11. [Quality checklist before a release](#quality-checklist-before-a-release)
12. [Git workflow and releases](#git-workflow-and-releases)
13. [Troubleshooting](#troubleshooting)

---

## Rules of the project

- **Design source of truth:** [`PROJECT_SPEC.md`](PROJECT_SPEC.md), with the approved mockups in `docs/reference/mockups/`
  (mockup 21, the project detail page, is described in `PROJECT_SPEC.md` section 14.6).
  Section 12 applies everywhere: **match the mockups, keep it simple, neat and clean.**
- **Content honesty:** nothing about the company is shown as fact until the owner has confirmed it. No invented contact details,
  clients, people, numbers or project facts. [`CONTENT_TO_VERIFY.md`](CONTENT_TO_VERIFY.md) lists what the client still has to
  supply or approve.
- **Public repository:** never commit client-confidential material (company profile PDF, design packs, raw photo drops) or any
  `.env*` file other than `.env.example`. The root `.gitignore` already blocks the usual suspects.

## What's on the site

| Area | Routes |
| --- | --- |
| Home | `/` — hero with a living building and service chips, services ticker, How We Deliver, Featured Projects, Clients, Credentials, FAQ, quote band |
| About | `/about`, `/about/mission-values`, `/about/capabilities`, `/quality-safety-delivery` |
| Services | `/services` and one page per discipline, `/services/[slug]` (six) |
| Industries | `/industries` |
| Projects | `/projects` (filter by sector, "More Projects" list) and `/projects/[slug]` for the 37 projects from the company profile |
| Blog | `/blog` and `/blog/[slug]` (`/insights` redirects here) |
| Get in touch | `/contact`, `/request-a-quote`, `/careers`, floating AI assistant on every page |
| Utility | `/search` (also Ctrl+K), `/privacy-policy`, sitemap, robots, share image, structured data (JSON-LD) |

## Tech stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · react-hook-form + zod · Fuse.js (search) ·
class-variance-authority · ESLint. Icons are per-icon SVGs generated from lucide (`components/ui/lucide.tsx`, no icon pack in the
bundle). Fonts through `next/font`: **Barlow Semi Condensed** (headings) and **Inter** (body). Deployed on **Vercel**.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in what you need (see below)
npm run dev                  # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check |

Before every push run lint, the type check and a build into a separate folder, so a running dev server is not disturbed:

```bash
NEXT_DIST_DIR=.next-test npm run build
NEXT_DIST_DIR=.next-test npx next start -p 3101   # test the production build on a free port
```

`.next-test` is git-ignored.

## Environment variables

Copy `.env.example` to `.env.local`. Server-side keys must never start with `NEXT_PUBLIC_`.

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The real domain, used for canonical URLs, the sitemap and structured data (default `https://umss.pk`) |
| `RESEND_API_KEY`, `MAIL_FROM` | Resend API key and a verified sender, for the forms' email |
| `RFQ_TO_EMAIL`, `CONTACT_TO_EMAIL`, `CAREERS_TO_EMAIL` | Who receives each form (comma-separated for several people) |
| `NEXT_PUBLIC_ENABLE_UPLOADS` | `true` turns on BOQ and drawing uploads on the quote form (rebuild after changing) |
| `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` | Optional. Lets a model write the assistant's answers (still limited to the site's own content). Without a key, a rule-based responder answers |
| `CHAT_MODEL` | Optional model override |

Without the mail variables the forms do not pretend to succeed: in production they answer with an honest error asking the
visitor to contact UMS directly (HTTP 503); in development the message is printed to the server console.

## Project structure

```
app/            routes (App Router), sitemap.ts, robots.ts, opengraph-image.tsx, api/ (rfq, contact, careers, chat)
components/     ui/ (buttons, cards, titles, icons, Defer), home/, layout/ (header, footer, menus), services/, projects/,
                forms/, chat/ (assistant), about/, industries/, insights/, quality/, search/, seo/
content/        all company content as typed data (edit here, not in components)
lib/            helpers: seo, forms (zod schemas), server (mail, rate limit), chat (knowledge + model),
                service-images, hydration-gate, nav-active
public/images/  artwork and photos
docs/reference/mockups/   the approved design mockups
```

## Updating content

Everything the company says about itself lives in `content/`. Edit the data, not the components.

- **Contact details and social links — `content/site.ts`.** Every value starts empty and appears on the site only when filled:
  office address, phone, email, hours and map link (`contact.offices`), company phone and emails, WhatsApp, and the six social
  profile URLs. The footer, Contact page, About office cards and the assistant all read from this file. The green header button
  always shows and links to `/contact` until a WhatsApp number is set; the footer icon appears once it is.
- **Projects — `content/projects.ts`.** The 37 projects from the company profile (name, place, client, consultant, contractors,
  and the picture in `public/images/projects/real/`). A project has a sector only when its name says what kind of building it
  is; the others appear under "More Projects". Nothing else is stated about a project (no scope, dates or values). The sitemap,
  search, assistant and structured data all read this one list. The home page Featured Projects cards use their own stock photos
  (`featuredGallery` in `content/home.ts`), labelled "Illustrative imagery".
- **Clients — `content/clients.ts`.** An entry shows only with `verified: true` and a logo file in `public/images/clients/`.
  With no verified clients the whole homepage section is hidden.
- **Services — `content/services.ts` and `content/service-pages.ts`** (card line, intro, what is included, applications).
  Photos: save `public/images/services/<slug>/<role>.jpg` with roles `card`, `hero`, `included`, `app-1`, `app-2`. A file named
  like that replaces the stand-in automatically (`lib/service-images.ts`).
- **Homepage text — `content/home.ts`** (ticker lines, delivery steps, FAQ).
- **Blog — `content/insights.ts`, `content/articles.ts`, `content/articles-company.ts`.** Each post gets a photo chosen from its
  service (`lib/blog-image.ts`).
- **Team page — `content/team.ts`.** Set `showTeamPage = true` and add people (name, role, photo). Until then the page returns
  404, is not in the sitemap and has no links.
- **Other pages:** mission, values and capabilities in `content/about.ts` and `content/dummy.ts`; quality in `content/quality.ts`;
  industries in `content/industries.ts`; careers in `content/careers.ts`; privacy policy in `content/legal.ts`.
- **Logo.** The official PNG from https://umss.pk at `public/brand/ums-logo-official.png`, used through
  `components/layout/Logo.tsx` (header, footer, chat, FAQ, Services intro), `app/icon.png` / `app/favicon.ico` (cut from its gear)
  and `app/opengraph-image.tsx`. Never redraw it; to change it, replace the file.

### The hero building

- **Highlight chips** (`components/home/HeroStage.tsx`): the six chips under the hero highlight a system inside the building. The
  overlays are pre-cut transparent PNGs in `public/images/hero/masks/` (`<service>.png` for the desktop artwork,
  `<service>-mobile.png` for the mobile artwork), cut by colour from the two hero images.
- **Living effects** (`components/home/HeroFx.tsx`): light flowing through each system (HVAC 8s, plumbing 6s, fire 6s, electrical
  4s, MEP 5s), pulsing purple junction nodes, fountain droplets, faint rooftop glints and a slow float. Positions are percentages
  in `content/hero-fx.ts` (separate sets for desktop and mobile). Effects start after the page has loaded, pause off-screen and
  in hidden tabs, and are off with reduced motion.
- **If the hero artwork is replaced,** re-cut the masks and re-detect the node positions.

### The services ticker

`components/home/ServicesTicker.tsx` is a continuous loop of the six service cards (about 40 seconds a loop, `LOOP_S`). It pauses
on hover, keyboard focus, off-screen and with the pause button; a touch drag takes over and the loop resumes 3 seconds later; with
reduced motion it is a plain scrollable row. Card text and pictures: `sliderTitle`, `sliderLine` and `sliderArt` in `content/home.ts`.

## How the Home page stays fast

The goal is that the headline and hero picture paint without waiting for JavaScript, and that little script runs while the page loads.

- **Server-rendered header.** The header, nav and both dropdown panels are plain server markup. `HeaderBehavior` is a tiny client
  component that renders nothing until search or the mobile menu opens; it wires the dropdowns (hover, click, keyboard), search
  (also Ctrl+K) and the mobile menu. `lib/nav-active.ts` is a small inline script that marks the current page before first paint.
- **Hydrate when needed.** Interactive sections go through `components/ui/Defer.tsx`: they hydrate when about to scroll into
  view, or on the first click, tap or key press, never on a timer. (A page change cannot finish while a section React still has
  to hydrate is held back, which is why a press also opens them.) The chat assistant loads on the first scroll, tap, mouse move or
  key press (`lib/hydration-gate.ts`).
- **Paint first.** Every hero part starts at 1% opacity, never 0. The hero image is eager with `fetchPriority=high` and correct
  `sizes`. The rotating headline word and the hero effects start after load.
- **Light bundle.** No animation library and no icon pack; per-icon SVGs only. `package.json` `browserslist` targets modern
  browsers, so Next ships no polyfills for them. Only the heading font is preloaded; Inter loads from the CSS.
- **Measure** with a production build on a spare port (`NEXT_DIST_DIR=.next-test`) and with PageSpeed Insights on the live site.
  Scores on a slow laptop run lower than on Google's servers, so compare before and after on the same machine.

## The AI assistant

A floating chat button opens a panel (`/api/chat`). Answers come only from the site's own content (`lib/chat/knowledge.ts`); it
never gives prices, timelines, certifications or contact details, and it says so and links to `/contact` or `/request-a-quote`
when it does not know. Quote questions get a button to `/request-a-quote?service=<service>`. With an API key a model writes the
answers (streamed); without one a rule-based responder answers. Limits: 30 requests per IP per 10 minutes, 500 characters per
message, nothing is logged or stored. Esc closes the panel, focus is trapped inside it, and new messages are announced.

## Forms

The quote, contact and careers forms post to `/api/rfq`, `/api/contact` and `/api/careers`. Each route checks the request origin,
caps the body size, rate-limits per IP, drops honeypot hits and validates with the same zod schemas the browser uses
(`lib/forms/schemas.ts`). The in-memory rate limiter is per server instance; on multi-instance or serverless hosting swap
`lib/server/rate-limit.ts` for a shared store.

## Quality checklist before a release

- [ ] `npm run lint`, `npx tsc --noEmit` and `NEXT_DIST_DIR=.next-test npm run build` all pass
- [ ] Link crawl: zero 404s
- [ ] No horizontal overflow at 360, 390, 768, 1024, 1440 and 1920 px
- [ ] Header dropdowns, mobile menu, search, assistant (open, quick reply, Esc) and form validation work
- [ ] Home Lighthouse mobile: Performance, Accessibility ≥ 95, CLS under 0.05, compared with the previous release
- [ ] Hero and key sections compared with the mockups at 1440 and 390 px
- [ ] `CONTENT_TO_VERIFY.md` is up to date; no client-confidential file is staged

## Git workflow and releases

Work on `main`, pull with rebase before each push, and commit after every logical piece once lint, type check and build pass
(Conventional Commits: `feat`, `fix`, `docs`, `refactor`, `perf`, `chore`). Never force-push, never move a published tag. No AI
or tool attribution in commits, tags or files. Releases are tagged `vX.Y.Z` (latest: `v1.3.2`); the original build phases are
tagged `final-phase-F1` to `final-phase-F6`.

## Troubleshooting

- **Internal Server Error in dev, or "Parsing ecmascript source code failed" in `node_modules`:** the install is corrupted. Delete
  `node_modules` and run `npm install` again.
- **Stale pages or odd `ENOENT` errors under `.next`:** stop the dev server, delete `.next` and start again.
- **Builds fail at random while a dev server runs:** they share `.next`. Build into `.next-test` as shown above.
- **Never run two dev servers in the same folder**, and check that port 3000 is free first.
- **A section looks static for a moment after load:** by design, it hydrates when it nears the screen or on the first press.
