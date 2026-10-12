const NAMES = [
  "Prestige Finsbury Park",
  "Prestige Waterford",
  "The Prestige City",
  "Avlon Park",
  "Eden Park",
  "Meridian Park",
];

/** Slow, pausable ticker of the communities we've delivered in. CSS-only. */
export function CommunityMarquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {NAMES.map((n) => (
        <li key={n} className="flex items-center whitespace-nowrap font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] italic text-ink-soft">
          <span className="px-8 md:px-12">{n}</span>
          <span aria-hidden className="size-1.5 rotate-45 bg-brass-ink/70" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Communities we've delivered homes in" className="border-y border-line bg-paper py-7 md:py-9">
      <p className="sr-only">Homes delivered in: {NAMES.join(", ")}.</p>
      <div className="hk-marquee group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="hk-marquee-track flex group-hover:[animation-play-state:paused]" aria-hidden>
          {row(true)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
