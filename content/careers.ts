import type { Career } from "@/types";

/** No openings are published until UMS supplies them. */
export const careers: Career[] = [];

/**
 * Working at UMS. Nothing about culture or benefits has been supplied, so these are
 * empty slots that render as "to be confirmed" placeholders — never invented perks.
 * TODO: client to confirm — culture statements and the benefits actually offered.
 */
export const culture: { icon: "users" | "graduation" | "building"; title?: string; description?: string }[] = [
  { icon: "users" },
  { icon: "graduation" },
  { icon: "building" },
];

export const benefits: { title?: string }[] = [{}, {}, {}, {}, {}, {}];

/**
 * How to apply. These steps describe what the website's application form does, which is
 * known. What UMS does after receiving an application is not, so that is a placeholder.
 */
export const applySteps: { title: string; description: string }[] = [
  {
    title: "Choose how to apply",
    description: "Pick an open position from the list, or send a general application if there is none that fits.",
  },
  {
    title: "Fill in the form",
    description: "Add your name, email address and phone number, then attach your CV as a PDF of up to 5 MB.",
  },
  {
    title: "Submit and keep your reference",
    description: "You receive a reference number on screen and a confirmation by email.",
  },
];
