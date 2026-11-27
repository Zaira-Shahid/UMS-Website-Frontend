# UMS — Ultimate Mechanical Solutions

Corporate website for UMS, an MEP contractor for complex buildings (HVAC, fire fighting, electrical and ELV, plumbing,
integrated MEP, pools and fountains) with offices in Islamabad and Lahore.

- **Design source of truth:** `PROJECT_SPEC.md`, with the approved mockups in `docs/reference/mockups/` (01 to 20; mockup 21, the project detail page, is described in `PROJECT_SPEC.md` 14.6).
  Section 12 applies throughout: match the mockups, keep it simple, neat and clean.
- **Content rule:** nothing about the company is shown as fact until the owner has confirmed it.
  `CONTENT_TO_VERIFY.md` is the checklist of what the client still has to supply or approve.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · lucide-react · react-hook-form + zod ·
Fuse.js (search) · class-variance-authority · ESLint. Fonts: Barlow Semi Condensed (headings) and Inter (body) through `next/font`.
Deployed on Vercel from `main`.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in what you need (see below)
npm run dev                  # http://localhost:3000
```

## Scripts

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

## Environment variables (`.env.example`)

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The real domain, used for canonical URLs, the sitemap and structured data (default `https://umss.pk`) |
| `RESEND_API_KEY`, `MAIL_FROM` | Resend API key and a verified sender, for the forms' email |
| `RFQ_TO_EMAIL`, `CONTACT_TO_EMAIL`, `CAREERS_TO_EMAIL` | Who receives each form (comma-separated for several people) |
| `NEXT_PUBLIC_ENABLE_UPLOADS` | `true` turns on BOQ and drawing uploads on the quote form (rebuild after changing) |
| `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` | Optional. Lets a model write the chatbot's answers (still limited to the site's own content). Without a key, a rule-based responder answers |
| `CHAT_MODEL` | Optional model override |

Without the mail variables the forms do not pretend to succeed: in production they answer with an honest error asking the
visitor to contact UMS directly (HTTP 503); in development the message is printed to the server console.

## Where things live

```
app/            routes (App Router), sitemap.ts, robots.ts, opengraph-image.tsx, api/ (rfq, contact, careers, chat)
components/     ui/ (buttons, cards, titles, icons), home/, layout/ (header, footer, menus), services/, projects/,
                forms/, chat/ (assistant), about/, industries/, insights/, quality/, search/
content/        all company content as typed data (edit here, not in components)
lib/            helpers: seo, forms (zod schemas), server (mail, rate limit), chat (knowledge + model), service-images
public/images/  artwork and photos
docs/reference/mockups/   the approved design mockups
```

## Updating content

- **Contact details and social links:** `content/site.ts`. Every value starts empty and appears on the site only when
  filled: office address, phone, email, hours and map link (`contact.offices`), company phone and emails, WhatsApp
  (the green header button is always shown and links to `/contact` until a number is set; the footer icon appears once set), and the six social profile URLs. The footer, Contact page, About
  office cards and the chatbot all read from this file.
- **Projects:** `content/projects.ts` lists the 37 projects from the company profile (name, place, client, consultant,
  contractors, and the picture in `public/images/projects/real/`). A project has a sector only when its name says what kind
  of building it is; the others appear under "More Projects". Nothing else is stated about a project (no scope, dates or
  values). The sitemap, search, chat and structured data all read this one list. The home page Featured Projects cards use
  their own stock photos (`featuredGallery` in `content/home.ts`), labelled "Illustrative imagery".
- **Hero building highlight:** the six chips under the hero highlight a system inside the building (`components/home/HeroStage.tsx`).
  The overlays are pre-cut transparent PNGs in `public/images/hero/masks/` (`<service>.png` for the desktop artwork and
  `<service>-mobile.png` for the mobile artwork), cut by colour from the two hero images. If the hero artwork is replaced, the
  masks must be cut again from the new artwork.
- **Living hero building:** `components/home/HeroFx.tsx` adds light flowing through each system (HVAC 8s, plumbing 6s, fire 6s,
  electrical 4s, MEP 5s), pulsing purple junction nodes, fountain droplets, faint rooftop glints and a slow float. Positions
  are percentages in `content/hero-fx.ts` (separate sets for the desktop and mobile artwork); the shapes reuse the masks in
  `public/images/hero/masks/`. Effects start after the page has loaded, pause off-screen and in hidden tabs, and are off with
  reduced motion. If the hero artwork changes, re-cut the masks and re-detect the node positions.
- **Services ticker:** `components/home/ServicesTicker.tsx` is a continuous loop of the six service cards (about 40 seconds a loop,
  `LOOP_S`). It pauses on hover, keyboard focus, off-screen and with the pause button; a touch drag takes over and the loop resumes
  3 seconds later; with reduced motion it is a plain scrollable row. Card text and pictures: `sliderTitle`, `sliderLine` and
  `sliderArt` in `content/home.ts`.
- **Clients:** `content/clients.ts`. An entry shows only with `verified: true` and a logo file in `public/images/clients/`.
  With no verified clients the whole homepage section is hidden.
- **Team page:** `content/team.ts`. Set `showTeamPage = true` and add people (name, role, photo). Until then the page
  returns 404, is not in the sitemap and has no links.
- **Services:** copy in `content/services.ts` and `content/service-pages.ts` (card line, intro, what is included,
  applications). Photos: save `public/images/services/<slug>/<role>.jpg`, with roles `card`, `hero`, `included`,
  `app-1`, `app-2`. A file named like that replaces the stand-in automatically (`lib/service-images.ts`).
- **Mission, values, capabilities:** `content/about.ts` and `content/dummy.ts`. **Quality page:** `content/quality.ts`.
  **Industries:** `content/industries.ts`. **Insights:** `content/insights.ts` and `content/articles.ts`.
  **Careers:** `content/careers.ts`. **Privacy policy:** `content/legal.ts`.
- **Homepage text:** `content/home.ts` (slider lines, delivery steps, FAQ).
- **Logo:** the official PNG from https://umss.pk at `public/brand/ums-logo-official.png`, used through `components/layout/Logo.tsx`
  (header, footer, chat, FAQ, Services intro), `app/icon.png` / `app/favicon.ico` (cut from its gear) and `app/opengraph-image.tsx`.
  Never redraw it; to change it, replace the file.

## The assistant (`/api/chat`)

A floating chat button opens a panel. Answers come only from the site's own content (`lib/chat/knowledge.ts`); it never
gives prices, timelines, certifications or contact details, and it says so and links to `/contact` or `/request-a-quote`
when it does not know. Quote questions get a button to `/request-a-quote?service=<service>`. Limits: 30 requests per IP
per 10 minutes, 500 characters per message, nothing is logged or stored.

## Forms

The quote, contact and careers forms post to `/api/rfq`, `/api/contact` and `/api/careers`. Each route checks the
request origin, caps the body size, rate-limits per IP, drops honeypot hits and validates with the same zod schemas
the browser uses (`lib/forms/schemas.ts`). The in-memory rate limiter is per server instance; on multi-instance or
serverless hosting swap `lib/server/rate-limit.ts` for a shared store.

## Git workflow

Work on `main`, pull with rebase before each push, and commit after every logical piece once lint, type check and
build pass (Conventional Commits: `feat`, `fix`, `docs`, `refactor`, `perf`, `chore`). Never force-push. Phases are
tagged `final-phase-F1` to `final-phase-F6`; the release is `v1.0.0`.

## Troubleshooting

- **Internal Server Error in dev, or "Parsing ecmascript source code failed" in `node_modules`:** the install is
  corrupted. Delete `node_modules` and run `npm install` again.
- **Stale pages or odd `ENOENT` errors under `.next`:** stop the dev server, delete `.next` and start again.
- **Builds fail at random while a dev server runs:** they share `.next`. Build into `.next-test` as shown above.
- **Never run two dev servers in the same folder**, and check that port 3000 is free first.

## Performance notes (Home page)

- The header, its dropdown panels and the footer are server-rendered. `HeaderBehavior` (a client component that renders nothing until search or the mobile menu opens) wires the dropdowns, search and mobile menu; `lib/nav-active.ts` is a tiny inline script that marks the current page before first paint.
- Interactive sections hydrate through `components/ui/Defer.tsx`: when they are about to scroll into view, or on the first click, tap or key press (never on a timer). The chat assistant loads on the first scroll, tap, mouse move or key press.
- Every hero part starts at 1% opacity, never 0. Only the heading font (Barlow Semi Condensed) is preloaded; Inter loads from the CSS. `package.json` `browserslist` targets modern browsers so Next ships no polyfills for them.
- Measure with a production build on a spare port (`NEXT_DIST_DIR=.next-test`), plus PageSpeed Insights on the live site.
