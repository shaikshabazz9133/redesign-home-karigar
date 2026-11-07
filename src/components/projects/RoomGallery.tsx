"use client";

import { LoadingImage } from "@/components/ui/LoadingImage";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Lightbox, type LightboxImage } from "./Lightbox";

export interface GalleryRoom {
  room: string;
  id: string;
  images: (LightboxImage & { width: number; height: number })[];
}

/**
 * Room-by-room gallery. Each room is a titled section (good for scanning
 * and for search engines); every photo opens the shared lightbox.
 *
 * Rooms are sized by how many photos they have, and small rooms share a row
 * (grid-flow-dense), so a room with one or two photos doesn't leave the rest of
 * the row empty. Photos use one crop so rows line up; the lightbox shows them whole.
 */

/** How wide a room is on the 12-column grid, by photo count. */
const ROOM_SPAN = (n: number) =>
  n === 1 ? "sm:col-span-6 lg:col-span-4" : n === 2 ? "sm:col-span-12 lg:col-span-8" : "sm:col-span-12";

/** Photo columns inside a room, by photo count (each photo is about a third/quarter of the page on desktop). */
const PHOTO_COLS = (n: number) =>
  n === 1 ? "grid-cols-1" : n === 2 ? "grid-cols-2" : n === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

export function RoomGallery({ rooms }: { rooms: GalleryRoom[] }) {
  const all = rooms.flatMap((r) => r.images);
  const [index, setIndex] = useState<number | null>(null);
  let cursor = 0;

  return (
    <>
      <div className="grid grid-flow-row-dense grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-12 md:gap-y-16">
        {rooms.map((room) => (
          <section
            key={room.id}
            id={room.id}
            aria-labelledby={`${room.id}-title`}
            className={`col-span-1 scroll-mt-40 ${ROOM_SPAN(room.images.length)}`}
          >
            <div className="mb-5 flex items-baseline justify-between gap-6 border-b border-line pb-4" data-reveal>
              <h2 id={`${room.id}-title`} className="text-h3">
                {room.room}
              </h2>
              <p className="shrink-0 text-sm text-muted">
                {room.images.length} {room.images.length === 1 ? "photograph" : "photographs"}
              </p>
            </div>
            <ul className={`grid gap-3 sm:gap-4 ${PHOTO_COLS(room.images.length)}`}>
              {room.images.map((img, j) => {
                const at = cursor++;
                return (
                  <li key={img.src} data-reveal style={{ "--i": j % 4 } as React.CSSProperties}>
                    <button
                      type="button"
                      onClick={() => setIndex(at)}
                      className="group relative block aspect-[4/5] w-full overflow-hidden rounded-sm bg-linen"
                      aria-label={`Enlarge: ${img.alt}`}
                    >
                      <LoadingImage
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 50vw"
                        className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                      />
                      <span
                        aria-hidden
                        className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-ivory/90 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                      >
                        <Icon name="expand" size={16} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
      <Lightbox images={all} index={index} onIndexChange={setIndex} onClose={() => setIndex(null)} />
    </>
  );
}
