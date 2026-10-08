"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useState } from "react";
import { BrandLoader } from "./BrandLoader";
import { cn } from "@/lib/utils";

interface LoadingImageProps extends ImageProps {
  /** "light": shimmer + mark (cards, galleries). "dark": mark only (lightbox, video). */
  tone?: "light" | "dark";
  loaderSize?: number;
}

/**
 * next/image with a branded loading state. Until the photo has decoded,
 * a shimmering placeholder and the animated mark are shown; the photo then
 * fades in. The parent must be `position: relative`.
 *
 * Images are only hidden when JS is running (html.js), so content is never
 * lost without it — and cached images skip the loader entirely.
 */
export function LoadingImage({ tone = "light", loaderSize, className, onLoad, alt, ...props }: LoadingImageProps) {
  const [loaded, setLoaded] = useState(false);

  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 grid place-items-center",
            tone === "light" ? "hk-shimmer text-oxblood" : "text-brass",
          )}
        >
          <BrandLoader size={loaderSize ?? (tone === "light" ? 44 : 56)} />
        </span>
      )}
      <Image
        {...props}
        alt={alt}
        ref={ref}
        data-loaded={loaded || undefined}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={cn("hk-img relative", className)}
      />
    </>
  );
}
