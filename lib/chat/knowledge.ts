import { deliverySteps, homeFaqs } from "@/content/home";
import { industries } from "@/content/industries";
import { quoteHref } from "@/content/navigation";
import { projects } from "@/content/projects";
import { servicePages } from "@/content/service-pages";
import { services } from "@/content/services";
import { contact } from "@/content/site";
import type { ServiceSlug } from "@/types";

/**
 * Everything the assistant is allowed to say comes from this file: the site's own content (services, what is included,
 * industries, delivery steps, FAQs, the confirmed project names and the site's routes). Nothing here is invented, and
 * contact details are only used when they are filled in `content/site.ts`.
 */

export interface ChatLink {
  label: string;
  href: string;
}

export interface ChatReply {
  text: string;
  links: ChatLink[];
}

/** Routes the assistant may point to. */
export const routes: ChatLink[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Projects", href: "/projects" },
  { label: "Request a quote", href: "/request-a-quote" },
  { label: "Contact", href: "/contact" },
  { label: "About UMS", href: "/about" },
  { label: "Quality, safety & delivery", href: "/quality-safety-delivery" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
];

const serviceTitle = (slug: ServiceSlug) => (slug === "integrated-mep" ? "Integrated MEP" : services.find((s) => s.slug === slug)!.name);
const serviceLink = (slug: ServiceSlug): ChatLink => ({ label: serviceTitle(slug), href: `/services/${slug}` });

/** Keywords that identify each service in a visitor's message. Matched on word starts. */
const serviceKeywords: Record<ServiceSlug, string[]> = {
  hvac: ["hvac", "air condition", "aircon", "cooling", "ventilation", "chiller", "vrf", "duct", "heating", "ahu", "climate"],
  "fire-fighting": ["fire", "sprinkler", "hydrant", "extinguish", "suppression", "smoke", "alarm detection"],
  plumbing: ["plumbing", "drainage", "sanitary", "water supply", "sewage", "public health", "tank", "pipe", "pipework"],
  "electrical-elv": ["electrical", "electric", "elv", "low voltage", "low-voltage", "cctv", "panel", "cable", "lighting", "power", "access control", "wiring"],
  "pools-fountains": ["pool", "fountain", "water feature", "swimming"],
  "integrated-mep": ["mep", "integrated", "mechanical electrical", "coordination", "all trades", "one package"],
};

const norm = (s: string) => ` ${s.toLowerCase().replace(/[^a-z0-9&+\- ]+/g, " ").replace(/\s+/g, " ").trim()} `;
/** Whole-word match (a trailing "s" is allowed), so "fee" does not match "feel". */
const hasWord = (text: string, w: string) => text.includes(` ${w} `) || text.includes(` ${w}s `);
const has = (text: string, words: string[]) => words.some((w) => hasWord(text, w));

/** The service a message is about, or null. The most specific match (longest keyword) wins. */
export function detectService(message: string): ServiceSlug | null {
  const t = norm(message);
  let best: { slug: ServiceSlug; len: number } | null = null;
  for (const [slug, words] of Object.entries(serviceKeywords) as [ServiceSlug, string[]][]) {
    for (const w of words) {
      if (hasWord(t, w) && (!best || w.length > best.len)) best = { slug, len: w.length };
    }
  }
  return best?.slug ?? null;
}

const quoteWords = ["quote", "quotation", "price", "pricing", "cost", "costs", "tender", "boq", "bill of quantities", "rate", "rates", "how much", "estimate", "budget", "charges", "fee", "fees"];
export const hasQuoteIntent = (message: string) => has(norm(message), quoteWords);

const quoteLink = (slug: ServiceSlug | null): ChatLink => ({
  label: "Request a quote",
  href: slug ? quoteHref({ service: slug }) : quoteHref(),
});

const officeCities = contact.offices.map((o) => o.city);

/** Short answer for a service, drawn from its page content. */
function serviceReply(slug: ServiceSlug): ChatReply {
  const s = services.find((x) => x.slug === slug)!;
  const page = servicePages[slug];
  const items = page.included.map((i) => `• ${i.text}`).join("\n");
  return {
    text: `${serviceTitle(slug)}: ${s.tagline}\n\nTypically included:\n${items}\n\nThe exact scope is agreed in your proposal.`,
    links: [serviceLink(slug), quoteLink(slug)],
  };
}

const outOfScope = ["solar", "photovoltaic", "lift", "elevator", "civil", "structural", "interior", "painting", "landscaping", "furniture", "generator", "gas", "telecom", "network"];

const unknown = (): ChatReply => ({
  text: "I don't have that information. I can only answer from what is on this website. For anything else, please contact our team or send a quote request.",
  links: [{ label: "Contact us", href: "/contact" }, quoteLink(null)],
});

/** Words that carry no meaning when matching a question against FAQ text. */
const stop = new Set("a an the and or of to in on for is are do does can i you we your our my me it its what how when where why which who with at by be this that there any about".split(" "));
const tokens = (s: string) => norm(s).split(" ").filter((w) => w.length > 2 && !stop.has(w));

/** Best FAQ answer for a message, if the overlap is strong enough. */
function faqMatch(message: string): { question: string; answer: string; link?: ChatLink } | null {
  const q = new Set(tokens(message));
  if (q.size === 0) return null;
  const all = [
    ...homeFaqs.map((f) => ({ ...f, link: undefined as ChatLink | undefined })),
    ...services.flatMap((s) => s.faqs.map((f) => ({ ...f, link: serviceLink(s.slug) }))),
  ];
  let best: { score: number; item: (typeof all)[number] } | null = null;
  for (const item of all) {
    const t = new Set(tokens(`${item.question} ${item.question}`));
    let hit = 0;
    for (const w of q) if (t.has(w)) hit++;
    const score = hit / Math.min(q.size, t.size || 1);
    if (hit >= 2 && score >= 0.6 && (!best || score > best.score)) best = { score, item };
  }
  return best ? best.item : null;
}

/**
 * Rule-based assistant used when no model key is configured. Keyword-matches the message against the site content and
 * replies with a short answer and links. It never claims to be a person and never invents facts.
 */
export function ruleBasedReply(message: string): ChatReply {
  const t = norm(message);
  const service = detectService(message);

  // Things UMS's site does not cover: say so instead of guessing
  if (has(t, outOfScope)) return unknown();

  // Greetings and thanks
  if (/^ (hi|hello|hey|salam|assalam|good (morning|afternoon|evening))( |$)/.test(t) && t.trim().split(" ").length <= 4) {
    return { text: "Hello! I'm the UMS Assistant, an automated assistant. I can tell you about our services, projects and how to request a quote. What would you like to know?", links: [] };
  }
  if (has(t, ["thank", "thanks", "thx"]) && t.trim().split(" ").length <= 5) {
    return { text: "You're welcome! Is there anything else I can help with?", links: [] };
  }

  // Who am I talking to
  if (has(t, ["human", "real person", "robot", "bot", "chatgpt", "ai"]) && has(t, ["are you", "am i", "talking", "speak"])) {
    return { text: "I'm the UMS Assistant, an automated assistant, not a person. I can answer questions about what is on this website, and our team can help with anything else.", links: [{ label: "Contact us", href: "/contact" }] };
  }

  // How to ask for a quote (no price words): explain the process
  const priceWords = ["price", "pricing", "cost", "costs", "how much", "rate", "rates", "estimate", "budget", "charges", "fee", "fees"];
  if (hasQuoteIntent(message) && !has(t, priceWords) && /(how|where).*(request|get|ask|submit|send|make|apply)|request a quote/.test(t)) {
    return { text: homeFaqs[1].answer, links: [quoteLink(service)] };
  }

  // Quotes and prices: never give a number
  if (hasQuoteIntent(message)) {
    const name = service ? serviceTitle(service) : null;
    return {
      text: `I can't give prices or estimates${name ? ` for ${name}` : ""}: the cost depends on the building, the scope and the timeline. Send us the details and the team will respond with a proposal.`,
      links: [quoteLink(service), ...(service ? [serviceLink(service)] : [])],
    };
  }

  // FAQs (a strong match with a stored question)
  const faq = faqMatch(message);
  if (faq) return { text: faq.answer, links: faq.link ? [faq.link] : [] };

  // Offices and contact details (only what is filled in the site config)
  if (has(t, ["office", "offices", "address", "location", "located", "where are you", "visit", "phone", "call", "number", "email", "mail", "whatsapp", "hours", "reach you", "contact"])) {
    const filled = contact.offices.filter((o) => o.address || o.phone || o.email);
    if (filled.length > 0) {
      const lines = filled.map((o) => [o.city, o.address, o.phone, o.email, o.email2].filter(Boolean).join(" · ")).join("\n");
      return { text: `Our offices:\n${lines}`, links: [{ label: "Contact us", href: "/contact" }] };
    }
    return {
      text: `UMS has offices in ${officeCities.join(" and ")}. I don't have street addresses or phone numbers to share here, so please use the Contact page and the team will get back to you.`,
      links: [{ label: "Contact us", href: "/contact" }],
    };
  }

  // Projects
  const named = projects.find((p) => t.includes(` ${p.name.toLowerCase().split(" ")[0]} `) && t.includes(` ${p.name.toLowerCase().split(" ").slice(-1)[0]} `));
  if (named) {
    const sector = named.sector ? industries.find((i) => i.slug === named.sector)?.name : null;
    const detail = [sector, named.city].filter(Boolean).join(", ");
    return {
      text: `${named.name} is one of the projects UMS lists${detail ? ` (${detail})` : ""}. I don't have further project details to share, such as scope, dates or values.`,
      links: [{ label: named.name, href: `/projects/${named.slug}` }, { label: "All projects", href: "/projects" }],
    };
  }
  if (has(t, ["project", "projects", "portfolio", "work you", "experience", "past work", "clients"])) {
    const names = projects.map((p) => `• ${p.name}`).join("\n");
    return { text: `Projects we list on the site:\n${names}\n\nYou can browse them by sector on the Projects page.`, links: [{ label: "View projects", href: "/projects" }] };
  }

  // A specific service
  if (service && !has(t, ["what do you do", "all services", "services do you"])) return serviceReply(service);

  // The delivery process
  if (has(t, ["process", "how do you deliver", "how we deliver", "steps", "stages", "handover", "commissioning", "methodology", "workflow"])) {
    const steps = deliverySteps.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`).join("\n");
    return { text: `Our delivery follows five stages:\n${steps}`, links: [{ label: "Quality, safety & delivery", href: "/quality-safety-delivery" }] };
  }

  // Industries
  if (has(t, ["industry", "industries", "sector", "sectors", "hospital", "healthcare", "hotel", "hospitality", "residential", "school", "university", "education", "retail", "mall", "commercial", "warehouse", "industrial", "factory"])) {
    const list = industries.map((i) => `• ${i.name}`).join("\n");
    return { text: `We work across these sectors:\n${list}`, links: [{ label: "Industries", href: "/industries" }] };
  }

  // Overview of services
  if (has(t, ["service", "services", "what do you do", "what does ums do", "what you do", "offer", "provide", "capabilities"])) {
    const list = services.map((s) => `• ${serviceTitle(s.slug)}: ${s.tagline}`).join("\n");
    return { text: `UMS provides six disciplines:\n${list}`, links: [{ label: "Our services", href: "/services" }, quoteLink(null)] };
  }

  // Careers, about, quality
  if (has(t, ["career", "careers", "job", "jobs", "hiring", "vacancy", "vacancies", "work for", "apply"])) {
    return { text: "You can see current openings, and apply, on the Careers page.", links: [{ label: "Careers", href: "/careers" }] };
  }
  if (has(t, ["iso", "certified", "certification", "certifications", "licence", "license", "pec", "accredited", "safety", "quality", "hse"])) {
    return {
      text: "I don't have verified certification details to share. The Quality, Safety & Delivery page describes our approach, and the team can answer questions about credentials directly.",
      links: [{ label: "Quality, safety & delivery", href: "/quality-safety-delivery" }, { label: "Contact us", href: "/contact" }],
    };
  }
  if (has(t, ["about", "who are you", "company", "mission", "values", "history"])) {
    return { text: "UMS (Ultimate Mechanical Solutions) is an MEP contractor for complex buildings. You can read more on the About page.", links: [{ label: "About UMS", href: "/about" }] };
  }

  return unknown();
}

/** Quote button the page should show for this message (used by both modes). */
export function quoteAction(message: string): ChatLink | null {
  return hasQuoteIntent(message) ? quoteLink(detectService(message)) : null;
}

/** Plain-text knowledge base handed to the model as its only source of facts. */
export function knowledgeText(): string {
  const svc = services
    .map((s) => {
      const p = servicePages[s.slug];
      return [
        `## ${serviceTitle(s.slug)} (/services/${s.slug})`,
        `Summary: ${s.summary}`,
        `Included: ${p.included.map((i) => i.text).join("; ")}`,
        `Typical applications: ${p.applications.map((a) => a.title).join("; ")}`,
        `FAQs: ${s.faqs.map((f) => `Q: ${f.question} A: ${f.answer}`).join(" | ")}`,
      ].join("\n");
    })
    .join("\n\n");
  const ind = industries.map((i) => `- ${i.name}: ${i.summary}`).join("\n");
  const del = deliverySteps.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`).join("\n");
  const faq = homeFaqs.map((f) => `Q: ${f.question} A: ${f.answer}`).join("\n");
  const proj = projects
    .map((p) => `- ${p.name}${[p.sector ? industries.find((i) => i.slug === p.sector)?.name : null, p.city].filter(Boolean).length ? ` (${[p.sector ? industries.find((i) => i.slug === p.sector)?.name : null, p.city].filter(Boolean).join(", ")})` : ""}`)
    .join("\n");
  const offices = `Offices: ${officeCities.join(" and ")}. No addresses, phone numbers or emails are available.`;
  const pages = routes.map((r) => `${r.label}: ${r.href}`).join("\n");
  return `# Services\n${svc}\n\n# Industries\n${ind}\n\n# Delivery process\n${del}\n\n# General FAQs\n${faq}\n\n# Projects (names only; no other details are known)\n${proj}\n\n# Offices\n${offices}\n\n# Site pages\n${pages}\nQuote form with a service preselected: /request-a-quote?service=<slug> (slugs: ${services.map((s) => s.slug).join(", ")})`;
}
