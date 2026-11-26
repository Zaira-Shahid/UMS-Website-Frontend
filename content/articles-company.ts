import type { Article } from "./articles";
import { projects } from "./projects";

/**
 * Blog posts about UMS itself. Every statement comes from the company's own profile (UMS Profile.pdf) and is reported as what
 * UMS says ("the profile says", "UMS describes"), so nothing here is a claim the company has not made. There are no figures,
 * dates, prices or certificate numbers, and no promises beyond the profile's own words. Attribution is the constant
 * `insightAuthor` in content/insights.ts.
 */

const inSector = (sector: string) => projects.filter((p) => p.sector === sector);
const names = (list: { name: string }[], n: number) => list.slice(0, n).map((p) => p.name).join(", ");

const portfolio = {
  healthcare: inSector("healthcare"),
  commercial: inSector("commercial-retail"),
  residential: inSector("residential-mixed-use"),
  institutional: inSector("education-institutional"),
};
const unsorted = projects.filter((p) => !p.sector);

export const companyArticles: Article[] = [
  {
    slug: "about-ultimate-mechanical-solutions",
    title: "About Ultimate Mechanical Solutions",
    category: "company",
    excerpt: "UMS is an MEP contractor working in fire fighting and suppression, electrical, plumbing and HVAC, with offices in Islamabad and Lahore.",
    services: ["integrated-mep"],
    intro:
      "Ultimate Mechanical Solutions (UMS) is an MEP contractor. Its company profile describes expertise in MEP works, including fire fighting and fire suppression systems, electrical works, plumbing works and HVAC services.",
    sections: [
      {
        heading: "How UMS works with clients",
        body: [
          "The profile says UMS takes a distinct approach to each client, catering to their specific needs and meeting their expectations exactly. It describes its crew as skilled, experienced and professional, and dedicated to providing the best possible MEP services.",
        ],
      },
      {
        heading: "The team",
        body: [
          "The profile describes the company's engineers and technicians as highly qualified and technically proficient, and says this team allows UMS to capture a large share of the market. In its own words, UMS strives to supply the very best of M&P installation, working with clients to develop the right scope of work.",
        ],
      },
      {
        heading: "Where UMS works",
        body: [
          "UMS reports that it is executing a number of projects in commercial, residential and industrial premises. The company has offices in Islamabad and Lahore; their addresses and contact details are on the Contact page, and the projects named in the company profile are on the Projects page.",
        ],
      },
    ],
  },
  {
    slug: "our-mission-vision-and-commitment",
    title: "Our Mission, Vision and Commitment",
    category: "company",
    excerpt: "Three short statements in the UMS company profile set out what the company is for.",
    services: ["integrated-mep"],
    intro: "The UMS company profile sets out three short statements about what the company is for: its mission, its vision and its commitment to clients.",
    sections: [
      {
        heading: "Mission",
        body: ["The mission is to provide superior specialty contracting services by creating mutually rewarding relationships in a safe, honest and open environment."],
      },
      {
        heading: "Vision",
        body: ["The vision is to develop a platform that provides ultimate and precise solutions for M&P related projects."],
      },
      {
        heading: "Commitment",
        body: [
          "The profile says the company's dedication and commitment to its clients and companions has played an important role in its success. In a short time, it reports, UMS has completed a wide variety of projects, and it says it will not rest until it has produced more ground-breaking projects that offer great value to its clients and customers.",
          "Client satisfaction and employee commitment to excellence are named as the company's top priorities.",
        ],
      },
    ],
  },
  {
    slug: "our-core-values",
    title: "Our Core Values",
    category: "company",
    excerpt: "Trust, integrity, excellence, honesty, hard work and transparency: the six core values in the UMS company profile.",
    services: ["integrated-mep"],
    intro: "The UMS company profile lists six core values. This is what the profile says about each one.",
    sections: [
      { heading: "Trust", body: ["UMS values the trust its clients place in it and says it works diligently to maintain that trust."] },
      { heading: "Integrity", body: ["UMS says it stands by its word and always keeps its commitments."] },
      { heading: "Excellence", body: ["UMS says it passionately pursues the highest standards and always strives to excel."] },
      {
        heading: "Honesty",
        body: ["UMS recognises the importance of its clients' trust and respect, and says it works to maintain a positive atmosphere for everyone."],
      },
      {
        heading: "Hard work",
        body: ["UMS promises to put 100% into everything it does for its clients, to help make them leaders in their markets."],
      },
      {
        heading: "Transparency",
        body: [
          "UMS says it will always be open and upfront with its clients, with no hidden agendas. It says it values honesty and its clients' opinions, so that clients will find the company transparent.",
        ],
      },
    ],
  },
  {
    slug: "how-our-team-is-organised",
    title: "How Our Team Is Organised",
    category: "company",
    excerpt: "The organisation chart in the UMS company profile, from management to the people on site.",
    services: ["integrated-mep"],
    intro: "The UMS company profile includes an organisation chart. This is what it shows.",
    sections: [
      {
        heading: "Management and support",
        body: [
          "The chart shows a CEO and a General Manager. Alongside them it lists Accounts and Administration, QA and QC, a Projects Manager and an HSE Department.",
        ],
      },
      {
        heading: "On site",
        body: ["The chart lists site engineers, a site supervisor, technicians and a draftsman."],
      },
      {
        heading: "Quality and safety as their own functions",
        body: ["QA and QC, and HSE (health, safety and environment), each appear as a department of their own in the chart rather than as part of another team."],
      },
    ],
  },
  {
    slug: "plumbing-solutions-we-provide",
    title: "Plumbing Solutions We Provide",
    category: "our-work",
    excerpt: "From hot and cold water supply to drainage and sewage treatment: the plumbing work listed in the UMS company profile.",
    services: ["plumbing"],
    intro: "The services page of the UMS company profile groups its plumbing work under the heading Plumbing Solutions.",
    sections: [
      {
        heading: "What it covers",
        body: [
          "The profile lists: hot and cold water supply systems, water filtration systems, irrigation systems, drainage systems, rain water systems, sewage treatment systems and LPG and natural gas systems.",
        ],
      },
      {
        heading: "More on this service",
        body: ["The Plumbing & Public Health page of this site describes how UMS approaches this discipline."],
      },
    ],
  },
  {
    slug: "hvac-solutions-we-provide",
    title: "HVAC Solutions We Provide",
    category: "our-work",
    excerpt: "Central plant, VRF systems, ductwork, chilled water piping and boilers: the HVAC work listed in the UMS company profile.",
    services: ["hvac"],
    intro: "The services page of the UMS company profile groups its heating, ventilation and air-conditioning work under the heading HVAC Solutions.",
    sections: [
      {
        heading: "What it covers",
        body: ["The profile lists: central plant heating and cooling systems, VRF systems, duct work, chilled water piping and boiler installation."],
      },
      {
        heading: "More on this service",
        body: ["The HVAC Systems page of this site describes how UMS approaches this discipline."],
      },
    ],
  },
  {
    slug: "fire-fighting-works-we-provide",
    title: "Fire Fighting Works We Provide",
    category: "our-work",
    excerpt: "Sprinklers, hydrants, hose reels and cabinets, pump rooms and suppression: the fire fighting work listed in the UMS company profile.",
    services: ["fire-fighting"],
    intro: "The services page of the UMS company profile groups its fire protection work under the heading Fire Fighting Works.",
    sections: [
      {
        heading: "What it covers",
        body: [
          "The profile lists: fire sprinkler systems, fire hydrant systems, fire hose reels, fire hose cabinets, fire fighting pump rooms and fire suppression systems.",
        ],
      },
      {
        heading: "More on this service",
        body: ["The Fire Fighting & Protection page of this site describes how UMS approaches this discipline."],
      },
    ],
  },
  {
    slug: "electrical-and-elv-solutions-we-provide",
    title: "Electrical and ELV Solutions We Provide",
    category: "our-work",
    excerpt: "Transmission, extra low voltage, fire alarm, public address and LT panels: the electrical work listed in the UMS company profile.",
    services: ["electrical-elv"],
    intro: "The services page of the UMS company profile groups its electrical work under the heading Electrical Solutions.",
    sections: [
      {
        heading: "What it covers",
        body: [
          "The profile lists: high transmission line works, extra low voltage (ELV) systems, fire alarm systems, public address systems and low tension (LT) panels.",
        ],
      },
      {
        heading: "More on this service",
        body: ["The Electrical & ELV page of this site describes how UMS approaches this discipline."],
      },
    ],
  },
  {
    slug: "fountain-and-swimming-pool-solutions-we-provide",
    title: "Fountain and Swimming Pool Solutions We Provide",
    category: "our-work",
    excerpt: "Swimming pool systems, fountains and water falls: the water feature work listed in the UMS company profile.",
    services: ["pools-fountains"],
    intro: "The services page of the UMS company profile groups its water feature work under the heading Fountain & Swimming Pool Solutions.",
    sections: [
      {
        heading: "What it covers",
        body: ["The profile lists: swimming pool systems, fountains and water falls."],
      },
      {
        heading: "More on this service",
        body: ["The Pools & Fountains page of this site describes how UMS approaches this discipline."],
      },
    ],
  },
  {
    slug: "our-project-portfolio-at-a-glance",
    title: "Our Project Portfolio at a Glance",
    category: "our-work",
    excerpt: `The ${projects.length} projects named in the UMS company profile: hospitals, malls and offices, apartments, and institutional buildings.`,
    services: ["integrated-mep"],
    intro: `The UMS company profile names ${projects.length} projects. Each has its own page, with its client, consultant and contractors as the profile gives them. The projects are grouped here by the kind of building their names describe.`,
    sections: [
      {
        heading: `Healthcare (${portfolio.healthcare.length})`,
        body: [`Hospitals and medical buildings, including ${names(portfolio.healthcare, 5)}.`],
      },
      {
        heading: `Commercial and retail (${portfolio.commercial.length})`,
        body: [`Malls, offices and commercial buildings, including ${names(portfolio.commercial, 5)}.`],
      },
      {
        heading: `Residential (${portfolio.residential.length})`,
        body: [`Apartment buildings and residences: ${names(portfolio.residential, 4)}.`],
      },
      {
        heading: `Institutional (${portfolio.institutional.length})`,
        body: [`Courts, embassies, schools and public buildings, including ${names(portfolio.institutional, 5)}.`],
      },
      {
        heading: `More projects (${unsorted.length})`,
        body: [`Projects whose names do not say what kind of building they are: ${names(unsorted, unsorted.length)}.`],
      },
    ],
  },
];
