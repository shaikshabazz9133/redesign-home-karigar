import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The communities, in the order they pass: The Prestige City (with its three phases set above it), then
 * Prestige Finsbury, Prestige Waterford and the rest — each followed by the Prestige Group mark.
 */
const COMMUNITIES: { name: string; phases?: string[] }[] = [
  { name: "The Prestige City", phases: ["Avlon", "Meridian", "Eden"] },
  { name: "Prestige Finsbury" },
  { name: "Prestige Waterford" },
  { name: "Eton Park" },
  { name: "Aston Park" },
  { name: "Prestige Park Grove" },
  { name: "Prestige Lavender Fields" },
  { name: "Prestige Raintree Park" },
];

/**
 * A slow, endless ticker of the communities the studio has delivered homes in, each name followed by the
 * Prestige Group mark. Two identical runs slide left by exactly one run's width, so the loop never seams;
 * it pauses on hover and stands still for reduced motion. CSS only.
 */
export function CommunityMarquee({ className }: { className?: string }) {
  const run = (copy: number) => (
    <ul key={copy} className="flex shrink-0 items-center" aria-hidden>
      {COMMUNITIES.map((c) => (
        <li key={c.name} className="flex shrink-0 items-center">
          <span className="flex flex-col items-center px-[clamp(1.25rem,3vw,2.5rem)] text-center">
            {c.phases && (
              <span className="mb-1 font-sans text-[clamp(0.5625rem,0.5rem+0.2vw,0.6875rem)] font-medium tracking-[0.28em] text-brass-ink uppercase">
                {c.phases.join(" · ")}
              </span>
            )}
            <span className="font-script text-[clamp(1.6rem,1.2rem+1.4vw,2.5rem)] leading-[1.15] font-normal whitespace-nowrap text-oxblood">
              {c.name}
            </span>
          </span>
          <Image
            src="/images/prestige-logo.png"
            alt=""
            width={700}
            height={859}
            sizes="5rem"
            className="h-[clamp(2.25rem,1.75rem+1.3vw,3.25rem)] w-auto shrink-0"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-labelledby="communities-title" className={cn("bg-ivory pt-0 pb-7 md:pb-10", className)}>
      <h2 id="communities-title" className="container-site mb-5 text-center text-[0.9375rem] tracking-[-0.01em] text-muted">
        Homes delivered across Prestige communities
      </h2>
      <p className="sr-only">
        {COMMUNITIES.map((c) => (c.phases ? `${c.name} (${c.phases.join(", ")})` : c.name)).join(", ")}.
      </p>
      <div className="hk-marquee group flex overflow-hidden border-y border-line py-4 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] md:py-5">
        <div className="hk-marquee-track flex w-max group-hover:[animation-play-state:paused]">
          {/* Two identical runs, each wider than the widest screen; the track slides by half its width. */}
          {[0, 1].map(run)}
        </div>
      </div>
    </section>
  );
}
