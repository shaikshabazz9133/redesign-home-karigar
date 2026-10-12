"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Inertia ("buttery") wheel scrolling via Lenis. Touch devices keep native
 * scrolling; dialogs, the mobile menu and anything marked
 * `data-lenis-prevent` scroll natively too. Off for reduced motion.
 */
export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: true,
      anchors: { offset: -96 },
      prevent: (node) => !!node.closest?.("dialog, #mobile-menu, [data-lenis-prevent]"),
    });
    lenis.current = instance;
    return () => {
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  /* New page: jump to the top instantly and re-measure the document. */
  useEffect(() => {
    const l = lenis.current;
    if (!l) return;
    if (!window.location.hash) l.scrollTo(0, { immediate: true, force: true });
    l.resize();
  }, [pathname]);

  return null;
}
