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
- **Missing illustrations:** Plumbing, Electrical & ELV, Integrated MEP and Pools & Fountains have no artwork yet
  (needed for the services slider in Phase F2).
- **Colours.** The spec's navy values were adjusted to the values sampled from the mockups: footer `#032139`, hero
  and dark sections `#03294a`. The bright blue `#1BA6E8` is kept as specified; white text on it is about 2.9:1, so
  buttons use bold, 16px or larger text. Confirm the brand blue and navy.

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

- Mission, vision and values (`content/dummy.ts`, shown on `/about/mission-values`).
- Quality, Safety & Delivery (`content/quality.ts`): general descriptions only.
- Service and industry copy (`content/services.ts`, `content/industries.ts`): confirm all six disciplines are real
  UMS offerings. The service "How it works" diagrams are generic illustrations, not UMS projects.
- Insights articles (`content/articles.ts`): general technical articles, third person, attributed only to
  "UMS Engineering Team", no dates. Confirm UMS is happy to publish them under that name.
- Privacy policy (`content/legal.ts`): neutral template. The retention, rights and security statements need the
  owner's confirmation and a legal review.
- Careers: no listings are shown; add real roles in `content/careers.ts`.

## 6. Statements in the supplied mockups that are NOT used

The mockups contain wording and details that are not verified, so they are not on the site: the Credentials section
text ("We maintain the essential professional qualifications..."), "operating since 2009", the street addresses,
phone numbers and email addresses on the contact mockup, "WhatsApp: To be confirmed", and the people shown as UMS
staff. Supply real facts and they can be used.
