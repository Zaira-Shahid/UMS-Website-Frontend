import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectList } from "@/components/projects/ProjectList";

/** Homepage project index. Names only: no details are shown until the owner confirms them. */
export function FeaturedProjects() {
  return (
    <section
      aria-labelledby="projects-title"
      className="relative isolate overflow-hidden bg-navy-900 py-20 text-white md:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div id="projects-title">
            <SectionHeading tone="light" index="02" label="Projects" title="Selected projects" />
          </div>
          <Button href="/projects" variant="outline-light" size="lg" arrow>
            All projects
          </Button>
        </div>
        <div className="mt-12">
          <ProjectList />
        </div>
      </div>
    </section>
  );
}
