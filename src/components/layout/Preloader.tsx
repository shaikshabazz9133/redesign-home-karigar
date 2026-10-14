"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark, TAGLINE } from "@/components/ui/Logo";
import { STONE_SMALL_PATH, STONE_TALL_PATH, STONE_VIEWBOX } from "@/components/ui/stonePaths";

const WORDMARK = "HOME KARIGAR";
const MID = (WORDMARK.length - 1) / 2;

/** Intro styles that can be previewed with `?intro=<name>`; the first is the default. */
export const INTRO_STYLES = ["blueprint", "arch", "doors", "monolith"] as const;
type IntroStyle = (typeof INTRO_STYLES)[number];

/** How long each intro's entrance runs before it may lift (ms since navigation start). */
const MIN_END: Record<IntroStyle, number> = { blueprint: 7700, arch: 5000, doors: 4600, monolith: 4700 };

type Vars = React.CSSProperties & Record<`--${string}`, number>;

/**
 * Intro on every full page load. Four styles share the timing logic below;
 * the one shown is chosen before first paint by an inline script in the root
 * layout (`?intro=arch`, `?intro=doors`, `?intro=monolith`; otherwise the blueprint).
 *
 *   blueprint — "drawing the home", after the client's sketch: a small lattice is
 *              ruled at the centre; the stone mark is traced inside it and coloured;
 *              then every lattice line extends to the screen's edges — verticals up and
 *              down, horizontals left and right — and the sheet opens onto the page.
 *   arch     — "entering the home": a brass arch draws itself and warm light
 *              glows inside it; the stone mark is sketched there in brass and
 *              its texture appears within the line; on exit the doorway grows
 *              until the visitor has stepped through it.
 *   doors    — a pair of tall ivory doors carries the lockup across its seam;
 *              light glows through the gap, then both doors swing open into
 *              the home, taking the split mark with them.
 *   monolith — the mark as a carved stone with real depth turns in on a
 *              turntable; the name's letters flip round like cards; on exit the
 *              whole screen turns away like a page.
 *
 * Everything animates with transform, opacity, filter and stroke only. Styles live in globals.css.
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (!el) return;

    const style = (root.dataset.introStyle as IntroStyle | undefined) ?? "blueprint";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minEnd = reduced ? 300 : MIN_END[style] ?? MIN_END.blueprint;
    const timers: number[] = [];
    let cancelled = false;
    root.style.overflow = "hidden";

    const loaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    const cap = new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, 7000)));

    Promise.race([Promise.all([loaded, document.fonts?.ready]), cap]).then(() => {
      if (cancelled) return;
      timers.push(
        window.setTimeout(() => {
          el.classList.add("is-leaving");
          root.dataset.intro = "done"; // the hero's entrance keys off this
          timers.push(window.setTimeout(() => (root.style.overflow = ""), reduced ? 0 : 900));
          timers.push(window.setTimeout(() => (el.hidden = true), reduced ? 50 : 2100));
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
      <BlueprintIntro />
      <ArchIntro />
      <DoorsIntro />
      <MonolithIntro />

      <span aria-hidden className="hk-pre-count absolute bottom-6 right-[clamp(1rem,4vw,2.5rem)] z-10 font-sans text-[0.7rem] tabular-nums tracking-[0.2em] text-taupe" />
      <span aria-hidden className="hk-pre-track absolute inset-x-0 bottom-0 z-10 h-px bg-umber/10">
        <span className="hk-pre-progress block h-full origin-left bg-gradient-to-r from-sand via-brass to-brass-ink" />
      </span>
    </div>
  );
}

/** "HOME KARIGAR" as separately animated letters, with a gold shine laid over the finished name. */
function Wordmark({ letterClass = "hk-pre-letter", order = "centre" }: { letterClass?: string; order?: "centre" | "start" }) {
  return (
    <p className="hk-pre-wordmark relative whitespace-nowrap pl-[0.42em] font-accent text-[clamp(1.3rem,4.2vw,2.1rem)] font-bold leading-[1.2] tracking-[0.42em] text-umber">
      {WORDMARK.split("").map((c, i) => (
        <span
          key={i}
          className={`${letterClass} inline-block`}
          style={{ "--d": order === "centre" ? Math.abs(i - MID) : i } as Vars}
        >
          {c === " " ? " " : c}
        </span>
      ))}
      <span className="hk-pre-shine absolute inset-0 pl-[0.42em]">{WORDMARK.replace(" ", " ")}</span>
    </p>
  );
}

/** The brass rule and the three-word tagline under the name. */
function Tagline() {
  return (
    <>
      <span className="hk-pre-rule mt-4 block h-px w-[min(15rem,58vw)] bg-gradient-to-r from-transparent via-brass to-transparent" />
      <p className="mt-4 flex gap-[0.7em] pl-[0.28em] font-sans text-[clamp(0.62rem,1.6vw,0.72rem)] tracking-[0.28em] text-taupe">
        {TAGLINE.map((w, i) => (
          <span key={w} className="hk-pre-word inline-block" style={{ "--i": i } as Vars}>
            {w}
          </span>
        ))}
      </p>
    </>
  );
}

/*
 * The client's drawing, set on a 600 × 600 plate centred on the screen:
 *   1. a small lattice of lines is ruled around where the mark will sit;
 *   2. the two stones are traced inside it, standing on its baseline, their edges on its lines;
 *   3. colour blooms into the stones;
 *   4. every lattice line extends outward to the edge of the screen — verticals up and down,
 *      horizontals left and right — a spark of light at each tip;
 *   5. the sheet opens like louvres onto the page.
 * The plate is measured on mount so each extension ends exactly at the screen's edge.
 */
const PLATE = 600;
/** The mark on the plate: 260 units tall, standing on the lattice's baseline. */
const MARK = { x: 194, y: 170, h: 260 } as const;
const MARK_W = (MARK.h * 700) / 858;
const MARK_SCALE = MARK.h / 858;
/** Lattice verticals, keyed to the stones: their outer edges, inner edges and a line either side. */
const VERTICALS = [150, 197, 234, 268, 332, 368, 406, 450];
/** Lattice horizontals: the tall stone's top, the small stone's top, the baseline, and lines between. */
const HORIZONTALS = [170, 234, 297, 368, 430, 476];
/** How far the lattice reaches before it extends. */
const LATTICE = { top: 120, bottom: 520, left: 110, right: 490 } as const;

/** Lattice lines in drawing order: the baseline first, then horizontals and verticals in turn, each
    ruled in the opposite direction to the last. */
const LATTICE_LINES = (() => {
  const h = HORIZONTALS.map((y, k) => ({ d: k % 2 ? `M${LATTICE.right} ${y}H${LATTICE.left}` : `M${LATTICE.left} ${y}H${LATTICE.right}`, base: y === 430 }));
  const v = VERTICALS.map((x, k) => ({ d: k % 2 ? `M${x} ${LATTICE.bottom}V${LATTICE.top}` : `M${x} ${LATTICE.top}V${LATTICE.bottom}`, base: false }));
  const rest = h.filter((l) => !l.base);
  const order = [h.find((l) => l.base)!];
  for (let k = 0; k < Math.max(rest.length, v.length); k++) {
    if (v[k]) order.push(v[k]);
    if (rest[k]) order.push(rest[k]);
  }
  return order.map((l, k) => ({ ...l, delay: k * 0.09 }));
})();

type Edges = { top: number; bottom: number; left: number; right: number };
/** A generous guess at the screen's edges in plate units, used until the plate is measured. */
const DEFAULT_EDGES: Edges = { top: -900, bottom: 1500, left: -1500, right: 2100 };

/** Extensions: each lattice line continued from its ends to the screen's edges. */
function extensions(e: Edges) {
  const lines: { d: string; delay: number }[] = [];
  VERTICALS.forEach((x, k) => {
    lines.push({ d: `M${x} ${LATTICE.top}V${e.top}`, delay: k * 0.09 });
    lines.push({ d: `M${x} ${LATTICE.bottom}V${e.bottom}`, delay: k * 0.09 + 0.04 });
  });
  HORIZONTALS.forEach((y, k) => {
    lines.push({ d: `M${LATTICE.left} ${y}H${e.left}`, delay: 0.2 + k * 0.09 });
    lines.push({ d: `M${LATTICE.right} ${y}H${e.right}`, delay: 0.2 + k * 0.09 + 0.04 });
  });
  return lines;
}

/** The sheet is cut into louvres along its verticals; on exit they lift away in a wave from the centre. */
const STRIPS = 8;

function BlueprintIntro() {
  const plate = useRef<SVGSVGElement>(null);
  const [edges, setEdges] = useState<Edges>(DEFAULT_EDGES);

  // Measure where the screen's edges fall in plate units, so the extensions end exactly there.
  useEffect(() => {
    const measure = () => {
      const r = plate.current?.getBoundingClientRect();
      if (!r || !r.width) return;
      const k = r.width / PLATE;
      setEdges({
        top: Math.floor(-r.top / k) - 4,
        bottom: Math.ceil((window.innerHeight - r.top) / k) + 4,
        left: Math.floor(-r.left / k) - 4,
        right: Math.ceil((window.innerWidth - r.left) / k) + 4,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const ext = extensions(edges);
  const markBox = { x: MARK.x, y: MARK.y, width: MARK_W, height: MARK.h };

  return (
    <div aria-hidden className="hk-intro hk-intro-blueprint absolute inset-0 items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex">
        {Array.from({ length: STRIPS }, (_, i) => (
          <span
            key={i}
            className="hk-bp-strip relative -mx-px h-full flex-1 bg-ivory"
            style={{ "--s": Math.abs(i - (STRIPS - 1) / 2) - 0.5 } as Vars}
          />
        ))}
      </div>

      {/* Warm light that rises behind the mark as its colour blooms, then breathes. */}
      <span className="hk-bp-glow pointer-events-none absolute top-1/2 left-1/2 size-[clamp(16rem,40vmin,28rem)] rounded-full bg-[radial-gradient(circle,rgb(236_214_178/0.55),rgb(236_214_178/0.18)_45%,transparent_70%)]" />

      <svg
        ref={plate}
        viewBox={`0 0 ${PLATE} ${PLATE}`}
        className="hk-bp-plate relative size-[clamp(19rem,64vmin,34rem)] overflow-visible"
        fill="none"
      >
        <defs>
          {/* A warm gold halo around each spark. */}
          <filter id="hk-bp-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="wide" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="near" />
            <feMerge>
              <feMergeNode in="wide" />
              <feMergeNode in="wide" />
              <feMergeNode in="near" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Soft-edged discs that grow from one point in each stone, so its colour blooms like pigment. */}
          <radialGradient id="hk-bp-soft">
            <stop offset="0.62" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="hk-bp-mask-tall" maskUnits="userSpaceOnUse" x="0" y="0" width={PLATE} height={PLATE}>
            <circle cx={232} cy={205} r={300} fill="url(#hk-bp-soft)" className="hk-bp-bloom hk-bp-bloom-tall" />
          </mask>
          <mask id="hk-bp-mask-small" maskUnits="userSpaceOnUse" x="0" y="0" width={PLATE} height={PLATE}>
            <circle cx={382} cy={402} r={230} fill="url(#hk-bp-soft)" className="hk-bp-bloom hk-bp-bloom-small" />
          </mask>
        </defs>

        {/* 1 · The lattice, ruled around where the mark will stand. */}
        <g className="hk-bp-lattice">
          {LATTICE_LINES.map((l) => (
            <path key={l.d} d={l.d} pathLength={1} className={l.base ? "hk-bp-rule hk-bp-rule-base" : "hk-bp-rule"} style={{ "--d": `${l.delay.toFixed(2)}s` } as React.CSSProperties} />
          ))}
        </g>

        {/* 4 · The extensions, out to every edge, each with a spark at its tip. */}
        <g className="hk-bp-ext">
          {ext.map((l) => (
            <path key={l.d} d={l.d} pathLength={1} className="hk-bp-extline" style={{ "--d": `${l.delay.toFixed(2)}s` } as React.CSSProperties} />
          ))}
        </g>
        <g filter="url(#hk-bp-glow)">
          {ext.map((l) => (
            <path key={l.d} d={l.d} pathLength={1} className="hk-bp-spark" style={{ "--d": `${l.delay.toFixed(2)}s` } as React.CSSProperties} />
          ))}
        </g>

        {/* 3 · The stones in colour, each revealed by its blooming disc. */}
        <image href="/brand/stone-tall.webp" {...markBox} mask="url(#hk-bp-mask-tall)" className="hk-bp-stone" />
        <image href="/brand/stone-small.webp" {...markBox} mask="url(#hk-bp-mask-small)" className="hk-bp-stone" />

        {/* 2 · The stones traced in brass. */}
        <g transform={`translate(${MARK.x} ${MARK.y}) scale(${MARK_SCALE})`}>
          <path d={STONE_TALL_PATH} pathLength={1} className="hk-bp-trace" style={{ "--i": 0 } as Vars} />
          <path d={STONE_SMALL_PATH} pathLength={1} className="hk-bp-trace" style={{ "--i": 1 } as Vars} />
        </g>
      </svg>
    </div>
  );
}

function ArchIntro() {
  return (
    <div className="hk-intro hk-intro-arch hk-pre-panel absolute inset-0 flex-col items-center justify-center overflow-hidden px-4">
      {/* The doorway. Its huge ivory shadow is the whole screen around it, so on exit the arch can open
          onto the page and grow until it fills the view — the visitor steps through into the home. */}
      <div className="hk-pre-arch relative w-[clamp(12rem,28vw,17rem)] aspect-[100/140] rounded-t-full shadow-[0_0_0_150vmax_var(--color-ivory)]">
        <div aria-hidden className="hk-pre-archbase absolute inset-0 rounded-t-full bg-ivory" />
        <div aria-hidden className="hk-pre-archfill absolute inset-0 rounded-t-full bg-[radial-gradient(90%_60%_at_50%_78%,#f3e7d6,#efe6da_55%,#ebe2d6)]" />
        <svg aria-hidden viewBox="0 0 100 140" className="absolute inset-0 size-full overflow-visible" fill="none">
          <path d="M0.5 140V50A49.5 49.5 0 0 1 99.5 50V140" pathLength={1} className="hk-pre-outline stroke-brass-ink" />
        </svg>
        <div aria-hidden className="hk-pre-mark absolute bottom-[11%] left-1/2 -translate-x-1/2">
          <LogoMark size="lg" preload className="h-[clamp(5.5rem,13vw,8rem)]" tallClassName="hk-arch-tall" smallClassName="hk-arch-small">
            {/* The sketch: each stone is traced in brass, then its texture appears inside the line. */}
            <svg viewBox={STONE_VIEWBOX} className="pointer-events-none absolute inset-0 size-full overflow-visible" fill="none">
              <path d={STONE_TALL_PATH} pathLength={1} className="hk-arch-trace stroke-brass-ink" style={{ "--i": 0 } as Vars} />
              <path d={STONE_SMALL_PATH} pathLength={1} className="hk-arch-trace stroke-brass-ink" style={{ "--i": 1 } as Vars} />
            </svg>
            <span className="hk-sheen" />
          </LogoMark>
        </div>
      </div>

      <div aria-hidden className="hk-pre-content relative z-10 mt-9 flex flex-col items-center text-center">
        <Wordmark />
        <Tagline />
      </div>
    </div>
  );
}

function DoorsIntro() {
  return (
    <div aria-hidden className="hk-intro hk-intro-doors absolute inset-0 overflow-hidden">
      {(["left", "right"] as const).map((side) => {
        const left = side === "left";
        return (
          <div
            key={side}
            className={`hk-door hk-door-${side} absolute inset-y-0 w-1/2 overflow-hidden ${
              left ? "left-0 origin-left bg-[linear-gradient(90deg,#f6f1e9,#f1ebe2)]" : "right-0 origin-right bg-[linear-gradient(270deg,#f6f1e9,#f1ebe2)]"
            }`}
          >
            {/* Mouldings, a brass pull at the seam, and the door's own shading as it swings from the light. */}
            <span
              className={`hk-door-panel absolute inset-y-[6%] rounded-[2px] border border-brass-ink/25 shadow-[inset_0_0_0_6px_rgb(247_244_239),inset_0_0_0_7px_rgb(125_95_51/0.14)] ${
                left ? "left-[10%] right-[8%]" : "left-[8%] right-[10%]"
              }`}
            />
            <span className={`hk-door-pull absolute bottom-[14%] h-[clamp(3.5rem,9vh,5.5rem)] w-[3px] rounded-full bg-[linear-gradient(180deg,#d8bc8a,#9c7a45)] shadow-[1px_2px_4px_rgb(51_32_13/0.25)] ${left ? "right-[3.5%]" : "left-[3.5%]"}`} />
            <span className={`absolute inset-y-0 w-px bg-umber/15 ${left ? "right-0" : "left-0"}`} />
            <span className="hk-door-shade absolute inset-0 bg-umber" />

            {/* The full lockup, centred on the screen; each door shows — and carries away — its own half. */}
            <div className={`absolute inset-y-0 flex w-[100vw] flex-col items-center justify-center px-4 text-center ${left ? "left-0" : "right-0"}`}>
              <div className="hk-pre-mark">
                <LogoMark size="lg" preload={left} className="h-[clamp(7rem,17vw,9.5rem)]" />
              </div>
              <div className="hk-pre-content mt-8 flex flex-col items-center">
                <Wordmark />
                <Tagline />
              </div>
            </div>
          </div>
        );
      })}
      {/* Warm light from inside the home, leaking through the seam before the doors open. */}
      <span className="hk-door-light pointer-events-none absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-[linear-gradient(180deg,transparent,#ffe9bf_20%,#fff4dc_50%,#ffe9bf_80%,transparent)] shadow-[0_0_24px_6px_rgb(255_221_160/0.55)]" />
    </div>
  );
}

/** Layers stacked behind the front face to give the stone mark its depth. */
const DEPTH = 18;

function MonolithIntro() {
  return (
    <div aria-hidden className="hk-intro hk-intro-monolith absolute inset-0 flex-col items-center justify-center overflow-hidden bg-ivory px-4">
      <div className="absolute inset-0 bg-[radial-gradient(42%_40%_at_50%_44%,rgb(201_181_158/0.3),transparent_75%)]" />
      <div className="hk-mono-stage relative [perspective:1100px]">
        <span className="hk-mono-floor absolute -bottom-3 left-1/2 h-4 w-[120%] -translate-x-1/2 rounded-[50%] bg-umber/25 blur-md" />
        <div className="hk-mono relative h-[clamp(9rem,22vw,12rem)] aspect-[700/858] [transform-style:preserve-3d]">
          {Array.from({ length: DEPTH }, (_, i) => DEPTH - i).map((z) => (
            <span
              key={z}
              className="absolute inset-0 brightness-[0.62] sepia-[0.25]"
              style={{ transform: `translateZ(${-z * 1.1}px)` }}
            >
              <LogoMark className="h-full" />
            </span>
          ))}
          <span className="absolute inset-0" style={{ transform: "translateZ(0.5px)" }}>
            <LogoMark size="lg" className="h-full">
              <span className="hk-sheen" />
            </LogoMark>
          </span>
        </div>
      </div>

      <div className="hk-pre-content relative mt-12 flex flex-col items-center text-center [perspective:700px]">
        <Wordmark letterClass="hk-mono-letter" order="start" />
        <Tagline />
      </div>
    </div>
  );
}
