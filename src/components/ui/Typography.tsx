import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small uppercase label with a brass rule — introduces a section. */
export function Eyebrow({ children, tone = "dark", className, rule = true }: { children: ReactNode; tone?: "dark" | "light"; className?: string; rule?: boolean }) {
  return (
    <p
      className={cn(
        "eyebrow inline-flex items-center gap-3",
        tone === "dark" ? "text-muted" : "text-ivory-muted",
        className,
      )}
    >
      {rule && <span aria-hidden className={cn("h-px w-7", tone === "dark" ? "bg-brass-ink/60" : "bg-brass")} />}
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  /** Show the short rule before the eyebrow (default true). */
  eyebrowRule?: boolean;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  align?: "start" | "center";
  as?: "h1" | "h2";
  className?: string;
  action?: ReactNode;
}

/** Consistent heading block for every section. */
export function SectionHeading({ eyebrow, eyebrowRule = true, title, intro, tone = "dark", align = "start", as: Tag = "h2", className, action }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        action && "md:flex-row md:items-end md:justify-between md:gap-12",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div className={cn("flex max-w-2xl flex-col gap-5", align === "center" && "items-center")} data-reveal>
        {eyebrow && <Eyebrow tone={tone} rule={eyebrowRule}>{eyebrow}</Eyebrow>}
        <Tag className={cn("caps", Tag === "h1" ? "text-h1" : "text-h2", tone === "dark" ? "text-ink" : "text-ivory")}>{title}</Tag>
        {intro && (
          <p className={cn("text-lead max-w-xl", tone === "dark" ? "text-muted" : "text-ivory-muted")}>{intro}</p>
        )}
      </div>
      {action && (
        <div className="shrink-0" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          {action}
        </div>
      )}
    </div>
  );
}
