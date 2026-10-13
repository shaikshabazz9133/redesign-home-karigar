"use client";

import { useEffect, useRef } from "react";

/**
 * Counts up to `to` once the number scrolls into view: it rises out of a soft blur, ticks up on an
 * ease-out that settles as it lands, then the suffix pops in. The server renders the final figure (for
 * search engines and without JS), and an invisible copy of it reserves the width so nothing shifts while
 * counting. Static for reduced motion. Styles: `.hk-count` in globals.css.
 */
export function CountUp({
  to,
  suffix = "",
  duration = 1800,
  delay = 0,
  align = "start",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  /** Extra wait (ms) after the number enters view, for staggering a row of counters. */
  delay?: number;
  align?: "start" | "end";
}) {
  const root = useRef<HTMLSpanElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    const out = num.current;
    if (!el || !out || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let timer = 0;
    out.textContent = "0";
    el.dataset.state = "ready";

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => {
          el.dataset.state = "counting";
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            out.textContent = String(Math.round(to * (1 - Math.pow(2, -10 * t)))); // ease-out expo
            if (t < 1) frame = requestAnimationFrame(tick);
            else {
              out.textContent = String(to);
              el.dataset.state = "done";
            }
          };
          frame = requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [to, duration, delay]);

  return (
    <span ref={root} className="hk-count inline-grid tabular-nums">
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {to}
        {suffix}
      </span>
      <span className={`hk-count-value col-start-1 row-start-1 ${align === "end" ? "justify-self-end" : "justify-self-start"}`}>
        <span ref={num}>{to}</span>
        {suffix && <span className="hk-count-suffix inline-block">{suffix}</span>}
      </span>
    </span>
  );
}
