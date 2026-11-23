import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/types";

/**
 * Key facts panel. Rows render only when the value is confirmed — empty fields
 * are hidden, never filled in. Anything still missing is listed in a pending
 * note (TODO: client to confirm — content/projects.ts).
 */
export function KeyFacts({ project: p }: { project: Project }) {
  const rows: [string, string | undefined][] = [
    ["Client / developer", p.client],
    ["Main contractor", p.mainContractor],
    ["Consultant", p.consultant],
    ["UMS role & package", p.umsRole],
    ["Timeline", p.timeline],
  ];
  const confirmed = rows.filter((r): r is [string, string] => !!r[1]);

  return (
    <aside aria-labelledby="facts-title" className="border border-line bg-white lg:sticky lg:top-40">
      <div className="border-t-2 border-navy p-6">
        <h2
          id="facts-title"
          className="font-heading text-lg font-semibold uppercase tracking-[0.08em] text-navy"
        >
          Key facts
        </h2>
        {confirmed.length > 0 && (
          <dl className="mt-5 divide-y divide-line">
            {confirmed.map(([k, v]) => (
              <div key={k} className="py-3">
                <dt className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {k}
                </dt>
                <dd className="mt-1 text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        )}
        {p.pending.length > 0 && (
          <div className="mt-5 border border-dashed border-[#b9770e] bg-[#fff6e5] p-4">
            <Badge tone="pending" className="border-0 bg-transparent p-0">
              To be confirmed by UMS
            </Badge>
            <ul className="mt-3 space-y-1 text-sm text-[#7a4b00]">
              {p.pending.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden>·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}
