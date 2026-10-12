import { ImageFrame } from "@/components/motion/ImageFrame";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Typography";
import { site } from "@/content/site";
import { CountUp } from "./CountUp";

const BRANDS = ["Hettich", "Häfele", "Ebco", "Greenply", "Century Ply"];

/** The studio's commitments, as a bento grid. */
export function PromiseBento() {
  return (
    <section aria-labelledby="promise-title" className="section-y">
      <div className="container-site">
        <SectionHeading
          eyebrow="Why homeowners choose us"
          title={<span id="promise-title">Promises written into every contract</span>}
          intro="Payment tied to progress, branded materials you can verify, and a final say that stays with you."
        />

        <ul className="mt-14 grid gap-4 md:mt-16 md:grid-cols-6 md:grid-rows-[auto_auto]">
          {/* Hero promise */}
          <li data-reveal className="on-dark relative flex flex-col justify-between overflow-hidden rounded-lg bg-oxblood p-8 text-ivory md:col-span-3 md:row-span-2 md:p-10">
            <span aria-hidden className="absolute -right-16 -top-16 size-64 rounded-full border border-ivory/10" />
            <span aria-hidden className="absolute -right-4 -top-4 size-40 rounded-full border border-ivory/10" />
            <p className="eyebrow text-ivory/70">Our first promise</p>
            <div className="mt-16 md:mt-24">
              <p className="font-display text-[clamp(5rem,3rem+7vw,9rem)] leading-[0.85] tracking-tight">₹0</p>
              <p className="mt-6 max-w-sm text-lead text-ivory/85">
                advance until your 3D designs are approved and branded materials are delivered to your site.
              </p>
            </div>
          </li>

          <BentoCard className="md:col-span-3" icon="qr" title="Every board, QR-verified">
            Each plywood sheet and hardware box delivered to site carries its own QR code, so you can authenticate it yourself.
          </BentoCard>

          <li data-reveal style={{ "--i": 1 } as React.CSSProperties} className="flex flex-col justify-between rounded-lg border border-line bg-paper p-7 md:col-span-2">
            <p className="font-display text-6xl leading-none text-ink">10%</p>
            <p className="mt-6 text-muted">of the project value stays with you until the final inspection is signed off.</p>
          </li>

          <li className="relative min-h-56 overflow-hidden rounded-lg bg-linen md:col-span-1">
            <ImageFrame fill parallax={0.15}>
              <Image src="/images/stock/bedroom-brass-chandelier.jpg" alt="" fill sizes="(min-width: 768px) 16vw, 92vw" className="object-cover" />
            </ImageFrame>
          </li>
        </ul>

        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          <li data-reveal className="flex flex-col justify-between rounded-lg border border-line bg-paper p-7">
            <p className="font-display text-6xl leading-none text-oxblood">
              <CountUp to={400} suffix="+" />
            </p>
            <p className="mt-6 text-muted">homes delivered across Bengaluru&apos;s Prestige communities.</p>
          </li>
          <li data-reveal style={{ "--i": 1 } as React.CSSProperties} className="flex flex-col justify-between rounded-lg border border-line bg-paper p-7">
            <p className="font-display text-6xl leading-none text-oxblood">
              <CountUp to={site.foundedYearsAgo} suffix="+" />
            </p>
            <p className="mt-6 text-muted">years of architect-led residential practice.</p>
          </li>
          <li data-reveal style={{ "--i": 2 } as React.CSSProperties} className="flex flex-col justify-between rounded-lg bg-espresso p-7 text-ivory on-dark">
            <p className="eyebrow text-brass">Branded only</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Brands we build with">
              {BRANDS.map((b) => (
                <li key={b} className="rounded-full border border-line-dark px-3.5 py-1.5 text-sm text-ivory/85">{b}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
}

function BentoCard({ icon, title, children, className }: { icon: "qr"; title: string; children: React.ReactNode; className?: string }) {
  return (
    <li data-reveal className={`group flex flex-col justify-between gap-10 rounded-lg border border-line bg-paper p-7 transition-[box-shadow,border-color] duration-500 hover:border-line-strong hover:shadow-soft ${className ?? ""}`}>
      <span className="grid size-12 place-items-center rounded-full bg-oxblood-tint text-oxblood transition-transform duration-500 group-hover:rotate-[-8deg]">
        <Icon name={icon} size={22} />
      </span>
      <div>
        <h3 className="text-h3">{title}</h3>
        <p className="mt-3 max-w-md text-muted">{children}</p>
      </div>
    </li>
  );
}
