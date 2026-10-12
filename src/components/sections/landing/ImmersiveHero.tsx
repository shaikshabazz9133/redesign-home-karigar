import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

/** An Imperial Script capital set into the Jost line, 1.75× its size, as in the "HARMONY DESIGN" reference. */
export function Swash({
  children,
  className = "mr-[0.02em]",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-block font-script text-[1.75em] font-normal normal-case leading-[0] tracking-normal ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Full-bleed opening frame: a double-height living room with the studio's
 * promise set in its centre. The entrance (a slow settle on the photograph,
 * then the words rising in) waits for the intro preloader to lift — see
 * `.hk-hero-*` in globals.css — and plays immediately when there is no intro.
 */
export function ImmersiveHero() {
  // Phones: a full-height, side-cropped frame. From md up the section takes the photograph's own
  // proportions, so the whole room — ceiling to floor inlay — is shown uncropped.
  return (
    <section
      aria-labelledby="hero-title"
      className="on-dark relative isolate flex min-h-[100svh] items-center overflow-hidden bg-espresso text-ivory md:aspect-[2560/1969] md:min-h-0 md:items-start"
    >
      <div className="hk-hero-photo absolute inset-0 -z-20">
        <Image
          src="/images/hero/double-height-living.jpg"
          alt="Double-height living room with a floating timber staircase, fluted glass partitions and sculptural pendant lights"
          fill
          preload
          fetchPriority="high"
          quality={85}
          sizes="100vw"
          className="object-cover max-md:object-[56%_50%]"
        />
      </div>
      {/* Scrim: deepest behind the words and at the edges, so the room still reads as light. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_50%_50%,rgb(29_24_21/0.62),rgb(29_24_21/0.28)_70%,rgb(29_24_21/0.5))] md:bg-[radial-gradient(48%_52%_at_50%_50%,rgb(29_24_21/0.6),rgb(29_24_21/0.22)_72%,rgb(29_24_21/0.45))]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-espresso/55 to-transparent"
      />

      <div className="container-site flex flex-col items-center py-32 text-center md:pb-24 md:pt-[clamp(8rem,19vw,17rem)]">
        <p className="hk-hero-in eyebrow flex items-center gap-3 text-white [--d:0ms]">
          <span
            aria-hidden
            className="hidden h-px w-10 shrink-0 bg-white/70 sm:block"
          />
          <span className="text-balance">
            Luxury Interior Design Studio in Bengaluru
          </span>
          <span
            aria-hidden
            className="hidden h-px w-10 shrink-0 bg-white/70 sm:block"
          />
        </p>

        <h1
          id="hero-title"
          className="mt-[0.45em] font-hero text-[clamp(2.9rem,1.3rem+7.2vw,7.5rem)] font-light leading-[0.98] tracking-[-0.01em] text-white [text-shadow:0_2px_40px_rgb(29_24_21/0.45)]"
        >
          {/* Light sans capitals with copperplate swash capitals for the D and S. The swash
              letters are real text (the heading still reads "Designing spaces") and carry
              no line height, so their flourishes overflow without opening up the lines. */}
          <span className="hk-hero-in block font-caps text-[0.66em] font-light uppercase tracking-[0.03em] [--d:120ms]">
            <Swash>D</Swash>esigning{" "}
            <Swash className="-ml-[0.04em] mr-[0.06em]">S</Swash>paces
          </span>{" "}
          <span className="hk-hero-in mt-[0.12em] block font-caps text-[0.66em] font-light tracking-[0.03em] [--d:240ms]">
            that age beautifully.
          </span>
        </h1>

        <div className="hk-hero-in mt-10 flex w-full max-w-xs flex-col items-center gap-3 [--d:420ms] sm:w-auto sm:max-w-none sm:flex-row">
          <ButtonLink
            href="/contact"
            variant="leaf"
            size="sm"
            icon="arrowUpRight"
            className="w-full sm:w-auto"
          >
            Begin Your Project
          </ButtonLink>
          <ButtonLink
            href="/projects"
            variant="leaf-outline"
            size="sm"
            icon="arrowUpRight"
            className="w-full sm:w-auto"
          >
            Explore Our Homes
          </ButtonLink>
        </div>
      </div>

      {/* Full-bleed wordmark across the floor, edge to edge, its feet cropped by the frame. */}
      <p
        aria-hidden
        className="hk-hero-in pointer-events-none absolute inset-x-0 bottom-0 translate-y-[0.14em] select-none whitespace-nowrap text-center font-grotesk text-[12.35vw] font-bold uppercase leading-[0.8] tracking-[-0.045em] text-white [--d:520ms]"
      >
        Home Karigar’s
      </p>
    </section>
  );
}
