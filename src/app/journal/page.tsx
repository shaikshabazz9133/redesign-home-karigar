import type { Metadata } from "next";
import Link from "next/link";
import { ImageFrame } from "@/components/motion/ImageFrame";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { articleHref, getJournal, type JournalArticle } from "@/content/journal";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/common/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { cn, pad2 } from "@/lib/utils";
import { IMAGE_ALT } from "@/lib/seo/alt";

export const metadata: Metadata = pageMetadata({
  title: "Interior Design Journal & Home Ideas",
  description:
    "The Home Karigar design journal: why we build kitchens on BWP 710 plywood, how we plan false ceilings and lighting, wardrobes that last, and what to approve in 3D before you pay.",
  path: "/journal",
  image: { src: "/images/home/2.png", alt: IMAGE_ALT, width: 1536, height: 1024 },
});

/** Category and reading time, set in the site's eyebrow style. */
function Meta({ article, tone = "dark" }: { article: JournalArticle; tone?: "dark" | "light" }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3 whitespace-nowrap", tone === "dark" ? "text-muted" : "text-ivory/80")}>
      <span className={tone === "dark" ? "text-brass-ink" : "text-brass"}>{article.category}</span>
      <span aria-hidden className="h-px w-5 bg-current opacity-40" />
      <span>{article.readMinutes} min read</span>
    </p>
  );
}

export default function JournalPage() {
  const [featured, ...rest] = getJournal();

  return (
    <>
      <PageHero
        crumbs={[{ name: "Design Journal", path: "/journal" }]}
        eyebrow="Design Journal"
        title={
          <>
            Notes from the <em className="text-oxblood">studio floor</em>
          </>
        }
        intro="What we have learned designing and delivering homes: on materials, light, storage and the decisions worth making before anything is built."
      />

      <section aria-label="Featured story" className="container-site pt-12 md:pt-16">
        <Link href={articleHref(featured)} className="group grid overflow-hidden rounded-lg bg-linen lg:grid-cols-12" data-reveal>
          <div className="relative aspect-[4/3] lg:col-span-7 lg:aspect-auto lg:min-h-[32rem]">
            <ImageFrame fill parallax={0.08}>
              <LoadingImage
                src={featured.image.src}
                alt={featured.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-premium)] group-hover:scale-[1.04]"
              />
            </ImageFrame>
          </div>
          <div className="flex flex-col justify-between gap-10 p-6 sm:p-8 md:p-12 lg:col-span-5">
            <div className="flex flex-col gap-6">
              <p className="numeral text-xl text-brass-ink tabular-nums">{pad2(1)} · Featured</p>
              <h2 className="text-h2 text-balance">{featured.title}</h2>
              <p className="text-lead text-muted">{featured.excerpt}</p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-line pt-6">
              <Meta article={featured} />
              <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-medium text-oxblood">
                Read the story
                <Icon name="arrowRight" size={16} className="transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
      </section>

      <section aria-label="All stories" className="container-site section-y">
        <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {rest.map((a, i) => (
            <li key={a.slug} data-reveal style={{ "--i": i % 2 } as React.CSSProperties}>
              <Link href={articleHref(a)} className="group flex h-full flex-col gap-6">
                <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-linen">
                  <ImageFrame fill index={i % 2}>
                    <LoadingImage
                      src={(a.card?.image ?? a.image).src}
                      alt={(a.card?.image ?? a.image).alt}
                      fill
                      sizes="(min-width: 768px) 46vw, 92vw"
                      className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-premium)] group-hover:scale-[1.05]"
                    />
                  </ImageFrame>
                </div>
                <div className="flex flex-1 flex-col gap-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <Meta article={a} />
                    <span className="numeral text-lg text-brass-ink">{pad2(i + 2)}</span>
                  </div>
                  <h2 className="text-h3 text-balance transition-colors duration-300 group-hover:text-oxblood">{a.title}</h2>
                  <p className="text-muted">{a.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium">
                    <span className="link-line">Read the story</span>
                    <Icon name="arrowRight" size={16} className="transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title="Ready to put these ideas to work in your home?" />
    </>
  );
}
