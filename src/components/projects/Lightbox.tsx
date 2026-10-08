"use client";

import { LoadingImage } from "@/components/ui/LoadingImage";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn, pad2 } from "@/lib/utils";

export interface LightboxImage {
  src: string;
  alt: string;
  caption: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number | null;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}

/**
 * Full-screen viewer on a native <dialog>: focus trap, Esc to close and
 * inert background come from the platform. Arrow keys and swipe navigate;
 * neighbouring images are kept mounted so transitions are instant.
 */
export function Lightbox({ images, index, onIndexChange, onClose }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const startX = useRef<number | null>(null);
  const open = index !== null;
  const count = images.length;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const step = (dir: 1 | -1) => index !== null && onIndexChange((index + dir + count) % count);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };

  const visible = new Set(index === null ? [] : [index, (index + 1) % count, (index - 1 + count) % count]);
  const current = index !== null ? images[index] : null;

  return (
    <dialog
      ref={ref}
      className="hk-dialog on-dark"
      aria-label="Image viewer"
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {open && current && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-5">
            <p className="text-sm text-ivory/80" aria-live="polite">
              <span className="tabular-nums text-ivory">{pad2(index + 1)}</span>
              <span className="mx-1.5 opacity-50">/</span>
              <span className="tabular-nums">{pad2(count)}</span>
              <span className="mx-3 opacity-40">—</span>
              {current.caption}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              className="grid size-11 place-items-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-ivory hover:text-ink"
              autoFocus
            >
              <Icon name="close" />
            </button>
          </div>

          <div
            className="relative flex-1 touch-pan-y select-none"
            onPointerDown={(e) => (startX.current = e.clientX)}
            onPointerUp={(e) => {
              if (startX.current === null) return;
              const dx = e.clientX - startX.current;
              startX.current = null;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            }}
          >
            {images.map((img, i) =>
              visible.has(i) ? (
                <div
                  key={img.src}
                  aria-hidden={i !== index}
                  className={cn(
                    "absolute inset-0 px-2 transition-[opacity,transform] duration-500 ease-[var(--ease-premium)] md:px-24",
                    i === index ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-[0.985]",
                  )}
                >
                  <LoadingImage tone="dark" src={img.src} alt={img.alt} fill sizes="100vw" quality={85} className="object-contain" />
                </div>
              ) : null,
            )}

            {count > 1 && (
              <>
                <NavButton side="left" label="Previous image" onClick={() => step(-1)} />
                <NavButton side="right" label="Next image" onClick={() => step(1)} />
              </>
            )}
          </div>
          <p className="sr-only">{current.alt}</p>
          <div className="h-6 md:h-10" />
        </div>
      )}
    </dialog>
  );
}

function NavButton({ side, label, onClick }: { side: "left" | "right"; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-ivory backdrop-blur-sm transition-colors hover:bg-ivory hover:text-ink",
        side === "left" ? "left-3 md:left-6" : "right-3 md:right-6",
      )}
    >
      <Icon name={side === "left" ? "arrowLeft" : "arrowRight"} />
    </button>
  );
}
