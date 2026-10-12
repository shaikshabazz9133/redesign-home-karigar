import { STONE_SMALL_PATH, STONE_TALL_PATH, STONE_VIEWBOX } from "./stonePaths";
import { pathMotion } from "./pathMotion";

/*
 * The two karigars who build the mark, from first step to last, drawn as
 * solid silhouettes on the stones' 700×858 canvas, standing on its baseline
 * (y = 856), about 260 units tall. Each figure is drawn facing right in its
 * own frame with feet at y = 0; the painter is mirrored to face the small stone.
 *
 * The story, on one SMIL clock (Preloader syncs it to the CSS timeline):
 *   0.1s  both walk in (legs step; the slide itself is CSS)
 *   0.9s  marking out — each holds a taut chalk string whose far end is a nib
 *         riding the tip of their stone's outline as it is drawn
 *   2.7s  strings drop; the carver takes up hammer and chisel, the painter
 *         his roller. The stones' colour then spreads from their tool tips
 *         (CSS, see --hk-cx/--hk-cy in globals.css):
 *           carver's chisel → (14, 697) on the tall stone's left face
 *           painter's roller → (700, 652) on the small stone's right face; the
 *           stroke pivots where the arm's arc runs vertical, so it stays on the stone
 */

const EASE = [0.65, 0, 0.35, 1] as const;
const EASE_SPLINE = EASE.join(" ");
const WALK = { begin: "0.1s", dur: "0.5s", repeatCount: 2, fill: "freeze" } as const;

/** When a stone's outline is traced, where its karigar's string hand is, and when they swap string for tool. */
type Stone = { begin: number; dur: number; swap: number; hand: readonly [number, number]; motion: ReturnType<typeof pathMotion> };
const TALL: Stone = { begin: 0.9, dur: 1.7, swap: 2.7, hand: [-22, 610], motion: pathMotion(STONE_TALL_PATH, EASE) };
const SMALL: Stone = { begin: 1.2, dur: 1.7, swap: 3.0, hand: [748, 610], motion: pathMotion(STONE_SMALL_PATH, EASE) };

const SWING_DUR = "0.95s";
/* Hold high, strike fast, rebound, lift slowly. Chips fly at the strike (≈0.55). */
const SWING_TIMES = "0;0.38;0.55;0.63;1";
const SWING_SPLINES = "0 0 1 1;0.6 0 1 0.55;0 0 0.4 1;0.45 0 0.4 1";

/** Tapered limb: a round-capped stroke through the joints. */
function Limb({ d, w }: { d: string; w: number }) {
  return <path d={d} strokeWidth={w} fill="none" />;
}

/** A leg that steps while walking in, pivoting at the hip. */
function Leg({ d, foot, hipX, phase }: { d: string; foot: string; hipX: number; phase: 1 | -1 }) {
  const a = 16 * phase;
  return (
    <g>
      <animateTransform attributeName="transform" type="rotate" values={`0 ${hipX} -102;${a} ${hipX} -102;0 ${hipX} -102;${-a} ${hipX} -102;0 ${hipX} -102`} {...WALK} />
      <Limb d={d} w={17} />
      <Limb d={foot} w={9} />
    </g>
  );
}

/** Kurta, neck and head shared by both figures. */
function Body() {
  return (
    <>
      <Limb d="M3 -212 L6 -226" w={11} />
      <path d="M-20 -212 C-6 -221 12 -221 24 -211 L22 -152 L31 -90 C10 -84 -12 -84 -29 -90 L-18 -152 Z" stroke="none" />
      <ellipse cx={7} cy={-241} rx={14} ry={16} stroke="none" />
    </>
  );
}

/** Shown until `at`, then hidden — or the reverse. */
function Swap({ at, show, children }: { at: number; show: "before" | "after"; children: React.ReactNode }) {
  return (
    <g visibility={show === "before" ? "visible" : "hidden"}>
      <set attributeName="visibility" to={show === "before" ? "hidden" : "visible"} begin={`${at}s`} fill="freeze" />
      {children}
    </g>
  );
}

/** The arm raised to hold the chalk string, in the figure's own frame. */
const MARKING_ARM = "M12 -205 L30 -222 L44 -246";

/** Outline traced by a nib on a taut string from the karigar's raised hand. */
function MarkOut({ d, stone, outlineClassName }: { d: string; stone: Stone; outlineClassName?: string }) {
  const { begin, dur, swap, hand, motion } = stone;
  const timing = { begin: `${begin}s`, dur: `${dur}s`, fill: "freeze" } as const;
  return (
    <>
      <path d={d} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1} className={outlineClassName} fill="none">
        <animate attributeName="stroke-dashoffset" values="1;0" keyTimes="0;1" calcMode="spline" keySplines={EASE_SPLINE} {...timing} />
      </path>
      <g opacity={0}>
        <animate attributeName="opacity" values="0;1" begin={`${begin - 0.3}s`} dur="0.3s" fill="freeze" />
        <animate attributeName="opacity" values="1;0" begin={`${swap - 0.35}s`} dur="0.35s" fill="freeze" />
        <line x1={hand[0]} y1={hand[1]} x2={motion.start[0]} y2={motion.start[1]} strokeWidth={1.6} strokeDasharray="5 4" className="stroke-brass-ink">
          <animate attributeName="x2" values={motion.x} keyTimes={motion.keyTimes} {...timing} />
          <animate attributeName="y2" values={motion.y} keyTimes={motion.keyTimes} {...timing} />
        </line>
        <circle r={7} cx={motion.start[0]} cy={motion.start[1]} className="fill-brass-ink" stroke="none" opacity={0.25}>
          <animate attributeName="cx" values={motion.x} keyTimes={motion.keyTimes} {...timing} />
          <animate attributeName="cy" values={motion.y} keyTimes={motion.keyTimes} {...timing} />
        </circle>
        <circle r={3.2} cx={motion.start[0]} cy={motion.start[1]} className="fill-umber" stroke="none">
          <animate attributeName="cx" values={motion.x} keyTimes={motion.keyTimes} {...timing} />
          <animate attributeName="cy" values={motion.y} keyTimes={motion.keyTimes} {...timing} />
        </circle>
      </g>
    </>
  );
}

/** Up-and-down roller stroke about the shoulder. */
function RollerStroke() {
  return (
    <animateTransform
      attributeName="transform"
      type="rotate"
      values="-46 10 -205;-14 10 -205;-46 10 -205"
      keyTimes="0;0.5;1"
      calcMode="spline"
      keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
      begin={`${SMALL.swap}s`}
      dur="1.5s"
      repeatCount="indefinite"
    />
  );
}

export function Karigars({
  className,
  linesClassName,
  outlineClassName,
  carverClassName,
  painterClassName,
}: {
  className?: string;
  linesClassName?: string;
  outlineClassName?: string;
  carverClassName?: string;
  painterClassName?: string;
}) {
  return (
    <svg viewBox={STONE_VIEWBOX} aria-hidden strokeLinecap="round" strokeLinejoin="round" className={className}>
      <g className={linesClassName}>
        <MarkOut d={STONE_TALL_PATH} stone={TALL} outlineClassName={outlineClassName} />
        <MarkOut d={STONE_SMALL_PATH} stone={SMALL} outlineClassName={outlineClassName} />
      </g>

      {/* The carver: walks in, marks out the tall stone, then chisels it. */}
      <g className={carverClassName}>
        <g transform="translate(-66 856)" className="fill-umber stroke-umber">
          <Leg d="M-6 -102 L-16 -54 L-24 -7" foot="M-24 -5 L-8 -3" hipX={-6} phase={1} />
          <Leg d="M9 -102 L24 -56 L22 -7" foot="M22 -5 L40 -3" hipX={9} phase={-1} />
          {/* Chisel arm sits behind the body, set against the stone throughout. */}
          <Limb d="M13 -204 L28 -172 L54 -158" w={12} />
          <Limb d="M50 -157 L61 -158" w={9} />
          <Limb d="M61 -158 L80 -159" w={4.5} />
          <Body />
          {/* Turban, wrapped high with a short tail at the back. */}
          <path d="M-9 -243 C-12 -264 20 -270 25 -248 C19 -253 -1 -254 -9 -243 Z" stroke="none" />
          <Limb d="M-8 -247 L-15 -236" w={6} />
          <Swap at={TALL.swap} show="before">
            <Limb d={MARKING_ARM} w={12} />
          </Swap>
          <Swap at={TALL.swap} show="after">
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="-55 8 -206;-55 8 -206;60 8 -206;50 8 -206;-55 8 -206"
                keyTimes={SWING_TIMES}
                calcMode="spline"
                keySplines={SWING_SPLINES}
                begin={`${TALL.swap}s`}
                dur={SWING_DUR}
                repeatCount="indefinite"
              />
              <Limb d="M8 -206 L22 -175 L44 -186" w={12} />
              <Limb d="M44 -186 L48 -216" w={5} />
              <Limb d="M38 -219 L59 -214" w={10} />
            </g>
            {/* Stone chips leap from the chisel tip on each strike. */}
            {[
              [-16, -20],
              [-7, -28],
              [-22, -8],
            ].map(([x, y], i) => (
              <circle key={i} cx={80} cy={-159} r={3} stroke="none" className="fill-brass-ink" opacity={0}>
                <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.54;0.58;0.92;1" begin={`${TALL.swap}s`} dur={SWING_DUR} repeatCount="indefinite" />
                <animateTransform attributeName="transform" type="translate" values={`0 0;0 0;0 0;${x} ${y};${x} ${y}`} keyTimes="0;0.54;0.56;0.92;1" begin={`${TALL.swap}s`} dur={SWING_DUR} repeatCount="indefinite" />
              </circle>
            ))}
          </Swap>
        </g>
      </g>

      {/* The painter: mirrored to face the small stone; marks it out, then rolls its face. */}
      <g className={painterClassName}>
        <g transform="translate(792 856) scale(-1 1)" className="fill-umber stroke-umber">
          <Leg d="M-6 -102 L-20 -55 L-28 -7" foot="M-28 -5 L-12 -3" hipX={-6} phase={1} />
          <Leg d="M9 -102 L19 -55 L27 -7" foot="M27 -5 L45 -3" hipX={9} phase={-1} />
          <Swap at={SMALL.swap} show="before">
            <Limb d="M6 -204 L2 -160 L7 -122" w={12} />
          </Swap>
          <Swap at={SMALL.swap} show="after">
            <g>
              <RollerStroke />
              <Limb d="M8 -205 L30 -177 L58 -166" w={12} />
            </g>
          </Swap>
          <Body />
          {/* Cap. */}
          <path d="M-8 -248 C-8 -262 22 -264 22 -248 Z" stroke="none" />
          <Swap at={SMALL.swap} show="before">
            <Limb d={MARKING_ARM} w={12} />
          </Swap>
          <Swap at={SMALL.swap} show="after">
            <g>
              <RollerStroke />
              <Limb d="M12 -204 L33 -181 L60 -172" w={12} />
              <Limb d="M58 -170 L78 -164" w={6} />
              <Limb d="M78 -164 L86 -159" w={4} />
              <rect x={84} y={-176} width={13} height={34} rx={6} stroke="none" className="fill-brass-ink" />
            </g>
          </Swap>
        </g>
      </g>
    </svg>
  );
}
