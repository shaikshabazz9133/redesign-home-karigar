import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "@/components/ui/Logo";
import { deliveryStats, site } from "@/content/site";

/**
 * Editorial introduction below the immersive hero: a tall arched photograph (a nod to the arch in Indian
 * architecture) with a smaller overlapping frame, a rotating seal and a
 * promise card. All entrance motion is CSS, so it plays before hydration.
 */
export function ArchHero() {
  return (
    <section aria-labelledby="intro-title" className="relative scroll-mt-24 overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Soft wash in the logo's stone tones, pooled behind the arch */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(42%_55%_at_78%_52%,rgb(201_181_158/0.28),transparent_70%),radial-gradient(30%_35%_at_8%_18%,rgb(194_160_107/0.08),transparent_70%)]"
      />

      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <div className="relative z-10 lg:col-span-6 lg:pr-6">
          <p className="eyebrow flex items-center gap-3 text-muted" data-reveal>
            <span aria-hidden className="h-px w-7 shrink-0 bg-brass-ink/60" />
            Complete home interiors
          </p>
          <h2 id="intro-title" className="caps mt-8 text-[clamp(2.25rem,1rem+4.8vw,4.75rem)] leading-[0.92] tracking-[-0.045em] text-ink" data-reveal>
            <span className="block">Every surface, every fitting —</span>
            <em className="block text-oxblood">designed as one home.</em>
          </h2>
          <p className="text-lead mt-8 max-w-lg text-muted" data-reveal>
            We design and build complete homes — every ceiling, cabinet and corner — and hand them over exactly as you
            approved them in 3D.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7" data-reveal>
            <ButtonLink href="/contact" size="lg">Book a design consultation</ButtonLink>
            <Link href="/projects" className="group inline-flex items-center gap-2 font-medium text-ink">
              <span className="link-line">See the homes we&apos;ve delivered</span>
              <Icon name="arrowRight" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <dl className="mt-14 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-8" data-reveal>
            <Stat value={deliveryStats.homesDelivered} label="Homes delivered" />
            <Stat value={`${site.foundedYearsAgo}+`} label="Years of practice" />
            <Stat value="₹0" label="Advance before 3D approval" />
          </dl>
        </div>

        {/* Composition */}
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[34rem] lg:ml-auto lg:mr-0">
            {/* Main arch */}
            <div data-frame="" className="hk-arch-reveal absolute inset-0 overflow-hidden rounded-t-[999px] rounded-b-md bg-linen shadow-lift">
              <div data-parallax="0.08" className="absolute inset-x-0 -top-[8%] -bottom-[8%] will-change-transform">
              <Image
                src="/images/stock/foyer-timber-ceiling.jpg"
                alt="Warm foyer with a timber-slat ceiling, round mirror and herringbone wood floor"
                fill
                sizes="(min-width: 1024px) 34rem, 90vw"
                className="hk-arch-image object-cover object-[50%_60%]"
              />
              </div>
            </div>

            {/* Overlapping frame — drifts against the arch for depth */}
            <div data-parallax="-0.12" className="pointer-events-none absolute inset-0 will-change-transform">
            <div className="absolute -bottom-10 left-2 w-[46%] animate-rise overflow-hidden rounded-md border-[6px] border-ivory bg-linen shadow-lift [animation-delay:500ms] sm:-left-10 lg:-left-16">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/stock/living-cream-rattan.jpg"
                  alt="Cream living room with rattan mirrors and soft textured furniture"
                  fill
                  sizes="(min-width: 1024px) 16rem, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
            </div>

            {/* Rotating seal */}
            <div data-parallax="-0.2" className="absolute right-2 top-[6%] grid size-24 animate-fade place-items-center rounded-full bg-ivory shadow-soft [animation-delay:700ms] sm:-right-8 sm:size-32">
              <svg viewBox="0 0 120 120" className="hk-spin-slow absolute inset-0 size-full text-umber" aria-hidden>
                <defs>
                  <path id="seal-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                </defs>
                <text className="fill-current font-sans text-[9px] font-medium uppercase">
                  <textPath href="#seal-circle" textLength="270" lengthAdjust="spacing">Designed in 3D · Delivered as promised ·</textPath>
                </text>
              </svg>
              <LogoMark className="h-8 drop-shadow-[0_1px_1.5px_rgb(51_32_13/0.22)] sm:h-10" />
            </div>

            {/* Promise card */}
            <div data-parallax="-0.06" className="pointer-events-none absolute inset-0 hidden will-change-transform sm:block">
            <div className="pointer-events-auto absolute -right-2 bottom-[14%] hidden max-w-[15rem] animate-rise items-start gap-3 rounded-md border border-line bg-paper/95 p-4 shadow-lift backdrop-blur-sm [animation-delay:850ms] sm:flex lg:-right-6">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-oxblood-tint text-oxblood">
                <Icon name="shield" size={18} />
              </span>
              <p className="text-sm leading-snug text-ink-soft">
                <span className="block font-medium text-ink">No advance, no surprises</span>
                Pay only after your 3D designs are approved.
              </p>
            </div>
            </div>
          </div>
          <p className="mt-16 text-right text-xs text-muted lg:mt-14">Mood photography</p>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="order-2 text-sm text-muted">{label}</dt>
      <dd className="order-1 font-display text-[2.25rem] font-medium leading-none tracking-[-0.04em] text-ink">{value}</dd>
    </div>
  );
}
