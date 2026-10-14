import Image from "next/image";
import Link from "next/link";
import { ImageFrame } from "@/components/motion/ImageFrame";
import { Icon } from "@/components/ui/Icon";
import { CountUp } from "./CountUp";
import { deliveryStats } from "@/content/site";

/** The studio's record, each figure set large beside the sentence it completes. */
const STATS = [
  { value: 6, suffix: "+", label: "years of architect-led residential Home Design & Execution Experience." },
  { value: parseInt(deliveryStats.homesDelivered, 10), suffix: "+", label: "Homes Designed, Crafted & Delivered." },
  { value: 200, suffix: "+", label: "Prestige Specialists Across Multiple Communities." },
];

/**
 * "The Home Karigar Way": an editorial spread under the hero. Left, the title set like the hero's headline,
 * the studio's belief and a photograph. Right, a ruled grid of the studio's record, its top rule level with
 * the title, closing on a dark card carrying its credo.
 */
export function DesignPhilosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="relative bg-ivory pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Two columns sharing two rows: the title block and the photograph on the left, the record grid on the
          right as a subgrid — so the photograph's top edge sits exactly on the grid's middle rule. */}
      <div className="container-site grid gap-14 lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-x-12 lg:gap-y-0">
        {/* Left, row one: title and belief */}
        <div className="flex flex-col lg:col-start-1 lg:row-start-1 lg:pb-14">
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

          <p className="mt-10 max-w-lg text-lead text-ink-soft" data-reveal>
            Luxury isn&apos;t defined by excess. It&apos;s found in thoughtful proportions, enduring materials, and
            spaces that quietly enrich everyday living. At Home Karigar, we create homes that reflect the people who
            live in them—timeless in character and purposeful in every detail.
          </p>
        </div>

        {/* Left, row two: the photograph */}
        <ImageFrame className="aspect-[4/3] w-full overflow-hidden rounded-sm bg-linen lg:col-start-1 lg:row-start-2" parallax={0.08}>
          <Image
            src="/images/philosophy/walk-in-wardrobe.jpg"
            alt="Walk-in wardrobe with lit glass-fronted shutters, fluted drawers and an upholstered bench, designed by Home Karigar"
            fill
            sizes="(min-width: 1024px) 45vw, 92vw"
            className="object-cover"
          />
        </ImageFrame>

        {/* Right: the record as a ruled grid, closing on a dark credo card */}
        <div className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:grid-rows-subgrid">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className={`flex items-end justify-between gap-6 border-b border-line py-6 sm:min-h-56 sm:py-7 sm:px-6 lg:min-h-64 ${
                i % 2 === 0 ? "sm:border-r sm:pl-0" : "sm:pr-0"
              }`}
            >
              <p className="min-w-0 max-w-[13rem] text-[0.9375rem] leading-snug text-ink-soft">{s.label}</p>
              <p className="shrink-0 font-display text-[clamp(3rem,2rem+2vw,4rem)] leading-[0.8] font-normal tracking-[-0.05em] text-ink">
                <CountUp to={s.value} suffix={s.suffix} delay={i * 180} duration={s.value < 10 ? 1300 : 2000} align="end" />
              </p>
            </div>
          ))}

          <div
            data-reveal
            style={{ "--i": 3 } as React.CSSProperties}
            className="on-dark flex min-h-48 flex-col justify-between gap-10 bg-[#3a2418] p-7 text-ivory lg:min-h-64"
          >
            <p className="max-w-[16rem] text-lg leading-snug">
              Design isn&apos;t just what you see — it&apos;s how a space <em className="font-accent text-[1.15em] italic">lives</em>{" "}
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

    </section>
  );
}
