import { ButtonLink } from "@/components/ui/Button";


/**
 * "A seamless experience": the studio's promise beneath a centred title in the site's heading voice, closing
 * on the way into its finished homes.
 */
export function SeamlessExperience() {
  return (
    <section aria-labelledby="seamless-title" className="bg-ivory pb-14 md:pb-20">
      <div className="container-site">
        <div className="flex flex-col items-center text-center">
          <h2
            id="seamless-title"
            className="caps font-display text-[min(clamp(2.6rem,1rem+4vw,4.75rem),max(2.1rem,0.2rem+10vw))] leading-[0.86] font-normal tracking-[-0.055em] text-ink [clip-path:none]!"
            data-reveal
          >
            A seamless{" "}
            <em className="inline-block font-script text-[1.3em] leading-[0] font-normal tracking-normal normal-case not-italic text-oxblood">
              Experience.
            </em>
          </h2>
          <p className="mt-6 max-w-2xl leading-[1.55] text-muted" data-reveal>
            With Home Karigar, transforming your home is a single, unhurried journey. While we do the heavy lifting, all you need to
            do is walk into your new home.
          </p>
        </div>


        <div className="mt-10 flex justify-center" data-reveal>
          <ButtonLink href="/projects" variant="timber" icon="arrowUpRight">
            See all projects
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
