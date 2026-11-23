"use client";

import { industries } from "@/content/industries";
import { services } from "@/content/services";
import {
  projectLocations,
  type ProjectFilters,
  type ProjectTab,
} from "@/lib/projects";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  count: number;
}

function Group({
  legend,
  options,
  value,
  onChange,
  emptyNote,
}: {
  legend: string;
  options: Option[];
  value: string | undefined;
  onChange: (v: string | undefined) => void;
  emptyNote?: string;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-cyan-300">
        {legend}
      </legend>
      {options.length === 0 ? (
        <p className="mt-3 border border-dashed border-white/25 p-3 text-sm text-white/65">
          {emptyNote}
        </p>
      ) : (
        <div className="mt-3 flex flex-wrap gap-2">
          {options.map((o) => {
            const on = value === o.value;
            return (
              <button
                key={o.value}
                type="button"
                aria-pressed={on}
                onClick={() => onChange(on ? undefined : o.value)}
                className={cn(
                  "inline-flex min-h-9 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                  on
                    ? "border-cyan-300 bg-cyan-300 text-navy-900"
                    : "border-white/25 text-white/85 hover:border-white hover:text-white",
                )}
              >
                {o.label}
                <span className={cn("text-xs tabular-nums", on ? "text-navy-900/70" : "text-white/50")}>
                  {o.count}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </fieldset>
  );
}

/**
 * The four library filters — status, sector, location, service. Shared by the
 * desktop sidebar (applies instantly) and the mobile bottom sheet (applies on
 * "Apply"). Counts are totals across all projects, so unconfirmed attributes
 * show 0 rather than being guessed.
 */
export function FilterPanel({
  value,
  onChange,
}: {
  value: ProjectFilters;
  onChange: (next: ProjectFilters) => void;
}) {
  const status = value.tab === "completed" || value.tab === "ongoing" ? value.tab : undefined;

  const statusOptions: Option[] = (["completed", "ongoing"] as const).map((s) => ({
    value: s,
    label: s === "completed" ? "Completed" : "Ongoing",
    count: projects.filter((p) => p.status === s).length,
  }));
  const sectorOptions: Option[] = industries.map((i) => ({
    value: i.slug,
    label: i.name,
    count: projects.filter((p) => p.sector === i.slug).length,
  }));
  const serviceOptions: Option[] = services.map((s) => ({
    value: s.slug,
    label: s.shortName,
    count: projects.filter((p) => p.services.includes(s.slug)).length,
  }));
  const locationOptions: Option[] = projectLocations().map((l) => ({
    value: l,
    label: l,
    count: projects.filter((p) => p.location === l).length,
  }));

  return (
    <div className="space-y-7">
      <Group
        legend="Status"
        options={statusOptions}
        value={status}
        onChange={(v) =>
          onChange({
            ...value,
            // Status is the tab; clearing it returns to "All", but never leaves "Featured".
            tab: (v as ProjectTab | undefined) ?? (value.tab === "featured" ? "featured" : "all"),
          })
        }
      />
      <Group
        legend="Sector"
        options={sectorOptions}
        value={value.sector}
        onChange={(v) => onChange({ ...value, sector: v as ProjectFilters["sector"] })}
      />
      <Group
        legend="Location"
        options={locationOptions}
        value={value.location}
        onChange={(v) => onChange({ ...value, location: v })}
        emptyNote="Project locations will appear here once UMS confirms them."
      />
      <Group
        legend="Service"
        options={serviceOptions}
        value={value.service}
        onChange={(v) => onChange({ ...value, service: v as ProjectFilters["service"] })}
      />
    </div>
  );
}
