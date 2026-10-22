"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { Icon } from "@/components/ui/Icon";
import { cn, pad2 } from "@/lib/utils";
import { brandAlt } from "@/lib/seo/alt";

const INTERVAL = 3800;
const SLIDE_MS = 900;

/**
 * A service's pictures as an automatic, endlessly looping slider: every few seconds the next picture glides in
 * from the right. A copy of the first picture follows the last, so the loop always moves forward and then
 * snaps back to the start unseen. Each picture fills the 4:3 frame (cover), held a little above centre. Plays
 * while the frame is on screen and keeps going after the arrows, dots, keys or a swipe are used; it pauses
 * only while the pointer rests on it, and stands still for reduced motion.
 */
export function ServiceSlideshow({ title, slides, className }: { title: string; slides: string[]; className?: string }) {
  // `pos` runs 0…count; position `count` is the copy of the first slide.
  const [pos, setPos] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const count = slides.length;
  const index = pos % count;
  const track = count > 1 ? [...slides, slides[0]] : slides;

  const go = useCallback(
    (n: number) => {
      setAnimate(true);
      // Stepping back from the first slide jumps to the copy first, so it can slide back to the last.
      if (n < 0) {
        setAnimate(false);
        setPos(count);
        requestAnimationFrame(() => requestAnimationFrame(() => (setAnimate(true), setPos(count - 1))));
        return;
      }
      setPos(Math.min(n, count));
    },
    [count],
  );

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Autoplay: the next slide after each interval, from wherever the viewer left it.
  useEffect(() => {
    if (hovered || !visible || count < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => go(pos + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [pos, hovered, visible, count, go]);

  // Arriving on the copy of the first slide, snap back to the real one without animating.
  useEffect(() => {
    if (pos !== count || count < 2) return;
    const t = window.setTimeout(() => {
      setAnimate(false);
      setPos(0);
    }, SLIDE_MS);
    return () => clearTimeout(t);
  }, [pos, count]);

  return (
    <div
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} — photographs`}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
      className={cn("group relative aspect-[4/3] overflow-hidden rounded-sm bg-espresso outline-none focus-visible:ring-2 focus-visible:ring-brass", className)}
    >
      <div
        className={cn("flex h-full", animate && "transition-transform ease-[cubic-bezier(0.65,0,0.25,1)]")}
        style={{ transform: `translate3d(${-pos * 100}%, 0, 0)`, transitionDuration: animate ? `${SLIDE_MS}ms` : undefined }}
      >
        {track.map((src, i) => {
          const on = i === pos;
          // Only the showing slide and its neighbours load; the rest wait until they are near.
          const near = Math.abs(i - pos) <= 1 || (pos === 0 && i === track.length - 1) || i === 0;
          return (
            <div key={`${src}-${i}`} aria-hidden={!on} className="relative h-full w-full shrink-0 overflow-hidden">
              {near && (
                <LoadingImage
                  src={src}
                  alt={brandAlt(title)}
                  fill
                  sizes="(min-width: 1024px) 56vw, 92vw"
                  priority={i === 0}
                  tone="dark"
                  className="object-cover object-[50%_40%]"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* A soft foot so the controls read over any photograph. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-black/45 to-transparent" />

      {count > 1 && (
        <>
          <div className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 px-4 pb-4 sm:px-5 sm:pb-5">
            <p className="font-sans text-xs tabular-nums tracking-[0.2em] text-white/90" aria-live="polite">
              {pad2(index + 1)} <span className="text-white/50">/ {pad2(count)}</span>
            </p>
            <div className="flex items-center gap-1.5">
              {slides.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`Show photograph ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => go(i)}
                  className="grid h-6 place-items-center"
                >
                  <span
                    className={cn(
                      "block h-[3px] rounded-full transition-all duration-500",
                      i === index ? "w-6 bg-white" : "w-2.5 bg-white/45 hover:bg-white/75",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {(["prev", "next"] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              aria-label={dir === "prev" ? "Previous photograph" : "Next photograph"}
              onClick={() => go(index + (dir === "next" ? 1 : -1))}
              className={cn(
                "absolute top-1/2 z-30 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-ivory/90 text-ink shadow-soft backdrop-blur-sm transition-all duration-300 hover:bg-ivory",
                "opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100",
                dir === "prev" ? "left-3 sm:left-4" : "right-3 sm:right-4",
              )}
            >
              <Icon name="arrowRight" size={18} className={cn(dir === "prev" && "rotate-180")} />
            </button>
          ))}
        </>
      )}
    </div>
  );
}
