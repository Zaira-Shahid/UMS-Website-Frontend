import type { Service, ServiceSlug } from "@/types";
import { placeholderImage } from "./images";

/**
 * Service copy is general engineering description — it makes no UMS-specific
 * claims (numbers, clients, certifications). Imagery is placeholder.
 */
export const services: Service[] = [
  {
    slug: "integrated-mep",
    name: "Integrated MEP Solutions",
    shortName: "Integrated MEP",
    tagline: "One coordinated package for every building service.",
    summary:
      "Mechanical, electrical and plumbing disciplines planned, procured and installed as a single coordinated scope, so services fit the building before they reach site.",
    accent: "cyan",
    systems: [
      { name: "Tender review" },
      { name: "Drawings & coordination" },
      { name: "Procurement" },
      { name: "Installation" },
      { name: "Testing & commissioning" },
      { name: "Handover" },
    ],
    scope: [
      "Design support and shop-drawing coordination",
      "Supply and procurement management",
      "Installation across all MEP disciplines",
      "Testing and commissioning",
      "Handover documentation and maintenance planning",
    ],
    applications: [
      "healthcare",
      "commercial-retail",
      "residential-mixed-use",
      "hospitality",
      "education-institutional",
      "industrial-warehousing",
    ],
    image: placeholderImage("Coordinated MEP services in a plant room"),
    faqs: [
      {
        question: "Why procure MEP services as one integrated package?",
        answer:
          "A single coordinated scope reduces clashes between disciplines, simplifies responsibility on site, and keeps the programme for procurement, installation and commissioning aligned.",
      },
      {
        question: "Can UMS take on a single discipline only?",
        answer:
          "Each discipline is offered on its own as well as part of an integrated package. Use the quote form to describe the scope you need.",
      },
    ],
  },
  {
    slug: "hvac",
    name: "HVAC Systems",
    shortName: "HVAC",
    tagline: "Comfort, air quality and plant that runs efficiently.",
    summary:
      "Heating, ventilation and air-conditioning systems for large buildings, from central chilled-water plants to VRF networks and the ductwork that serves them.",
    accent: "cyan",
    systems: [
      { name: "Central plants" },
      { name: "VRF systems" },
      { name: "Ductwork" },
      { name: "Chilled-water piping" },
      { name: "Boilers" },
    ],
    scope: [
      "Design support and equipment selection assistance",
      "Supply and installation of plant, ductwork and piping",
      "Insulation, balancing and controls integration",
      "Testing and commissioning",
      "Operation and maintenance planning",
    ],
    applications: [
      "healthcare",
      "commercial-retail",
      "hospitality",
      "education-institutional",
      "industrial-warehousing",
    ],
    image: placeholderImage("HVAC chiller plant and chilled-water pipework"),
    faqs: [
      {
        question: "What is the difference between a VRF and a chilled-water system?",
        answer:
          "VRF systems move refrigerant directly to indoor units and suit buildings with varied zoning needs. Chilled-water systems circulate water from a central plant and are common in larger buildings with significant cooling loads.",
      },
      {
        question: "Does HVAC scope include commissioning?",
        answer:
          "Testing, balancing and commissioning are part of delivering a working system; confirm exact scope for your project through the quote form.",
      },
    ],
  },
  {
    slug: "fire-fighting",
    name: "Fire Fighting & Protection",
    shortName: "Fire Protection",
    tagline: "Life-safety systems installed, tested and documented.",
    summary:
      "Active fire protection for occupied buildings — sprinklers, hydrants, hose reels, pump rooms and suppression systems — installed to the project's governing standards.",
    accent: "fire",
    systems: [
      { name: "Sprinklers" },
      { name: "Hydrants" },
      { name: "Hose reels & cabinets" },
      { name: "Pump rooms" },
      { name: "Suppression systems" },
    ],
    scope: [
      "Supply and installation of fire fighting pipework and equipment",
      "Pump room installation and integration",
      "Inspection, testing and commissioning records",
      "Coordination with fire alarm and ELV systems",
      "Handover documentation",
    ],
    applications: [
      "healthcare",
      "commercial-retail",
      "residential-mixed-use",
      "hospitality",
      "industrial-warehousing",
    ],
    image: placeholderImage("Fire fighting pump room and red pipework"),
    faqs: [
      {
        question: "Which standards apply to fire protection systems?",
        answer:
          "Applicable standards depend on the project and authority having jurisdiction. They are confirmed at tender stage against the project specification.",
      },
      {
        question: "What records are provided at handover?",
        answer:
          "Inspection and test records, as-built drawings and operating documentation are typically part of handover. Exact deliverables follow the contract.",
      },
    ],
  },
  {
    slug: "plumbing",
    name: "Plumbing & Public Health",
    shortName: "Plumbing",
    tagline: "Water in, waste out, and everything between.",
    summary:
      "Public-health engineering for large buildings: water supply and filtration, drainage, rainwater, irrigation, sewage treatment and gas distribution.",
    accent: "cyan",
    systems: [
      { name: "Water supply" },
      { name: "Filtration" },
      { name: "Drainage" },
      { name: "Rainwater" },
      { name: "Irrigation" },
      { name: "Sewage treatment" },
      { name: "LPG / NG systems" },
    ],
    scope: [
      "Supply and installation of water, drainage and gas systems",
      "Pump and tank installation",
      "Pressure testing and flushing",
      "Commissioning and handover",
    ],
    applications: [
      "healthcare",
      "commercial-retail",
      "residential-mixed-use",
      "hospitality",
      "education-institutional",
    ],
    image: placeholderImage("Plumbing risers and water supply pipework"),
    faqs: [
      {
        question: "Does plumbing scope include sewage treatment?",
        answer:
          "Sewage treatment is one of the systems UMS can deliver as part of public-health scope; specifics depend on the project.",
      },
    ],
  },
  {
    slug: "electrical-elv",
    name: "Electrical & ELV",
    shortName: "Electrical & ELV",
    tagline: "Power distribution and low-voltage systems, coordinated.",
    summary:
      "Low-tension distribution and extra-low-voltage systems — fire alarm and detection, public address and related communications — installed as part of a coordinated services package.",
    accent: "cyan",
    systems: [
      { name: "LT panels" },
      { name: "ELV systems" },
      { name: "Fire alarm & detection" },
      { name: "Public address" },
    ],
    scope: [
      "Supply and installation of distribution panels and cabling",
      "ELV, fire alarm and public-address installation",
      "Testing and commissioning",
      "Handover documentation",
    ],
    applications: [
      "healthcare",
      "commercial-retail",
      "hospitality",
      "education-institutional",
      "industrial-warehousing",
    ],
    image: placeholderImage("LT electrical panels and cable containment"),
    faqs: [
      {
        question: "What does ELV cover?",
        answer:
          "ELV generally covers low-voltage systems such as fire alarm and detection, public address and data or security cabling. Scope is defined per project.",
      },
    ],
  },
  {
    slug: "pools-fountains",
    name: "Pools & Fountains",
    shortName: "Pools & Fountains",
    tagline: "Water features built to run reliably.",
    summary:
      "Supply and installation of swimming pools, fountains and water features, including the mechanical systems that keep them clean and circulating.",
    accent: "cyan",
    systems: [{ name: "Pools" }, { name: "Fountains" }, { name: "Water features" }],
    scope: [
      "Supply and installation of pool and fountain systems",
      "Circulation, filtration and dosing equipment",
      "Testing and handover",
    ],
    applications: ["commercial-retail", "residential-mixed-use", "hospitality"],
    image: placeholderImage("Water feature plant and circulation equipment"),
    faqs: [
      {
        question: "What is covered under pools and fountains?",
        answer:
          "Supply and installation scope for pools, fountains and water features. Civil and architectural elements are normally outside this scope.",
      },
    ],
  },
];

export const serviceBySlug = (slug: ServiceSlug): Service | undefined =>
  services.find((s) => s.slug === slug);
