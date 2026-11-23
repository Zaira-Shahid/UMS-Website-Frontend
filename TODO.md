# UMS — Client-dependent TODO

Nothing below may be invented. Each item stays a visible placeholder (or is hidden) until UMS supplies it.

## Brand
- [ ] Logo file → `/public/brand/ums-logo.svg` (`content/site.ts` → `logo`)
- [ ] Company profile PDF (`content/site.ts` → `companyProfileUrl`)

## Photography
- [ ] Approved UMS photography for all services, industries, projects, insights.
      Currently every image is `/images/placeholder-blueprint.svg` via `content/images.ts`
      (`isPlaceholder: true`). Replace per item; remove Unsplash `remotePatterns` in `next.config.ts` if unused.

## Company facts
- [ ] PEC registration details and any certifications (About → Credentials)
- [ ] Verified stats for the homepage band (`content/site.ts` → `stats`; unconfirmed values are `undefined`)
- [ ] Office addresses, phones, emails, map links — Islamabad and Lahore (`content/offices.ts`)
- [ ] WhatsApp number, social profile URLs (`content/site.ts`)
- [ ] Approved client / collaborator logos
- [ ] Team and leadership details; mission & values wording

## Projects (`content/projects.ts`) — only the six names are confirmed
For each of: Lady Reading Hospital, Buch International Hospital, Elanza Mall, Pakistan Cricket Board House,
CGGC Head Office at Eighteen, Jazz Destiny:
- [ ] Client / developer, main contractor, consultant
- [ ] UMS role and package, services delivered
- [ ] Location, sector, status, timeline
- [ ] Approved photography

## Careers
- [ ] Open positions (`content/careers.ts` is empty → "No openings right now" message)

## Insights
- [ ] Review the six articles (general engineering guidance, no UMS-specific claims) and confirm publish dates.

## Infrastructure (later phases)
- [ ] `RESEND_API_KEY`, recipient emails for RFQ / contact / careers (Phase 6)
- [ ] `AI_API_KEY` (optional, Phase 9)
- [ ] `NEXT_PUBLIC_SITE_URL` for production
