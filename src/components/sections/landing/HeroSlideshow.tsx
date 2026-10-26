"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IMAGE_ALT } from "@/lib/seo/alt";
import { cn } from "@/lib/utils";

const INTERVAL = 4500;

// Opens on the walk-in wardrobe (the render from public/images/image_01.pdf), then the rooms that hold up
// full-screen behind the white headline.
const SLIDES = [
  { src: "/images/hero/walk-in-wardrobe.jpg", room: "Walk-in wardrobe", position: "object-[50%_45%]" },
  { src: "/images/hero/double-height-living.jpg", room: "Double-height living", position: "object-[50%_55%] max-lg:object-[56%_50%]" },
  { src: "/images/home_karigar_luxury.png", room: "Formal living", position: "object-[50%_45%]" },
  { src: "/images/services/shoib/ceiling-3.jpg", room: "Dining", position: "object-[50%_55%]" },
  { src: "/images/services/shoib/ceiling-5.jpg", room: "Master bedroom", position: "object-[50%_50%]" },
  { src: "/images/services/shoib/tv-1.jpg", room: "Family lounge", position: "object-[50%_55%]" },
] as const;

/** True once the intro preloader has lifted (or there is none), so the first photograph gets its full turn. */
function introDone() {
  const html = document.documentElement;
  return !html.classList.contains("js") || html.dataset.intro === "done";
}

/**
 * The hero's photographs, one after another: each crossfades in and drifts slowly closer while it holds (see
 * `.hk-hero-slide` in globals.css), and the outgoing one keeps drifting as it fades so nothing jumps. Cycling
 * starts after the intro, and stands still on the first photograph for reduced motion.
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

    </>
  );
}
