# UMS WEBSITE — VISUAL OVERHAUL & REFERENCE-DRIVEN FRONTEND MASTER PROMPT

## Mission

Redesign and improve the **existing UMS website** at `https://ums-website-frontend.vercel.app/` in-place. This is a frontend visual overhaul, not a new project and not a speculative rebuild.

The existing website and codebase are the source of truth for implemented functionality, routes, content structures, APIs, forms, and dependencies. Inspect them before making changes. Use the supplied screenshots as **visual direction**, not as a source of UMS company facts.

The objective is to transform the current site into an exceptionally polished, professional, technically credible MEP engineering website—while retaining real functionality and avoiding fabricated content.

---

## 1. Mandatory pre-work: inspect before editing

Do not start coding immediately.

1. Inspect the repository, package scripts, git status, current branch, recent commits, route structure, content files, components, assets, APIs, and existing forms.
2. Open and inspect the currently deployed site: `https://ums-website-frontend.vercel.app/`. Compare its live appearance with the code, but do not assume that the deployed site is identical to the local working tree.
3. Inspect all supplied screenshots:
   - **Reference Screenshot 1:** a website hero with a large architectural/building cutaway illustration. The building is shown as a multi-storey transparent cutaway with visible internal mechanical systems—ducts, pipes and services—rather than a generic building photo. The illustration occupies a large portion of the hero and is a major visual focal point. The hero uses a strong dark blue/teal field, clear headline and CTA, and a horizontal service strip near the lower edge.
   - **Reference Screenshot 2:** a professional navigation menu. When the Services navigation item is hovered, focused or clicked, an elegant large dropdown panel appears below the navbar. It has a white/light background, rounded but restrained corners, compact image-led service entries arranged vertically, a brief description for each, and a “Services overview” link. It overlays the page content and does not look like a plain browser dropdown or a tiny list.
   - **Reference Screenshot 3:** current deployed site's preloader screen. The current screen appears to show a dark blueprint grid, UMS logo, gauge/needle and a `100%` indicator. Inspect the implementation and investigate why the captured screen is still at this state. Do not blindly preserve a preloader if it delays access or appears stuck. The site should reveal the homepage promptly and gracefully.
4. Determine what is genuinely working and what is broken, slow, placeholder-like, visually weak or misleading.
5. Create a short inspection report and proceed with the design implementation—do not stop after the report unless there is a blocker.

**No hallucination rule:** Never invent or assert UMS-specific registration numbers, office addresses, phone numbers, team names, client relationships, project values, statistics, certification claims, testimonials, dates, achievements or case-study outcomes. Treat unverified values currently present in the project as unverified—not as automatically true. Keep the existing source content only when it can be traced to current project data or user-provided facts. If information is unknown, use discreet, configurable placeholders that are not presented as real facts, or omit the content until verified. Do not fabricate client logos or testimonial quotes.

---

## 2. Visual goal and art direction

Create an **engineering-focused, premium, memorable and highly polished** design.

The reference hero is the key direction: **a building cutaway / isometric architectural illustration with visible MEP systems inside**. Do not replace this idea with an ordinary full-bleed stock photo as the sole hero focal point.

Art direction:
- Engineering visualization, architectural precision and technical clarity.
- Sophisticated deep navy/blue-teal palette, white/off-white content areas and restrained cyan accents, preserving the recognizable UMS engineering character.
- Use colours consistently and avoid excessive gradients or neon effects.
- Strong typography hierarchy with a large but readable headline.
- Large, high-quality building visualization with a meaningful relationship between the building structure and the internal MEP systems.
- Clean spacing, carefully composed content, sharp visual hierarchy and restrained details.
- Do not make the page feel like a dashboard, SaaS landing page or generic template.
- Avoid repetitive rectangular card grids, empty boxes, outlined placeholder fields used as decorative content, random icon tiles, fake metrics, lorem ipsum and generic filler.
- Do not use boxes/cards for every section. Mix editorial layouts, visual panels, full-width sections, image-led layouts, lists, technical diagrams, asymmetric composition and purposeful card use.

The design must be visually compelling but still practical, accessible, fast and usable.

---

## 3. Homepage hero — primary requirement

Rebuild the first screen of the homepage to be inspired by **Reference Screenshot 1**.

### Composition
- A substantial dark blue/teal hero section.
- Large, carefully positioned headline and supporting text.
- The **architectural building cutaway/isometric MEP illustration** should be the dominant visual element. It should show a transparent multi-floor building or section with internal service systems visibly routed through it—HVAC ducting, plumbing pipes, fire-protection piping and electrical/service infrastructure where the visualization can represent them accurately.
- Aim for the composition, scale and visual impact of the reference screenshot, but improve clarity, responsive behaviour and overall art direction.
- The illustration may be a static high-quality image, SVG, CSS/3D scene or another suitable approach. Choose based on the existing code, practical asset availability and performance. Do not fabricate a technically inaccurate interactive model merely to claim 3D.
- If assets are missing, source or create a clearly temporary, appropriate visual asset. Document any replacement requirement. Do not silently leave an empty image box.
- The headline and CTA must remain readable and balanced against the visual.
- Include primary CTA such as **Request a Quote** and a secondary CTA such as **Explore Services** or **Projects**, using existing real routes.
- Add an elegant service selector/strip near the hero bottom similar in spirit to the screenshot (e.g. HVAC, Fire Fighting, Electrical & ELV, Plumbing). Use real route destinations. Do not make these controls decorative or non-functional.
- Ensure hero is visually excellent on desktop and recompose—not merely shrink—on mobile.

### Hero quality checks
- The first screen must not look unfinished.
- No overlapping text, clipped navigation, blank visual containers or excessive loading.
- No forced loading screen that blocks the user unnecessarily.
- If a preloader is retained, it must have a reliable completion path, short duration, accessible reduced-motion behaviour and a fail-safe. A progress display must not be stuck at 100% while the content remains hidden.
- The hero must have a performant fallback on devices without WebGL or with reduced motion.

---

## 4. Navigation and Services dropdown — primary requirement

Rebuild the navigation dropdown inspired by **Reference Screenshot 2**.

### Navbar
- Keep the navbar clean, premium, legible and proportionate.
- Provide consistent spacing and clear interaction states.
- Make the navigation responsive and accessible.
- Header transitions on scroll should be smooth and restrained, without harming readability.

### Services mega-menu/dropdown
When a user hovers over Services (desktop), focuses it with keyboard, or clicks it:
- Open a **large, refined dropdown panel** directly beneath the navigation.
- The panel should be anchored to the navigation and aligned to the overall content grid.
- Use a clean light surface, elegant shadow/border, restrained radius and strong typography.
- Show service entries with compact thumbnails or small visual previews, service names and short descriptions. Avoid giant generic cards and avoid a plain text list.
- Include a visible **Services Overview** link/action.
- The dropdown should fit within the viewport, with sensible scrolling only if needed.
- Keep the page visible behind the dropdown; do not unexpectedly navigate on hover.
- Hover interactions must not create flicker or close the panel while moving from trigger into panel.
- Add intent/delay only if useful and reliable.
- Keyboard behaviour: focus, Enter/Space, Escape, arrow keys where appropriate, and clear focus indicators.
- On mobile, use a properly designed accordion or full-screen navigation pattern rather than the desktop dropdown.
- Each menu item must lead to its real service page or existing relevant route.

Use the screenshot as a design reference for the overall behaviour and visual treatment, but do not reproduce it pixel-for-pixel.

---

## 5. Homepage sections — redesign with purposeful visual variety

Review the current homepage section-by-section. Retain useful content and links, but improve the composition and visual quality.

Potential homepage flow (adapt to existing content and avoid adding unverified facts):

1. **Hero:** cutaway/isometric MEP building visualization, headline, CTA and service strip.
2. **Services:** distinctive service showcase with visual differentiation between disciplines. Avoid repetitive small boxes.
3. **Project showcase:** only existing, verified project names and details. Where details are unverified, use minimal entries or mark data internally for confirmation; never invent project facts.
4. **MEP inside a building:** a clear visual explainer/diagram of systems and how disciplines work together. It can be static or interactive, but interaction must be useful and real.
5. **Industries:** thoughtfully composed, visual and concise.
6. **Delivery process:** meaningful stages, clearly explained without fake timelines or claims.
7. **Quality & Safety:** only verified statements; avoid unsupported certification badges and numerical claims.
8. **Insights:** only actual articles/content present in the project, or genuine authored content—not fake placeholder headlines with misleading attribution.
9. **Conversion CTA:** clear RFQ or contact route.
10. **Footer:** clean and functional, containing only verified or clearly configurable company contact details.

The order may change if a better homepage narrative is identified. Do not add sections merely to increase page length.

---

## 6. Improve the entire frontend—not only the homepage

After the hero and navigation are approved by code quality and visual checks, bring the remaining routes into the same visual standard:
- About
- Services overview
- Individual services
- Industries
- Projects
- Project details
- Quality / Safety / Delivery
- Insights
- Careers
- Contact
- Request a Quote
- Search
- Privacy and 404

Do not redesign form logic or APIs unnecessarily. Preserve working behaviour and validation. Redesign the UI only where required.

Avoid:
- Fake downloadable files.
- Fake form submission success.
- Dead buttons.
- Misleading placeholder project data.
- Decorative controls with no action.
- Duplicate components or competing design systems.

---

## 7. Content integrity / anti-hallucination safeguards

The previous specification may contain dummy data or fictional details. Audit these before displaying them as real.

1. Do not treat sample or dummy information as verified company facts.
2. Do not display invented PEC/ISO registrations, addresses, phone numbers, emails, leadership names, project measurements, dates, client logos, testimonials, statistics or performance claims as fact.
3. Do not make claims such as “respond within 48 hours,” “zero incidents,” “98% on-time,” “250+ engineers,” or “15+ years” unless confirmed by actual source data.
4. Do not invent a real company relationship with the named project references.
5. Maintain a clearly documented `content-to-verify` list or `TODO.md` so the owner can approve content before launch.
6. The UI should not be filled with obvious empty fields, “to be confirmed” boxes, dummy badges or placeholder-looking cards. Prefer omission or a polished, discreet treatment until verified.
7. Keep content in the existing content/data architecture where possible.

---

## 8. Frontend and code constraints

- Work in the existing repository and preserve its project structure when reasonable.
- Reuse existing dependencies and components when sound.
- Do not rebuild the project from scratch.
- Do not delete working features or routes.
- Do not make destructive changes without explaining them.
- Do not add packages without a reason; verify compatibility.
- Keep code modular, maintainable and accessible.
- Respect the existing TypeScript, Next.js, Tailwind and project conventions.
- Optimize images, avoid unnecessary client-side code and lazy-load heavy visuals.
- Maintain semantic HTML, keyboard support and appropriate ARIA.
- Respect `prefers-reduced-motion`.
- Avoid performance-heavy 3D if it does not materially improve the result.
- Ensure responsive behaviour at 360, 390, 768, 1024, 1440 and 1920 pixels.
- Do not claim testing you have not performed.

---

## 9. Implementation plan — work incrementally

### Phase A — Audit and design foundation
- Inspect code and live site.
- Identify the current preloader/loading issue, if reproducible.
- Review the current homepage and navigation implementation.
- Create an implementation plan and visual design tokens.
- Do not remove existing functionality.
- Run baseline checks.

### Phase B — Hero and first-screen experience
- Rebuild the homepage hero around the architectural MEP cutaway visualization.
- Create the layout, typography, CTAs, service selector and responsive composition.
- Fix preloader/loading behaviour if necessary.
- Test desktop and mobile.
- Run lint/typecheck/build and report.

### Phase C — Navigation and mega-menu
- Rebuild navbar and Services mega-menu according to Screenshot 2's visual/behavioural direction.
- Include accessible hover, focus, click, escape and mobile behaviour.
- Test all menu links.
- Run lint/typecheck/build and report.

### Phase D — Homepage remaining sections
- Redesign the remaining homepage with purposeful visual variety and content integrity.
- Avoid repetitive cards and fake content.
- Verify routes and links.
- Run checks and report.

### Phase E — Inner pages
- Apply the coherent design system to existing routes, preserving real logic.
- Run checks after each logical batch.

### Phase F — Quality assurance
- Verify routes, interactions, navigation, forms, responsive breakpoints, console and build.
- Run lint, typecheck and production build.
- List what was actually tested, what remains, and any assets/content that require owner confirmation.

**At the end of every phase, STOP and wait for approval before proceeding.**

---

## 10. Git safety and change management

- Begin by checking `git status`, current branch and recent history.
- Do not discard or overwrite uncommitted work.
- Follow the repository's existing branch and commit conventions. If unclear, ask before changing branch strategy.
- Do not force-push.
- Never commit secrets, environment files or unrelated user changes.
- Review the diff before committing.
- Commit only when checks pass and when the current project workflow permits it.
- Do not claim a push or deployment occurred unless it actually did.

---

## 11. Required reporting at the end of each phase

Report:
- What you inspected.
- What you changed.
- Exact files created/modified.
- What is working.
- What was tested (commands and actual results).
- Any remaining bugs or unverified content.
- What I should visually inspect in the browser.
- Any assets that need approval/replacement.

Then stop and wait.

---

## Final design acceptance criteria

The website should be recognizably UMS, but substantially more refined than the current version.

The homepage opening should feature the **large architectural cutaway building with visible internal MEP systems**, inspired by Reference Screenshot 1. The Services navigation should reveal a **large, image-led, refined mega-menu**, inspired by Reference Screenshot 2.

The site should not be filled with generic placeholder cards or fabricated company details. Its sophistication should come from art direction, layout, engineering visualization, typography, navigation quality, useful interactions, clean code and authentic content.

**Do not hallucinate. Inspect first. Preserve what works. Improve what is visually weak. Build in phases and stop for approval.**
