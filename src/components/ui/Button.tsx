import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "light" | "outline-light" | "text" | "leaf" | "leaf-outline" | "timber";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium uppercase tracking-[0.08em] " +
  "transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-[var(--ease-premium)] " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-oxblood text-ivory hover:bg-oxblood-deep hover:shadow-[0_10px_30px_-12px_rgb(88_60_38/0.6)]",
  secondary: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-ivory",
  light: "bg-ivory text-ink hover:bg-paper hover:shadow-float",
  "outline-light": "border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink",
  text: "px-0! h-auto! text-ink hover:text-oxblood",
  /* Leaf-cornered pair for photographs: square top-left and bottom-right, soft top-right and bottom-left. */
  leaf:
    "rounded-[0_1.25rem_0_1.25rem]! border border-white/60 bg-white/15 text-white backdrop-blur-md [&>svg]:text-brass " +
    "hover:-translate-y-0.5 hover:border-white/90 hover:bg-white/25",
  /* Solid leaf in the walnut of the hero staircase — the header's call to action. */
  timber:
    "rounded-[0_1rem_0_1rem]! bg-[linear-gradient(135deg,#6e5038,#583c26)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] [&>svg]:text-[#e6cfa9] " +
    "hover:-translate-y-0.5 hover:bg-[linear-gradient(135deg,#7a5b3f,#61452f)] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.16),0_12px_28px_-12px_rgb(88_60_38/0.7)]",
  "leaf-outline":
    "rounded-[0_1.25rem_0_1.25rem]! border border-white/40 bg-transparent text-white backdrop-blur-[2px] [&>svg]:text-brass " +
    "hover:-translate-y-0.5 hover:border-white/80 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-10 gap-2! px-4 text-[0.6875rem]",
  md: "h-11 px-6 text-[0.75rem]",
  lg: "h-13 px-8 text-[0.8125rem]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: IconName | null;
  iconLeft?: ReactNode;
  className?: string;
  children: ReactNode;
}

function Inner({ icon, iconLeft, children }: Pick<CommonProps, "icon" | "iconLeft" | "children">) {
  return (
    <>
      {iconLeft}
      <span>{children}</span>
      {icon && (
        <Icon
          name={icon}
          size={18}
          className="-mr-1 transition-transform duration-300 ease-[var(--ease-premium)] group-hover/btn:translate-x-0.5"
        />
      )}
    </>
  );
}

type LinkButtonProps = CommonProps & Omit<ComponentProps<typeof Link>, "className" | "children">;

/** Internal navigation styled as a button. */
export function ButtonLink({ variant = "primary", size = "md", icon = "arrowRight", iconLeft, className, children, ...rest }: LinkButtonProps) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <Inner icon={icon} iconLeft={iconLeft}>{children}</Inner>
    </Link>
  );
}

type AnchorButtonProps = CommonProps & Omit<ComponentProps<"a">, "className" | "children">;

/** External / tel: / mailto: links styled as a button. */
export function ButtonAnchor({ variant = "primary", size = "md", icon = "arrowUpRight", iconLeft, className, children, ...rest }: AnchorButtonProps) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <Inner icon={icon} iconLeft={iconLeft}>{children}</Inner>
    </a>
  );
}

type NativeButtonProps = CommonProps & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({ variant = "primary", size = "md", icon = null, iconLeft, className, children, type = "button", ...rest }: NativeButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <Inner icon={icon} iconLeft={iconLeft}>{children}</Inner>
    </button>
  );
}
