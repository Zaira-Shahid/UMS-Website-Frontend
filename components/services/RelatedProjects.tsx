import { ProjectCard } from "@/components/projects/ProjectCard";
import { Badge } from "@/components/ui/Badge";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProjects } from "@/lib/projects";
import { projectsForService } from "@/lib/related";
import type { Service } from "@/types";

/**
 * Related projects: case-study cards whose CONFIRMED scope includes this service.
 * Until the client confirms which services each project delivered, none match —
 * the section then falls back to three featured case studies with a note, so it
 * is never empty and never implies a scope that has not been confirmed
 * (TODO: client to confirm — services per project in content/projects.ts).
 */
export function RelatedProjects({ service }: { service: Service }) {
  const matched = projectsForService(service.slug);
  const isFallback = matched.length === 0;
  const shown = isFallback ? featuredProjects(3) : matched;

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative isolate scroll-mt-32 overflow-hidden bg-navy-900 py-20 text-white md:py-28"
    >
      <BlueprintGrid variant="dark" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div id="projects-title">
            <SectionHeading
              tone="light"
              accent={service.accent}
              index="04"
              label="Projects"
              title={isFallback ? "Featured projects" : "Related projects"}
              description={
                isFallback
                  ? "A selection of UMS case studies while project scopes are confirmed."
                  : `Case studies where ${service.shortName} formed part of the scope.`
              }
            />
          </div>
          <Button href="/projects" variant="outline-light" arrow>
            All projects
          </Button>
        </div>

        {isFallback && (
          // TODO: client to confirm which services UMS delivered on each project
          <p className="mt-8">
            <Badge tone="pending">Project scopes to be confirmed</Badge>
          </p>
        )}

        <Reveal stagger as="div" className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <RevealItem key={p.slug}>
              <ProjectCard
                project={p}
                index={i}
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
