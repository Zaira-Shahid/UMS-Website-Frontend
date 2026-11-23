# UMS — Client-dependent TODO

Nothing below may be invented. Each item stays a visible placeholder (or is hidden) until UMS supplies it.

## Brand
- [ ] Logo file → `/public/brand/ums-logo.svg` (`content/site.ts` → `logo`)
- [ ] Company profile PDF (`content/site.ts` → `companyProfileUrl`)

## Photography
- [ ] Approved UMS photography for the hero (4 slides), services, industries, projects, insights and the
      quality teaser. Every image is a **stock placeholder** from Unsplash, registered once in
      `content/images.ts` (`isPlaceholder: true`, photographer noted per entry). None depicts a UMS project.
      Replace per entry; remove the Unsplash `remotePatterns` in `next.config.ts` when no longer used.
- [ ] Photos still weak or reused (need better mechanical-plant imagery): the HVAC and Plumbing cards share
      one pump-room photo; Integrated MEP uses a concrete-soffit shot; Industrial and Fire share red pipes;
      the project cards reuse five building photos across six projects.
- [ ] Hero uses landscape crops of portrait photos — supply landscape originals (min 2400px wide).

## Company facts
- [ ] PEC registration details and any certifications (About → Credentials)
- [ ] Verified stats for the homepage band (`content/site.ts` → `stats`; unconfirmed values are `undefined`)
- [ ] Office addresses, phones, emails, map links — Islamabad and Lahore (`content/offices.ts`)
- [ ] WhatsApp number, social profile URLs (`content/site.ts`)
- [ ] Approved client / collaborator logos (homepage marquee shows 8 dashed placeholder slots,
      `clientSlots` in `content/home.ts`)
- [ ] Homepage "Quality & safety" teaser: UMS's own QA/QC and HSE procedures and certifications
      (the teaser lists topics the Quality page covers, flagged "to be confirmed")
- [ ] Homepage stats band: all four figures flagged for confirmation (`stats` in `content/site.ts`)
- [ ] Team and leadership details; mission & values wording

## Projects (`content/projects.ts`) — only the six names are confirmed
For each of: Lady Reading Hospital, Buch International Hospital, Elanza Mall, Pakistan Cricket Board House,
CGGC Head Office at Eighteen, Jazz Destiny:
- [ ] Client / developer, main contractor, consultant
- [ ] UMS role and package, services delivered
- [ ] Location, sector, status, timeline
- [ ] Approved photography
- [ ] Per-project gallery photos (each case study shows 3 stock placeholders, flagged as such)
- [ ] Challenge / Solution / Outcome write-ups — case-study pages show clearly marked placeholder blocks only
- [ ] Setting `status`, `sector`, `location` and `services` in `content/projects.ts` is what switches on the library
      filters, the Completed / Ongoing tabs and the homepage and service-page related projects (all read 0 until then)

## Services (`content/services.ts`)
- [ ] Confirm each service's UMS scope (design support / supply / installation / testing / maintenance) — unconfirmed
      items render as "to be confirmed" placeholders.
- [ ] Related projects stay empty until each project's confirmed services are set in `content/projects.ts`.
- [ ] Review the FAQ answers (general engineering guidance, not UMS commitments) and supply approved service photography
      (Plumbing currently uses a blueprint illustration).

## Careers
- [ ] Open positions (`content/careers.ts` is empty → "No openings right now" message)

## Insights
- [ ] Review the six articles (general engineering guidance, no UMS-specific claims) and confirm publish dates.

## Infrastructure (later phases)
- [ ] `RESEND_API_KEY`, recipient emails for RFQ / contact / careers (Phase 6)
- [ ] `AI_API_KEY` (optional, Phase 9)
- [ ] `NEXT_PUBLIC_SITE_URL` for production
