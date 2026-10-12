/**
 * True once React has hydrated this element. Pages stream and hydrate after
 * the root layout, so DOM-enhancing effects must not touch page markup
 * before React has claimed it (or React reports a hydration mismatch).
 */
export function isHydrated(el: Element): boolean {
  for (const key in el) if (key.startsWith("__reactFiber$")) return true;
  return false;
}

/**
 * Binds every element matching `selector` once React has hydrated it.
 * React can pause and restart hydration, so an element must look hydrated
 * on two consecutive passes before it is bound. Call `kick()` whenever the
 * DOM may have gained new matches; a single frame loop runs until nothing
 * is pending. State persists across kicks, so frequent DOM updates
 * (counters, image loads) never reset progress.
 */
export function createHydrationBinder(selector: string, bind: (el: HTMLElement) => void) {
  const bound = new WeakSet<Element>();
  const seen = new WeakSet<Element>();
  let frame = 0;
  let budget = 0;

  const pass = () => {
    frame = 0;
    let pending = false;
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      if (bound.has(el)) return;
      if (!isHydrated(el)) {
        pending = true;
        return;
      }
      if (!seen.has(el)) {
        seen.add(el);
        pending = true;
        return;
      }
      bound.add(el);
      bind(el);
    });
    if (pending && budget-- > 0) frame = requestAnimationFrame(pass);
  };

  return {
    kick() {
      budget = 600; // ~10s of frames per kick, then give up quietly
      if (!frame) frame = requestAnimationFrame(pass);
    },
    stop() {
      cancelAnimationFrame(frame);
      frame = 0;
    },
  };
}
