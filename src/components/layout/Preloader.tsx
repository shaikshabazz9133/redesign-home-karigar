"use client";

import { useEffect, useRef } from "react";
import { LogoMark, TAGLINE } from "@/components/ui/Logo";
import { STONE_SMALL_PATH, STONE_TALL_PATH, STONE_VIEWBOX } from "@/components/ui/stonePaths";

const WORDMARK = "HOME KARIGAR";
const MID = (WORDMARK.length - 1) / 2;

/** Intro styles that can be previewed with `?intro=<name>`; the first is the default. */
export const INTRO_STYLES = ["blueprint", "arch", "doors", "monolith"] as const;
type IntroStyle = (typeof INTRO_STYLES)[number];

/** How long each intro's entrance runs before it may lift (ms since navigation start). */
const MIN_END: Record<IntroStyle, number> = { blueprint: 8900, arch: 5000, doors: 4600, monolith: 4700 };

type Vars = React.CSSProperties & Record<`--${string}`, number>;

/**
 * Intro on every full page load. Four styles share the timing logic below;
 * the one shown is chosen before first paint by an inline script in the root
 * layout (`?intro=arch`, `?intro=doors`, `?intro=monolith`; otherwise the blueprint).
 *
 *   blueprint — "drawing the home": the stone mark is traced in a fine brass line,
 *              then its colour blooms through each stone like pigment soaking into
 *              paper while the name appears; an architect's sheet is then ruled across
 *              the whole screen one line at a time, a spark of light at each line's tip,
 *              and once every line is drawn the sheet opens like louvres —
 *              strips lifting away in a wave from the centre — onto the page.
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

/* The lines are ruled on a 1600 × 1000 sheet that covers the screen; strokes keep their width at any size. */
const W = 1600;
const H = 1000;
const CX = W / 2;
const CY = H / 2;

type Line = { d: string; delay: number; tone: "main" | "fine" | "arc" };

/** Seconds between one line starting and the next. */
const STEP = 0.2;

/**
 * An architect's sheet ruled across the whole screen, one line at a time so the eye can follow each:
 * the centre cross first, then horizontals and verticals in pairs working outward — each drawn edge to
 * edge, alternating direction — then the long diagonals, then compass arcs struck from the corners.
 */
const LINES: Line[] = (() => {
  const seq: Omit<Line, "delay">[] = [
    { d: `M-10 ${CY}H${W + 10}`, tone: "main" },
    { d: `M${CX} -10V${H + 10}`, tone: "main" },
  ];
  const rows = [300, 700, 190, 810, 400, 600, 80, 920];
  const cols = [580, 1020, 420, 1180, 260, 1340, 100, 1500];
  rows.forEach((y, k) => {
    seq.push({ d: k % 2 ? `M${W + 10} ${y}H-10` : `M-10 ${y}H${W + 10}`, tone: "fine" });
    const x = cols[k];
    seq.push({ d: k % 2 ? `M${x} ${H + 10}V-10` : `M${x} -10V${H + 10}`, tone: "fine" });
  });
  seq.push(
    { d: `M-10 -6L${W + 10} ${H + 6}`, tone: "fine" },
    { d: `M${W + 10} -6L-10 ${H + 6}`, tone: "fine" },
    { d: `M0 360A360 360 0 0 0 360 0`, tone: "arc" },
    { d: `M${W - 360} 0A360 360 0 0 0 ${W} 360`, tone: "arc" },
    { d: `M${W} ${H - 360}A360 360 0 0 0 ${W - 360} ${H}`, tone: "arc" },
    { d: `M360 ${H}A360 360 0 0 0 0 ${H - 360}`, tone: "arc" },
  );
  return seq.map((l, k) => ({ ...l, delay: k * STEP }));
})();

/** When the last line finishes, relative to the start of the ruling (seconds). */
const RULED = (LINES.length - 1) * STEP + 1.4;

/** Brass points where the ruled lines cross around the mark, set once the whole sheet is drawn. */
const NODES = [
  [580, 300], [1020, 300], [580, 700], [1020, 700],
  [420, 400], [1180, 400], [420, 600], [1180, 600],
  [CX, 190], [CX, 810], [260, CY], [1340, CY],
].map(([x, y], k) => ({ x, y, delay: RULED - 0.3 + k * 0.05 }));

/** The sheet is cut into louvres along its verticals; on exit they lift away in a wave from the centre. */
const STRIPS = 8;

function BlueprintIntro() {
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

      {/* The sheet, ruled once the mark is coloured; the lines soften away around the mark. */}
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="hk-bp-lines absolute inset-0 size-full" fill="none">
        <defs>
          {/* A warm gold halo around each spark: blurred twice over, under the sharp core. */}
          <filter id="hk-bp-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="wide" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="near" />
            <feMerge>
              <feMergeNode in="wide" />
              <feMergeNode in="wide" />
              <feMergeNode in="near" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {LINES.map((l) => (
          <path key={l.d} d={l.d} pathLength={1} className={`hk-bp-line hk-bp-line-${l.tone}`} style={{ "--d": `${l.delay.toFixed(2)}s` } as React.CSSProperties} />
        ))}
        {/* A spark of light travelling at the tip of each line as it is drawn. */}
        <g filter="url(#hk-bp-glow)">
          {LINES.map((l) => (
            <path key={l.d} d={l.d} pathLength={1} className="hk-bp-spark" style={{ "--d": `${l.delay.toFixed(2)}s` } as React.CSSProperties} />
          ))}
        </g>
        {NODES.map((n) => (
          <g key={`${n.x}-${n.y}`} className="hk-bp-node" style={{ "--d": `${n.delay.toFixed(2)}s`, transformOrigin: `${n.x}px ${n.y}px` } as React.CSSProperties}>
            <circle cx={n.x} cy={n.y} r={9} className="hk-bp-node-halo" />
            <circle cx={n.x} cy={n.y} r={3.2} className="hk-bp-node-dot" />
          </g>
        ))}
      </svg>

      {/* The mark: traced in brass, then coloured as if the pigment were soaking into paper. */}
      <div className="relative z-10">
        {/* Warm light that rises behind the mark as its colour blooms, then breathes. */}
        <span className="hk-bp-glow pointer-events-none absolute top-1/2 left-1/2 size-[clamp(16rem,36vw,26rem)] rounded-full bg-[radial-gradient(circle,rgb(236_214_178/0.55),rgb(236_214_178/0.18)_45%,transparent_70%)]" />
        <div className="hk-pre-mark relative">
          <LogoMark size="lg" preload className="h-[clamp(6.5rem,15vw,9rem)]" tallClassName="hk-bp-tall" smallClassName="hk-bp-small">
            <svg viewBox={STONE_VIEWBOX} className="pointer-events-none absolute inset-0 size-full overflow-visible" fill="none">
              <path d={STONE_TALL_PATH} pathLength={1} className="hk-bp-trace stroke-brass-ink" style={{ "--i": 0 } as Vars} />
              <path d={STONE_SMALL_PATH} pathLength={1} className="hk-bp-trace stroke-brass-ink" style={{ "--i": 1 } as Vars} />
            </svg>
            <span className="hk-sheen" />
          </LogoMark>
        </div>
        <div className="hk-pre-content absolute top-full left-1/2 mt-8 flex -translate-x-1/2 flex-col items-center text-center">
          <Wordmark />
        </div>
      </div>
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
