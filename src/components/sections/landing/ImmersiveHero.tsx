import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Full-bleed opening frame, exactly one screen tall on every device: a double-height living room with
 * the studio's promise stepped across its top left, as in an architectural monograph, and the call to
 * action at its foot. The kicker sits inside the h1, so the page's main heading carries the search
 * phrase ("Luxury interior design studio in Bengaluru") as well as the promise.
 *
 * The entrance (a slow settle on the photograph, then the words rising in) waits for the intro
 * preloader to lift — see `.hk-hero-*` in globals.css — and plays immediately when there is no intro.
 */
export function ImmersiveHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="on-dark relative isolate flex h-[100svh] min-h-[36rem] overflow-hidden bg-espresso text-ivory"
    >
      <div className="hk-hero-photo absolute inset-0 -z-20">
        <Image
          src="/images/hero/double-height-living.jpg"
          alt="Double-height living room in Bengaluru designed by Home Karigar, with a floating timber staircase, fluted glass partitions and sculptural pendant lights"
          fill
          preload
          fetchPriority="high"
          quality={75}
          sizes="100vw"
          className="object-cover object-[50%_55%] max-lg:object-[56%_50%]"
        />
      </div>
      {/* Scrim: deepest behind the headline (top left) and at the foot behind the call to action. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgb(29_24_21/0.62)_0%,rgb(29_24_21/0.28)_45%,rgb(29_24_21/0.12)_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-espresso/65 to-transparent"
      />

      <div className="container-site flex w-full flex-col justify-start gap-12 pb-10 pt-[clamp(6.5rem,14vh,9rem)] lg:justify-between lg:gap-0 lg:pb-[clamp(2.5rem,6vh,4.5rem)] lg:pt-[clamp(8rem,17vh,11rem)]">
        <h1 id="hero-title" className="font-display font-normal text-white">
          <span className="hk-hero-in block font-sans text-[0.9375rem] tracking-[-0.01em] text-white/80 [--d:0ms]">
            Luxury interior design studio in Bengaluru
          </span>
          <span className="sr-only"> — </span>
          {/* Stair-stepped capitals, each line set further in. The small negative margin cancels the D's
              side bearing at this size, so it lines up with the kicker above. */}
          <span className="caps -ml-[0.045em] mt-1 block text-hero md:whitespace-nowrap [text-shadow:0_2px_40px_rgb(29_24_21/0.35)]">
            <span className="hk-hero-in block [--d:120ms]">Designing</span>
            <span className="hk-hero-in block pl-[0.55em] [--d:220ms]">spaces that</span>
            <span className="hk-hero-in block whitespace-nowrap pl-[1.6em] max-sm:pl-[0.8em] [--d:320ms]">
              {/* A copperplate flourish, larger than the capitals and dropped onto their baseline. */}
              age{" "}
              <em className="ml-[0.08em] inline-block font-script text-[1.32em] not-italic font-normal leading-[0] tracking-normal">
                beautifully.
              </em>
            </span>
          </span>
        </h1>

        <div className="hk-hero-in flex flex-col items-start gap-6 [--d:460ms] sm:items-end sm:self-end sm:text-right">
          <p className="max-w-[17rem] text-[0.9375rem] leading-snug text-white/85">
            Complete homes, from 3D design to handover — build as uniquely as you.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href="/projects" variant="leaf-outline" size="md" icon="arrowUpRight" className="w-full sm:w-auto">
              Explore our homes
            </ButtonLink>
            <ButtonLink href="/contact" variant="leaf" size="md" icon="arrowUpRight" className="w-full sm:w-auto">
              Begin your project
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
