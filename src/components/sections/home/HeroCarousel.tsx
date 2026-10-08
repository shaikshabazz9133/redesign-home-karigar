"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn, pad2 } from "@/lib/utils";

export interface HeroSlide {
  src: string;
  alt: string;
  caption: string;
  blurDataURL?: string;
}

const INTERVAL_MS = 6500;

/**
 * Full-bleed crossfading hero.
 * - The first image is the LCP element: preloaded, never faded in.
 * - Later slides mount only after the page has loaded.
 * - Autoplay is driven by the CSS progress bar (pausing the bar pauses
 *   the carousel), stops on hover/focus/hidden tab, and is disabled
 *   entirely for prefers-reduced-motion.
 */
export function HeroCarousel({ slides, children }: { slides: HeroSlide[]; children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(1);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const pointerX = useRef<number | null>(null);
  const count = slides.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);

    const mountRest = () => window.setTimeout(() => setMounted(count), 1200);
    let t: number | undefined;
    if (document.readyState === "complete") t = mountRest();
    else window.addEventListener("load", () => (t = mountRest()), { once: true });

    return () => {
      mq.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", onVis);
      window.clearTimeout(t);
    };
  }, [count]);

  const go = useCallback(
    (dir: 1 | -1) => {
      setMounted(count);
      setIndex((i) => (i + dir + count) % count);
    },
    [count],
  );

  const autoplay = !reduced && !userPaused;
  const running = autoplay && !hoverPaused && !tabHidden && mounted === count;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured Home Karigar interiors"
      className="on-dark relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#8a7767] text-ivory"
      onPointerDown={(e) => (pointerX.current = e.clientX)}
      onPointerUp={(e) => {
        if (pointerX.current === null) return;
        const dx = e.clientX - pointerX.current;
        pointerX.current = null;
        if (Math.abs(dx) > 60 && e.pointerType !== "mouse") go(dx < 0 ? 1 : -1);
      }}
    >
      {/* Media */}
      <div className="absolute inset-0 -z-10" aria-live={running ? "off" : "polite"}>
        {slides.slice(0, mounted).map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${s.caption}`}
              aria-hidden={!active}
              className={cn(
                "absolute inset-0 transition-opacity duration-[1.4s] ease-[var(--ease-premium)]",
                active ? "opacity-100" : "opacity-0",
              )}
            >
              <div key={active ? `on-${index}` : "off"} className={cn("absolute inset-0", active && "animate-kenburns")}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="100vw"
                  quality={75}
                  preload={i === 0}
                  placeholder={s.blurDataURL ? "blur" : "empty"}
                  blurDataURL={s.blurDataURL}
                  fetchPriority={i === 0 ? "high" : "low"}
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#120e0c]/90 via-[#120e0c]/35 to-[#120e0c]/30" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#120e0c]/65 via-[#120e0c]/15 to-transparent" />
      </div>

      {children}

      {/* Controls */}
      <div
        className="container-site relative pb-6 md:pb-10"
        onMouseEnter={() => setHoverPaused(true)}
        onMouseLeave={() => setHoverPaused(false)}
        onFocus={() => setHoverPaused(true)}
        onBlur={() => setHoverPaused(false)}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-5 border-t border-ivory/15 pt-5">
          <p className="hidden min-w-0 flex-1 truncate text-sm text-ivory/75 sm:block" aria-hidden>
            <span className="tabular-nums text-ivory">{pad2(index + 1)}</span>
            <span className="mx-1.5 opacity-50">/</span>
            <span className="tabular-nums">{pad2(count)}</span>
            <span className="mx-3 opacity-40">—</span>
            {slides[index].caption}
          </p>

          <div className="flex flex-1 gap-2 sm:max-w-56" aria-hidden>
            {slides.map((s, i) => (
              <span key={s.src} className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-ivory/20">
                <span
                  key={i === index ? `p-${index}` : `i-${i}`}
                  className="absolute inset-0 origin-left bg-ivory"
                  style={
                    i === index && autoplay
                      ? {
                          animation: `hk-progress ${INTERVAL_MS}ms linear forwards`,
                          animationPlayState: running ? "running" : "paused",
                        }
                      : { transform: `scaleX(${i === index || (i < index && !autoplay) ? 1 : 0})` }
                  }
                  onAnimationEnd={() => i === index && go(1)}
                />
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1">
            {!reduced && (
              <ControlButton label={userPaused ? "Play slideshow" : "Pause slideshow"} onClick={() => setUserPaused((p) => !p)}>
                <Icon name={userPaused ? "play" : "pause"} size={16} />
              </ControlButton>
            )}
            <ControlButton label="Previous slide" onClick={() => go(-1)}>
              <Icon name="arrowLeft" size={18} />
            </ControlButton>
            <ControlButton label="Next slide" onClick={() => go(1)}>
              <Icon name="arrowRight" size={18} />
            </ControlButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function ControlButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-11 place-items-center rounded-full text-ivory/80 transition-colors duration-300 hover:bg-ivory/10 hover:text-ivory"
    >
      {children}
    </button>
  );
}
