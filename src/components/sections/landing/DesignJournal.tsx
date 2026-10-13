import Link from "next/link";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { Icon } from "@/components/ui/Icon";
import { articleHref, getJournal } from "@/content/journal";
import { pad2 } from "@/lib/utils";

/**
 * "The Design Journal": three of the studio's notes, set as an editorial row rather than boxed cards —
 * each an arch-topped photograph (the arch of the brand mark), a numbered line of category and reading
 * time, the title and its opening lines, and a "Read article" link to the full note. Equal columns are divided
 * by hairlines; below desktop the row becomes a swipeable strip. Every whole entry is one link.
 */
export function DesignJournal() {
  const notes = getJournal().slice(0, 3);

  return (
    <section aria-labelledby="journal-title" className="relative bg-ivory pt-4 pb-24 md:pb-32">
      <div className="container-site flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[0.9375rem] tracking-[-0.01em] text-muted" data-reveal>
            Notes from the studio
          </p>
          {/* Set like the other section titles: the script word hangs under the second capital word. */}
          <h2
            id="journal-title"
            className="caps -ml-[0.045em] mt-1 grid w-fit grid-cols-[auto_auto] gap-x-[0.24em] pb-[0.25em] font-display text-[clamp(2.6rem,1rem+4vw,4.75rem)] leading-[0.86] font-normal tracking-[-0.055em] text-ink [clip-path:none]!"
            data-reveal
          >
            <span>The</span>
            <span className="sr-only"> </span>
            <span>Design</span>
            <span className="sr-only"> </span>
            <em className="col-start-2 mt-[0.08em] inline-block font-script text-[1.3em] not-italic font-normal leading-[1] tracking-normal normal-case text-oxblood">
              Journal.
            </em>
          </h2>
        </div>

        <div className="flex flex-col gap-6" data-reveal>
          <p className="max-w-md leading-[1.45] text-muted">
            What we have learned from every home we build — on materials, light and the details that make a space
            age well. Written for anyone planning a home of their own.
          </p>
          <Link
            href="/journal"
            className="group inline-flex h-12 w-fit items-center gap-3 rounded-[0_1rem_0_1rem] bg-[linear-gradient(135deg,#6e5038,#583c26)] px-5 text-[0.75rem] font-medium uppercase tracking-[0.08em] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_10px_24px_-14px_rgb(88_60_38/0.6)] transition-[transform,box-shadow] duration-300 ease-premium hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.16),0_14px_30px_-12px_rgb(88_60_38/0.7)] active:scale-[0.98]"
          >
            All journal entries
            <Icon
              name="arrowUpRight"
              size={15}
              className="text-[#e6cfa9] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>

      {/* Below desktop: a swipeable strip that bleeds to the screen edge. From lg: three ruled columns. */}
      <ol className="no-scrollbar container-site mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto max-lg:scroll-pl-[clamp(1rem,4vw,2.5rem)] max-lg:pr-0 md:mt-16 lg:grid lg:grid-cols-3 lg:gap-x-20 lg:overflow-visible">
        {notes.map((a, i) => (
          <li
            key={a.slug}
            className="relative w-[82%] shrink-0 snap-start max-lg:last:mr-4 sm:w-[45%] lg:w-auto lg:before:absolute lg:before:inset-y-0 lg:before:-left-10 lg:before:w-px lg:before:bg-line lg:first:before:hidden"
          >
            {/* The reveal sits on the link, not the item, so its clip never hides the column rule. */}
            <Link
              href={articleHref(a)}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="group flex h-full flex-col"
              aria-label={`${a.title} — read article`}
            >
              {/* The arch: a full round top over a tall frame, as in the brand mark. */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-sm bg-linen">
                <LoadingImage
                  src={a.image.src}
                  alt={a.image.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 82vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.05]"
                />
              </div>

              <p className="mt-7 flex items-center gap-3 whitespace-nowrap text-[0.75rem] uppercase tracking-[0.12em] text-muted">
                <span className="font-display text-[0.9375rem] tracking-[-0.02em] text-ink">{pad2(i + 1)}</span>
                <span aria-hidden className="h-px w-6 bg-current opacity-40" />
                <span className="text-oxblood">{a.category}</span>
                <span aria-hidden>·</span>
                <span>{a.readMinutes} min read</span>
              </p>

              <h3 className="mt-4 font-display text-[clamp(1.35rem,1rem+0.8vw,1.75rem)] leading-[1.15] font-normal tracking-[-0.03em] text-balance text-ink">
                {a.title}
              </h3>
              <p className="mt-3 line-clamp-3 leading-[1.5] text-muted">{a.excerpt}</p>

              <span className="mt-auto flex items-center gap-3 pt-7 text-[0.75rem] font-medium uppercase tracking-[0.1em] text-ink">
                <span className="link-line group-hover:[background-size:100%_1px]">Read article</span>
                <span className="grid size-9 place-items-center rounded-full border border-line transition-[background-color,border-color,color] duration-300 group-hover:border-[#583c26] group-hover:bg-[#583c26] group-hover:text-white">
                  <Icon name="arrowRight" size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
