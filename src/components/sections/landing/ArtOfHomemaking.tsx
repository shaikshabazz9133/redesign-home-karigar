"use client";

import { useEffect, useRef, useState } from "react";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { BrandIcon, Icon } from "@/components/ui/Icon";
import { VideoDialog } from "@/components/tours/TourGallery";
import { site } from "@/content/site";
import { tourThumb, tours, type Tour } from "@/content/studio";

/** Home tours first, then client stories. */
const VIDEOS = [...tours.filter((t) => t.kind === "Home tour"), ...tours.filter((t) => t.kind === "Client story")];
const channel = site.socials.find((s) => s.label === "YouTube")?.href;
/** How long each step of the reel rests before moving on by one film. */
const ADVANCE_MS = 4500;
/** The reel's inline inset: the page gutter, plus the margin beside the 82rem container on wide screens. */
const INSET = "max(clamp(1rem, 4vw, 2.5rem), calc((100vw - 82rem) / 2 + clamp(1rem, 4vw, 2.5rem)))";

/** Smoothly scrolls the reel so card `i` sits at its start edge. */
function scrollToCard(el: HTMLElement, i: number) {
  const card = el.children[i] as HTMLElement | undefined;
  if (!card) return;
  el.scrollTo({ left: card.offsetLeft - el.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: "smooth" });
}

/**
 * "The Art of Home Making": the title set like the hero's headline (stepped capitals, the closing words
 * in the copperplate script) over a reel of the studio's YouTube films, three across on desktop. The reel
 * steps on by one film every few seconds, endlessly forward, and snaps one film at a time; the visitor scrolls or swipes it,
 * or picks a film from the dots beneath. Hovering a card previews the film silently in place; clicking
 * opens it with sound in the shared video dialog.
 */
export function ArtOfHomemaking() {
  const [playing, setPlaying] = useState<Tour | null>(null);
  const [active, setActive] = useState(0);
  const track = useRef<HTMLUListElement>(null);

  /* The reel holds the films twice over, so it can keep moving forward forever: whenever it settles in
     the second copy, it jumps back by exactly one copy's width — an identical frame, so the jump is
     invisible. The active dot follows the film nearest the reel's left edge. */
  const raw = useRef(0); // index of that film within the doubled list
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    let settle = 0;
    const span = () => {
      const cards = el.children as HTMLCollectionOf<HTMLElement>;
      return cards[VIDEOS.length].offsetLeft - cards[0].offsetLeft;
    };
    const wrap = () => {
      const width = span();
      // Card widths are fractional, so allow a few pixels; snapping is lifted for the instant jump.
      if (el.scrollLeft < width - 24) return;
      el.style.scrollSnapType = "none";
      el.scrollLeft -= width;
      requestAnimationFrame(() => (el.style.scrollSnapType = ""));
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cards = Array.from(el.children) as HTMLElement[];
        const left = el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).paddingLeft);
        let best = 0;
        cards.forEach((c, i) => {
          if (Math.abs(c.getBoundingClientRect().left - left) < Math.abs(cards[best].getBoundingClientRect().left - left)) best = i;
        });
        raw.current = best;
        setActive(best % VIDEOS.length);
      });
      clearTimeout(settle);
      settle = window.setTimeout(wrap, 160); // once scrolling has come to rest
    };
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  /* Every few seconds the reel moves on by one film, always forward. It holds while the visitor is
     pointing at or focused in the reel, or watching a film, and never runs for reduced motion. */
  const hold = useRef(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = track.current;
    if (!el) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    const t = window.setInterval(() => {
      if (!visible || hold.current || playing) return;
      scrollToCard(el, raw.current + 1);
    }, ADVANCE_MS);
    return () => {
      clearInterval(t);
      io.disconnect();
    };
  });

  const goTo = (i: number) => track.current && scrollToCard(track.current, i);

  return (
    <section aria-labelledby="art-title" className="relative overflow-hidden bg-ivory pt-4 pb-24 md:pb-32">
      <div className="container-site flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[0.9375rem] tracking-[-0.01em] text-muted" data-reveal>
            Films from our homes
          </p>
          {/* Stepped like "The Home Karigar Way"; the negative margin cancels the T's side bearing. */}
          <h2
            id="art-title"
            className="caps -ml-[0.045em] mt-1 font-display text-[clamp(2.6rem,1rem+4vw,4.75rem)] leading-[0.86] pb-[0.25em] font-normal tracking-[-0.055em] text-ink [clip-path:none]!"
            data-reveal
          >
            {/* A two-column grid hangs HOME under ART, as KARIGAR hangs under HOME in "The Home Karigar Way". */}
            <span className="grid w-fit grid-cols-[auto_auto] gap-x-[0.24em]">
              <span>The</span>
              <span className="sr-only"> </span>
              <span className="whitespace-nowrap">art of</span>
              <span className="sr-only"> </span>
              <span className="col-start-2 whitespace-nowrap">
                Home{" "}
                <em className="ml-[0.06em] inline-block font-script text-[1.3em] not-italic font-normal leading-[0] tracking-normal normal-case text-oxblood">
                  Making.
                </em>
              </span>
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-6 lg:items-end lg:text-right" data-reveal>
          {/* The block sits on the right, but its lines all start on one left edge. */}
          <p className="max-w-lg text-left leading-[1.45] text-muted">
            Our work is best understood through the lives these <br className="max-sm:hidden" />
            spaces continue to shape. Explore the spaces, stories, <br className="max-sm:hidden" />
            and quiet moments that continue long after handover.
          </p>
          <div className="flex items-center gap-3">
            {channel && (
              <a
                href={channel}
                target="_blank"
                rel="noopener noreferrer"
                /* The walnut leaf of the header's "Begin your project", so the page's calls to action match. */
                className="group inline-flex h-12 items-center gap-3 rounded-[0_1rem_0_1rem] bg-[linear-gradient(135deg,#6e5038,#583c26)] pl-2 pr-5 text-[0.75rem] font-medium uppercase tracking-[0.08em] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_10px_24px_-14px_rgb(88_60_38/0.6)] transition-[background-image,transform,box-shadow] duration-300 ease-[var(--ease-premium)] hover:-translate-y-0.5 hover:bg-[linear-gradient(135deg,#7a5b3f,#61452f)] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.16),0_14px_30px_-12px_rgb(88_60_38/0.7)] active:scale-[0.98]"
              >
                <span className="grid size-8 place-items-center rounded-[0_0.7rem_0_0.7rem] bg-white/10 text-[#e6cfa9] ring-1 ring-white/15 transition-colors duration-300 group-hover:bg-white/15">
                  <BrandIcon name="YouTube" size={16} />
                </span>
                <span className="max-sm:hidden">Watch on YouTube</span>
                <span className="sm:hidden">YouTube</span>
                <Icon
                  name="arrowUpRight"
                  size={15}
                  className="text-[#e6cfa9] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* The reel: full-bleed, snapping one film at a time, edges fading into the section. */}
      <div className="relative mt-14 md:mt-16 [mask-image:linear-gradient(90deg,transparent,#000_2.5%,#000_97.5%,transparent)]">
        <ul
          ref={track}
          aria-label="Home Karigar films"
          data-lenis-prevent
          onPointerEnter={() => (hold.current = true)}
          onPointerLeave={() => (hold.current = false)}
          onFocus={() => (hold.current = true)}
          onBlur={() => (hold.current = false)}
          onTouchStart={() => (hold.current = true)}
          style={{ paddingInline: INSET, scrollPaddingInline: INSET }}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        >
          {[...VIDEOS, ...VIDEOS].map((v, i) => (
            <li
              key={`${i}-${v.youtubeId}`}
              aria-hidden={i >= VIDEOS.length || undefined}
              className="w-[84vw] shrink-0 snap-start sm:w-[calc((100vw-2*clamp(1rem,4vw,2.5rem)-1.5rem)/2)] lg:w-[calc((min(100vw,82rem)-2*clamp(1rem,4vw,2.5rem)-3rem)/3)]"
            >
              <FilmCard video={v} onPlay={() => setPlaying(v)} focusable={i < VIDEOS.length} />
            </li>
          ))}
        </ul>
      </div>

      {/* One dot per film: the active one stretches into a bar. */}
      <div className="container-site mt-10 flex justify-center">
        <div role="group" aria-label="Choose a film" className="flex flex-wrap items-center justify-center gap-1">
          {VIDEOS.map((v, i) => (
            <button
              key={v.youtubeId}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show film ${i + 1}: ${v.title}`}
              aria-current={active === i || undefined}
              className="group grid h-8 place-items-center px-1"
            >
              <span
                className={`block h-2 rounded-full transition-[width,background-color] duration-500 ease-[var(--ease-out-expo)] ${
                  active === i ? "w-8 bg-oxblood" : "w-2 bg-ink/20 group-hover:bg-ink/45"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <VideoDialog tour={playing} onClose={() => setPlaying(null)} />
    </section>
  );
}

/**
 * A film card. On devices with a mouse, resting on a card for a moment plays the film silently in place,
 * as YouTube's own previews do; moving away stops it. Clicking opens it with sound in the video dialog.
 */
function FilmCard({ video, onPlay, focusable }: { video: Tour; onPlay: () => void; focusable: boolean }) {
  const [preview, setPreview] = useState(false);
  const [ready, setReady] = useState(false);
  const timer = useRef(0);

  const enter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPreview(true), 450);
  };
  const leave = () => {
    clearTimeout(timer.current);
    setPreview(false);
    setReady(false);
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  const id = video.youtubeId;
  return (
    <article className="group relative" onPointerEnter={enter} onPointerLeave={leave}>
      <div className="relative aspect-video overflow-hidden rounded-lg bg-espresso-soft shadow-[0_22px_48px_-26px_rgb(29_24_21/0.6)] transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-24px_rgb(29_24_21/0.7)]">
        <LoadingImage
          tone="dark"
          src={tourThumb(id)}
          alt=""
          fill
          sizes="(min-width: 1312px) 410px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 84vw"
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
        {preview && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${id}&iv_load_policy=3&disablekb=1`}
            title=""
            aria-hidden
            tabIndex={-1}
            allow="autoplay; encrypted-media"
            onLoad={() => window.setTimeout(() => setReady(true), 700)}
            className={`pointer-events-none absolute inset-0 size-full scale-[1.02] transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          />
        )}
        <div
          aria-hidden
          className={`hk-overlay absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/5 transition-opacity duration-500 ${ready ? "opacity-0" : "group-hover:opacity-70"}`}
        />
        {/* The YouTube play button, white until hovered; it steps aside once the preview is playing. */}
        <span
          aria-hidden
          className={`absolute left-1/2 top-1/2 grid h-12 w-[4.25rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[0.85rem] bg-black/55 text-white backdrop-blur-sm transition-[background-color,transform,opacity] duration-500 ease-[var(--ease-premium)] group-hover:scale-110 group-hover:bg-[#ff0000] ${
            ready ? "opacity-0" : ""
          }`}
        >
          <Icon name="play" size={20} />
        </span>
        {/* While a preview plays, a quiet hint that clicking gives sound. */}
        {ready && (
          <span aria-hidden className="absolute bottom-3.5 left-4 flex items-center gap-1.5 text-[0.625rem] font-medium uppercase tracking-[0.12em] text-white/90 [text-shadow:0_1px_8px_rgb(0_0_0/0.5)]">
            <BrandIcon name="YouTube" size={14} className="text-[#ff3b3b]" />
            Click to watch with sound
          </span>
        )}
      </div>
      <h3 className="mt-5 font-sans text-base leading-snug font-medium text-ink">
        <button type="button" onClick={onPlay} tabIndex={focusable ? undefined : -1} className="text-left after:absolute after:inset-0 after:content-['']">
          {video.title}
          <span className="sr-only"> — play video</span>
        </button>
      </h3>
    </article>
  );
}
