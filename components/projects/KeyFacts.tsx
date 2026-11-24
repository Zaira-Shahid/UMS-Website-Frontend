import type { Project } from "@/types";

/** Key facts panel for a case study. */
export function KeyFacts({ project: p }: { project: Project }) {
  const rows: [string, string][] = [
    ["Client / developer", p.client],
    ["Main contractor", p.mainContractor],
    ["Consultant", p.consultant],
    ["UMS role & package", p.umsRole],
    ["Area", `${p.areaSqFt.toLocaleString("en-US")} sq ft`],
    ["Timeline", p.timeline],
    ["UMS team on site", `${p.teamSize} engineers and technicians`],
  ];

  return (
    <aside aria-labelledby="facts-title" className="border border-line bg-white lg:sticky lg:top-40">
      <div className="border-t-2 border-navy p-6">
        <h2
          id="facts-title"
          className="font-heading text-lg font-semibold uppercase tracking-[0.08em] text-navy"
        >
          Key facts
        </h2>
        <dl className="mt-5 divide-y divide-line">
          {rows.map(([k, v]) => (
            <div key={k} className="py-3">
              <dt className="mono-label text-muted">{k}</dt>
              <dd className="mt-1 text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  );
}
