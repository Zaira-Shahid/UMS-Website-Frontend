import type { IndustrySlug, Project } from "@/types";

/** The four sector filters on /projects. `param` is the ?sector= value; `industry` is the matching sector in the data. */
export const projectSectors: { param: string; industry: IndustrySlug; label: string; heading: string }[] = [
  { param: "healthcare", industry: "healthcare", label: "Healthcare", heading: "Healthcare Projects" },
  { param: "commercial-retail", industry: "commercial-retail", label: "Commercial & Retail", heading: "Commercial & Retail Projects" },
  { param: "residential", industry: "residential-mixed-use", label: "Residential", heading: "Residential Projects" },
  { param: "institutional", industry: "education-institutional", label: "Institutional", heading: "Institutional Projects" },
];

/** A project's picture from the company profile (public/images/projects/real/). The pixel size is the real size of the picture. */
const img = (slug: string, width: number, height: number) => ({ src: `/images/projects/real/${slug}.jpg`, width, height });

const H: IndustrySlug = "healthcare";
const C: IndustrySlug = "commercial-retail";
const R: IndustrySlug = "residential-mixed-use";
const I: IndustrySlug = "education-institutional";

/**
 * The projects in the company profile (UMS Profile.pdf, "Our Projects"): name, place, client, consultant and contractors exactly
 * as the profile gives them, with each project's picture from the profile. A project has a sector only when its name says what
 * kind of building it is (a hospital, a mall, apartments, an embassy, a school, a court). The others are listed under "More
 * Projects". Nothing else is stated about any project: no scope, dates, values or UMS's own role.
 * The order is the order shown on the Projects page within each sector.
 */
export const projects: Project[] = [
  // Healthcare
  { slug: "buch-international-hospital", name: "Buch International Hospital", sector: H, city: "Multan", client: "Buch Villas", consultant: "Simod", civilContractor: "Pro-Health", image: img("buch-international-hospital", 275, 150) },
  { slug: "lady-reading-hospital", name: "Lady Reading Hospital", sector: H, city: "Peshawar", client: "C&W", consultant: "Allied Consultant", civilContractor: "Sarhad Construction", image: img("lady-reading-hospital", 270, 150) },
  { slug: "peshawar-general-hospital", name: "Peshawar General Hospital", sector: H, city: "Peshawar", client: "PGH", consultant: "Simode", image: img("peshawar-general-hospital", 300, 268) },
  { slug: "mukhtar-a-sheikh-memorial-welfare-hospital", name: "500 Bed Mukhtar A. Sheikh Memorial Welfare Hospital", sector: H, city: "Multan", client: "MASWMH", consultant: "NESPAK", civilContractor: "Banu Mukhtar Constructor Private Limited", image: img("mukhtar-a-sheikh-memorial-welfare-hospital", 276, 151) },
  { slug: "sahiwal-international-hospital", name: "Sahiwal International Hospital", sector: H, city: "Sahiwal", client: "Sahiwal International Hospital", image: img("sahiwal-international-hospital", 278, 191) },
  { slug: "ajwa-city-hospital-sahiwal", name: "Ajwa City Hospital", sector: H, city: "Sahiwal", client: "Ajwa City", image: img("ajwa-city-hospital-sahiwal", 269, 148) },
  { slug: "pakistan-childrens-heart-hospital", name: "Pakistan Children's Heart Hospital & Research Institute", sector: H, client: "PCHF", consultant: "Global Hi-Tech", image: img("pakistan-childrens-heart-hospital", 336, 189) },
  { slug: "fauji-foundation-nursing-hospital", name: "Fauji Foundation Nursing Hospital", sector: H, client: "Pro Health", consultant: "Global Hi-Tech", image: img("fauji-foundation-nursing-hospital", 269, 148) },
  { slug: "fauji-foundation-private-hospital", name: "Fauji Foundation Private Hospital", sector: H, client: "Pro Health", consultant: "Global Hi-Tech", image: img("fauji-foundation-private-hospital", 336, 165) },
  { slug: "fauji-foundation-artificial-limb-centre", name: "Fauji Foundation Artificial Limb Centre", sector: H, client: "Pro Health", consultant: "Global Hi-Tech", image: img("fauji-foundation-artificial-limb-centre", 327, 179) },

  // Commercial & Retail
  { slug: "elanza-mall", name: "Elanza Mall", sector: C, city: "Islamabad", area: "Gulberg", client: "Elanza Mall", consultant: "UPDL", image: img("elanza-mall", 280, 200) },
  { slug: "mall-of-sargodha", name: "Mall of Sargodha", sector: C, city: "Sargodha", client: "Capital Builder", consultant: "Rahim Associate", contractor: "Venture Engineering", image: img("mall-of-sargodha", 270, 283) },
  { slug: "d8-mall-gulberg", name: "D8 Mall Gulberg", sector: C, city: "Islamabad", area: "Gulberg", client: "D8 Mall", consultant: "HM Consultant", image: img("d8-mall-gulberg-islamabad", 278, 190) },
  { slug: "gulberg-mall-and-signature-living", name: "Gulberg Mall and Signature Living", sector: C, client: "GMSL", consultant: "Sohail Ahmed Associates", image: img("gulberg-mall-and-signature-living", 279, 199) },
  { slug: "centro-commercial-eighteen", name: "Centro Commercial Eighteen", sector: C, city: "Islamabad", area: "Eighteen", client: "Elite Estates", consultant: "Promag", image: img("centro-commercial-eighteen-islamabad", 276, 267) },
  { slug: "cggc-head-office-eighteen", name: "CGGC Head Office at Eighteen", sector: C, city: "Islamabad", area: "Eighteen", client: "CGGC (China Energy)", consultant: "Promag", image: img("cggc-head-office-eighteen", 273, 147) },
  { slug: "ubl-tower-karachi", name: "UBL Tower", sector: C, city: "Karachi", client: "UBL", consultant: "S. Mehboob & Company", mepContractor: "Mecatech (Pvt.) Ltd", image: img("ubl-tower-karachi", 221, 280) },
  { slug: "eobi-house-g-10-4", name: "EOBI House", sector: C, city: "Islamabad", area: "G-10/4", client: "EOBI", consultant: "NESPAK", civilContractor: "Builder Associate (Pvt.) Ltd.", image: img("eobi-house-g-10-4-islamabad", 277, 155) },
  { slug: "ptet-tele-house-g-10-4", name: "PTET Tele House", sector: C, city: "Islamabad", area: "G-10/4", client: "EOBI", consultant: "Naqvi and Siddique", mepContractor: "Builder Associate (Pvt.) Ltd.", image: img("ptet-tele-house-g-10-4-islamabad", 221, 274) },

  // Residential
  { slug: "the-garden-residencia", name: "The Garden Residencia", sector: R, client: "Arctec Design Consultant", consultant: "Sohail Associate", image: img("the-garden-residencia", 297, 352) },
  { slug: "cggc-apartment-building-eighteen", name: "CGGC Apartment Building at Eighteen", sector: R, city: "Islamabad", area: "Eighteen", client: "CGGC (China Energy)", consultant: "Promag", image: img("cggc-apartment-building-eighteen", 327, 178) },
  { slug: "mint-properties-apartments-lahore", name: "Mint Properties Apartments", sector: R, city: "Lahore", client: "60L Apartment (Pvt.) Ltd", consultant: "Innovative Engineering Services", image: img("mint-properties-apartments-lahore", 294, 188) },
  { slug: "rhodium-apartment-building", name: "Rhodium Apartment Building", sector: R, city: "Islamabad", client: "Potohar Builders", consultant: "S. Mehboob & Company", image: img("rhodium-apartment-building-islamabad", 279, 194) },

  // Institutional
  { slug: "islamabad-high-court", name: "Islamabad High Court", sector: I, city: "Islamabad", area: "G-5", client: "PWD", consultant: "Matrix Design", civilContractor: "HRL", image: img("islamabad-high-court", 271, 150) },
  { slug: "pakistan-cricket-board-house", name: "Pakistan Cricket Board House", sector: I, city: "Lahore", area: "Jail Road", client: "PCB", consultant: "NESPAK", civilContractor: "Shahzaman", image: img("pakistan-cricket-board-house", 273, 210) },
  { slug: "prime-minister-house-conference-hall-and-office-block", name: "Conference Hall and Office Block at Prime Minister House", sector: I, city: "Islamabad", client: "PWD", consultant: "NESPAK", civilContractor: "Ch. Mubarak", image: img("prime-minister-house-conference-hall-and-office-block", 268, 149) },
  { slug: "philippine-embassy", name: "Philippine Embassy", sector: I, city: "Islamabad", area: "Diplomatic Enclave", client: "Philippine Embassy", consultant: "SEM Engineers", civilContractor: "Gold Roof", image: img("philippine-embassy", 270, 156) },
  { slug: "turkish-embassy-staff-lodges", name: "Turkish Embassy Staff Lodges", sector: I, city: "Islamabad", area: "Diplomatic Enclave", client: "Ministry of Foreign Affairs", consultant: "Gürmen Mühendislik Ltd. Şti.", civilContractor: "Siyah Kalem", mepContractor: "Cozmuler", image: img("turkish-embassy-staff-lodges", 270, 150) },
  { slug: "jordan-ambassador-residence", name: "Jordan Ambassador Residence", sector: I, city: "Islamabad", area: "Diplomatic Enclave", client: "Jordan Embassy", consultant: "Design Advisor", civilContractor: "Gold Roof", image: img("jordan-ambassador-residence", 278, 188) },
  { slug: "lecole-school-lahore", name: "Lecole School Khayaban-e-Khair ud Din", sector: I, city: "Lahore", client: "Lecole School", consultant: "Suhail Ahmed Associates", civilContractor: "EMC", image: img("lecole-school-lahore", 310, 152) },
  { slug: "fauji-foundation-nursing-college", name: "Fauji Foundation Nursing College", sector: I, client: "Pro Health", consultant: "Global Hi-Tech", image: img("fauji-foundation-nursing-college", 271, 147) },

  // The name does not say what kind of building these are: listed under "More Projects"
  { slug: "see-3-development", name: "SEE 3 Development", client: "Arctec Design Consultant", consultant: "Sohail Associate", image: img("see-3-development", 270, 284) },
  { slug: "bee-3-development", name: "BEE 3 Development", client: "Arctec Design Consultant", consultant: "Sohail Associate", image: img("bee-3-development", 270, 284) },
  { slug: "see-2-development", name: "SEE 2 Development", client: "Arctec Design Consultant", consultant: "Sohail Associate", image: img("see-2-development", 270, 284) },
  { slug: "trust-one-diplomatic-enclave", name: "Trust One Diplomatic Enclave", client: "Trust One Diplomatic Enclave", consultant: "Sohail Associate", image: img("trust-one-diplomatic-enclave", 270, 150) },
  { slug: "grand-hyat-towers", name: "Grand Hyat Towers", city: "Islamabad", area: "One Constitution Avenue", client: "BNP (Pvt.) Ltd", civilContractor: "S. Mehboob & Company", image: img("grand-hyat-towers-islamabad", 1121, 544) },
  { slug: "jazz-destiny", name: "Jazz Destiny", city: "Islamabad", client: "Mobilink Jazz", consultant: "SRDW Design Works", image: img("jazz-destiny", 272, 335) },
];
