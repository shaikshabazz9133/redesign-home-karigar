import { LoadingImage } from "@/components/ui/LoadingImage";
import Link from "next/link";
import { pillars } from "@/content/studio";
import { Eyebrow } from "@/components/ui/Typography";
import { Icon } from "@/components/ui/Icon";
import { pad2 } from "@/lib/utils";

export function Philosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="section-y">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-linen" data-reveal="image">
              <LoadingImage
                src="/images/about_us_02.jpeg"
                alt="A Home Karigar craftsman finishing classical wall mouldings by hand on site"
                fill
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="object-cover object-[60%_50%]"
              />
            </div>
            <p className="mt-4 text-sm text-muted">On site — hand-finished wall mouldings before paint.</p>
          </div>
        </div>

        <div className="flex flex-col lg:col-span-7 lg:pt-10">
          <div data-reveal>
            <Eyebrow>Our approach</Eyebrow>
          </div>
          <h2 id="philosophy-title" className="mt-6 text-h2 max-w-xl" data-reveal>
            Design isn&apos;t just what you see — it&apos;s how a space lives with you.
          </h2>
          <p className="text-lead mt-6 max-w-xl text-muted" data-reveal>
            For more than a decade, our architects and interior designers have stayed with each home from the first idea to
            the final installation. Share how you live — we&apos;ll do the rest.
          </p>

          <ol className="mt-14 flex flex-col">
            {pillars.map((p, i) => (
              <li key={p.title} className="grid gap-3 border-t border-line py-8 sm:grid-cols-[5rem_1fr] sm:gap-6" data-reveal style={{ "--i": i } as React.CSSProperties}>
                <span className="font-display text-lg text-brass-ink tabular-nums">{pad2(i + 1)}</span>
                <div>
                  <h3 className="text-h3">{p.title}</h3>
                  <p className="mt-3 max-w-lg text-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <Link href="/about" className="group mt-4 inline-flex w-fit items-center gap-2 font-medium text-oxblood" data-reveal>
            <span className="link-line">Meet the studio and team</span>
            <Icon name="arrowRight" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
