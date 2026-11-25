# Content to verify

Everything the owner still has to supply, confirm or replace before launch. Nothing below is shown as fact on the
site until it is confirmed. Updated at the end of each phase (last update: Phase F1).

## 1. Contact details (one file: `content/site.ts`, the `contact` object)

All values are empty. A field renders only when it has a value; the WhatsApp button in the header and every social
icon in the footer stay hidden until filled.

| Field | What to supply |
| --- | --- |
| `offices[Islamabad]` / `offices[Lahore]`: `address`, `phone`, `email`, `hours`, `mapUrl` | Street address (one line), phone, office email, hours, map link. The footer shows "Head Office Location" and "Get Directions" only when the Islamabad address or map link is set |
| `phone`, `email.general`, `email.tenders`, `email.careers` | Company-wide numbers and mailboxes |
| `whatsapp` | International format, e.g. `+92 3xx xxxxxxx`. Shows the green WhatsApp button (header, mobile header) and the footer icon |
| `social.linkedin / facebook / instagram / youtube / x / tiktok` | Full profile URLs. Each footer icon appears only when its URL is set |
| `companyProfileUrl` | A real company-profile PDF (reserved; no button until a file exists) |
| `NEXT_PUBLIC_SITE_URL` | The real domain (defaults to `https://umss.pk`) |

Forms deliver mail only when `RESEND_API_KEY`, `MAIL_FROM`, `RFQ_TO_EMAIL`, `CONTACT_TO_EMAIL` and
`CAREERS_TO_EMAIL` are set; otherwise the forms answer with an honest error in production.

## 2. Brand and artwork

- **Official logo SVG.** The header and footer use a logo rebuilt as an SVG from the mockup (gear, speed lines, italic
  "UMS" in Montserrat). Replace it with the official artwork (`components/layout/Logo.tsx`). The low-resolution
  `public/images/brand/ums-logo-from-mockup.png` is not used.
- **High-resolution replacements needed** for the crops in `public/images/` (all are low resolution):
  `hero/hero-building-desktop.png`, `hero/hero-building-mobile.png`, `services/hvac.png`, `services/fire-fighting.png`,
  `delivery/01 to 05`, `projects/illustrative-hospital-1.png`, `projects/illustrative-hospital-2.png`,
  `sections/*` (five files) and `sections/footer-building.png` (used now).
- **Known flaws in the supplied crops:** `hero/hero-building-mobile.png` has a stray blue bar cropped in at its
  top-left; `projects/illustrative-hospital-2.png` is only about 256 x 145 px; `sections/wireframe-building-projects.png`
  has a small stray artefact at its bottom-left. Please supply clean files.
- **Missing illustrations:** Plumbing, Electrical & ELV, Integrated MEP and Pools & Fountains have no artwork yet.
  The services slider shows a large service icon tile for them until artwork is supplied (`content/home.ts`, `sliderArt`).
- **Featured Projects:** the two hospital pictures are low resolution, so they are shown at about their natural size
  on the right of each card and look soft. The Commercial & Retail, Residential and Institutional tabs show an
  empty-state line because no project has a confirmed sector yet (set `sector` and `city` in `content/dummy.ts`).
- **Slider and delivery copy:** the one-line descriptions in the services slider (`content/home.ts`, `sliderLine`) are
  general wording written for the site, not taken from the mockup. Please approve or replace them.
- **Colours.** The spec's navy values were adjusted to the values sampled from the mockups: footer `#032139`, hero
  and dark sections `#03294a`. The bright blue `#1BA6E8` is kept as specified; white text on it is about 2.9:1, so
  buttons use bold, 16px or larger text. Confirm the brand blue and navy.

## 2b. Services page photographs (Section 13.3)

**Source: the owner's own approved mockups.** The photos in `public/images/services/<slug>/card.jpg` (all six),
`public/images/services/integrated-mep/{hero,included,app-1,app-2}.jpg` and `public/images/projects/circles/circle-1..3.jpg`
are crops of mockups 10 and 11, so they are only about 460 px wide (the hero is 948 px). They are shown at no more than
their natural width (never upscaled), so the Services pages are laid out in a narrow column. They are not licensed
stock photos and their original photographers are unknown; please confirm UMS may use them. **High-resolution
replacements are still wanted.** Save a larger file under the same name (`<role>.jpg`) and it takes over.

Where a service has no `hero`, `included` or `app-*` file yet:
- the hero reuses that service's `card.jpg` at its natural size;
- "What's Included" shows the list without a photo for HVAC and Fire Fighting (no photo that fits), and a stand-in
  Unsplash photo that fits the service for Plumbing (plant-room pump and valves), Electrical (breaker) and Pools (fountain
  pool); Integrated MEP has its own;
- the two application cards use stand-in Unsplash building exteriors labelled "Illustrative previews".

Still needed for the five services other than Integrated MEP: `hero`, `included`, `app-1`, `app-2`. Suggested
subjects: HVAC (air handling unit, ductwork; hospital and hotel exteriors), Fire Fighting (sprinkler pipework or fire
pump room; commercial and residential tower exteriors), Plumbing (water pipework and valves; residential and school
exteriors), Electrical & ELV (LT panels, cable trays; commercial and industrial exteriors), Pools & Fountains (pool with
fountain; hotel and residential exteriors). No visible brand names or logos.

Stock photos that are still used (Unsplash, free licence; credits are in `content/images.ts`): the industry pages, and
the application cards and plumbing, electrical and pools "included" photos described above.

## 3. Projects

Only the six project names are confirmed: Lady Reading Hospital, Buch International Hospital, Elanza Mall, Pakistan
Cricket Board House, CGGC Head Office at Eighteen, Jazz Destiny. The spec states Buch International Hospital is in
Multan and Lady Reading Hospital in Peshawar (both Healthcare). Please confirm those and supply sector and city for
the others, UMS's role, and approved photographs. The two "Illustrative imagery" pictures are not real project photos.

## 4. Clients and partners (Phase F3)

`content/clients.ts` will list BNP, Venture Engineering, Banu Mukhtar, Mecatech and Gold Roof as `verified: false` with
no logo files. Confirm each client relationship and supply the logo files; the section stays hidden until at least one
entry is verified.

## 5. Wording the owner must approve

- Homepage Credentials & Milestones (`components/home/Credentials.tsx`): the three lines are general wording written
  for the site ("Qualifications and approvals relevant to your project are confirmed on request", milestones planned
  and tracked, quality and safety practices built into delivery). The mockup's own sentences were not used because
  they state facts that are not verified. Approve, or supply real credentials and a credentials page.
- Homepage FAQ answers (`content/home.ts`, `homeFaqs`) describe how the site works only. Approve or edit.
- Enquiry band (`components/layout/CTABand.tsx`): "Tell us about your requirements and explore the right MEP
  engineering solution with UMS." is the mockup's sentence. Approve.

- Mission, vision and values (`content/dummy.ts`, shown on `/about/mission-values`).
- Quality, Safety & Delivery (`content/quality.ts`): general descriptions only.
- Service and industry copy (`content/services.ts`, `content/industries.ts`): confirm all six disciplines are real
  UMS offerings. The service "How it works" diagrams are generic illustrations, not UMS projects.
- Insights articles (`content/articles.ts`): general technical articles, third person, attributed only to
  "UMS Engineering Team", no dates. Confirm UMS is happy to publish them under that name.
- Privacy policy (`content/legal.ts`): neutral template. The retention, rights and security statements need the
  owner's confirmation and a legal review.
- Careers: no listings are shown; add real roles in `content/careers.ts`.

## 5b. AI assistant (Phase F4)

The assistant answers only from the site's own content (`lib/chat/knowledge.ts`): services and what each includes,
industries, delivery steps, FAQs, the six project names (with sector and city only where confirmed) and the site's
pages. It never gives prices, timelines, certifications or contact details. Offices are described only as "Islamabad
and Lahore" until addresses, phones and emails are filled in `content/site.ts`; once they are, it will quote them.
With no API key it uses a rule-based responder; set `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` (see `.env.example`) to
have a model write the answers (still restricted to the same content). Please approve the wording of the greeting and
of the replies for pricing, certifications and "I don't know".

## 6. Statements in the supplied mockups that are NOT used

The mockups contain wording and details that are not verified, so they are not on the site: the Credentials section
text ("We maintain the essential professional qualifications..."), "operating since 2009", the street addresses,
phone numbers and email addresses on the contact mockup, "WhatsApp: To be confirmed", and the people shown as UMS
staff. Supply real facts and they can be used.
