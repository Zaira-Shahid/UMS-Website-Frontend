import type { Industry } from "@/types";
import { photo } from "./images";

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    summary:
      "Hospitals and clinics depend on uninterrupted services: controlled air, reliable water, resilient power and life-safety systems.",
    services: ["integrated-mep", "hvac", "fire-fighting", "plumbing", "electrical-elv"],
    image: photo("wavyRoof"),
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
    image: photo("glassTower", "center 30%"),
  },
  {
    slug: "residential-mixed-use",
    name: "Residential & Mixed-Use",
    summary:
      "Apartment towers and mixed-use developments where shared building services serve many occupants.",
    services: ["integrated-mep", "fire-fighting", "plumbing", "pools-fountains"],
    image: photo("highRise"),
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
    image: photo("poolFountain"),
  },
  {
    slug: "education-institutional",
    name: "Education & Institutional",
    summary:
      "Campuses and institutional buildings with large footprints, varied occupancy and long service lives.",
    services: ["integrated-mep", "hvac", "plumbing", "electrical-elv"],
    image: photo("facade", "center 40%"),
  },
  {
    slug: "industrial-warehousing",
    name: "Industrial & Warehousing",
    summary:
      "Industrial facilities and warehouses with large volumes, process loads and strict fire-protection needs.",
    services: ["integrated-mep", "hvac", "fire-fighting", "electrical-elv"],
    image: photo("redPipes"),
  },
];
