import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ImageFrameProps {
  children: ReactNode;
  className?: string;
  /** Curtain reveal when the frame scrolls into view. */
  reveal?: boolean;
  /** Parallax strength as a fraction of the frame height (0 = off). 0.08–0.15 reads best. */
  parallax?: number;
  /** Delay step for staggered reveals. */
  index?: number;
  /** Cover the nearest positioned parent instead of sizing itself. */
  fill?: boolean;
  style?: CSSProperties;
}

/**
 * A positioned frame for a `fill` image that adds the two signature
 * scroll effects:
 *  1. Curtain reveal — the frame wipes open top-to-bottom while the photo
 *     glides up and settles from 130% to 100%.
 *  2. Parallax — the photo drifts slower than the page inside the frame.
 * Both are progressive: without JS (or with reduced motion) it's a plain image.
 */
export function ImageFrame({ children, className, reveal = true, parallax = 0, index = 0, fill = false, style }: ImageFrameProps) {
  const layer = parallax ? (
    <div
      data-parallax={parallax}
      className="absolute inset-x-0 will-change-transform"
      style={{ top: `-${parallax * 100}%`, bottom: `-${parallax * 100}%` }}
    >
      {children}
    </div>
  ) : (
    children
  );

  return (
    <div
      data-frame=""
      data-reveal={reveal ? "mask" : undefined}
      className={cn(fill ? "absolute inset-0" : "relative", "overflow-hidden", className)}
      style={{ ...style, ...(index ? ({ "--i": index } as CSSProperties) : null) }}
    >
      {reveal ? (
        <div className="hk-mask absolute inset-0">
          <div className="hk-mask-inner absolute inset-0">{layer}</div>
        </div>
      ) : (
        layer
      )}
    </div>
  );
}
