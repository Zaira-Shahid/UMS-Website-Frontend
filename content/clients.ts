/**
 * Clients and project partners shown on the homepage (PROJECT_SPEC.md H5).
 * Only entries with `verified: true` AND a logo file are shown. The five names below come from the design mockup and
 * are shown with logos cropped from the approved mockup (low resolution). The owner still needs to confirm each relationship and
 * supply the original logo files (see CONTENT_TO_VERIFY.md). With no verified entries the whole section is hidden.
 */
export interface Client {
  name: string;
  /** Path under /public, e.g. "/images/clients/bnp.svg". */
  logo?: string;
  verified: boolean;
}

export const clients: Client[] = [
  { name: "BNP", logo: "/images/clients/bnp.png", verified: true },
  { name: "Venture Engineering (Pvt) Ltd", logo: "/images/clients/venture-engineering.png", verified: true },
  { name: "Banu Mukhtar", logo: "/images/clients/banu-mukhtar.png", verified: true },
  { name: "Mecatech", logo: "/images/clients/mecatech.png", verified: true },
  { name: "Gold Roof Private Limited", logo: "/images/clients/gold-roof.png", verified: true },
];

export const verifiedClients = clients.filter((c): c is Client & { logo: string } => c.verified && Boolean(c.logo));
