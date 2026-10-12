"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { createHydrationBinder } from "./hydrated";

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

    /* Only observe elements React has hydrated, so the class we add
       never collides with hydration. */
    const binder = createHydrationBinder("[data-reveal]:not(.is-in)", (el) => io.observe(el));
    binder.kick();
    const mo = new MutationObserver(() => binder.kick());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      binder.stop();
    };
  }, [pathname]);

  return null;
}
