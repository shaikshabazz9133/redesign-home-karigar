"use client";

import { LoadingImage } from "@/components/ui/LoadingImage";
import { useCallback, useEffect, useRef, useState } from "react";
import { tourThumb, type Tour } from "@/content/studio";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface TourGalleryProps {
  tours: Tour[];
  layout: "carousel" | "grid";
  headingLevel?: "h2" | "h3";
}

/**
 * Video tours as lightweight thumbnail facades. The YouTube player is
 * only loaded when a visitor chooses to play a video.
 */
export function TourGallery({ tours, layout, headingLevel = "h3" }: TourGalleryProps) {
  const [playing, setPlaying] = useState<Tour | null>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const syncEdges = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setEdges({ start: t.scrollLeft < 8, end: t.scrollLeft + t.clientWidth >= t.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    if (layout !== "carousel") return;
    syncEdges();
    window.addEventListener("resize", syncEdges);
    return () => window.removeEventListener("resize", syncEdges);
  }, [layout, syncEdges]);

  const scrollBy = (dir: 1 | -1) => {
    const t = trackRef.current;
    const card = t?.querySelector("li");
    if (!t || !card) return;
    t.scrollBy({ left: dir * (card.getBoundingClientRect().width + 24), behavior: "smooth" });
  };

  const cards = tours.map((tour, i) => (
    <li
      key={tour.youtubeId}
      className={cn(layout === "carousel" && "w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]")}
      data-reveal={layout === "grid" ? "" : undefined}
      style={layout === "grid" ? ({ "--i": i % 3 } as React.CSSProperties) : undefined}
    >
      <TourCard tour={tour} onPlay={() => setPlaying(tour)} headingLevel={headingLevel} />
    </li>
  ));

  return (
    <>
      {layout === "carousel" ? (
        <div className="relative">
          <ul
            ref={trackRef}
            onScroll={syncEdges}
            className="no-scrollbar -mx-[clamp(1rem,4vw,2.5rem)] flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-[clamp(1rem,4vw,2.5rem)] px-[clamp(1rem,4vw,2.5rem)] pb-2"
            aria-label="Home tour videos"
          >
            {cards}
          </ul>
          <div className="mt-10 flex justify-end gap-2">
            <ArrowButton label="Previous videos" disabled={edges.start} onClick={() => scrollBy(-1)} icon="arrowLeft" />
            <ArrowButton label="Next videos" disabled={edges.end} onClick={() => scrollBy(1)} icon="arrowRight" />
          </div>
        </div>
      ) : (
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{cards}</ul>
      )}
      <VideoDialog tour={playing} onClose={() => setPlaying(null)} />
    </>
  );
}

function TourCard({ tour, onPlay, headingLevel: H = "h3" }: { tour: Tour; onPlay: () => void; headingLevel?: "h2" | "h3" }) {
  return (
    <article className="group relative">
      <div className="relative aspect-video overflow-hidden rounded-sm bg-espresso-soft">
        <LoadingImage
 tone="dark"
          src={tourThumb(tour.youtubeId)}
          alt=""
          fill
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 82vw"
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
        <div aria-hidden className="hk-overlay absolute inset-0 bg-black/25 transition-colors duration-500 group-hover:bg-black/10" />
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory/95 pl-1 text-ink shadow-float transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-110"
        >
          <Icon name="play" size={20} />
        </span>
      </div>
      <p className="eyebrow mt-5 text-current opacity-60">{tour.kind}</p>
      <H className="mt-2.5 font-sans text-lg leading-snug font-medium">
        <button type="button" onClick={onPlay} className="text-left after:absolute after:inset-0 after:content-['']">
          {tour.title}
          <span className="sr-only"> — play video</span>
        </button>
      </H>
    </article>
  );
}

function VideoDialog({ tour, onClose }: { tour: Tour | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (tour && !d.open) d.showModal();
    if (!tour && d.open) d.close();
  }, [tour]);

  return (
    <dialog
      ref={ref}
      className="hk-dialog on-dark"
      aria-label={tour ? `Video: ${tour.title}` : "Video player"}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {tour && (
        <div className="flex h-full flex-col items-center justify-center gap-5 p-4 md:p-10" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <div className="flex w-full max-w-6xl items-center justify-between gap-4">
            <p className="truncate text-sm text-ivory/80">{tour.title}</p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close video"
              autoFocus
              className="grid size-11 shrink-0 place-items-center rounded-full bg-ivory/10 transition-colors hover:bg-ivory hover:text-ink"
            >
              <Icon name="close" />
            </button>
          </div>
          <div className="aspect-video w-full max-w-6xl overflow-hidden rounded-sm bg-black shadow-float">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${tour.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={tour.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="size-full"
            />
          </div>
        </div>
      )}
    </dialog>
  );
}

function ArrowButton({ label, disabled, onClick, icon }: { label: string; disabled: boolean; onClick: () => void; icon: "arrowLeft" | "arrowRight" }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-12 place-items-center rounded-full border border-current/25 transition-[background-color,color,border-color,opacity] duration-300 hover:border-current hover:bg-current/10 disabled:opacity-30 disabled:hover:bg-transparent"
    >
      <Icon name={icon} />
    </button>
  );
}
