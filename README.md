# UMS — Ultimate Mechanical Solutions

Corporate website frontend for UMS, a Pakistani MEP contractor (HVAC, fire fighting, electrical & ELV,
plumbing, integrated MEP, pools & fountains) with offices in Islamabad and Lahore.

`PROJECT_SPEC.md` (the Visual Overhaul spec) is the single source of truth for design, content rules and the
build phases. `CONTENT_TO_VERIFY.md` lists every company fact in the repo that the owner has not yet confirmed;
nothing on it may be presented as fact until it is verified.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · GSAP + ScrollTrigger · Motion
(Framer Motion) · Lenis · lucide-react · react-hook-form + zod · Fuse.js · ESLint + Prettier

(`three`, `@react-three/*` and `flubber` are still installed but unused; they are removed in the cleanup phase.)

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
| `npx tsc --noEmit` | Type check              |

## Folder structure

```
app/          routes (App Router); app/dev/ui and app/dev/shapes are internal showcases (to be removed)
components/   ui/ primitives, home/ hero and homepage sections, layout/ shell, shapes/ legacy shape library
lib/motion/   GSAP + ScrollTrigger registration, Lenis store, reduced-motion hooks
content/      typed company content — edit here, not in components
lib/          utilities
types/        shared TypeScript types
public/       static assets
```

All company content lives in `content/`. Many values in `content/dummy.ts` are unverified placeholders and are being
removed section by section as the pages are rebuilt; see `CONTENT_TO_VERIFY.md`.

## Git workflow

- Work directly on `main`: pull first, then commit and push after every logical piece of work once lint,
  typecheck and build pass. Never force-push; run `git pull --rebase origin main` before each push.
- Commits follow Conventional Commits: `type(scope): short imperative summary`
  (types: feat, fix, style, refactor, perf, docs, chore, test).
- Before each push run lint, typecheck and a build (`NEXT_DIST_DIR=.next-test npm run build`).
- The end of each phase is tagged `overhaul-phase-X` and pushed with `--follow-tags`.

## Forms and email

The quote, contact and careers forms post to `/api/rfq`, `/api/contact` and `/api/careers`. Each route checks the
request origin, caps the body size, rate-limits per IP (in memory, so per server instance), drops honeypot hits,
and validates with the same zod schemas the browser uses (`lib/forms/schemas.ts`).

- Email is sent with Resend when `RESEND_API_KEY`, `MAIL_FROM` and the recipient are set (see `.env.example`).
  In development, if they are missing the message is printed to the server console. In production, missing
  configuration makes the form return an error asking the visitor to contact UMS directly; it never reports a
  fake success.
- On multi-instance or serverless hosting, replace the in-memory rate limiter in `lib/server/rate-limit.ts`
  with a shared store.
- `NEXT_PUBLIC_ENABLE_UPLOADS=true` turns on BOQ/drawing uploads (rebuild required).

## Troubleshooting

- **Plain "Internal Server Error" in dev, or a `Parsing ecmascript source code failed` error pointing into
  `node_modules`** — the install is corrupted (e.g. an interrupted `npm install` left a truncated file).
  Delete `node_modules/next` (or all of `node_modules`) and run `npm install` again.
- **Odd `ENOENT` errors under `.next`, stale pages, or changes not appearing** — the build cache is stale.
  Stop the dev server, delete the `.next` folder and start again.
- **Never run two dev servers at once** (or a dev server while building) in the same folder: they fight over
  `.next`. Check that port 3000 is free before starting, and stop any server when you are done.
- **Builds fail at random while a dev server is running** (`no direct app page entry found`, `next/font/google
  queries have exactly one entry`) — the build and the dev server share `.next`. Build into a separate folder
  instead; the dev server keeps `.next`:

  ```bash
  NEXT_DIST_DIR=.next-test npm run build
  NEXT_DIST_DIR=.next-test npx next start -p 3101   # test the build on a free port
  ```

  `.next-test` is git-ignored and skipped by ESLint and TypeScript.
