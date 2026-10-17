"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/content/studio";

const ADVANCE_MS = 4500;
/** The reel's inline inset: the page gutter, plus the margin beside the 82rem container on wide screens. */
const INSET = "max(clamp(1rem, 4vw, 2.5rem), calc((100vw - 82rem) / 2 + clamp(1rem, 4vw, 2.5rem)))";

/** Smoothly scrolls the reel so card `i` sits at its start edge. */
function scrollToCard(el: HTMLElement, i: number) {
  const card = el.children[i] as HTMLElement | undefined;
  if (!card) return;
  el.scrollTo({ left: card.offsetLeft - el.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: "smooth" });
}

/**
 * Client testimonials as a reel, moving exactly as the films reel above does: three cards across on
 * desktop, stepping on by one every few seconds, endlessly forward, snapping one card at a time. Visitors
 * can swipe it or pick a card from the dots; it rests while they point at it or focus in it.
 */
export function Testimonials() {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLUListElement>(null);
  const count = testimonials.length;

  /* The cards are held twice over so the reel can keep moving forward: once it settles in the second copy
     it jumps back one copy's width — an identical frame, so the jump is invisible. */
  const raw = useRef(0);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    let settle = 0;
    const span = () => {
      const cards = el.children as HTMLCollectionOf<HTMLElement>;
      return cards[count].offsetLeft - cards[0].offsetLeft;
    };
    const wrap = () => {
      const width = span();
      if (el.scrollLeft < width - 24) return;
      el.style.scrollSnapType = "none";
      el.scrollLeft -= width;
      requestAnimationFrame(() => (el.style.scrollSnapType = ""));
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cards = Array.from(el.children) as HTMLElement[];
        const left = el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).paddingLeft);
        let best = 0;
        cards.forEach((c, i) => {
          if (Math.abs(c.getBoundingClientRect().left - left) < Math.abs(cards[best].getBoundingClientRect().left - left)) best = i;
        });
        raw.current = best;
        setActive(best % count);
      });
      clearTimeout(settle);
      settle = window.setTimeout(wrap, 160);
    };
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [count]);

  const hold = useRef(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = track.current;
    if (!el) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    const t = window.setInterval(() => {
      if (!visible || hold.current) return;
      scrollToCard(el, raw.current + 1);
    }, ADVANCE_MS);
    return () => {
      clearInterval(t);
      io.disconnect();
    };
  }, []);

  const goTo = (i: number) => track.current && scrollToCard(track.current, i);

  return (
    <section aria-labelledby="testimonials-title" className="relative overflow-hidden bg-ivory py-7 md:py-10">
      <div className="container-site flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[0.9375rem] tracking-[-0.01em] text-muted" data-reveal>
            What our homeowners say
          </p>
          <h2
            id="testimonials-title"
            className="caps -ml-[0.045em] mt-1 font-display text-[min(clamp(2.6rem,1rem+4vw,4.75rem),max(2.1rem,0.2rem+10vw))] leading-[0.86] font-normal tracking-[-0.055em] text-ink [clip-path:none]!"
            data-reveal
          >
            Client{" "}
            <em className="inline-block font-script text-[1.3em] leading-[0] font-normal tracking-normal normal-case not-italic text-oxblood">
              Testimonials.
            </em>
          </h2>
        </div>
        <p className="max-w-md leading-[1.45] text-muted" data-reveal>
          In the words of the families whose homes we have designed, built and handed over.
        </p>
      </div>

      <div className="relative mt-10 md:mt-12 [mask-image:linear-gradient(90deg,transparent,#000_2.5%,#000_97.5%,transparent)]">
        <ul
          ref={track}
          aria-label="Client testimonials"
          data-lenis-prevent
          onPointerEnter={() => (hold.current = true)}
          onPointerLeave={() => (hold.current = false)}
          onFocus={() => (hold.current = true)}
          onBlur={() => (hold.current = false)}
          onTouchStart={() => (hold.current = true)}
          style={{ paddingInline: INSET, scrollPaddingInline: INSET }}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <li
              key={i}
              aria-hidden={i >= count || undefined}
              className="w-[84vw] shrink-0 snap-start sm:w-[calc((100vw-2*clamp(1rem,4vw,2.5rem)-1.5rem)/2)] lg:w-[calc((min(100vw,82rem)-2*clamp(1rem,4vw,2.5rem)-3rem)/3)]"
            >
              <figure className="flex h-full flex-col rounded-sm border border-line bg-paper p-7 md:p-8">
                <span aria-hidden className="font-script text-[3.5rem] leading-[0.6] text-oxblood">
                  &ldquo;
                </span>
                <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-[1.7] text-ink-soft">{t.quote}</blockquote>
                <figcaption className="mt-7 border-t border-line pt-5">
                  <span className="block font-display text-[1.25rem] leading-tight tracking-[-0.03em] text-ink">{t.name}</span>
                  <span className="mt-1 block text-[0.75rem] tracking-[0.12em] text-muted uppercase">{t.home}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-site mt-8 flex justify-center">
        <div role="group" aria-label="Choose a testimonial" className="flex flex-wrap items-center justify-center gap-1">
          {testimonials.map((t, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show testimonial ${i + 1} of ${count}`}
              aria-current={active === i || undefined}
              className="group grid h-8 place-items-center px-1"
            >
              <span
                className={`block h-2 rounded-full transition-[width,background-color] duration-500 ease-out-expo ${
                  active === i ? "w-8 bg-oxblood" : "w-2 bg-ink/20 group-hover:bg-ink/45"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
