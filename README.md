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
