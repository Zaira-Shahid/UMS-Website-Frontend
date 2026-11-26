import Image from "@/components/ui/StaticImage";
import { ArrowRight } from "@/components/ui/lucide";
import { Button } from "@/components/ui/Button";

const circles = ["/images/projects/circles/circle-1.jpg", "/images/projects/circles/circle-2.jpg", "/images/projects/circles/circle-3.jpg"];

/** "Explore Our Project Experience" band (mockup 18): navy rounded panel, text and a button on the left, building circles on the right. */
export function ProjectBand() {
  return (
    <section aria-labelledby="project-band-title" className="wrap py-10 md:py-14">
      <div className="grid items-center gap-8 rounded-3xl bg-navy-950 px-6 py-8 text-white md:grid-cols-[1.2fr_1fr] md:px-12 md:py-10">
        <div>
          <h2 id="project-band-title" className="text-[clamp(1.75rem,1rem+2.4vw,3rem)] font-extrabold leading-tight text-white">
            Explore Our Project Experience
          </h2>
          <span aria-hidden className="mt-4 block h-1.5 w-[5.5rem] rounded bg-cyan" />
          <p className="mt-4 max-w-md text-base text-white md:text-xl">See the projects we have worked on, by sector.</p>
          <Button href="/projects" size="lg" className="mt-6">
            View Projects
            <ArrowRight aria-hidden className="size-5" />
          </Button>
        </div>
        <div className="text-center">
          <ul className="mx-auto grid max-w-[22rem] grid-cols-2 justify-items-center gap-3">
            {circles.map((src, i) => (
              <li key={src} className={`relative size-[clamp(6rem,30vw,9rem)] overflow-hidden rounded-full border-2 border-cyan ${i === 2 ? "col-span-2" : ""}`}>
                <Image src={src} alt="" fill sizes="144px" className="object-cover" />
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm italic text-white/80">Illustrative imagery</p>
        </div>
      </div>
    </section>
  );
}
