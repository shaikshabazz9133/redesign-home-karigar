/**
 * Turns an outline (M + cubic C segments + Z, as in stonePaths.ts) into SMIL
 * `values`/`keyTimes` for a point that travels it at the same pace as a
 * stroke-dashoffset draw eased with the same cubic-bezier, so a marker can
 * ride the tip of the line as it is drawn. Pure and deterministic: server and
 * client render identical strings.
 */

type Pt = [number, number];

function parse(d: string): Pt[][] {
  const tokens = d.match(/[MCZ]|-?\d*\.?\d+/g) ?? [];
  const segments: Pt[][] = [];
  let i = 0;
  let cur: Pt = [0, 0];
  let start: Pt = [0, 0];
  while (i < tokens.length) {
    const cmd = tokens[i++];
    if (cmd === "M") {
      cur = start = [Number(tokens[i++]), Number(tokens[i++])];
    } else if (cmd === "C") {
      const p = Array.from({ length: 3 }, () => [Number(tokens[i++]), Number(tokens[i++])] as Pt);
      segments.push([cur, ...p]);
      cur = p[2];
    } else if (cmd === "Z" && (cur[0] !== start[0] || cur[1] !== start[1])) {
      segments.push([cur, cur, start, start]);
      cur = start;
    }
  }
  return segments;
}

function bez(s: Pt[], t: number): Pt {
  const u = 1 - t;
  const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, e = t * t * t;
  return [a * s[0][0] + b * s[1][0] + c * s[2][0] + e * s[3][0], a * s[0][1] + b * s[1][1] + c * s[2][1] + e * s[3][1]];
}

/** Time at which a cubic-bezier(x1, y1, x2, y2) easing reaches `progress`. */
function easeTimeFor(progress: number, [x1, y1, x2, y2]: readonly number[]) {
  const at = (p1: number, p2: number, u: number) => 3 * (1 - u) * (1 - u) * u * p1 + 3 * (1 - u) * u * u * p2 + u * u * u;
  let lo = 0, hi = 1;
  for (let k = 0; k < 40; k++) {
    const mid = (lo + hi) / 2;
    if (at(y1, y2, mid) < progress) lo = mid;
    else hi = mid;
  }
  return at(x1, x2, (lo + hi) / 2);
}

export function pathMotion(d: string, ease: readonly number[], samples = 48) {
  // Dense polyline with cumulative length.
  const pts: Pt[] = [];
  for (const seg of parse(d)) for (let k = pts.length ? 1 : 0; k <= 24; k++) pts.push(bez(seg, k / 24));
  const len = [0];
  for (let k = 1; k < pts.length; k++) len.push(len[k - 1] + Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]));
  const total = len[len.length - 1];

  const xs: string[] = [], ys: string[] = [], times: string[] = [];
  let j = 0;
  for (let k = 0; k <= samples; k++) {
    const s = k / samples;
    const target = s * total;
    while (j < len.length - 2 && len[j + 1] < target) j++;
    const f = len[j + 1] === len[j] ? 0 : (target - len[j]) / (len[j + 1] - len[j]);
    xs.push((pts[j][0] + (pts[j + 1][0] - pts[j][0]) * f).toFixed(1));
    ys.push((pts[j][1] + (pts[j + 1][1] - pts[j][1]) * f).toFixed(1));
    times.push(k === 0 ? "0" : k === samples ? "1" : easeTimeFor(s, ease).toFixed(4));
  }
  return { x: xs.join(";"), y: ys.join(";"), keyTimes: times.join(";"), start: [Number(xs[0]), Number(ys[0])] as const };
}
