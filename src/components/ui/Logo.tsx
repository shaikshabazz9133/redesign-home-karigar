import { cn } from "@/lib/utils";

/**
 * Vector rendition of the Home Karigar mark (double gabled roofline)
 * with a typeset wordmark. Inherits colour, so it works on any surface.
 */
export function Logo({ className, accent = true }: { className?: string; accent?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 32"
        className={cn("h-7 w-auto shrink-0", accent && "text-oxblood [.on-dark_&]:text-brass")}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="miter"
        aria-hidden="true"
      >
        <path d="M2 30V13L13 2l11 11" />
        <path d="M7 30V15L18 4l11 11" />
        <path d="M2 30h36" />
        <rect x="11" y="12" width="5" height="5" strokeWidth="1.5" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-sans text-[0.95rem] font-semibold uppercase tracking-[0.18em]">Home Karigar</span>
        <span className="mt-1 font-sans text-[0.625rem] uppercase tracking-[0.24em] opacity-60">Interiors · Bengaluru</span>
      </span>
    </span>
  );
}
