import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageFrame } from "@/components/motion/ImageFrame";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { articleHref, getArticle, getJournal } from "@/content/journal";
import { site } from "@/content/site";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { JsonLd } from "@/components/common/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { pad2 } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getJournal().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({ title: a.title, description: a.excerpt, path: articleHref(a), image: a.image });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const all = getJournal();
  const next = all[(all.indexOf(a) + 1) % all.length];

  return (
    <>
      <article>
        <header className="pt-32 md:pt-40">
          <div className="container-site">
            <Breadcrumbs items={[{ name: "Design Journal", path: "/journal" }, { name: a.category, path: articleHref(a) }]} />
            <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-6 text-center md:mt-16">
              <p className="eyebrow flex items-center gap-3 text-muted animate-rise">
                <span className="text-brass-ink">{a.category}</span>
                <span aria-hidden className="h-px w-5 bg-current opacity-40" />
                <span>{a.readMinutes} min read</span>
              </p>
              <h1 className="text-h1 text-balance animate-rise [animation-delay:80ms]">{a.title}</h1>
              <p className="text-lead text-muted animate-rise [animation-delay:160ms]">{a.excerpt}</p>
            </div>
          </div>
          <div className="container-site mt-12 md:mt-16">
            <ImageFrame parallax={0.1} className="aspect-[16/10] rounded-lg bg-linen md:aspect-[21/10]">
              <LoadingImage src={a.image.src} alt={a.image.alt} fill priority sizes="(min-width: 1320px) 1240px, 100vw" className="object-cover" />
            </ImageFrame>
          </div>
        </header>

        <div className="container-site section-y">
          <div className="mx-auto flex max-w-2xl flex-col gap-14 md:gap-16">
            {a.sections.map((s, i) => (
              <section key={s.heading} data-reveal>
                <p className="numeral text-xl text-brass-ink tabular-nums">{pad2(i + 1)}</p>
                <h2 className="mt-3 text-h3">{s.heading}</h2>
                <div className="mt-5 flex flex-col gap-5 text-[1.0625rem] leading-[1.8] text-ink-soft">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            <div className="flex flex-col items-start gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between" data-reveal>
              <p className="text-muted">Want this in your own home?</p>
              <ButtonLink href={a.next.href} variant="primary">
                {a.next.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </article>

      <nav aria-label="Next story" className="container-site pb-20 md:pb-28">
        <Link href={articleHref(next)} className="group grid items-center gap-8 border-y border-line py-10 md:grid-cols-12" data-reveal>
          <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-linen md:col-span-4">
            <LoadingImage
              src={next.image.src}
              alt={next.image.alt}
              fill
              sizes="(min-width: 768px) 32vw, 92vw"
              className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-premium)] group-hover:scale-[1.05]"
            />
          </div>
          <div className="flex flex-col gap-4 md:col-span-7 md:col-start-6">
            <p className="eyebrow text-muted">Next story · {next.category}</p>
            <p className="text-h2 text-balance transition-colors duration-300 group-hover:text-oxblood">{next.title}</p>
            <span className="inline-flex items-center gap-2 text-sm font-medium">
              <span className="link-line">Read the story</span>
              <Icon name="arrowRight" size={16} className="transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </nav>

      <CtaBand />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.excerpt,
          image: absoluteUrl(a.image.src),
          url: absoluteUrl(articleHref(a)),
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />
    </>
  );
}
