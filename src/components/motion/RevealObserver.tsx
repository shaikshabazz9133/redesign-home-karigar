"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One shared IntersectionObserver for every `[data-reveal]` element.
 * Pure CSS handles the animation (see globals.css), so reveals cost
 * almost no JavaScript and content stays visible without JS.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.documentElement.classList.remove("js");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const scan = () =>
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));

    scan();
    let frame = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
