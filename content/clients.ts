/**
 * Clients and project partners shown on the homepage (PROJECT_SPEC.md H5).
 * Only entries with `verified: true` AND a logo file are shown. The five names below come from the design mockup and
 * have NOT been confirmed as UMS clients, so they stay hidden until the owner confirms the relationship and supplies
 * the logo files (see CONTENT_TO_VERIFY.md). With no verified entries the whole section is hidden.
 */
export interface Client {
  name: string;
  /** Path under /public, e.g. "/images/clients/bnp.svg". */
  logo?: string;
  verified: boolean;
}

export const clients: Client[] = [
  { name: "BNP", verified: false },
  { name: "Venture Engineering (Pvt) Ltd", verified: false },
  { name: "Banu Mukhtar", verified: false },
  { name: "Mecatech", verified: false },
  { name: "Gold Roof Private Limited", verified: false },
];

export const verifiedClients = clients.filter((c): c is Client & { logo: string } => c.verified && Boolean(c.logo));
