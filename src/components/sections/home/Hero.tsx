import { ButtonLink } from "@/components/ui/Button";
import { deliveryStats, site } from "@/content/site";
import { getProjects } from "@/content/projects";
import { HeroCarousel, type HeroSlide } from "./HeroCarousel";

const slides: HeroSlide[] = [
  {
    src: "/images/home/1.png",
    alt: "Open living and dining room with a curved cove-lit ceiling, statement chandelier and walnut TV wall",
    caption: "Living & dining — Avlon Park",
    // 16px preview shown instantly while the full photo loads
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAIAAAAy3EnLAAAAAXNSR0IArs4c6QAAAORlWElmTU0AKgAAAAgABgEaAAUAAAABAAAAVgEbAAUAAAABAAAAXgEoAAMAAAABAAIAAAExAAIAAABEAAAAZgE7AAIAAAAQAAAAqodpAAQAAAABAAAAugAAAAAAAABgAAAAAQAAAGAAAAABQ2FudmEgKFJlbmRlcmVyKSBkb2M9REFIRGN4Wk84WkEgdXNlcj1VQUY5aDFfVTg3NCBicmFuZD1CQUY5aDNKVkh6SQBBUFVSVkEgTkFMQUJBTEUAAAOgAQADAAAAAQABAACgAgAEAAAAAQAAABCgAwAEAAAAAQAAAAoAAAAA4yvo7gAAAAlwSFlzAAAOxAAADsQBlSsOGwAAA8dpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+OTY8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjk2PC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8ZGM6dGl0bGU+CiAgICAgICAgICAgIDxyZGY6QWx0PgogICAgICAgICAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPlVudGl0bGVkIGRlc2lnbiAtIDE8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QWx0PgogICAgICAgICA8L2RjOnRpdGxlPgogICAgICAgICA8ZGM6Y3JlYXRvcj4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGk+QVBVUlZBIE5BTEFCQUxFPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC9kYzpjcmVhdG9yPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPkNhbnZhIChSZW5kZXJlcikgZG9jPURBSERjeFpPOFpBIHVzZXI9VUFGOWgxX1U4NzQgYnJhbmQ9QkFGOWgzSlZIekk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CnstbPsAAAHASURBVBgZDY/fa9NAHMCT+5U0Tbu0dYM6dA6tYQoDhfkgvvqqL776RwqCoiJDEATFjWo752yprVvapl3TrG3ucnffs//A54f95d3rYCNwPY9QijFWUkkpCEb9QS8IrjFKKGMYIwsspaTgnDjYWCCRkQSM1sYoJTIuDHiOi41imGArv5okyORrlhCCzOKBValiXWSlohQAlq2zxWQSU2y71aqyeRSPv79/5S3PhTbDRODbTnL/wSPOF2t1oeCks/Hw/E/rx9cCkX7Rm03H+SrJOt9+tn9dTJNeNCY6GdnUtcEYgzB1T1rN4cUZz3IlKoJnk8s5RZox9rZnEglaIbLIzYqvwznNhMG83T4FNa/Xr0ejaTQ5kgoYQWgpfAxKQb5e3W7sOwgsiyueAmNK8nDvYdjYSdOr46Nmlo6Y4+zeuPPy2dYwvoziGXn6/EVQ2+y2ftMNXXJqd3c3S0SXy1t+odw0xwyp/b1we+deaNPVMl0tl8QvVWxCb4YHLkGHnz50//aBdzqdrmV09+xUAtRvNUKPeAVP+oRnLhHKIKn8cm06Grz5eAhK9KO54CcUI2RDrkn9Xwzw+cnBY8dlzHH/Ayi+C/6zchF4AAAAAElFTkSuQmCC",
  },
  {
    src: "/images/home/2.png",
    alt: "Dining room with a six-seater walnut table beneath a cascading crystal chandelier",
    caption: "Dining — Avlon Park",
  },
  {
    src: "/images/home/3.png",
    alt: "Lounge with ivory sofas against classical wall panelling under a wave-profile ceiling",
    caption: "Lounge — Avlon Park",
  },
];

const trust = [
  { value: deliveryStats.homesDelivered, label: "Homes delivered across Bengaluru" },
  { value: `${site.foundedYearsAgo}+`, label: "Years of residential practice" },
  { value: "₹0", label: "Advance before your 3D designs are approved" },
];

export function Hero() {
  return (
    <HeroCarousel slides={slides}>
      <div className="container-site relative pb-8 pt-32 md:pb-10">
        <div className="max-w-3xl">
          <p className="eyebrow mb-7 flex animate-rise items-center gap-3 text-ivory/75">
            <span aria-hidden className="h-px w-7 bg-brass" />
            Interior design studio · Bengaluru
          </p>
          <h1 className="text-display text-ivory animate-rise [animation-delay:90ms]">
            Homes crafted with intent.{" "}
            <em className="font-display italic text-ivory/85 [font-variation-settings:'SOFT'_100]">Delivered as promised.</em>
          </h1>
          <p className="text-lead mt-7 max-w-xl text-ivory/80 animate-rise [animation-delay:180ms]">
            Complete residential interiors — designed in 3D, built with branded materials and handed over exactly as
            approved. No advance is taken until your 3D designs are confirmed.
          </p>
          <div className="mt-10 flex flex-col gap-3 animate-rise [animation-delay:270ms] sm:flex-row">
            <ButtonLink href="/contact" variant="light" size="lg">
              Book a design consultation
            </ButtonLink>
            <ButtonLink href="/projects" variant="outline-light" size="lg" icon={null}>
              Explore {getProjects().length} homes
            </ButtonLink>
          </div>
        </div>

        <dl className="mt-14 grid max-w-3xl grid-cols-3 gap-3 animate-fade [animation-delay:500ms] md:mt-14 md:gap-10">
          {trust.map((t) => (
            <div key={t.label} className="flex flex-col gap-2 border-l border-ivory/20 pl-3 md:pl-5">
              <dt className="order-2 text-xs leading-snug text-ivory/70 md:text-sm">{t.label}</dt>
              <dd className="order-1 font-display text-2xl text-ivory md:text-[2.25rem] md:leading-none">{t.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </HeroCarousel>
  );
}
