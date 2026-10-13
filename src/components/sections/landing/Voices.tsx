"use client";

import Image from "next/image";
import { ImageFrame } from "@/components/motion/ImageFrame";
import Link from "next/link";
import { useState } from "react";
import { tourThumb, type Tour } from "@/content/studio";
import { VideoDialog } from "@/components/tours/TourGallery";
import { Eyebrow } from "@/components/ui/Typography";
import { Icon } from "@/components/ui/Icon";

/** One featured homeowner film and a short list — no carousel. */
export function Voices({ featured, more }: { featured: Tour; more: Tour[] }) {
  const [playing, setPlaying] = useState<Tour | null>(null);

  return (
    <section aria-labelledby="voices-title" className="on-dark section-y bg-espresso text-ivory">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div data-reveal><Eyebrow tone="light">In their words</Eyebrow></div>
          <h2 id="voices-title" className="mt-6 text-h2 caps text-ivory" data-reveal>
            Ask the people who live there.
          </h2>
          <p className="text-lead mt-6 text-ivory-muted" data-reveal>
            Homeowners walk you through the spaces we designed with them — filmed after handover.
          </p>

          <ul className="mt-10 border-t border-line-dark" data-reveal>
            {more.map((t) => (
              <li key={t.youtubeId}>
                <button type="button" onClick={() => setPlaying(t)} className="group flex w-full items-center gap-4 border-b border-line-dark py-4 text-left">
                  <span className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-sm bg-espresso-soft">
                    <Image src={tourThumb(t.youtubeId)} alt="" fill sizes="96px" className="object-cover opacity-80 transition-opacity group-hover:opacity-100" />
                  </span>
                  <span className="flex-1 text-[0.9375rem] leading-snug text-ivory/85 group-hover:text-ivory">
                    {t.title}
                    <span className="sr-only"> — play video</span>
                  </span>
                  <Icon name="play" size={14} className="shrink-0 text-brass" />
                </button>
              </li>
            ))}
          </ul>
          <Link href="/tours" className="group mt-8 inline-flex items-center gap-2 text-brass" data-reveal>
            <span className="link-line">All films</span>
            <Icon name="arrowRight" size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="lg:col-span-8">
          <button
            type="button"
            onClick={() => setPlaying(featured)}
            className="group relative block aspect-video w-full overflow-hidden rounded-md bg-espresso-soft"
          >
            <ImageFrame fill parallax={0.1}>
              <Image
                src={tourThumb(featured.youtubeId)}
                alt=""
                fill
                sizes="(min-width: 1024px) 60vw, 92vw"
                className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
              />
            </ImageFrame>
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
            <span aria-hidden className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory pl-1 text-ink shadow-float transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-110 md:size-24">
              <span className="absolute inset-0 animate-ping rounded-full bg-ivory/30 [animation-duration:2.4s]" />
              <Icon name="play" size={26} />
            </span>
            <span className="absolute inset-x-0 bottom-0 p-5 text-left md:p-8">
              <span className="eyebrow block text-ivory/70">{featured.kind}</span>
              <span className="mt-3 block font-display text-2xl text-ivory md:text-3xl">{featured.title}</span>
            </span>
            <span className="sr-only">Play video</span>
          </button>
        </div>
      </div>
      <VideoDialog tour={playing} onClose={() => setPlaying(null)} />
    </section>
  );
}
