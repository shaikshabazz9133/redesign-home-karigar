"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { createHydrationBinder } from "./hydrated";

/**
 * Drives every `[data-parallax]` layer on the page from one scroll
 * listener. Only layers currently near the viewport are updated, and all
 * writes happen in a single animation frame. The layer moves inside its
 * `[data-frame]`, which is measured (not transformed) so maths stay stable.
 *
 * Layers are bound only once React has hydrated them, so inline
 * transforms never collide with hydration.
 */
export function ParallaxController() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const active = new Set<HTMLElement>();
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      active.forEach((el) => {
        const box = (el.closest("[data-frame]") as HTMLElement | null) ?? el.parentElement!;
        const r = box.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)));
        const speed = Number(el.dataset.parallax) || 0.1;
        el.style.transform = `translate3d(0, ${(-progress * speed * r.height).toFixed(1)}px, 0)`;
      });
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const el = e.target as HTMLElement;
            if (e.isIntersecting) active.add(el);
            else active.delete(el);
          });
          request();
        },
        { rootMargin: "25% 0px" },
      );

    const binder = createHydrationBinder("[data-parallax]", (el) => io.observe(el));
    binder.kick();
    const mo = new MutationObserver(() => binder.kick());
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);

    return () => {
      binder.stop();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
