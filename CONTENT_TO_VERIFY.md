# Content to verify

Audit of the content currently in the repo (Phase A of the visual overhaul). Nothing listed here has been
confirmed by UMS. Every item is treated as **unverified**: it must not be presented as fact until the owner
supplies a source. Items are only listed in this phase; each one is removed or replaced in the phase that
rebuilds the section that shows it.

Source of truth for most values: `content/dummy.ts` (its own header says "realistic but invented").
Other files read from it or add their own copy. File and line references are to the repo at `8e14d37`.

Legend for **Planned action**: *Remove* = omit from the UI until verified · *Config* = keep as a single
configurable value that renders nothing while empty · *Rewrite* = replace with factual, non-claim copy
· *Keep* = verified-by-nature (generic engineering content or the real project name only).

## Status after Phase C (read this first)

Sections 1 to 10 below are the original Phase A audit. Since then the following was **removed from the site**
(not just hidden), so it no longer appears anywhere:

- All office addresses, phone numbers, emails, opening hours, the WhatsApp number and the social profile links.
- The statistics band, the clients strip, the testimonials, the ISO/PEC badges and certification cards.
- The six fictional projects and every invented project detail (only the six confirmed names remain).
- The Team & Organization and Credentials pages (invented people, PEC and ISO numbers), the About timeline,
  and the "Founded in 2009" and PEC lines.
- The "within 48 hours" response promise, the placeholder company profile download, and the newsletter form.
- The Insights and Privacy Policy links (pages come in Phase E).

Still on the site and still unverified (rebuilt in Phase E): the Careers page (four invented job listings, culture
text and benefits such as "PEC registration support"), the Mission & Values wording, the Quality, Safety &
Delivery procedures in `content/quality.ts`, the service and industry copy, and all stock photography.

### Contact details to supply

Everything lives in one place: **`content/site.ts`, the `contact` object.** All values are empty today. Fill a value
in and it appears automatically in the footer, the Contact page and the quote page. A field that is empty renders
nothing. Until then the site shows only "Offices in Islamabad & Lahore", a "Contact us" button and a
"Request a Quote" button.

| Field in `contact` | What to supply | Shown on |
| --- | --- | --- |
| `offices[Islamabad].address` | Street address, one line | Footer, Contact, Quote page |
| `offices[Islamabad].phone` | Phone number | same |
| `offices[Islamabad].email` | Office email | same |
| `offices[Islamabad].hours` | Opening hours text | same |
| `offices[Islamabad].mapUrl` | Map link (makes the address a link) | same |
| `offices[Lahore].*` | The same five fields for Lahore | same |
| `phone` | Main phone number, if separate from the offices | Footer, Contact, Quote page |
| `whatsapp` | International format, e.g. `+92 3xx xxxxxxx` | Footer, Contact, Quote page |
| `email.general` | General enquiries mailbox | Footer, Contact, Quote page |
| `email.tenders` | Tender desk mailbox | Footer, Contact, Quote page |
| `email.careers` | Careers mailbox (not displayed yet) | reserved |
| `social.linkedin / facebook / instagram / youtube` | Full profile URLs | Footer icons (each appears only when set) |
| `companyProfileUrl` | Path or URL of a real company profile PDF | reserved (no button until a file exists) |

Separate from the display fields above, the **forms deliver mail** through environment variables (see
`.env.example`): `RESEND_API_KEY`, `MAIL_FROM`, `RFQ_TO_EMAIL`, `CONTACT_TO_EMAIL`, `CAREERS_TO_EMAIL`. In
production, if any is missing the forms return an error instead of pretending to send.

Also needed: the real **domain** (`NEXT_PUBLIC_SITE_URL`, currently defaulting to `https://umss.pk`).

## 1. Company identity

| Item | Where | Value now | Planned action |
| --- | --- | --- | --- |
| Founding year | `dummy.ts` `company.founded`; About page ("Founded in 2009"); timeline | 2009 | Remove until confirmed |
| PEC registration number | `dummy.ts` `company.pecRegistration`, `dummyPec`, `dummyCertifications`; About page row; Credentials page | "C-6/ME-2047", category "C-6", valid until 30 Jun 2027 | Remove |
| NTN | `dummy.ts` `company.ntn` | "4219876-3" | Remove |
| Domain / site URL | `content/site.ts`, `.env.example` | `umss.pk` (default `NEXT_PUBLIC_SITE_URL`) | Config: confirm real domain |
| Tagline | `dummy.ts` `company.tagline` | "MEP Contracting for Complex Buildings" | Owner to approve |
| "Offices in Islamabad and Lahore" | `site.ts` description, About, Contact, Footer, RFQ aside, OrgDiagram, search index, metadata | Two cities asserted in ~12 places | Config: confirm cities |

## 2. Offices and contact details

| Item | Where | Value now |
| --- | --- | --- |
| Islamabad "Head Office" address | `dummyOffices[0]` | "Office 12, 3rd Floor, Plot 21, Sector I-9/3, Islamabad 44000" |
| Islamabad phone | `dummyOffices[0]` | "+92 51 4567 890" |
| Lahore "Regional Office" address | `dummyOffices[1]` | "45-B, Main Boulevard, Gulberg III, Lahore 54660" |
| Lahore phone | `dummyOffices[1]` | "+92 42 3578 1200" |
| Opening hours | both offices | "Mon–Sat, 9:00 AM – 6:00 PM" |
| Map queries and coordinates | both offices (`mapQuery`, `geo`) | sector/area centroids, not the offices |
| Email addresses | `dummy.ts` `emails` | info@, tenders@, careers@, support@, lahore@ `umss.pk` |
| WhatsApp number | `dummy.ts` `whatsapp`; Footer link `wa.me` | "+92 300 1234567" (also used as the form example in `RfqForm.tsx:326` and `schemas.ts:110`) |
| Social profiles | `dummy.ts` `social`; Footer | linkedin.com/company/umss, facebook.com/umss.pk, instagram.com/umss.pk, youtube.com/@umss (not confirmed to exist or to be UMS) |

Planned action: *Config*, with each field rendering nothing when empty. Footer, Contact, RFQ aside, OrgDiagram and
the mobile nav call buttons all read these.

## 3. Statistics and performance claims

| Item | Where | Value now |
| --- | --- | --- |
| Years of delivery | `dummyStats`; StatsBand | "15+" |
| Projects delivered | `dummyStats`; timeline 2025 entry | "37+" |
| Engineers & technicians | `dummyStats` | "250+" |
| Building area serviced | `dummyStats` | "2.4M sq ft" |
| Lost-time incidents | `dummyStats`; QualitySafetyTeaser.tsx:69; quality.ts (HSE text); testimonials; articles | "0 in 2025" |
| On-time handover rate | `dummyStats` | "98%" |
| Response time | `dummy.ts` `rfqResponseTime`; `RfqAside.tsx:35` | "within 48 hours" |

Planned action: *Remove* the StatsBand and every numeric claim until sourced.

## 4. Certifications and quality claims

| Item | Where | Value now |
| --- | --- | --- |
| ISO 9001:2015, ISO 45001:2018, ISO 14001:2015 | `dummyCertifications`; Credentials page; `QualitySafetyTeaser.tsx:68`; `quality.ts` | certificate numbers QMS-PK-20418, OHS-PK-11273, EMS-PK-09865, valid until March 2028 |
| "NFPA-aligned practices" / "Internal audit FP-2025" | `dummyCertifications` | invented audit reference |
| "Our quality system is certified to ISO 9001:2015" and the equivalent ISO 45001 sentence | `content/quality.ts` `umsProcedure` (lines 28, 47) | claims in first person |
| `umsProcedure` on every quality stage | `content/quality.ts` | invented UMS procedures ("no pipework is concealed until its inspection request is closed", named QA/QC manager, daily toolbox talks, etc.) |
| Company profile PDF | `public/downloads/ums-company-profile.pdf` (35 lines, placeholder); linked from CTABand and CredentialCards | not a real document |

Planned action: *Remove* badges and `umsProcedure`; *Keep* the generic QA/HSE checklists (they describe
typical practice, not UMS claims) but rewrite wording where it says "UMS does". Remove the PDF link.

## 5. People

Six invented leaders in `dummyLeadership`, shown on About, Team (OrgDiagram) and as article authors:
Engr. Ahmed Raza (CEO), Engr. Sana Malik (Director, Projects), Engr. Bilal Chaudhry (Head of HVAC),
Engr. Usman Tariq (Head of Fire Protection), Engr. Ayesha Khan (QA/QC Manager), Engr. Hamza Iqbal (HSE
Manager). Bios assert biography ("Founded UMS in 2009 after a decade…", "led the integrated MEP package on
UMS's first large hospital project").

Planned action: *Remove* names, roles and bios; the Team page becomes disciplines and structure without people
until real names are supplied.

## 6. Clients, testimonials, projects

**Clients** (`dummyClients`, ClientsMarquee): Crescent Developers, Indus Builders, Margalla Estates, Ravi
Construct, Karakoram Infra, Summit Healthcare Group, Jinnah Retail Holdings, Pak Steel Structures, Capital
Smart Towers, Northern Hospitality. All invented. *Remove.*

**Testimonials** (`dummyTestimonials`, four quotes with names, roles and companies): Dr. Imran Qureshi,
Farah Nadeem, Tariq Mehmood, Nadia Siddiqui. Fabricated quotes. *Remove.*

**Projects** (`confirmedProjects` in `content/dummy.ts`): **resolved in Phase B.** The six fictional projects and
every invented field were deleted. What remains is the name of six projects the owner confirmed: Lady Reading
Hospital, Buch International Hospital, Elanza Mall, Pakistan Cricket Board House, CGGC Head Office at Eighteen,
Jazz Destiny. The site shows names only (no city, year, sector, scope, client, photos or outcomes).

**Needed from the owner to expand any project:** UMS's role and scope, city, year, status, and approved photographs.

## 7. Company story

| Item | Where |
| --- | --- |
| Six milestones (2009 founding, 2012 first hospital package, 2015 Lahore office, 2018 fire division, 2021 integrated delivery, 2025 "37+ projects") | `dummyTimeline` |
| Mission and vision statements | `dummyMission` |
| Six values with claims ("on-time handover… is a promise we measure and report") | `dummyValues` |
| Careers culture, benefits (health cover, annual bonus, transport allowance, PEC support) | `dummyCulture`, `dummyBenefits` |
| Four open positions with locations and experience bands | `dummyCareers` (HVAC engineer, Fire supervisor, Electrical design engineer, QA/QC inspector) |

Planned action: *Remove* timeline, benefits and the job listings (the Careers form itself stays, as an open
application). Mission and values: *Rewrite* only if the owner approves wording.

## 8. Insights articles

Six articles in `content/dummy-articles.ts`, each attributed to one of the invented leaders with invented
publish dates (2026-04-22 to 2026-09-18): site safety planning, fire protection inspection records, VRF and
chilled water, coordinating shop drawings, HVAC maintenance planning, MEP handover documentation. The text is
generic engineering explanation, but the attribution, dates and "we/UMS" statements are not real.

There are no `/insights` or `/insights/[slug]` routes at all, so the articles cannot be read anywhere (see the
Phase A report, broken links).

Planned action: *Rewrite* authorship to "UMS" without a person or date, or hold the section back; decide in
Phase D.

## 9. Service pages

`content/services.ts` (608 lines) and `content/industries.ts` are mostly generic descriptions of MEP
disciplines and read as factual about the discipline, not about UMS. Spot-checked, not line-audited:

- One reference to NFPA as an example standard (`services.ts:299`), worded as "commonly a recognised code".
- "Pools & Fountains" is presented as a UMS service (also the Elanza and Ravi projects).

Planned action: *Keep* discipline content; confirm with the owner that all six disciplines are real UMS
offerings. Line-by-line review happens in Phase E.

## 10. Other

| Item | Where |
| --- | --- |
| Privacy policy | Footer link hidden until `/privacy-policy` is built in Phase E from a neutral template. `content/legal.ts` is unused until then and needs legal review |
| Insights | All Insights links hidden until `/insights` is built in Phase E. Articles will be attributed to "UMS Engineering Team" with no dates |
| Newsletter form in the footer | **Removed in Phase B** (it had no backend and showed a fake success) |
| Form delivery | **Fixed in Phase B:** in production, if `RESEND_API_KEY`, `MAIL_FROM` or the recipient (`RFQ_TO_EMAIL`, `CONTACT_TO_EMAIL`, `CAREERS_TO_EMAIL`) is missing, the form returns an error asking the visitor to contact UMS directly. Console output is development-only. **Owner must supply the sender and recipient addresses before launch** |
| Stock photography (all hero, service, project, article images) | `content/images.ts`, `next.config.ts` allows `images.unsplash.com`; 1 TODO per image |
| "AI assistant" / `AI_API_KEY` placeholder | `.env.example` (no code uses it) |
| `TODO.md` | duplicates this list for the previous spec and describes the site as shipping "dummy data"; to be replaced by this file |
