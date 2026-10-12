import Image from "next/image";
import { cn } from "@/lib/utils";

export const TAGLINE = ["Design.", "Detail.", "Distinction."] as const;

type MarkProps = {
  className?: string;
  /** Extra classes for each stone, so callers can animate them independently. */
  tallClassName?: string;
  smallClassName?: string;
  /** "sm" serves 154px-tall stones (header, loaders); "lg" the 858px masters (intro). */
  size?: "sm" | "lg";
  preload?: boolean;
  children?: React.ReactNode;
};

/**
 * The Home Karigar stone mark, built from its two textured stones layered on
 * one canvas so each can move on its own while staying in register.
 */
export function LogoMark({ className, tallClassName, smallClassName, size = "sm", preload, children }: MarkProps) {
  // Pre-sized transparent webp, served as-is: the optimiser would flatten the alpha.
  const dir = size === "sm" ? "/brand/sm" : "/brand";
  const shared = { fill: true, unoptimized: true, preload, loading: preload ? undefined : "eager", draggable: false } as const;
  return (
    <span aria-hidden className={cn("relative block aspect-[700/858]", className)}>
      <Image src={`${dir}/stone-tall.webp`} alt="" {...shared} className={cn("select-none", tallClassName)} />
      <Image src={`${dir}/stone-small.webp`} alt="" {...shared} className={cn("select-none", smallClassName)} />
      {children}
    </span>
  );
}

/**
 * The full lockup: stone mark beside "HOME KARIGAR" in the logo's Cormorant
 * Garamond. Umber on light surfaces; ivory with a brass tagline inside `.on-dark`.
 * `markOnlyOnMobile` shows just the transparent stone mark below `md`.
 */
export function Logo({ className, markOnlyOnMobile = false }: { className?: string; markOnlyOnMobile?: boolean }) {
  return (
    <span className={cn("group/logo inline-flex items-center gap-3", className)}>
      <LogoMark
        className={cn(
          "h-10 shrink-0 drop-shadow-[0_1px_1.5px_rgb(51_32_13/0.22)] md:h-11",
          markOnlyOnMobile && "max-md:h-11 max-md:drop-shadow-none",
        )}
        tallClassName="origin-bottom-left transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/logo:-translate-y-[3%] group-hover/logo:-rotate-3"
        smallClassName="origin-bottom transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/logo:translate-x-[4%] group-hover/logo:rotate-6"
      />
      <span className={cn("flex flex-col leading-none text-umber [.on-dark_&]:text-ivory", markOnlyOnMobile && "max-md:hidden")}>
        <span className="whitespace-nowrap font-brand text-[0.95rem] font-bold uppercase tracking-[0.22em] min-[380px]:text-[1.05rem] min-[380px]:tracking-[0.28em] md:text-[1.15rem]">
          Home Karigar
        </span>
        <span className="mt-1.5 whitespace-nowrap font-tagline text-[0.5625rem] tracking-[0.2em] text-taupe max-[379px]:hidden md:text-[0.625rem] [.on-dark_&]:text-brass">
          {TAGLINE.join(" ")}
        </span>
      </span>
    </span>
  );
}
