import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { articleHref, getArticle, getJournal } from "@/content/journal";
import { ArticleLayout } from "@/components/journal/ArticleLayouts";
import { pageMetadata } from "@/lib/seo/metadata";
import { articleSchema } from "@/lib/seo/jsonld";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { JsonLd } from "@/components/common/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getJournal().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({
    title: a.title,
    description: a.excerpt,
    path: articleHref(a),
    image: a.image,
    type: "article",
    keywords: [`${a.category.toLowerCase()} interior design`, `${a.category.toLowerCase()} ideas Bengaluru`],
  });
}

/**
 * A Design Journal article. Each article is laid out after its own magazine page (see ArticleLayout);
 * around it sit the breadcrumb trail, a way into the related service, the next story and the studio's
 * invitation, with Article and BreadcrumbList structured data for search.
 */
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const all = getJournal();
  const next = all[(all.indexOf(a) + 1) % all.length];
  const paper = a.layout === "beauty" || a.layout === "character" ? "bg-linen" : "bg-paper";

  return (
    <>
      <article>
        <div className={paper}>
          <div className="container-site pt-28 pb-4 md:pt-32">
            <Breadcrumbs items={[{ name: "Design Journal", path: "/journal" }, { name: a.category, path: articleHref(a) }]} />
          </div>
        </div>

        <ArticleLayout article={a} />

        {/* Close */}
        <div className="bg-paper">
          <div className="container-site flex flex-col items-start gap-6 border-t border-line py-12 sm:flex-row sm:items-center sm:justify-between" data-reveal>
            <p className="font-display text-[1.5rem] tracking-[-0.03em] text-ink">Want this in your own home?</p>
            <ButtonLink href={a.next.href} variant="primary">
              {a.next.label}
            </ButtonLink>
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
              className="object-cover transition-transform duration-[1.4s] ease-premium group-hover:scale-[1.05]"
            />
          </div>
          <div className="flex flex-col gap-4 md:col-span-7 md:col-start-6">
            <p className="eyebrow text-muted">Next story · {next.category}</p>
            <p className="font-display text-[clamp(1.6rem,1.1rem+1.4vw,2.4rem)] leading-[1.05] tracking-[-0.04em] text-balance transition-colors duration-300 group-hover:text-oxblood">
              {next.title}
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-medium">
              <span className="link-line">Read the story</span>
              <Icon name="arrowRight" size={16} className="transition-transform duration-500 ease-premium group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </nav>

      <CtaBand />

      <JsonLd
        data={articleSchema({
          title: a.title,
          description: a.excerpt,
          path: articleHref(a),
          section: a.category,
          images: [a.image, ...a.gallery].map((i) => i.src),
          readMinutes: a.readMinutes,
          keywords: [a.category, "interior design", "Bengaluru", "home interiors"],
          author: a.author,
        })}
      />
    </>
  );
}
