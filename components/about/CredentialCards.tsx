import { Award, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { certifications, pecRegistration } from "@/content/about";
import { site } from "@/content/site";

/** PEC registration card. */
export function PecCard() {
  const p = pecRegistration;
  const rows: [string, string][] = [
    ["Registration number", p.registrationNumber],
    ["Category", p.category],
    ["Valid until", p.validUntil],
  ];
  return (
    <article aria-labelledby="pec-title" className="border border-line bg-white">
      <div className="border-t-2 border-navy p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <span className="flex size-12 items-center justify-center border border-cyan/40 text-cyan">
            <ShieldCheck aria-hidden className="size-6" />
          </span>
          <div>
            <h2 id="pec-title" className="text-[1.5rem] text-navy">
              Pakistan Engineering Council registration
            </h2>
            <p className="text-sm text-muted">Professional registration of the company</p>
          </div>
        </div>
        <dl className="mt-6 divide-y divide-line border-y border-line">
          {rows.map(([k, v]) => (
            <div key={k} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr]">
              <dt className="text-sm text-muted">{k}</dt>
              <dd className="text-ink">{v}</dd>
            </div>
          ))}
          <div className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr]">
            <dt className="text-sm text-muted">Verification</dt>
            <dd>
              <a
                href={p.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-cyan underline underline-offset-4"
              >
                Verify this registration<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

/** Grid of certifications UMS holds. */
export function CertificationGrid() {
  return (
    <Reveal stagger as="ul" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {certifications.map((c) => (
        <RevealItem key={c.name} as="li">
          <article className="h-full border border-line bg-white p-6">
            <span className="flex size-12 items-center justify-center border border-cyan/40 text-cyan">
              <Award aria-hidden className="size-6" />
            </span>
            <h3 className="mt-5 text-navy">{c.name}</h3>
            <p className="mt-1 text-muted">{c.issuer}</p>
            <p className="mt-1 text-sm text-muted">Valid until {c.validUntil}</p>
            <p className="mono-label mt-3 text-steel">{c.reference}</p>
          </article>
        </RevealItem>
      ))}
    </Reveal>
  );
}

/** Company profile download. */
export function CompanyProfileButton({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <Button href={site.companyProfileUrl} variant={tone === "dark" ? "outline-light" : "outline"} size="lg" download>
      Download company profile (PDF)
    </Button>
  );
}
