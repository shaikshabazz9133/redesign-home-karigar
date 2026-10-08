import { cn } from "@/lib/utils";

/**
 * Animated brand mark: the Home Karigar roofline draws itself, the window
 * glows, then the stroke retracts — on a loop. Pure CSS (see globals.css).
 */
export function BrandLoader({ size = 44, className, label }: { size?: number; className?: string; label?: string }) {
  return (
    <span role={label ? "status" : undefined} className={cn("hk-loader inline-flex flex-col items-center gap-3", className)}>
      <svg
        viewBox="0 0 40 32"
        width={size}
        height={(size * 32) / 40}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="miter"
        aria-hidden="true"
      >
        {/* Faint outline so the mark is always legible */}
        <g opacity="0.18">
          <path d="M2 30V13L13 2l11 11" />
          <path d="M7 30V15L18 4l11 11" />
          <path d="M2 30h36" />
          <rect x="11" y="12" width="5" height="5" strokeWidth="1.25" />
        </g>
        <path className="hk-loader-line" pathLength={1} d="M2 30V13L13 2l11 11" />
        <path className="hk-loader-line [animation-delay:0.15s]" pathLength={1} d="M7 30V15L18 4l11 11" />
        <path className="hk-loader-line [animation-delay:0.3s]" pathLength={1} d="M2 30h36" />
        <rect className="hk-loader-window" x="11" y="12" width="5" height="5" strokeWidth="1.25" />
      </svg>
      {label && <span className="eyebrow text-current opacity-70">{label}</span>}
    </span>
  );
}
