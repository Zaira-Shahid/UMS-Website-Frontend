"use client";

import { useSearchParams } from "next/navigation";
import { resolveQuotePreselect } from "@/lib/forms/rfq";
import { RfqForm } from "./RfqForm";

/**
 * Starts the quote form with what the URL asks for: ?service=hvac,fire-fighting  ?project=<slug>  ?sector=<slug>.
 * Invalid values are ignored. Read in the browser so the page itself stays static (its metadata is then in the head).
 */
export function RfqFromUrl() {
  const params = useSearchParams();
  const preselect = resolveQuotePreselect({
    service: params.get("service") ?? undefined,
    project: params.get("project") ?? undefined,
    sector: params.get("sector") ?? undefined,
  });
  // key: a different preselection (new URL) remounts the form with fresh defaults
  return <RfqForm key={`${preselect.services.join(",")}|${preselect.project?.slug ?? ""}|${preselect.sector ?? ""}`} preselect={preselect} />;
}
