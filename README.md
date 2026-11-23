# UMS — Ultimate Mechanical Solutions

Corporate website frontend for UMS, a Pakistani MEP contractor (HVAC, fire fighting, electrical & ELV,
plumbing, integrated MEP, pools & fountains) with offices in Islamabad and Lahore.

`PROJECT_SPEC.md` is the single source of truth for design, routes, content rules and the build phases.
`TODO.md` lists every item that needs confirmation from UMS.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Motion (Framer Motion) ·
Lenis · lucide-react · react-hook-form + zod · Fuse.js · ESLint + Prettier

## Setup

```bash
npm install
cp .env.example .env.local   # fill in values when needed
npm run dev                  # http://localhost:3000
```

## Scripts

| Script          | Purpose                    |
| --------------- | -------------------------- |
| `npm run dev`   | Development server         |
| `npm run build` | Production build           |
| `npm run start` | Serve the production build |
| `npm run lint`  | ESLint                     |

## Folder structure

```
app/          routes (App Router); app/dev/ui is an internal primitives showcase
components/   ui/ primitives, layout/ shell (more per section in later phases)
content/      typed company content — edit here, not in components
lib/          utilities
types/        shared TypeScript types
public/       static assets
```

All company content lives in `content/`. Anything UMS has not confirmed is a placeholder — see `TODO.md`.

## Git workflow

- `main` holds stable, reviewed code only. Never commit directly to it.
- Work happens on `feature/ums-website`; changes reach `main` through a reviewed pull request.
- Commits follow Conventional Commits: `type(scope): short imperative summary`
  (types: feat, fix, style, refactor, perf, docs, chore, test).
- Every phase ends with build + lint → commits → `phase-N` tag → push → review.

Full rules: `PROJECT_SPEC.md` §13.

## Forms and email

The quote, contact and careers forms post to `/api/rfq`, `/api/contact` and `/api/careers`. Each route checks the
request origin, caps the body size, rate-limits per IP (in memory, so per server instance), drops honeypot hits,
and validates with the same zod schemas the browser uses (`lib/forms/schemas.ts`).

- Email is sent with Resend when `RESEND_API_KEY`, `MAIL_FROM` and the recipient are set (see `.env.example`).
  Otherwise the message is printed to the server console, so nothing is lost in development.
- On multi-instance or serverless hosting, replace the in-memory rate limiter in `lib/server/rate-limit.ts`
  with a shared store.
- `NEXT_PUBLIC_ENABLE_UPLOADS=true` turns on BOQ/drawing uploads (rebuild required).

## Troubleshooting

- **Plain "Internal Server Error" in dev, or a `Parsing ecmascript source code failed` error pointing into
  `node_modules`** — the install is corrupted (e.g. an interrupted `npm install` left a truncated file).
  Delete `node_modules/next` (or all of `node_modules`) and run `npm install` again.
- **Odd `ENOENT` errors under `.next`, stale pages, or changes not appearing** — the build cache is stale.
  Stop the dev server, delete the `.next` folder and start again.
- **Never run two dev servers at once** (or a dev server while building) in the same folder — they fight over
  `.next`. Check that port 3000 is free before starting, and stop any server when you are done.
