import Image from "next/image";
import { LoadingImage } from "@/components/ui/LoadingImage";
import type { JournalArticle, JournalImage } from "@/content/journal";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/*
 * Five magazine pages, one per article, each after a page from an interiors title the studio admires:
 *   reshuffle — light sans capitals beside a tall photograph, a bold capital pull quote ("Cabinet Reshuffle")
 *   monograph — a serif title over a capitalised subhead, drop-capped text, photographs stacked ("The Wiseman Group")
 *   maison    — a photograph down the left, a stacked bold serif title, justified text ("A House in Paris")
 *   beauty    — a script word into tall serif capitals, a capitalised lead, a three-photo collage ("The Beauty Good Design")
 *   character — two photographs above, a script initial into tracked capitals, text in two columns ("A Home With Character")
 * Every photograph keeps its own proportions — nothing is cropped — so a client's pictures drop straight in.
 */

/** A photograph at its natural proportions, with an optional caption. */
function Photo({ img, sizes, priority, className, caption }: { img: JournalImage; sizes: string; priority?: boolean; className?: string; caption?: React.ReactNode }) {
  return (
    <figure className={className} data-reveal>
      <div className="relative w-full overflow-hidden bg-linen" style={{ aspectRatio: `${img.width} / ${img.height}` }}>
        <LoadingImage src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      {caption && <figcaption className="mt-3 text-[0.75rem] leading-snug text-muted">{caption}</figcaption>}
    </figure>
  );
}

/** The studio's mark, signed at the foot of the page as the magazines sign theirs. */
function Mark() {
  return (
    <Image src="/brand/mark.webp" alt="" width={700} height={858} className="ml-auto h-12 w-auto opacity-80 md:h-14" aria-hidden />
  );
}

const byline = `By the ${site.name} studio`;

/* ------------------------------------------------------------------------------------------------ */
/* Cabinet Reshuffle                                                                                 */
/* ------------------------------------------------------------------------------------------------ */
function Reshuffle({ a }: { a: JournalArticle }) {
  const [main, small] = a.gallery;
  const [first, ...rest] = a.sections;
  return (
    <div className="bg-paper">
      <div className="container-site grid gap-x-10 gap-y-10 pt-6 pb-20 md:pb-28 lg:grid-cols-12">
        <div className="flex flex-col lg:col-span-6 lg:pt-16">
          <h1 className="font-display text-[clamp(3rem,1.2rem+5.2vw,6.4rem)] leading-[0.9] font-light tracking-[-0.01em] text-ink uppercase">
            {a.display.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md font-accent text-[1.5rem] leading-[1.2] text-ink">
            {a.title}. <em>{byline}</em>
          </p>

          <section aria-labelledby="s0" className="mt-14 max-w-xl" data-reveal>
            <h2 id="s0" className="text-[0.875rem] font-semibold tracking-[0.04em] text-ink uppercase">
              {first.heading}
            </h2>
            <div className="mt-3 flex flex-col gap-3 font-accent text-[1.125rem] leading-[1.5] text-ink-soft">
              {first.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>

          <blockquote className="mt-12 max-w-md font-display text-[clamp(1.5rem,1.1rem+1vw,2.1rem)] leading-[1.05] font-semibold tracking-[-0.01em] text-ink uppercase" data-reveal>
            &ldquo;{a.quote}&rdquo;
          </blockquote>
        </div>

        <div className="lg:col-span-6">
          <Photo img={main} priority sizes="(min-width: 1024px) 46vw, 92vw" caption={main.alt} />
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div className="flex flex-col gap-8">
              {rest.map((s, i) => (
                <section key={s.heading} aria-labelledby={`s${i + 1}`} data-reveal>
                  <h2 id={`s${i + 1}`} className="text-[0.875rem] font-semibold tracking-[0.04em] text-ink uppercase">
                    {s.heading}
                  </h2>
                  <div className="mt-3 flex flex-col gap-3 font-accent text-[1.125rem] leading-[1.5] text-ink-soft">
                    {s.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <Photo img={small} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw" className="self-end" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------ */
/* The Wiseman Group                                                                                 */
/* ------------------------------------------------------------------------------------------------ */
function Monograph({ a }: { a: JournalArticle }) {
  const [top, bottom] = a.gallery;
  return (
    <div className="bg-paper">
      <div className="container-site pt-6 pb-20 md:pb-28">
        <p className="flex items-baseline gap-2 text-ink">
          <span className="font-accent text-[1.4rem] font-bold">journal</span>
          <span className="text-[0.75rem] tracking-[0.14em] text-muted uppercase">{a.category}</span>
        </p>

        <div className="mt-8 grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:pt-[clamp(4rem,14vw,14rem)]">
            <h1 className="font-accent text-[clamp(3.4rem,2rem+4.2vw,6.2rem)] leading-[0.94] font-medium tracking-[-0.015em] text-ink">
              {a.display.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h1>
            <p className="mt-5 max-w-sm text-[1.25rem] leading-[1.15] font-light tracking-[0.005em] text-ink-soft uppercase">{a.title}</p>

            <div className="mt-10 flex max-w-md flex-col gap-3 font-accent text-[1.125rem] leading-[1.55] text-ink-soft">
              {a.sections.map((s, si) => (
                <section key={s.heading} aria-labelledby={`s${si}`} className="flex flex-col gap-3" data-reveal>
                  <h2 id={`s${si}`} className={cn("font-accent text-[1.2rem] italic text-ink", si === 0 && "sr-only")}>
                    {s.heading}
                  </h2>
                  {s.body.map((p, pi) => (
                    <p
                      key={p}
                      className={cn(
                        si === 0 && pi === 0
                          ? "first-letter:float-left first-letter:mt-[0.05em] first-letter:mr-[0.1em] first-letter:font-accent first-letter:text-[3.9em] first-letter:leading-[0.8] first-letter:text-ink"
                          : "indent-5",
                      )}
                    >
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            <p className="mt-10 max-w-md border-t border-line-strong pt-4 font-accent text-[0.95rem] leading-snug italic text-ink-soft">
              <strong className="font-semibold">{site.name} Interiors</strong>, {site.address.display}, {site.email}
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7">
            <Photo img={top} priority sizes="(min-width: 1024px) 46vw, 92vw" />
            <Photo img={bottom} sizes="(min-width: 1024px) 46vw, 92vw" />
          </div>
        </div>

        <p className="mt-12 border-l border-ink-soft pl-3 text-[0.75rem] tracking-[0.14em] text-muted uppercase">{site.name} Journal</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------ */
/* A House in Paris                                                                                  */
/* ------------------------------------------------------------------------------------------------ */
function Maison({ a }: { a: JournalArticle }) {
  const [tall] = a.gallery;
  return (
    <div className="bg-paper pb-20 md:pb-28">
      <div className="grid gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Photo img={tall} priority sizes="(min-width: 1024px) 58vw, 100vw" />
        </div>

        <div className="container-site flex flex-col lg:col-span-5 lg:max-w-none lg:pr-[clamp(1.5rem,4vw,4rem)] lg:pl-0">
          <p className="ml-auto max-w-sm font-accent text-[clamp(1.3rem,1rem+0.8vw,1.7rem)] leading-[1.2] text-ink">
            {a.excerpt} {byline}.
          </p>

          {/* The stacked title steps back over the photograph's edge, as on the page it follows. */}
          <h1 className="relative z-10 my-12 font-accent text-[clamp(3.6rem,2rem+5vw,7.4rem)] leading-[0.9] font-bold tracking-[-0.02em] text-ink lg:my-20 lg:-ml-[0.45em]">
            {a.display.lines.map((l) => (
              <span key={l} className="block text-center">
                {l}
              </span>
            ))}
          </h1>

          <div className="mx-auto flex max-w-[22rem] flex-col gap-3 font-accent text-[1.125rem] leading-[1.5] text-ink-soft lg:mx-0 lg:ml-auto">
            {a.sections.map((s, si) => (
              <section key={s.heading} aria-labelledby={`s${si}`} className="flex flex-col gap-3 text-justify hyphens-auto" data-reveal>
                <h2 id={`s${si}`} className="mt-3 text-center text-[0.8125rem] font-semibold tracking-[0.06em] text-ink uppercase not-italic">
                  {s.heading}
                </h2>
                {s.body.map((p, pi) => (
                  <p key={p} className={cn(pi > 0 && "indent-5")}>
                    {p}
                  </p>
                ))}
              </section>
            ))}
            <p className="mt-8 text-center font-sans text-[0.8125rem] leading-snug text-muted">
              <strong className="block text-[0.75rem] font-semibold tracking-[0.06em] text-ink uppercase">In the picture</strong>
              {tall.alt}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------ */
/* The Beauty of Good Design                                                                         */
/* ------------------------------------------------------------------------------------------------ */
function Beauty({ a }: { a: JournalArticle }) {
  const [tall, left, below] = a.gallery;
  const [first, ...rest] = a.sections;
  return (
    <div className="bg-linen pb-20 md:pb-28">
      <div className="container-site pt-6">
        <h1 className="text-ink">
          <span className="flex flex-wrap items-end gap-x-[0.3em]">
            {a.display.script && (
              <span className="font-script text-[clamp(4.2rem,2.4rem+5vw,8.4rem)] leading-[0.85] font-normal">{a.display.script}</span>
            )}
            <span className="font-accent text-[clamp(3rem,1.8rem+3.8vw,6.2rem)] leading-[0.95] font-normal tracking-[0.005em] uppercase">
              {a.display.lines[0]}
            </span>
          </span>
          {a.display.lines.slice(1).map((l) => (
            <span key={l} className="block font-accent text-[clamp(3rem,1.8rem+3.8vw,6.2rem)] leading-[0.95] font-normal tracking-[0.005em] uppercase">
              {l}
            </span>
          ))}
        </h1>
        <p className="mt-8 max-w-2xl font-accent text-[clamp(1rem,0.92rem+0.3vw,1.2rem)] leading-[1.35] tracking-[0.07em] text-ink uppercase">
          {a.excerpt}
        </p>
      </div>

      {/* The collage: a photograph off the left edge with the first note beside it, a tall one off the right
          edge, and a third below. Each keeps its own proportions. */}
      <div className="mt-12 grid items-start gap-6 md:grid-cols-12 md:gap-x-8 md:gap-y-8">
        <Photo img={left} sizes="(min-width: 768px) 30vw, 100vw" className="md:col-span-4 md:mt-24" />
        <section aria-labelledby="s0" className="container-site md:col-span-4 md:mt-auto md:max-w-none md:px-0" data-reveal>
          <h2 id="s0" className="text-[0.75rem] font-semibold tracking-[0.16em] text-ink uppercase">
            {first.heading}
          </h2>
          <div className="mt-3 flex flex-col gap-3 text-[0.9375rem] leading-[1.75] tracking-[0.09em] text-ink-soft">
            {first.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>
        <Photo img={tall} priority sizes="(min-width: 768px) 32vw, 100vw" className="md:col-span-4 md:row-span-2" />
        <Photo img={below} sizes="(min-width: 768px) 30vw, 92vw" className="container-site md:col-span-3 md:col-start-4 md:max-w-none md:px-0" />
      </div>

      <div className="container-site mt-16 grid gap-10 md:grid-cols-2 md:gap-14">
        {rest.map((s, i) => (
          <section key={s.heading} aria-labelledby={`s${i + 1}`} data-reveal>
            <h2 id={`s${i + 1}`} className="text-[0.75rem] font-semibold tracking-[0.16em] text-ink uppercase">
              {s.heading}
            </h2>
            <div className="mt-3 flex flex-col gap-3 text-[0.9375rem] leading-[1.75] tracking-[0.09em] text-ink-soft">
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="container-site mt-12">
        <Mark />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------ */
/* A Home With Character                                                                             */
/* ------------------------------------------------------------------------------------------------ */
function Character({ a }: { a: JournalArticle }) {
  const [small, large] = a.gallery;
  return (
    <div className="bg-linen bg-[repeating-linear-gradient(90deg,rgb(31_26_23/0.025)_0_1px,transparent_1px_4px)] pb-20 md:pb-28">
      <div className="grid grid-cols-12 items-start gap-4 md:gap-8">
        <Photo img={small} sizes="(min-width: 768px) 34vw, 42vw" className="col-span-5 mt-[clamp(2rem,8vw,7rem)] md:col-span-4" />
        <Photo img={large} priority sizes="(min-width: 768px) 46vw, 56vw" className="col-span-7 md:col-span-5 md:col-start-8" />
      </div>

      <div className="container-site mt-14 md:mt-20">
        <h1 className="text-ink">
          <span className="flex items-end gap-x-[0.06em]">
            {a.display.script && (
              <span className="font-script text-[clamp(4.6rem,2.6rem+5vw,9rem)] leading-[0.8] font-normal">{a.display.script}</span>
            )}
            <span className="font-accent text-[clamp(2.6rem,1.6rem+3vw,5rem)] leading-none font-normal tracking-[0.06em] uppercase">
              {a.display.lines[0]}
            </span>
          </span>
          {a.display.lines.slice(1).map((l) => (
            <span key={l} className="mt-2 block pl-[0.6em] font-accent text-[clamp(2.6rem,1.6rem+3vw,5rem)] leading-none font-normal tracking-[0.06em] uppercase">
              {l}
            </span>
          ))}
        </h1>

        <div className="mt-12 max-w-4xl gap-14 font-accent text-[1.125rem] leading-[1.85] tracking-[0.09em] text-ink-soft md:columns-2 md:text-justify md:hyphens-auto">
          {a.sections.map((s, si) => (
            <section key={s.heading} aria-labelledby={`s${si}`} className="mb-6" data-reveal>
              <h2 id={`s${si}`} className="mb-2 text-[0.75rem] font-semibold tracking-[0.18em] text-ink uppercase">
                {s.heading}
              </h2>
              {s.body.map((p) => (
                <p key={p} className="mb-3">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
        <div className="mt-10">
          <Mark />
        </div>
      </div>
    </div>
  );
}

const LAYOUTS = { reshuffle: Reshuffle, monograph: Monograph, maison: Maison, beauty: Beauty, character: Character };

/** The article's page, laid out after the magazine page it was paired with. */
export function ArticleLayout({ article }: { article: JournalArticle }) {
  const Layout = LAYOUTS[article.layout];
  return <Layout a={article} />;
}
