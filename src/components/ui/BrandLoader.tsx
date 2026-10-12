import { LogoMark } from "./Logo";
import { cn } from "@/lib/utils";

/**
 * Animated brand mark: the two logo stones rock gently, keeping their
 * balance, while a soft light passes across them. Pure CSS (see globals.css).
 */
export function BrandLoader({ size = 44, className, label }: { size?: number; className?: string; label?: string }) {
  return (
    <span role={label ? "status" : undefined} className={cn("hk-load inline-flex flex-col items-center gap-4", className)}>
      <span className="relative block" style={{ width: size }}>
        <span aria-hidden className="hk-load-shadow absolute -bottom-1 left-1/2 h-[10%] w-full -translate-x-1/2 rounded-[50%] bg-umber/20 blur-[5px]" />
        <LogoMark className="w-full" tallClassName="hk-load-tall" smallClassName="hk-load-small">
          <span className="hk-sheen" />
        </LogoMark>
      </span>
      {label && <span className="eyebrow text-current opacity-70">{label}</span>}
    </span>
  );
}
