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

/**
 * A photograph at its natural proportions, with an optional caption. Never taller than about three
 * quarters of the screen: a tall photograph narrows (keeping its shape, never cropped) rather than grows.
 */
function Photo({
  img,
  sizes,
  priority,
  className,
  caption,
  uncapped,
}: {
  img: JournalImage;
  sizes: string;
  priority?: boolean;
  className?: string;
  caption?: React.ReactNode;
  /** Let the photograph take its full width, however tall that makes it. */
  uncapped?: boolean;
}) {
  return (
    <figure
      className={cn("w-full break-inside-avoid", className)}
      style={uncapped ? undefined : { maxWidth: `calc(72svh * ${img.width} / ${img.height})` }}
      data-reveal
    >
      <div className="relative w-full overflow-hidden bg-linen" style={{ aspectRatio: `${img.width} / ${img.height}` }}>
        <LoadingImage src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      {caption && <figcaption className="mt-3 text-[0.75rem] leading-snug text-muted">{caption}</figcaption>}
    </figure>
  );
}

/** The studio's mark, signed at the foot of the page as the magazines sign theirs. */
function Mark() {
  return <Image src="/brand/mark.webp" alt="" width={700} height={858} className="ml-auto h-12 w-auto opacity-80 md:h-14" aria-hidden />;
}

const byline = `By the ${site.name} studio`;

/* One reading voice for every article: Tiempos Text for the reading text (Source Serif where it is not
   installed) and Neue Haas Grotesk capitals for the sub-headings. */
const BODY = "font-body text-[1rem] leading-[1.62] text-ink-soft";
/* Headlines in the landing page's Inter Tight capitals; standfirsts in the reading face. */
const DISPLAY = "font-display font-normal tracking-[-0.055em] text-ink uppercase";
const LEAD = "font-body text-[1.2rem] leading-[1.4] text-ink";
const H2 = "font-subhead text-[0.8125rem] font-semibold tracking-[0.05em] text-ink uppercase";

/**
 * A paragraph of an article. Lines that credit a writer ("By …", "Words & editorial: …") are set as a quiet
 * byline, and a closing signature ("— …") in italics, so every article treats them alike.
 */
function Para({ text, className }: { text: string; className?: string }) {
  if (/^(By |Words & editorial)/.test(text))
    return <p className={cn("my-2 font-sans text-[0.75rem] tracking-[0.12em] text-muted uppercase", className)}>{text}</p>;
  if (text.startsWith("— ")) return <p className={cn("mt-2 italic text-ink", className)}>{text}</p>;
  return <p className={className}>{text}</p>;
}

/* ------------------------------------------------------------------------------------------------ */
/* Cabinet Reshuffle                                                                                 */
/* ------------------------------------------------------------------------------------------------ */
function Reshuffle({ a }: { a: JournalArticle }) {
  const [main, small] = a.gallery;
  // A long piece — many sections, or more photographs than the two-column page holds — is set as an essay.
  const long = a.sections.length > 4 || a.gallery.length > 2 || a.cover === "left";
  // The headline fits its column whatever its longest word: its size is capped by that word's length.
  const longest = Math.max(...a.display.lines.map((l) => l.length));
  const section = (s: { heading: string; body: string[] }, i: number) => (
    <section key={s.heading} aria-labelledby={`s${i}`} data-reveal>
      <h2 id={`s${i}`} className={cn(H2, "break-after-avoid")}>
        {s.heading}
      </h2>
      {/* Set as a magazine sets running text: paragraphs follow on without a gap, each after the first indented. */}
      <div className={cn("mt-1.5", BODY)}>
        {s.body.map((p, pi) => (
          <Para key={p} text={p} className={cn(pi > 0 && !/^(By |Words & editorial|— )/.test(p) && "indent-6")} />
        ))}
      </div>
    </section>
  );
  const title = (
    <h1
      className={cn(DISPLAY, "leading-[0.97] [--col:calc(100vw-2rem)] lg:[--col:min(44vw,37rem)]")}
      style={{
        fontSize: `min(clamp(2.4rem, 1rem + 3.6vw, 4.25rem), calc(var(--col) / ${(longest * 0.6).toFixed(2)}))`,
      }}
    >
      {a.display.lines.map((l) => (
        <span key={l} className="block">
          {l}
        </span>
      ))}
    </h1>
  );
  const headline = (
    <>
      {title}
      <p className="mt-4 max-w-md font-body text-[1.25rem] leading-[1.35] text-ink">
        {a.dek ?? `${a.title}.`} {!a.author && <em>{byline}</em>}
      </p>
    </>
  );
  // A signed piece credits its writer under the opening — the founder's name set as prominently as a byline
  // in the magazines.
  // An unsigned piece is credited to the studio, with its subject and reading time.
  const author = (
    <div data-reveal>
      <p className="font-subhead text-[0.6875rem] font-semibold tracking-[0.16em] text-muted uppercase">Words by</p>
      <p className={cn(DISPLAY, "mt-1 text-[1.5rem] leading-none")}>
        {a.author ? (a.author.honorific ? `${a.author.honorific} ${a.author.name}` : a.author.name) : `${site.name} Studio`}
      </p>
      <p className="mt-1.5 font-body text-[0.9375rem] italic text-ink-soft">
        {a.author ? a.author.role : `${a.category} · ${a.readMinutes} min read`}
      </p>
    </div>
  );
  const quote = (
    <blockquote className={cn("max-w-md text-[clamp(1.35rem,1rem+0.9vw,1.8rem)] leading-[1.02]", DISPLAY)} data-reveal>
      {a.quote}
    </blockquote>
  );

  // A long essay: the headline, standfirst and quote beside the cover photograph, then the whole essay in
  // newspaper columns with its photographs set at full column width — so no column is ever left empty.
  if (long)
    return (
      <div className="bg-paper">
        {/* Cover on the left: the photograph fills the left half of the page from its margin, the headline,
            standfirst and byline set beside it on the right. */}
        {a.cover === "left" && (
          <div className="container-site grid items-center gap-8 pt-4 lg:grid-cols-2 lg:gap-x-[clamp(3rem,6vw,6rem)]">
            <Photo img={a.image} priority uncapped sizes="(min-width: 1024px) 46vw, 100vw" />
            <div className="flex flex-col gap-7">
              {title}
              <p className={cn("max-w-md text-[clamp(1.35rem,1rem+0.9vw,1.8rem)] leading-[1.02]", DISPLAY)}>
                &ldquo;{a.dek ?? a.title}&rdquo;
              </p>
              {author}
            </div>
          </div>
        )}
        <div className={cn("container-site pb-16 md:pb-20", a.cover === "left" ? "pt-2" : "pt-4")}>
          {/* The photograph starts level with the headline's first line. */}
          {a.cover !== "left" && (
            <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-x-10">
              <div className="flex max-w-xl flex-col gap-7 lg:col-span-6 lg:pt-[0.35rem]">
                {/* The standfirst is set as the pull quote, in its capitals and in quotation marks. */}
                {title}
                <p className={cn("max-w-md text-[clamp(1.35rem,1rem+0.9vw,1.8rem)] leading-[1.02]", DISPLAY)}>
                  &ldquo;{a.dek ?? a.title}&rdquo;
                </p>
                {author}
              </div>
              <Photo
                img={a.image}
                priority
                sizes="(min-width: 1024px) 46vw, 92vw"
                caption={a.image.alt}
                className="lg:col-span-6 lg:justify-self-end"
              />
            </div>
          )}

          <div className="mt-10 gap-10 border-t border-line pt-8 md:columns-2 lg:columns-3 [&>*+*]:mt-6">
            {/* The photographs are spread evenly through the text. */}
            {a.sections.map((s, i) => [
              section(s, i),
              ...a.gallery
                .filter((_, k) => Math.max(0, Math.round(((k + 1) * a.sections.length) / (a.gallery.length + 1)) - 1) === i)
                .map((img) => (
                  <Photo key={img.src} img={img} sizes="(min-width: 1024px) 28vw, (min-width: 768px) 44vw, 92vw" caption={img.alt} />
                )),
            ])}
          </div>
        </div>
      </div>
    );

  const [first, ...rest] = a.sections;
  return (
    <div className="bg-paper">
      <div className="container-site grid gap-x-10 gap-y-8 pt-4 pb-16 md:pb-20 lg:grid-cols-12">
        <div className="flex flex-col lg:col-span-6 lg:pt-6">
          {headline}
          <div className="mt-8 max-w-xl">{section(first, 0)}</div>
          <div className="mt-8">{quote}</div>
          {a.author && <div className="mt-8 max-w-md">{author}</div>}
        </div>

        <div className="lg:col-span-6">
          <Photo img={main} priority sizes="(min-width: 1024px) 46vw, 92vw" caption={main.alt} className="lg:ml-auto" />
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div className="flex flex-col gap-6">{rest.map((s, i) => section(s, i + 1))}</div>
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
  const [top, bottom, ...more] = a.gallery;
  // A long piece keeps its opening beside the photographs, then flows its further parts in two columns
  // below, each led by a part number, its heading and a photograph.
  const long = a.sections.length > 2;
  const opening = long ? a.sections.slice(0, 1) : a.sections;
  const parts = long ? a.sections.slice(1) : [];
  const longest = Math.max(...a.display.lines.map((l) => l.length));
  const ROMAN = ["II", "III", "IV", "V", "VI"];
  return (
    <div className="bg-paper">
      <div className="container-site pt-6 pb-20 md:pb-28">
        <p className="flex items-baseline gap-2 text-ink">
          <span className="font-display text-[1.1rem] font-medium tracking-[-0.02em]">Journal</span>
          <span className="text-[0.75rem] tracking-[0.14em] text-muted uppercase">{a.category}</span>
        </p>

        <div className="mt-8 grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:pt-4">
            {/* The headline fits its column whatever its longest line. */}
            <h1
              className={cn(DISPLAY, "leading-[0.97] [--col:calc(100vw-2rem)] lg:[--col:min(38vw,31rem)]")}
              style={{
                fontSize: `min(clamp(2.4rem, 1rem + 3.6vw, 4.25rem), calc(var(--col) / ${(longest * 0.6).toFixed(2)}))`,
              }}
            >
              {a.display.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h1>
            <p className={cn("mt-5 max-w-sm", LEAD)}>{a.dek ?? a.title}</p>

            <div className={cn("mt-8 flex max-w-md flex-col gap-7", BODY)}>
              {opening.map((s, si) => (
                <section key={s.heading} aria-labelledby={`s${si}`} data-reveal>
                  <h2 id={`s${si}`} className={cn(H2, "mt-3", si === 0 && "sr-only")}>
                    {s.heading}
                  </h2>
                  {s.body.map((p, pi) => (
                    <Para
                      key={p}
                      text={p}
                      className={cn(
                        si === 0 && pi === 0
                          ? "first-letter:float-left first-letter:mt-[0.05em] first-letter:mr-[0.1em] first-letter:font-display first-letter:text-[3.6em] first-letter:leading-[0.8] first-letter:text-ink"
                          : "indent-6",
                      )}
                    />
                  ))}
                </section>
              ))}
            </div>

            {!long && <Credit />}
          </div>

          <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7">
            <Photo img={top} priority sizes="(min-width: 1024px) 46vw, 92vw" />
            <Photo img={bottom} sizes="(min-width: 1024px) 46vw, 92vw" />
          </div>
        </div>

        {long && (
          <>
            <div className={cn("mt-14 gap-12 border-t border-line pt-10 md:columns-2", BODY)}>
              {parts.map((s, k) => (
                <section key={s.heading} aria-labelledby={`p${k}`} className="mb-10" data-reveal>
                  <p className="font-sans text-[0.75rem] tracking-[0.16em] text-oxblood uppercase">Part {ROMAN[k]}</p>
                  <h2 id={`p${k}`} className={H2}>
                    {s.heading}
                  </h2>
                  {more[k] && <Photo img={more[k]} sizes="(min-width: 768px) 44vw, 92vw" className="my-3 break-inside-avoid-column" />}
                  {s.body.map((p, pi) => (
                    <Para key={p} text={p} className={cn(pi > 0 && !/^(By |Words & editorial|— )/.test(p) && "indent-6")} />
                  ))}
                </section>
              ))}
            </div>
            <Credit />
          </>
        )}

        <p className="mt-12 border-l border-ink-soft pl-3 text-[0.75rem] tracking-[0.14em] text-muted uppercase">{site.name} Journal</p>
      </div>
    </div>
  );
}

/** The studio's address line, set under a monograph as the magazines credit theirs. */
function Credit() {
  return (
    <p className="mt-10 max-w-md border-t border-line-strong pt-4 font-sans text-[0.8125rem] leading-snug text-muted">
      <strong className="font-semibold">{site.name} Interiors</strong>, {site.address.display}, {site.email}
    </p>
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
          <Photo img={tall} priority sizes="(min-width: 1024px) 58vw, 100vw" className="mx-auto" />
        </div>

        <div className="container-site flex flex-col lg:col-span-5 lg:max-w-none lg:pr-[clamp(1.5rem,4vw,4rem)] lg:pl-0">
          <p className={cn("ml-auto max-w-sm", LEAD)}>
            {a.excerpt} {byline}.
          </p>

          {/* The stacked title steps back over the photograph's edge, as on the page it follows. */}
          <h1 className={cn("relative z-10 my-10 leading-[0.88] lg:my-16", "text-[clamp(2.4rem,1rem+3.6vw,4.25rem)]", DISPLAY)}>
            {a.display.lines.map((l) => (
              <span key={l} className="block text-center">
                {l}
              </span>
            ))}
          </h1>

          <div className={cn("mx-auto flex max-w-[22rem] flex-col gap-7 lg:mx-0 lg:ml-auto", BODY)}>
            {a.sections.map((s, si) => (
              <section key={s.heading} aria-labelledby={`s${si}`} className="text-justify hyphens-auto" data-reveal>
                <h2 id={`s${si}`} className={cn(H2, "mt-3 text-center")}>
                  {s.heading}
                </h2>
                {s.body.map((p, pi) => (
                  <p key={p} className={cn(pi > 0 && "indent-6")}>
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
            <span className={cn("leading-[0.9]", "text-[clamp(2.4rem,1rem+3.6vw,4.25rem)]", DISPLAY)}>{a.display.lines[0]}</span>
          </span>
          {a.display.lines.slice(1).map((l) => (
            <span key={l} className={cn("block leading-[0.9]", "text-[clamp(2.4rem,1rem+3.6vw,4.25rem)]", DISPLAY)}>
              {l}
            </span>
          ))}
        </h1>
        <p className={cn("mt-8 max-w-2xl", LEAD)}>{a.excerpt}</p>
      </div>

      {/* The collage: a photograph off the left edge with the first note beside it, a tall one off the right
          edge, and a third below. Each keeps its own proportions. */}
      <div className="mt-12 grid items-start gap-6 md:grid-cols-12 md:gap-x-8 md:gap-y-8">
        <Photo img={left} sizes="(min-width: 768px) 30vw, 100vw" className="md:col-span-4 md:mt-24" />
        <section aria-labelledby="s0" className="container-site md:col-span-4 md:mt-auto md:max-w-none md:px-0" data-reveal>
          <h2 id="s0" className={H2}>
            {first.heading}
          </h2>
          <div className={cn("mt-2", BODY)}>
            {first.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>
        <Photo img={tall} priority sizes="(min-width: 768px) 32vw, 100vw" className="md:col-span-4 md:row-span-2" />
        <Photo
          img={below}
          sizes="(min-width: 768px) 30vw, 92vw"
          className="container-site md:col-span-3 md:col-start-4 md:max-w-none md:px-0"
        />
      </div>

      <div className="container-site mt-16 grid gap-10 md:grid-cols-2 md:gap-14">
        {rest.map((s, i) => (
          <section key={s.heading} aria-labelledby={`s${i + 1}`} data-reveal>
            <h2 id={`s${i + 1}`} className={H2}>
              {s.heading}
            </h2>
            <div className={cn("mt-2", BODY)}>
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
    <div className="bg-paper pb-20 md:pb-28">
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
            <span className={cn("leading-[0.9]", "text-[clamp(2.4rem,1rem+3.6vw,4.25rem)]", DISPLAY)}>{a.display.lines[0]}</span>
          </span>
          {a.display.lines.slice(1).map((l) => (
            <span key={l} className={cn("block pl-[0.6em] leading-[0.9]", "text-[clamp(2.4rem,1rem+3.6vw,4.25rem)]", DISPLAY)}>
              {l}
            </span>
          ))}
        </h1>

        <div className={cn("mt-12 max-w-4xl gap-14 md:columns-2 md:text-justify md:hyphens-auto", BODY)}>
          {a.sections.map((s, si) => (
            <section key={s.heading} aria-labelledby={`s${si}`} className="mb-6" data-reveal>
              <h2 id={`s${si}`} className={cn(H2, "mb-2")}>
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

const LAYOUTS = {
  reshuffle: Reshuffle,
  monograph: Monograph,
  maison: Maison,
  beauty: Beauty,
  character: Character,
};

/** The article's page, laid out after the magazine page it was paired with. */
export function ArticleLayout({ article }: { article: JournalArticle }) {
  const Layout = LAYOUTS[article.layout];
  return <Layout a={article} />;
}
