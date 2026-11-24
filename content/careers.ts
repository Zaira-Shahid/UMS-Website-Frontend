import type { Career } from "@/types";
import { dummyBenefits, dummyCareers, dummyCulture } from "./dummy";

/** Open positions. Values come from content/dummy.ts. */
export const careers: Career[] = dummyCareers;

/** Working at UMS: three culture statements. */
export const culture = dummyCulture;

/** Benefits offered. */
export const benefits: { title: string }[] = dummyBenefits.map((title) => ({ title }));

/** How to apply: steps follow what the application form does. */
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
