import Image from "next/image";
import { cn } from "@/lib/utils";

type Tile = { src: string; alt: string; width: number; height: number; shape: string; position?: string };

/** The studio's craft and material references, laid between the words like tiles on a table. */
const TILES = {
  tile: {
    src: "/images/journal1.jpeg",
    alt: "Oxblood floor tiles meeting at a pale four-petal inlay",
    width: 640,
    height: 640,
    shape: "aspect-[3/2]",
  },
  swatches: {
    src: "/images/journal2.jpeg",
    alt: "Moodboard of indigo and block-printed fabric swatches with ceramic dishes",
    width: 1179,
    height: 1454,
    shape: "aspect-[4/5]",
  },
  karigar: {
    src: "/images/journal3.jpeg",
    alt: "Painting of a karigar carving a wooden daybed in a courtyard, under the Home Karigar name",
    width: 1536,
    height: 1024,
    shape: "aspect-[3/2]",
  },
  daybed: {
    src: "/images/journal4.jpeg",
    alt: "Carved ebony daybed with cane back and block-printed cushions",
    width: 1200,
    height: 1500,
    shape: "aspect-[11/20]",
    // The photograph carries a caption on its left and a white margin; the crop keeps to the daybed.
    position: "object-[100%_55%] scale-[1.14] origin-[80%_55%]",
  },
  mural: {
    src: "/images/journal5.jpeg",
    alt: "Temple mural of celestial figures over an indigo ground",
    width: 799,
    height: 405,
    shape: "aspect-[2/1]",
  },
} satisfies Record<string, Tile>;

/** One picture, as tall as its row, in its own shape; it rises a touch on hover. */
function TileImage({ tile, index }: { tile: Tile; index: number }) {
  return (
    <figure
      data-reveal
      style={{ "--i": index } as React.CSSProperties}
      className={cn(
        "relative h-full shrink-0 overflow-hidden rounded-[2px] bg-linen shadow-[0_14px_30px_-18px_rgb(29_24_21/0.45)] transition-[translate,box-shadow] duration-700 ease-out-expo hover:-translate-y-1 hover:shadow-[0_22px_40px_-20px_rgb(29_24_21/0.55)]",
        tile.shape,
      )}
    >
      <Image src={tile.src} alt={tile.alt} fill sizes="(min-width: 1024px) 24vw, 45vw" className={cn("object-cover", tile.position)} />
    </figure>
  );
}

/**
 * Set like the reference: sentence case in a firm, tightly tracked grotesk. From lg its size follows the
 * row height, so words and pictures always stand the same height.
 */
const words =
  "font-display text-[clamp(2.4rem,9vw,3.4rem)] leading-[0.92] font-medium tracking-[-0.05em] text-ink lg:text-[calc(var(--row)*0.47)]";

/** A row: words and pictures share one line from lg, spread across the block; below, words then pictures. */
const row = "flex flex-wrap items-center justify-start gap-x-3 gap-y-4 lg:justify-between lg:gap-x-4 lg:h-(--row) lg:flex-nowrap";
const pictures = "flex h-[clamp(6rem,30vw,9rem)] gap-3 lg:contents";

/**
 * "Your space isn't plain. It's curated." — three rows of words interleaved with the studio's craft
 * references, after the editorial poster it is modelled on. It sits beside the Design Journal's title on
 * the home page. Everything is sized from one row height (`--row`): the type, the pictures and the
 * block's width, so the gaps stay small and even at every screen size. The words are decorative; the
 * sentence is given once, as text for screen readers.
 */
export function CuratedCollage({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-6 [--row:clamp(7rem,-1rem+10vw,11rem)] lg:max-w-[calc(var(--row)*3.8)] lg:gap-[calc(var(--row)*0.14)]",
        className,
      )}
    >
      <p className="sr-only">Your space isn&apos;t plain. It&apos;s curated.</p>

      <div className={row}>
        <p aria-hidden className={cn(words, "w-full lg:w-auto")} data-reveal>
          Your
          <br />
          space
        </p>
        <div className={pictures}>
          <TileImage tile={TILES.tile} index={1} />
          <TileImage tile={TILES.swatches} index={2} />
        </div>
      </div>

      <div className={row}>
        <div className={cn(pictures, "max-lg:order-last")}>
          <TileImage tile={TILES.karigar} index={1} />
        </div>
        <p aria-hidden className={cn(words, "w-full text-right lg:w-auto lg:text-left")} data-reveal>
          isn&apos;t
          <br />
          plain.
        </p>
        <div className={cn(pictures, "max-lg:order-last")}>
          <TileImage tile={TILES.daybed} index={2} />
        </div>
      </div>

      <div className={row}>
        <p aria-hidden className={cn(words, "w-full lg:w-auto")} data-reveal>
          It&apos;s
          <br />
          curated.
        </p>
        <div className={pictures}>
          <TileImage tile={TILES.mural} index={1} />
        </div>
      </div>
    </div>
  );
}
