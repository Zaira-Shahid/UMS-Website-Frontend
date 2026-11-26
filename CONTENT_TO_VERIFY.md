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

## 4. Projects (`content/projects.ts`)

The 37 projects, their pictures, places, clients, consultants and contractors come from the company profile (UMS Profile.pdf,
"Our Projects"). Each project's sector was set from what its name says (a hospital, a mall, apartments, an embassy, a school, a
court); six projects whose names do not say (SEE 3, BEE 3 and SEE 2 Development, Trust One Diplomatic Enclave, Grand Hyat Towers,
Jazz Destiny) are listed under "More Projects".

- [ ] **Please check the sectors** and tell the developer which to change (for example Grand Hyat Towers, Jazz Destiny, Trust One)
- [ ] **UMS's role and scope on each project** (the profile does not say which services UMS delivered): send them and each
      project page can show its scope, dates and values
- [ ] **Wording to confirm:** "Capital Builder" / "Contr. Venture Enginring" on Mall of Sargodha (shown as client "Capital Builder"
      and contractor "Venture Engineering"); "Fuji" / "Fauji Foundation" (shown as "Fauji Foundation"); Lecole School (the profile
      says "Khybabn-e Khair ud Din, Lahore" but the company website says "Johar Town, Lahore", so only "Lecole School, Lahore" is
      shown); "Grand Hyatt Towers" (the profile has "Hyat", the company website has "Hyatt")
- [ ] **Status:** the old company website (2019) lists Buch International Hospital, Pakistan Cricket Board House, Islamabad High
      Court, Rehman Medical Institute Extension (Peshawar), PAFSOM Arena Hotel and SAARC Tower as "in hand", and the others as
      "completed". That may be out of date, so no status is shown. Please say which projects are completed today
- [ ] **Projects on the company website but not in the profile:** Pepsico Snacks Green Field (Multan), United Nations High
      Commissioner for Refugees (Peshawar), World Bank IFC Building (Islamabad), PAFSOM Arena Hotel (Islamabad), Rehman Medical
      Institute Extension (Peshawar) and SAARC Tower (Islamabad). They are not on the site; send photos and details to add them
- [ ] **Phone number:** the profile's contact page says 03005360233 and www.ums.pk, while the company website says (0333) 1811113
      and umss.pk. The site uses (0333) 1811113 and umss.pk. Please confirm which phone number is right
- [ ] **Where some projects are:** the profile gives no city for SEE 3 / BEE 3 / SEE 2 Development, Gulberg Mall and Signature
      Living, Trust One, the Fauji Foundation buildings, the Garden Residencia or the Children's Heart Hospital
- [ ] **Better pictures:** the profile's pictures are small (about 270 to 330 px wide, and many are artist's renderings), so they look
      soft on large cards. Send the original photos or renderings (at least 1200 px wide) for each project
- [ ] **Home page Featured Projects cards** still use stock architecture photos labelled "Illustrative imagery", because the profile
      pictures are too small for those tall cards. Send two or three large photos of Buch International Hospital and Lady Reading
      Hospital to replace them
- [ ] Projects page banner photo (`public/images/projects/projects-banner.jpg`): stock photo by Declan Sun (Unsplash). Replace it
      with a UMS project photo
- [ ] The profile has a PEC certificate page (page 27). It was not copied onto the site; send the certificate details if it should
      appear under Credentials

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
