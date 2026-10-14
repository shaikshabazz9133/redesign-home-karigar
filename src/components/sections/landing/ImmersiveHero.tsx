import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { SocialLinks } from "@/components/layout/SocialRail";

/**
 * Full-bleed opening frame, one screen tall on every device (taller only if a screen is too short to hold it): a double-height living room with
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
      data-hero
      className="on-dark relative isolate flex min-h-[max(100svh,36rem)] overflow-hidden bg-espresso text-ivory"
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

      <div className="container-site flex w-full flex-col justify-between gap-10 pb-[clamp(1.75rem,5vh,3rem)] pt-[clamp(6.5rem,14vh,9rem)] lg:gap-14 lg:pb-[clamp(2.5rem,6vh,4.5rem)] lg:pt-[clamp(8rem,17vh,11rem)]">
        {/* Phones: a centred composition — an uppercase kicker, the capitals stacked on the centre line and the
            script flourish on its own line beneath. From sm up: left-aligned, stair-stepped capitals. */}
        <h1 id="hero-title" className="font-display font-normal text-white max-sm:text-center">
          <span className="hk-hero-in flex items-center gap-3 font-sans text-[0.9375rem] tracking-[-0.01em] text-white/80 [--d:0ms] max-sm:justify-center max-sm:whitespace-nowrap max-sm:text-[0.5875rem] max-sm:font-medium max-sm:uppercase max-sm:tracking-[0.14em]">
            Luxury interior design studio in Bengaluru
          </span>
          <span className="sr-only"> — </span>
          {/* The small negative margin cancels the D's side bearing, so it lines up with the kicker above.
              From sm up the size is the smaller of a width-based and a height-based measure, so on wide but
              short screens (laptops, zoomed browsers) the three lines still fit above the call to action. */}
          <span className="caps mt-1 block text-hero sm:-ml-[0.045em] sm:text-[min(clamp(2.8rem,0.5rem+8vw,7.5rem),max(2.6rem,calc((100svh_-_20rem)/3.15)))] max-sm:mt-4 max-sm:text-[clamp(2.6rem,13vw,3.5rem)] max-sm:leading-[0.92] md:whitespace-nowrap [text-shadow:0_2px_40px_rgb(29_24_21/0.35)]">
            <span className="hk-hero-in block [--d:120ms]">Designing</span>
            <span className="hk-hero-in block sm:pl-[0.55em] [--d:220ms]">spaces that</span>
            <span className="hk-hero-in block whitespace-nowrap sm:pl-[1.6em] [--d:320ms]">
              age<span className="max-sm:hidden"> </span>
              {/* A copperplate flourish, larger than the capitals; on phones it takes its own line. */}
              <em className="inline-block font-script text-[1.32em] not-italic font-normal leading-[0] tracking-normal sm:ml-[0.08em] max-sm:mt-[0.12em] max-sm:block max-sm:text-[1.05em] max-sm:leading-[1.15]">
                Beautifully.
              </em>
            </span>
          </span>
        </h1>

        {/* Foot of the hero: the studio's social links on the left, on the call to action's line; on phones
            they sit centred beneath it. Once the visitor scrolls past, the floating rail takes over. */}
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SocialLinks layout="row" className="hk-hero-in order-last [--d:560ms] sm:order-none" />
          <div className="hk-hero-in flex flex-col items-center gap-5 text-center [--d:460ms] sm:items-end sm:gap-6 sm:text-right">
            <p className="max-w-[17rem] text-[0.9375rem] leading-snug text-white/85">
              Complete homes, from 3D design to handover — build as uniquely as you.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <ButtonLink href="/projects" variant="leaf-outline" size="md" icon="arrowUpRight" className="max-sm:h-10 max-sm:gap-1.5 max-sm:px-3.5 max-sm:text-[0.625rem] max-sm:tracking-[0.06em] max-[380px]:[&>svg]:hidden">
                Explore our homes
              </ButtonLink>
              <ButtonLink href="/contact" variant="leaf" size="md" icon="arrowUpRight" className="max-sm:h-10 max-sm:gap-1.5 max-sm:px-3.5 max-sm:text-[0.625rem] max-sm:tracking-[0.06em] max-[380px]:[&>svg]:hidden">
                Begin your project
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
