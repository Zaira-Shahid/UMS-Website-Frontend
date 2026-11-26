import Image from "@/components/ui/StaticImage";
import { CalendarDays, HardHat, IdCard } from "@/components/ui/lucide";
import { Button } from "@/components/ui/Button";

/** General wording only: no certificate numbers, bodies or dates are claimed (see CONTENT_TO_VERIFY.md). */
const rows = [
  { icon: IdCard, title: "Professional Credentials", text: "Qualifications and approvals relevant to your project are confirmed on request." },
  { icon: CalendarDays, title: "Project Milestones", text: "Key milestones are planned and tracked to keep delivery organised." },
  { icon: HardHat, title: "Quality & Safety", text: "Quality and safety practices are built into every stage of delivery." },
] as const;

/** H6 Credentials & Milestones (mockup 06). Dark navy, three rows, and the folder artwork on the right. */
export function Credentials() {
  return (
    <section aria-labelledby="credentials-title" className="relative isolate overflow-hidden bg-[#072338] text-white">
      <div className="wrap grid items-center gap-8 py-12 lg:grid-cols-[1.3fr_1fr] lg:py-16">
        <div>
          <h2 id="credentials-title" className="text-[clamp(1.875rem,1rem+2.6vw,3.25rem)] font-extrabold text-white">
            Credentials &amp; Milestones
          </h2>
          <ul className="mt-8 space-y-6 lg:mt-10 lg:space-y-8">
            {rows.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-center gap-4">
                <Icon aria-hidden strokeWidth={1.5} className="size-12 shrink-0 text-blue lg:size-16" />
                <div className="border-l border-white/25 pl-4 lg:pl-5">
                  <h3 className="text-[1.25rem] font-bold text-white lg:text-[1.75rem]">{title}</h3>
                  <p className="mt-1 text-base text-white/90 lg:text-xl">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button href="/quality-safety-delivery" variant="outline-cyan" size="lg" className="mt-8 text-xl lg:mt-10">
            View Credentials
          </Button>
        </div>
        <div className="relative">
          <Image
            src="/images/sections/credentials-folder.png"
            alt=""
            width={680}
            height={580}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="mx-auto h-auto w-full max-w-[680px] lg:-mr-[6%] lg:w-[112%] lg:max-w-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_70%,transparent_100%)]"
          />
        </div>
      </div>
    </section>
  );
}
