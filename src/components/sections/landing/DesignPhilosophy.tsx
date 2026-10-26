import Image from "next/image";
import Link from "next/link";
import { ImageFrame } from "@/components/motion/ImageFrame";
import { Icon } from "@/components/ui/Icon";
import { CountUp } from "./CountUp";
import { deliveryStats } from "@/content/site";
import { IMAGE_ALT } from "@/lib/seo/alt";

/** The studio's record, each figure set large beside the sentence it completes. */
const STATS = [
  { value: 8, suffix: "+", label: "years of architect-led residential Home Design & Execution Experience." },
  { value: parseInt(deliveryStats.homesDelivered, 10), suffix: "+", label: "Homes Designed, Crafted & Delivered." },
  {
    value: 200,
    suffix: "+",
    label: "Prestige Specialists Across Multiple Communities.",
    logo: { src: "/images/prestige-logo.png", alt: "Prestige Group", width: 700, height: 859 },
  },
];

/**
 * "The Home Karigar Way": an editorial spread under the hero. Above, the title set like the hero's headline
 * beside the studio's belief, signed by the founder, with his photograph hung just under the signature. Under
 * the title, a ruled 2×2 grid of the studio's record closing on a dark credo card runs down to the photograph's
 * foot, its four cells all the same height.
 */
export function DesignPhilosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="relative bg-ivory pt-14 pb-7 md:pt-20 md:pb-10">
      {/* Two columns. Right: the belief and signature, then the photograph at its own 6:7 proportion. Left: the
          title, then the record grid, which stretches from just under the title to the photograph's foot. */}
      <div className="container-site grid lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-x-12">
        {/* Left column: the title, then the record grid directly beneath it, stretching to the foot of the
            photograph. Below lg the wrapper dissolves (contents) and the order classes interleave its children
            with the right column's: title, belief, photograph, record. */}
        <div className="contents lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:flex lg:flex-col">
          {/* The title. */}
          <div className="order-1">
            {/* Set like the hero's headline: light, tight capitals with the copperplate script for the closing
                word. A two-column grid hangs KARIGAR under HOME, so the second line starts where THE ends. */}
            <h2
              id="philosophy-title"
              className="caps -ml-[0.045em] grid w-fit grid-cols-[auto_auto] gap-x-[0.24em] font-display text-[min(clamp(2.6rem,1rem+4vw,4.75rem),max(2.1rem,0.2rem+10vw))] leading-[0.86] font-normal tracking-[-0.055em] text-ink [clip-path:none]!"
              data-reveal
            >
              <span>The</span>
              <span className="sr-only"> </span>
              <span>Home</span>
              <span className="sr-only"> </span>
              <span className="col-start-2 whitespace-nowrap">
                Karigar{" "}
                <em className="ml-[0.06em] inline-block font-script text-[1.3em] not-italic font-normal leading-[0] tracking-normal text-oxblood">
                  Way.
                </em>
              </span>
            </h2>
          </div>

          {/* The record as a ruled 2×2 grid in two equal rows, closing on a dark credo card. Phones
              set each figure beside its sentence; from sm the cells are narrower, so the sentence sits on top and
              the figure at the foot. */}
          <div className="grid grid-cols-1 border-t border-line sm:grid-cols-2 order-4 mt-12 lg:flex-1 lg:grid-rows-[1fr_1fr]">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
                className={`flex items-end justify-between gap-6 border-b border-line py-6 sm:min-h-52 sm:flex-col sm:items-stretch sm:py-7 sm:px-6 lg:min-h-0 lg:py-6 ${
                  i % 2 === 0 ? "sm:border-r sm:pl-0" : "sm:pr-0"
                }`}
              >
                <p className="min-w-0 max-w-[13rem] text-[0.9375rem] leading-snug text-ink-soft sm:max-w-[16rem]">{s.label}</p>
                <div className="flex shrink-0 flex-col gap-4 sm:self-end">
                  {/* The communities' own mark, centred over the figure's digits: the row shares the figure's font
                      size, so its right padding is exactly the width of the "+". */}
                  {s.logo && (
                    <div className="flex justify-center pr-[0.56em] text-[clamp(3rem,2rem+2vw,4rem)]">
                      <Image
                        src={s.logo.src}
                        alt={s.logo.alt}
                        width={s.logo.width}
                        height={s.logo.height}
                        sizes="6rem"
                        className="h-auto w-[4.25rem] sm:w-[4.5rem] lg:w-[3.75rem] xl:w-[4.25rem]"
                      />
                    </div>
                  )}
                  <p className="font-display text-[clamp(3rem,2rem+2vw,4rem)] leading-[0.8] font-normal tracking-[-0.05em] text-ink">
                    <CountUp to={s.value} suffix={s.suffix} delay={i * 180} duration={s.value < 10 ? 1300 : 2000} align="end" />
                  </p>
                </div>
              </div>
            ))}

            <div
              data-reveal
              style={{ "--i": 3 } as React.CSSProperties}
              className="on-dark flex min-h-48 flex-col justify-between gap-8 bg-[#3a2418] p-7 text-ivory lg:min-h-0 lg:p-6"
            >
              <p className="max-w-[16rem] text-lg leading-snug">
                Design isn&apos;t just what you see; it&apos;s how a space <em className="font-accent text-[1.15em] italic">lives</em>{" "}
                with you.
              </p>
              <Link
                href="/about"
                className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-ivory/90 hover:text-ivory"
              >
                <span className="link-line">Learn more about the studio</span>
                <Icon name="arrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right, row one: the belief, signed by the founder */}
        <div className="order-2 mt-12 lg:col-start-2 lg:row-start-1 lg:mt-0 lg:pb-8">
          <p className="max-w-lg text-lead text-ink-soft" data-reveal>
            Home Karigar creates homes that feel as considered as they are beautiful. By taking on a limited number of
            projects, we remain deeply involved at every stage, from planning and design to execution and
            handover, ensuring every space is crafted with clarity, precision, and lasting quality. Every home begins
            with how you live, and is detailed in 3D before work starts on site, so what you approve is exactly what
            is built.
          </p>
          {/* The name in the copperplate as a signature. */}
          <p className="mt-6 flex flex-col" data-reveal>
            <span className="font-script text-[2.4rem] leading-none text-oxblood">Mohammed Zuber</span>
            <span className="mt-2 text-[0.75rem] tracking-[0.16em] text-muted uppercase">Founder &amp; CEO</span>
          </p>
        </div>

        {/* Right, row two: the founder at 6:7 — trimmed above the head and below the knees — just under his
            signature, filling the column. */}
        <div className="order-3 mt-12 lg:col-start-2 lg:row-start-2 lg:mt-0">
          <ImageFrame className="aspect-[6/7] w-full max-w-md overflow-hidden rounded-sm bg-linen lg:max-w-none">
            <Image
              src="/images/home_karigar_ceo.jpg"
              alt={IMAGE_ALT}
              fill
              sizes="(min-width: 1024px) 40rem, (min-width: 640px) 28rem, 92vw"
              className="object-cover object-[50%_30%]"
            />
          </ImageFrame>
        </div>
      </div>

    </section>
  );
}
