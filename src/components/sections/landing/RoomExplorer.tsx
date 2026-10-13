"use client";

import { ImageFrame } from "@/components/motion/ImageFrame";
import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn, pad2 } from "@/lib/utils";

export interface ExplorerRoom {
  room: string;
  note: string;
  image: { src: string; alt: string; width: number; height: number };
  project: { label: string; href: string };
}

/**
 * Pick a room, see it in a delivered home. Tabs pattern: arrow keys move
 * between rooms; images are mounted on first view and then kept for
 * instant crossfades.
 */
export function RoomExplorer({ rooms }: { rooms: ExplorerRoom[] }) {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  const select = (i: number) => {
    setActive(i);
    setSeen((s) => (s.has(i) ? s : new Set(s).add(i)));
  };
  const warm = (i: number) => setSeen((s) => (s.has(i) ? s : new Set(s).add(i)));

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + rooms.length) % rooms.length;
    select(next);
    tabs.current[next]?.focus();
  };

  const current = rooms[active];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      {/* Room list */}
      <div role="tablist" aria-orientation="vertical" aria-label="Rooms" className="flex gap-2 overflow-x-auto no-scrollbar lg:col-span-5 lg:flex-col lg:gap-0 lg:overflow-visible">
        {rooms.map((r, i) => {
          const selected = i === active;
          return (
            <button
              key={r.room}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`${id}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              onMouseEnter={() => warm(i)}
              onFocus={() => warm(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "group shrink-0 text-left transition-colors duration-300",
                "rounded-full border px-4 py-2.5 text-sm lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-5",
                selected ? "border-ink bg-ink text-ivory lg:bg-transparent lg:text-ink" : "border-line-strong text-muted hover:text-ink",
              )}
            >
              <span className="flex items-baseline gap-5">
                <span className="hidden numeral text-lg text-brass-ink lg:inline">{pad2(i + 1)}</span>
                <span className="lg:font-display lg:text-[1.75rem] lg:leading-tight">{r.room}</span>
                <Icon
                  name="arrowRight"
                  size={20}
                  className={cn(
                    "ml-auto hidden self-center transition-all duration-500 ease-[var(--ease-premium)] lg:block",
                    selected ? "translate-x-0 text-oxblood opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-50",
                  )}
                />
              </span>
              <span
                className={cn(
                  "hidden overflow-hidden pl-[2.6rem] text-[0.9375rem] text-muted transition-[max-height,opacity,margin] duration-500 ease-[var(--ease-premium)] lg:block",
                  selected ? "mt-2 max-h-20 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                {r.note}
              </span>
            </button>
          );
        })}
      </div>

      {/* Image stage */}
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="lg:col-span-7">
        <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-linen sm:aspect-[5/4]">
          <ImageFrame fill parallax={0.1}>
          {rooms.map((r, i) =>
            seen.has(i) ? (
              <div
                key={r.image.src}
                aria-hidden={i !== active}
                className={cn(
                  "absolute inset-0 transition-[opacity,scale] duration-[900ms] ease-[var(--ease-premium)]",
                  i === active ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]",
                )}
              >
                <Image src={r.image.src} alt={r.image.alt} fill sizes="(min-width: 1024px) 52vw, 92vw" className="object-cover" />
              </div>
            ) : null,
          )}
          </ImageFrame>
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-ivory md:p-7">
            <p className="text-sm" aria-live="polite">
              <span className="eyebrow block text-ivory/70">Delivered</span>
              <span className="mt-2 block font-display text-base sm:text-xl">{current.project.label}</span>
            </p>
            <Link
              href={current.project.href}
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-ivory px-5 text-sm font-medium text-ink transition-colors hover:bg-paper"
            >
              View this home <Icon name="arrowUpRight" size={16} />
            </Link>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted lg:hidden">{current.note}</p>
      </div>
    </div>
  );
}
