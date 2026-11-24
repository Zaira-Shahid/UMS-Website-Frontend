# UMS — Replace before launch

The site ships with realistic **dummy data** so every page looks finished. Nothing in the UI is labelled
"dummy" or "to be confirmed", so this list is the only record of what is invented. Every invented fact lives in
**`content/dummy.ts`** (article bodies in `content/dummy-articles.ts`); the other `content/*.ts` files read from it.
Replace the values there and the whole site updates.

## 1. Company facts — `content/dummy.ts`
- [ ] `company`: founding year, PEC registration number, NTN
- [ ] `dummyOffices`: both office addresses, phones, emails, opening hours, map queries and coordinates
- [ ] `emails`, `whatsapp`, `social`: real mailboxes, WhatsApp number and profile URLs
- [ ] `dummyStats`: verified figures (years, projects, headcount, area, LTI record, on-time rate)
- [ ] `dummyLeadership`: real names, roles and bios (the site uses generated initials avatars, no photos)
- [ ] `dummyClients`, `dummyTestimonials`: real, approved client logos and quotes (ten fictional names today)
- [ ] `dummyCertifications`, `dummyPec`: certificates actually held, with real numbers and expiry dates
- [ ] `dummyTimeline`, `dummyMission`, `dummyValues`: real company story, mission and values
- [ ] `dummyCulture`, `dummyBenefits`, `dummyCareers`: real culture statements, benefits and open positions
- [ ] `companyProfileUrl`: replace the placeholder file `public/downloads/ums-company-profile.pdf`
- [ ] `rfqResponseTime`: the real tender-desk response promise

## 2. Projects — `dummyProjects` (12)
- [ ] The six featured names are real (Lady Reading Hospital, Buch International Hospital, Elanza Mall,
      Pakistan Cricket Board House, CGGC Head Office at Eighteen, Jazz Destiny); **every other field is invented**:
      client, contractor, consultant, UMS package, services, city, year, area, duration, team size and the
      challenge / solution / outcome text. The six other projects are entirely fictional.
- [ ] Per-project approved photography (all images are stock, see `content/images.ts`)

## 3. Content to review
- [ ] `content/quality.ts` → `umsProcedure` on each stage (invented UMS procedures, ISO claims, 0-LTI claim)
- [ ] `content/dummy-articles.ts`: six articles are invented, including author names and publish dates
- [ ] `content/services.ts`: scope checklists now state design support and maintenance for every service
- [ ] `content/legal.ts`: privacy policy text needs **legal review** before launch

## 4. Brand and imagery
- [ ] Logo file → `/public/brand/ums-logo.svg` (`content/site.ts` → `logo`; a typographic wordmark stands in)
- [ ] Approved UMS photography everywhere. All images are Unsplash stock registered in `content/images.ts`
      (`isPlaceholder: true`). Remove the Unsplash `remotePatterns` in `next.config.ts` when no longer used.
- [ ] Plant-room and pipework imagery for V2: hero render image, X-ray line drawings, looping videos (< 3MB each)

## 5. Forms — built; these make them live
- [ ] `RESEND_API_KEY` and a verified `MAIL_FROM` sender. Until both are set, submissions are printed to the
      server console instead of emailed.
- [ ] Recipient addresses `RFQ_TO_EMAIL`, `CONTACT_TO_EMAIL`, `CAREERS_TO_EMAIL` (comma-separate for several)

## 6. Infrastructure (later phases)
- [ ] Production domain and `NEXT_PUBLIC_SITE_URL`
- [ ] Deployment (Vercel), analytics and cookie notice if required
