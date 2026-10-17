"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Dots under a horizontally scrolling strip (found by its id), one for each place the strip can stop, so
 * a visitor can see there is more to scroll to. The current stop is drawn as a longer walnut bar; pressing
 * a dot scrolls the strip there. Nothing shows when everything already fits.
 */
export function StripDots({ target, className }: { target: string; className?: string }) {
  const [stops, setStops] = useState({ count: 0, at: 0 });

  useEffect(() => {
    const el = document.getElementById(target);
    if (!el) return;
    const update = () => {
      const s = step(el);
      if (!s) return;
      const max = el.scrollWidth - el.clientWidth;
      const count = max > 4 ? Math.round(max / s) + 1 : 0;
      const at = el.scrollLeft >= max - 4 ? count - 1 : Math.round(el.scrollLeft / s);
      setStops((p) => (p.count === count && p.at === at ? p : { count, at }));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [target]);

  if (stops.count < 2) return null;

  const go = (i: number) => {
    const el = document.getElementById(target);
    if (el) el.scrollTo({ left: i * step(el), behavior: "smooth" });
  };

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {Array.from({ length: stops.count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-controls={target}
          aria-label={`Show articles from ${i + 1}`}
          aria-current={i === stops.at}
          onClick={() => go(i)}
          className="group grid h-6 cursor-pointer place-items-center px-1"
        >
          <span
            className={cn(
              "block h-1.5 rounded-full transition-[width,background-color] duration-500 ease-out-expo",
              i === stops.at ? "w-7 bg-[#6e5038]" : "w-1.5 bg-ink/20 group-hover:bg-ink/40",
            )}
          />
        </button>
      ))}
    </div>
  );
}

/** The distance between one item and the next. */
function step(el: HTMLElement) {
  const [a, b] = el.children as unknown as HTMLElement[];
  return a && b ? b.offsetLeft - a.offsetLeft : 0;
}
