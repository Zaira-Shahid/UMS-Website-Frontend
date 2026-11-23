import type { Industry } from "@/types";
import { placeholderImage } from "./images";

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    summary:
      "Hospitals and clinics depend on uninterrupted services: controlled air, reliable water, resilient power and life-safety systems.",
    services: ["integrated-mep", "hvac", "fire-fighting", "plumbing", "electrical-elv"],
    image: placeholderImage("Hospital building"),
  },
  {
    slug: "commercial-retail",
    name: "Commercial & Retail",
    summary:
      "Offices, malls and mixed commercial developments with large occupancies and demanding fit-out programmes.",
    services: [
      "integrated-mep",
      "hvac",
      "fire-fighting",
      "plumbing",
      "electrical-elv",
      "pools-fountains",
    ],
    image: placeholderImage("Commercial tower and retail complex"),
  },
  {
    slug: "residential-mixed-use",
    name: "Residential & Mixed-Use",
    summary:
      "Apartment towers and mixed-use developments where shared building services serve many occupants.",
    services: ["integrated-mep", "fire-fighting", "plumbing", "pools-fountains"],
    image: placeholderImage("Residential and mixed-use development"),
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    summary:
      "Hotels and resorts where comfort, water systems and guest amenities must perform quietly and reliably.",
    services: [
      "integrated-mep",
      "hvac",
      "fire-fighting",
      "plumbing",
      "electrical-elv",
      "pools-fountains",
    ],
    image: placeholderImage("Hotel and resort building"),
  },
  {
    slug: "education-institutional",
    name: "Education & Institutional",
    summary:
      "Campuses and institutional buildings with large footprints, varied occupancy and long service lives.",
    services: ["integrated-mep", "hvac", "plumbing", "electrical-elv"],
    image: placeholderImage("Campus and institutional building"),
  },
  {
    slug: "industrial-warehousing",
    name: "Industrial & Warehousing",
    summary:
      "Industrial facilities and warehouses with large volumes, process loads and strict fire-protection needs.",
    services: ["integrated-mep", "hvac", "fire-fighting", "electrical-elv"],
    image: placeholderImage("Industrial facility and warehouse"),
  },
];
