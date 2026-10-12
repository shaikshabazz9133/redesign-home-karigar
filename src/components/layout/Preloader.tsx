"use client";

import { useEffect, useRef } from "react";
import { LogoMark, TAGLINE } from "@/components/ui/Logo";
import { STONE_VIEWBOX } from "@/components/ui/stonePaths";
import { Karigars } from "@/components/ui/Karigars";

const WORDMARK = "HOME KARIGAR";

type Vars = React.CSSProperties & Record<`--${string}`, number>;

const MID = (WORDMARK.length - 1) / 2;

/** Construction guides on the stones' 700×858 canvas: baseline, plumb lines, datum lines and compass arcs. */
const GUIDES = [
  "M-160 856H860",
  "M12 -70V930",
  "M450 -70V930",
  "M696 330V930",
  "M-90 1H560",
  "M180 422H790",
  "M231 1a219 219 0 1 1 0 438a219 219 0 1 1 0 -438",
  "M471 412a228 228 0 1 1 0 456a228 228 0 1 1 0 -456",
];
/**
 * Intro on every full page load: the mark is *built* by two karigars. They
 * walk in as construction guides draw, mark out each stone's outline with a
 * chalk string, then take up their tools — a carver chisels the tall stone,
 * a painter rolls the small one — and each stone's colour spreads from their
 * tool. They step away, the guides lift, a sheen crosses the finished mark, the wordmark unfolds from its centre and a glint sweeps it — then two panels (ivory over espresso) slide up to reveal the
 * page once it has loaded.
 *
 * Everything animates with transform, opacity and clip-path only, so it stays
 * on the compositor and never flickers.
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minEnd = reduced ? 300 : 8700; // let the entrance finish (ms since navigation start)
    const timers: number[] = [];
    let cancelled = false;
    root.style.overflow = "hidden";

    // The karigars' SMIL clock starts at document load (and restarts there if
    // set earlier); line it up with the CSS timeline, which began at first
    // paint, now and again once loaded, so lines, tools and colour stay in step.
    const syncClock = () => {
      const css = el.getAnimations()[0]?.currentTime;
      const elapsed = typeof css === "number" ? css / 1000 : 0;
      el.querySelectorAll("svg").forEach((svg) => {
        svg.setCurrentTime(reduced ? 30 : elapsed);
        if (reduced) svg.pauseAnimations();
      });
    };
    syncClock();

    const loaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    loaded.then(() => !cancelled && requestAnimationFrame(syncClock));
    const cap = new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, 8000)));

    Promise.race([Promise.all([loaded, document.fonts?.ready]), cap]).then(() => {
      if (cancelled) return;
      timers.push(
        window.setTimeout(() => {
          el.classList.add("is-leaving");
          root.dataset.intro = "done"; // the hero's entrance keys off this
          timers.push(window.setTimeout(() => (root.style.overflow = ""), reduced ? 0 : 700));
          timers.push(window.setTimeout(() => (el.hidden = true), reduced ? 50 : 1800));
        }, Math.max(0, minEnd - performance.now())),
      );
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      root.style.overflow = "";
    };
  }, []);

  return (
    <div id="hk-preloader" ref={ref} role="status" aria-label="Loading Home Karigar" data-lenis-prevent className="fixed inset-0 z-[200]">
      <div aria-hidden className="hk-pre-panel-back absolute inset-0 bg-espresso" />
      <div className="hk-pre-panel absolute inset-0 grid place-items-center overflow-hidden bg-ivory">
        <div aria-hidden className="hk-pre-glow absolute inset-0 bg-[radial-gradient(42%_40%_at_50%_44%,rgb(201_181_158/0.28),transparent_75%)]" />

        <div aria-hidden className="hk-pre-content relative flex flex-col items-center px-4 text-center">
          <div className="relative">
            <span className="hk-pre-shadow absolute -bottom-2 left-1/2 h-3 w-[115%] -translate-x-1/2 rounded-[50%] bg-umber/20 blur-md" />
            <LogoMark
              size="lg"
              preload
              className="h-[clamp(9rem,22vw,12rem)]"
              tallClassName="hk-pre-tall"
              smallClassName="hk-pre-small"
            >
              <svg viewBox={STONE_VIEWBOX} className="hk-pre-plan pointer-events-none absolute inset-0 size-full overflow-visible" fill="none">
                {GUIDES.map((d, i) => (
                  <path key={d} d={d} pathLength={1} className="hk-pre-guide stroke-taupe/45" style={{ "--i": i } as Vars} />
                ))}
              </svg>
              <span className="hk-sheen" />
              <Karigars
                className="pointer-events-none absolute inset-0 size-full overflow-visible"
                linesClassName="hk-pre-lines"
                outlineClassName="hk-pre-outline stroke-brass-ink"
                carverClassName="hk-pre-carver"
                painterClassName="hk-pre-painter"
              />
            </LogoMark>
          </div>

          <p className="hk-pre-wordmark relative mt-9 whitespace-nowrap py-1 pl-[0.42em] font-brand text-[clamp(1.3rem,4.2vw,2.15rem)] font-bold leading-[1.15] tracking-[0.42em] text-umber [perspective:700px]">
            {WORDMARK.split("").map((c, i) => (
              <span key={i} className="hk-pre-letter" style={{ "--d": Math.abs(i - MID) } as Vars}>
                {c === " " ? "\u00a0" : c}
              </span>
            ))}
            {/* A gold glint that sweeps the finished name, clipped to its letterforms. */}
            <span className="hk-pre-glint absolute inset-0 py-1 pl-[0.42em]">{WORDMARK.replace(" ", "\u00a0")}</span>
          </p>

          <span className="relative mt-4 block w-[min(17rem,62vw)]">
            <span className="hk-pre-rule block h-px bg-gradient-to-r from-transparent via-brass to-transparent" />
            <span className="hk-pre-gem absolute left-1/2 top-1/2 -ml-[3px] -mt-[3px] size-[6px] rotate-45 bg-brass-ink" />
          </span>

          <p className="mt-4 flex gap-[0.7em] overflow-hidden py-0.5 pl-[0.28em] font-tagline text-[clamp(0.62rem,1.6vw,0.78rem)] tracking-[0.28em] text-umber/80">
            {TAGLINE.map((w, i) => (
              <span key={w} className="hk-pre-word" style={{ "--i": i } as Vars}>
                {w}
              </span>
            ))}
          </p>
        </div>

        <div aria-hidden className="hk-pre-foot container-site absolute inset-x-0 bottom-0 flex items-end justify-between pb-6">
          <span className="eyebrow text-taupe">Luxury home interiors · Bengaluru</span>
          <span className="hk-pre-count font-tagline text-[0.7rem] tabular-nums tracking-[0.2em] text-umber/70" />
        </div>
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-umber/5">
          <span className="hk-pre-progress block h-full origin-left bg-gradient-to-r from-sand via-brass to-oxblood" />
        </span>
      </div>
    </div>
  );
}
