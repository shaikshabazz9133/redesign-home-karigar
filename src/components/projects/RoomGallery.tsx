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
 */
export function RoomGallery({ rooms }: { rooms: GalleryRoom[] }) {
  const all = rooms.flatMap((r) => r.images);
  const [index, setIndex] = useState<number | null>(null);
  let cursor = 0;

  return (
    <>
      <div className="flex flex-col gap-20 md:gap-28">
        {rooms.map((room) => (
          <section key={room.id} id={room.id} aria-labelledby={`${room.id}-title`} className="scroll-mt-40">
            <div className="mb-8 flex items-baseline justify-between gap-6 border-b border-line pb-5" data-reveal>
              <h2 id={`${room.id}-title`} className="text-h3">
                {room.room}
              </h2>
              <p className="text-sm text-muted">
                {room.images.length} {room.images.length === 1 ? "photograph" : "photographs"}
              </p>
            </div>
            <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
              {room.images.map((img, j) => {
                const at = cursor++;
                return (
                  <li key={img.src} className="break-inside-avoid" data-reveal style={{ "--i": j % 3 } as React.CSSProperties}>
                    <button
                      type="button"
                      onClick={() => setIndex(at)}
                      className="group relative block w-full overflow-hidden rounded-sm bg-linen"
                      aria-label={`Enlarge: ${img.alt}`}
                    >
                      <LoadingImage
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                        className="h-auto w-full transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
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
