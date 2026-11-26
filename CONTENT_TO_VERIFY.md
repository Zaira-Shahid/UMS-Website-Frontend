# Client checklist — what UMS still has to supply or approve

The site is built and live. Nothing below is shown as fact until you confirm it. Tick each item as it is done and send the
details to the developer, or edit the named file yourself. (Last updated: final QA, v1.0.0.)

> **Top item: WhatsApp number.** The header WhatsApp button is shown, but with no number set it links to the Contact page.
> Add `contact.whatsapp` in `content/site.ts` (international format, e.g. +92…) and it opens WhatsApp chat instead.

## 1. Company contact details (`content/site.ts`, the `contact` object)

All of these are empty today and appear on the site only once filled.

- [x] **Islamabad and Lahore offices:** the street addresses, the phone number (0333) 1811113 and the emails (info@umss.pk for
      both, plus ums.isb@gmail.com for Islamabad) were taken from the company's website https://umss.pk ("Get in Touch").
      Please confirm they are still current
- [ ] **Both offices:** opening hours and a map link (Google Maps "share" link)
- [ ] **Company phone and emails:** `phone`, `email.general`, `email.tenders`, `email.careers`
- [ ] **WhatsApp number** in international format (shows the green header button and footer icon)
- [ ] **Social profiles:** LinkedIn, Facebook, Instagram, YouTube, X, TikTok (each icon appears when its URL is set)
- [ ] **Domain:** set `NEXT_PUBLIC_SITE_URL` to the real address (default `https://umss.pk`)

## 2. Email for the forms (Vercel environment variables)

- [ ] `RESEND_API_KEY` and `MAIL_FROM` (a sender verified in Resend)
- [ ] `RFQ_TO_EMAIL`, `CONTACT_TO_EMAIL`, `CAREERS_TO_EMAIL`: who receives each form
- [ ] Decide on BOQ/drawing uploads (`NEXT_PUBLIC_ENABLE_UPLOADS=true`)

Until these are set, the forms tell visitors to contact UMS directly instead of pretending to send.

## 3. Optional: smarter chatbot

- [ ] Add `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` to let a model write the answers. Without one, a rule-based assistant answers
  from the site's content. Approve the wording of its replies for prices, certifications and "I don't know"
  (`lib/chat/knowledge.ts`).

## 4. Projects (`content/dummy.ts`)

Only six names are confirmed: Lady Reading Hospital, Buch International Hospital, Elanza Mall, Pakistan Cricket Board House,
CGGC Head Office at Eighteen, Jazz Destiny.

- [ ] Confirm Buch International Hospital (Multan) and Lady Reading Hospital (Peshawar) are Healthcare
- [ ] For the other four: sector and city, UMS's role, and approved photographs
- [ ] **Real project photos wanted:** the Featured Projects cards and the Projects pages show sharp architectural stock photos labelled
      "Illustrative imagery" (cut from the stock photos credited in `content/images.ts`). Send two or three high-resolution photos
      (at least 1200 px wide, with permission to publish) of each real project, starting with Buch International Hospital and Lady
      Reading Hospital, and they will replace the stock photos and crossfade on the cards
- [ ] **Sample projects:** the Projects page also shows 12 sample projects (Specialist Hospital, Medical Centre, and so on) so the
      page looks like the approved design. They are labelled "Illustrative", are not UMS work, and are kept out of the sitemap,
      search and chat. Set `showIllustrativeProjects = false` in `content/projects.ts` to hide all of them, or replace them
      with real projects (name, sector, services, photo) as they are confirmed.
- [ ] Project detail pages show "Project details will be published soon." for real projects. Send the overview, scope (services),
      sector, city and photos for each real project to publish its Overview, Services Delivered and gallery
- [ ] The sample photos were cropped from the approved mockup and are small (about 300px wide); real photos will be sharper
- [ ] Projects page banner photo (`public/images/projects/projects-banner.jpg`): stock photo by Declan Sun (Unsplash). Replace it
      with a UMS project photo

## 5. Clients and partners (`content/clients.ts`)

- [ ] Confirm the client relationship for BNP, Venture Engineering, Banu Mukhtar, Mecatech and Gold Roof, and supply their
  logo files. The homepage section stays hidden until at least one is verified.

## 6. Team page (`content/team.ts`)

- [ ] Real names, roles and photos, then switch `showTeamPage` on. The page and its links are hidden until then.
- [ ] Confirm the project-control roles shown in its chart (Site Engineering, QA/QC, HSE, Drafting, Site Delivery)

## 7. Photographs and artwork (`public/images/`)

The Services and circle photos are crops of the approved mockups (about 460 px wide), so they are shown small and soft.

- [ ] Confirm UMS may use the mockup crops (their original photographers are unknown)
- [ ] High-resolution replacements: save as `public/images/services/<slug>/<role>.jpg` (`card`, `hero`, `included`,
  `app-1`, `app-2`); `public/images/projects/circles/circle-1..3.jpg`
- [ ] The five services other than Integrated MEP still need `hero`, `included`, `app-1`, `app-2` (suggestions: HVAC air
  handling unit and ductwork, hospital and hotel exteriors; Fire Fighting sprinkler pipework or pump room; Plumbing water
  pipework; Electrical LT panels and cable trays; Pools fountain pool). No visible brand names or logos.
- [ ] Industry pages and some "What's Included" and application cards use free-licence Unsplash stand-in photos (credits in
  `content/images.ts`). Replace with UMS photography when available.
- [ ] High-resolution versions of the pack artwork: hero building (desktop and mobile), `services/hvac.png`,
  `services/fire-fighting.png`, `delivery/01 to 05`, `sections/*`. The mobile hero has a faint top edge; the
  `wireframe-building-projects.png` has a small artefact at its bottom-left.
- [ ] Artwork missing for Plumbing, Electrical & ELV, Integrated MEP and Pools & Fountains in the homepage services slider
  (a large icon tile is shown instead)
- [ ] **Hero artwork:** the "click a chip to highlight a system" overlays were cut from the current hero images by colour. If you
      supply new or higher-resolution hero artwork, tell the developer so the overlays can be cut again
- [ ] **Services ticker pictures:** only HVAC and Fire Fighting have an illustration; the other four show their icon in the same
      picture frame until artwork is supplied
- [ ] **Official logo (vector):** the site uses the official PNG that is on https://umss.pk (`img/logo.png`, 668 x 203, now at
      `public/brand/ums-logo-official.png`). Send the original SVG or a larger PNG if one exists, so it stays sharp on large screens
- [ ] Confirm the brand colours: blue `#1BA6E8` (used for accents and large headings; buttons and small text use a deeper
  `#0A78B5` so they pass accessibility contrast) and the navy values sampled from the mockups

## 8. Wording to approve

- [ ] Homepage: services slider lines (`content/home.ts`), FAQ answers, "How We Deliver" lines, the Credentials &
  Milestones lines (`components/home/Credentials.tsx`, general wording; replace with real credentials when available)
- [ ] CTA band sentence (`components/layout/CTABand.tsx`)
- [ ] About, Mission & Vision, Values, Capabilities (`content/about.ts`, `content/dummy.ts`)
- [ ] Quality, Safety & Delivery (`content/quality.ts`)
- [ ] Services and industries copy (`content/services.ts`, `content/service-pages.ts`, `content/industries.ts`): confirm all six
  disciplines are real UMS offerings
- [ ] Insights articles are general technical pieces attributed to "UMS Engineering Team", with no dates
- [ ] **Privacy policy** (`content/legal.ts`): neutral template; needs a legal review
- [ ] Careers: add real openings in `content/careers.ts` (none are shown)

## 9. Facts from the mockups that are NOT on the site

These appear in the design mockups but are unverified, so they are not used until you confirm them:

- "Islamabad-based" and "operating since 2009"
- The street addresses (Abdullah Plaza, Ghouri Garden; MI Tower Phase 1, Khayaban-e-Jinnah Road)
- Phone, emails and WhatsApp on the Contact mockup, and the map picture
- The Credentials sentences ("We maintain the essential professional qualifications...")
- The people shown as UMS staff on the Capabilities mockup
- The mockup's own mission, vision and six values (Trust, Honesty, Integrity, Hard Work, Excellence, Transparency): the
  site uses the general wording in `content/dummy.ts` instead
- "across commercial, residential and industrial sectors" on the projects band (the site says "by sector")
