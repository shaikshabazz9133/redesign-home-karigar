"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IMAGE_ALT } from "@/lib/seo/alt";
import { cn, pad2 } from "@/lib/utils";

const INTERVAL = 7000;

const SLIDES = [
  { src: "/images/hero/double-height-living.jpg", room: "Double-height living", position: "object-[50%_55%] max-lg:object-[56%_50%]" },
  { src: "/images/home_karigar_luxury.png", room: "Formal living", position: "object-[50%_45%]" },
  { src: "/images/services/shoib/ceiling-3.jpg", room: "Dining", position: "object-[50%_55%]" },
  { src: "/images/services/shoib/ceiling-5.jpg", room: "Master bedroom", position: "object-[50%_50%]" },
  { src: "/images/hero/walk-in-wardrobe.jpg", room: "Walk-in wardrobe", position: "object-[45%_50%]" },
  { src: "/images/services/shoib/kitchen-2.jpg", room: "Kitchen", position: "object-[50%_55%]" },
  { src: "/images/services/shoib/tv-1.jpg", room: "Family lounge", position: "object-[50%_55%]" },
  { src: "/images/hero-2.png", room: "Living & dining", position: "object-[50%_40%]" },
  { src: "/images/services/shoib/ceiling-1.jpg", room: "Lounge", position: "object-[50%_60%]" },
] as const;

/** True once the intro preloader has lifted (or there is none), so the first photograph gets its full turn. */
function introDone() {
  const html = document.documentElement;
  return !html.classList.contains("js") || html.dataset.intro === "done";
}

/**
 * The hero's photographs, one after another: each crossfades in and drifts slowly closer while it holds (see
 * `.hk-hero-slide` in globals.css), and the outgoing one keeps drifting as it fades so nothing jumps. On large
 * screens a quiet index at the foot names the room and runs a hairline timer for each; its bars jump straight
 * to a room. Cycling starts after the intro, and stands still on the first photograph for reduced motion.
 */
export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const check = () => introDone() && setRunning(true);
    const raf = requestAnimationFrame(check);
    const mo = new MutationObserver(check);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-intro", "class"] });
    // The intro's own fail-safe reveals the hero after 9s; follow it.
    const t = window.setTimeout(() => setRunning(true), 9000);
    return () => (cancelAnimationFrame(raf), mo.disconnect(), clearTimeout(t));
  }, []);

  const go = (n: number) => {
    setPrev(index);
    setIndex(n % SLIDES.length);
  };

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, index]);

  return (
    <>
      <div className="hk-hero-photo absolute inset-0 -z-20">
        {SLIDES.map((s, i) => (
          <div
            key={s.src}
            aria-hidden={i !== index}
            data-active={i === index || undefined}
            data-shown={(running && (i === index || i === prev)) || undefined}
            className="hk-hero-slide absolute inset-0 overflow-hidden"
          >
            <Image
              src={s.src}
              alt={IMAGE_ALT}
              fill
              preload={i === 0}
              fetchPriority={i === 0 ? "high" : "low"}
              quality={75}
              sizes="100vw"
              className={cn("object-cover", s.position)}
            />
          </div>
        ))}
      </div>

      {/* Room index: centred on the foot line, between the social links and the call to action. */}
      <div className="hk-hero-in absolute bottom-[clamp(2.5rem,6vh,4.5rem)] left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 [--d:640ms] lg:flex">
        <p aria-live="polite" className="flex items-baseline gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-white/75">
          <span className="tabular-nums text-white">{pad2(index + 1)}</span>
          <span key={index} className="hk-hero-caption">{SLIDES[index].room}</span>
          <span className="tabular-nums text-white/45">{pad2(SLIDES.length)}</span>
        </p>
        <div className="flex gap-1.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Show ${s.room}`}
              aria-current={i === index || undefined}
              onClick={() => i !== index && go(i)}
              className="group relative h-6 w-7 cursor-pointer"
            >
              <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/30 transition-colors group-hover:bg-white/60" />
              <span
                key={i === index ? `on-${index}-${running}` : "off"}
                data-running={(i === index && running) || undefined}
                className={cn(
                  "hk-hero-timer absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 bg-white",
                  i === index ? "scale-x-100" : "scale-x-0",
                )}
                style={{ animationDuration: `${INTERVAL}ms` }}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
