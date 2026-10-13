import Link from "next/link";
import { ImageFrame } from "@/components/motion/ImageFrame";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { getProject, projectHref } from "@/content/projects";
import { cn } from "@/lib/utils";

type Print = { slug: string; src: string; alt: string; ratio: string };

/** Details from delivered homes, each mounted like a print and linking to its home. */
const PRINTS = {
  emerald: {
    slug: "flat-59051-meridian-park",
    src: "/images/59051/7.jpeg",
    alt: "Master bedroom with emerald panelled walls and brass-framed mouldings",
    ratio: "aspect-[16/10]",
  },
  foyer: {
    slug: "flat-13272-avlon-park",
    src: "/images/13272/14.jpeg",
    alt: "Entrance foyer in fluted wood with brass discs and a floating shoe unit",
    ratio: "aspect-square",
  },
  kitchen: {
    slug: "flat-17193-avlon-park",
    src: "/images/17193/6.jpeg",
    alt: "Modular kitchen with handle-less cabinets and glass-fronted uppers",
    ratio: "aspect-[2/1]",
  },
  pooja: {
    slug: "flat-59051-meridian-park",
    src: "/images/59051/3.jpeg",
    alt: "Hand-painted pooja arch panel framed by wall sconces",
    ratio: "aspect-[3/4]",
  },
  lavender: {
    slug: "flat-13104-avlon-park",
    src: "/images/13104/10.jpg",
    alt: "Kids' bedroom in soft lavender panelling with an upholstered headboard",
    ratio: "aspect-[16/10]",
  },
} satisfies Record<string, Print>;

/**
 * A photograph mounted on a white card like a print. It takes its row's height and its own shape, so every
 * print in a row stands exactly as tall as the words beside it. It lifts and tilts a touch on hover.
 */
function PrintCard({ print, index }: { print: Print; index: number }) {
  const p = getProject(print.slug);
  return (
    <Link
      href={p ? projectHref(p) : "/projects"}
      aria-label={p ? `${print.alt} — see the home` : print.alt}
      className={cn(
        "group block h-full shrink-0 rounded-[3px] bg-white p-1 shadow-[0_18px_36px_-22px_rgb(29_24_21/0.45)] transition-[transform,box-shadow] duration-700 ease-out-expo hover:-translate-y-1 hover:-rotate-1 hover:shadow-[0_26px_50px_-24px_rgb(29_24_21/0.55)] sm:p-1.5",
        print.ratio,
      )}
    >
      <ImageFrame className="h-full w-full bg-linen" parallax={0.06} index={index}>
        <LoadingImage src={print.src} alt={print.alt} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
      </ImageFrame>
    </Link>
  );
}

/** The light, tight capitals the section titles use. */
const caps = "caps block font-display text-[clamp(2rem,0.9rem+2.6vw,3.6rem)] leading-[0.86] font-normal tracking-[-0.055em] text-ink";

/**
 * Every row is one fixed height: the words fill it and each print matches it, so the three rows pack
 * tight and evenly, as in a printed spread. From lg the words and prints share one line, spread across a
 * narrow centred column; below that the words take their own line with the prints in a pair beneath.
 */
const row = "flex flex-wrap items-center justify-between gap-x-6 gap-y-4 lg:h-[clamp(7.5rem,3rem+5.6vw,9.5rem)] lg:flex-nowrap";
const prints = "flex h-[clamp(5.5rem,22vw,8rem)] gap-3 sm:gap-4 lg:contents";

/**
 * A short statement before the journal — "Your space isn't plain. It's curated." — in three tight rows,
 * with photographs from delivered homes mounted like prints between the words and a stamp of the year.
 * The sentence is one h2 for search engines and screen readers; the visible pieces are decorative.
 */
export function CuratedStatement() {
  return (
    <section aria-labelledby="curated-title" className="bg-ivory pt-4 pb-14 md:pb-20">
      <h2 id="curated-title" className="sr-only">
        Your space isn&apos;t plain. It&apos;s curated.
      </h2>

      <div className="container-site flex flex-col gap-6 lg:max-w-[calc(clamp(44rem,30rem+18vw,58rem)+5rem)] lg:gap-5">
        <div className={row}>
          <p aria-hidden className="w-full lg:w-auto" data-reveal>
            <span className={caps}>Your</span>
            <span className={caps}>space</span>
          </p>
          <div className={prints}>
            <PrintCard print={PRINTS.emerald} index={1} />
            <PrintCard print={PRINTS.foyer} index={2} />
          </div>
        </div>

        <div className={row}>
          <div className={cn(prints, "max-lg:order-last")}>
            <PrintCard print={PRINTS.kitchen} index={1} />
          </div>
          <p aria-hidden className="w-full text-right lg:w-auto" data-reveal>
            <span className={caps}>isn&apos;t</span>
            <span className={caps}>plain.</span>
          </p>
          <div className={cn(prints, "max-lg:order-last")}>
            <PrintCard print={PRINTS.pooja} index={2} />
          </div>
        </div>

        <div className={row}>
          <p aria-hidden className="w-full lg:w-auto [clip-path:none]!" data-reveal>
            <span className={caps}>It&apos;s</span>
            <em className="-mt-[0.12em] block pl-[0.04em] font-script text-[clamp(2.7rem,1.2rem+3.6vw,5rem)] leading-[1] not-italic font-normal text-oxblood">
              Curated.
            </em>
          </p>
          <div className={prints}>
            <PrintCard print={PRINTS.lavender} index={1} />
            {/* The year, as a stamp of stacked rings. */}
            <div aria-hidden className="flex h-full flex-col items-center justify-center" data-reveal>
              {["", "20", "26", ""].map((t, i) => (
                <span
                  key={i}
                  className={cn(
                    "-mt-px grid size-[clamp(1.35rem,5vw,1.9rem)] place-items-center rounded-full border border-ink text-[0.6875rem] tracking-[-0.02em] text-ink first:mt-0 lg:size-[clamp(1.6rem,0.8rem+1.1vw,2.2rem)] lg:text-[0.75rem]",
                    i === 0 && "border-oxblood bg-oxblood",
                  )}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
