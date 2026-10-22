import Image from "next/image";
import { cn } from "@/lib/utils";
import { brandAlt } from "@/lib/seo/alt";

type Tile = {
  src: string;
  alt: string;
  width: number;
  height: number;
  shape: string;
  position?: string;
  /** The whole picture turned on its point as a diamond (for a transparent cut-out, shown uncropped). */
  diamond?: boolean;
  /** A transparent cut-out shown whole and upright, with no ground, frame or shadow. */
  cutout?: boolean;
};

/** The studio's craft and material references, laid between the words like tiles on a table. */
const TILES = {
  azulejo: {
    src: "/images/design_journal2.png",
    alt: "Blue and white azulejo tile panel of a pastoral riverside scene within a baroque border",
    width: 1935,
    height: 813,
    shape: "aspect-[1935/813]",
  },
  plates: {
    src: "/images/design_journal3-cutout.png",
    alt: "Nine hand-painted ceramic plates in checks, stripes, spots and tiger print",
    width: 1312,
    height: 1199,
    shape: "aspect-square",
    diamond: true,
  },
  karigar: {
    src: "/images/journal3.jpeg",
    alt: "Painting of a karigar carving a wooden daybed in a courtyard, under the Home Karigar name",
    width: 1536,
    height: 1024,
    shape: "aspect-[15/8]",
  },
  daybed: {
    // Cropped from journal4.jpeg to the daybed alone, leaving out that photograph's caption and margin.
    src: "/images/journal4-daybed.jpg",
    alt: "Carved ebony daybed with cane back and block-printed cushions",
    width: 820,
    height: 1300,
    shape: "aspect-[820/1300]",
  },
  screen: {
    src: "/images/design_journal4-cutout.png",
    alt: "Brass-framed stained-glass screen panels of lotus leaves and blossoms",
    width: 459,
    height: 1222,
    shape: "aspect-[459/1222]",
    cutout: true,
  },
  moodboard: {
    src: "/images/moodboard.png",
    alt: "Material moodboard of marble, walnut, fluted glass and brass around an oxblood armchair",
    width: 1903,
    height: 826,
    shape: "aspect-[1903/826]",
  },
} satisfies Record<string, Tile>;

/**
 * One picture, as tall as its row (or as `className` sets), in its own shape; it rises a touch on hover.
 * A diamond is the whole picture turned 45° inside its square box (at 1/√2 of the box, so its points touch
 * the box's edges), with no ground, frame or shadow — only the cut-out itself.
 */
function TileImage({ tile, index, className }: { tile: Tile; index: number; className?: string }) {
  const image = (
    <Image
      src={tile.src}
      alt={brandAlt(tile.alt)}
      fill
      sizes="(min-width: 1024px) 40vw, 80vw"
      className={cn(tile.diamond || tile.cutout ? "object-contain" : "object-cover", tile.position)}
    />
  );
  return (
    <figure
      data-reveal
      style={{ "--i": index } as React.CSSProperties}
      className={cn(
        "relative h-full shrink-0 transition-[translate,box-shadow] duration-700 ease-out-expo hover:-translate-y-1",
        !tile.diamond &&
          !tile.cutout &&
          "overflow-hidden rounded-[2px] bg-linen shadow-[0_14px_30px_-18px_rgb(29_24_21/0.45)] hover:shadow-[0_22px_40px_-20px_rgb(29_24_21/0.55)]",
        tile.shape,
        className,
      )}
    >
      {tile.diamond ? (
        <span className="absolute top-1/2 left-1/2 size-[70.71%] -translate-1/2 rotate-45">{image}</span>
      ) : (
        image
      )}
    </figure>
  );
}

/**
 * Sentence case in a firm, tightly tracked grotesk, each phrase over two lines. From md everything is sized
 * in `cqw` — hundredths of the collage's own width — so words, pictures and gaps keep the drawn proportions
 * at any size.
 */
const words =
  "shrink-0 whitespace-nowrap font-display text-[clamp(2.2rem,9vw,3rem)] leading-[0.92] font-medium tracking-[-0.05em] text-ink md:text-[6.8cqw]";

/** A row: words and pictures side by side from md, at the heights set per row; below, words above pictures. */
const row = "flex flex-wrap items-center gap-x-3 gap-y-4 md:flex-nowrap md:gap-x-[1.6cqw]";
const pictures = "flex h-[clamp(5.5rem,26vw,8rem)] gap-3 md:contents";

/**
 * "Your space isn't plain. It's curated." — three rows of words interleaved with the studio's craft
 * references, laid out after the studio's own sketch:
 *
 *   row 1   Your space   [ wide azulejo panel ] < plates, as a diamond >      |  the stained-
 *   row 2   [ karigar painting ] [ daybed ]  isn't plain.                    |  glass screen,
 *   row 3   It's curated.   [ the full-width moodboard          ]           |  standing tall
 *
 * The board takes the left four-fifths; the screen stands at the right, a little taller than the board and
 * overlapping its edge, and is left out on phones.
 * Each row is taller than the last and starts at its own indent, set close to its neighbours, so the block reads as a composed board
 * rather than a ruled grid. It sits beside the Design Journal's title on the home page. The words are
 * decorative; the sentence is given once, as text for screen readers.
 */
export function CuratedCollage({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="@container flex w-full flex-col gap-6 md:w-[80%] md:gap-[0.6cqw]">
        <p className="sr-only">Your space isn&apos;t plain. It&apos;s curated.</p>

        <div className={cn(row, "md:h-[19cqw]")}>
          <p aria-hidden className={cn(words, "w-full md:w-auto")} data-reveal>
            Your
            <br />
            space
          </p>
          <div className={pictures}>
            <TileImage tile={TILES.azulejo} index={1} />
            {/* The diamond is taller than its row: a negative bottom margin lets it hang down into the open space
                beside "isn't plain." below, tucked in a little over the panel beside it. */}
            <TileImage tile={TILES.plates} index={2} className="md:z-10 md:-mb-[14cqw] md:-ml-[1cqw] md:h-[32cqw] md:self-end" />
          </div>
        </div>

        <div className={cn(row, "md:h-[25cqw]")}>
          <div className={cn(pictures, "max-md:order-last")}>
            <TileImage tile={TILES.karigar} index={1} />
            <TileImage tile={TILES.daybed} index={2} />
          </div>
          {/* Set low and a little apart from the daybed, under the diamond's point. */}
          <p aria-hidden className={cn(words, "w-full md:ml-[2cqw] md:w-auto md:self-end md:pb-[1cqw]")} data-reveal>
            isn&apos;t
            <br />
            plain.
          </p>
        </div>

        <div className={cn(row, "md:h-[30cqw] md:pl-[3cqw]")}>
          {/* Set at the top of its row, against the moodboard, in lower case. */}
          <p aria-hidden className={cn(words, "w-full md:w-auto md:self-start md:pt-[1cqw] md:text-right")} data-reveal>
            It&apos;s
            <br />
            curated.
          </p>
          <div className={pictures}>
            <TileImage tile={TILES.moodboard} index={1} />
          </div>
        </div>
      </div>

      {/* The stained-glass screen, standing at the right of the board and over its edge. */}
      <div className="absolute top-1/2 right-0 z-10 h-[112%] -translate-y-1/2 max-md:hidden">
        <TileImage tile={TILES.screen} index={3} />
      </div>
    </div>
  );
}
