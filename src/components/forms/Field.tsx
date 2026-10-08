import type { ComponentProps, ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-md border bg-paper px-4 text-base text-ink placeholder:text-muted/70 " +
  "transition-[border-color,box-shadow,background-color] duration-300 ease-[var(--ease-premium)] " +
  "hover:border-ink/40 focus:border-ink focus:bg-white focus:outline-none focus:ring-4 focus:ring-oxblood/10 " +
  "aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/10";

interface FieldShellProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}

function FieldShell({ id, label, hint, error, optional, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-ink">
        {label}
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="flex animate-rise items-center gap-1.5 text-sm text-danger [animation-duration:0.4s]">
          <Icon name="alert" size={16} className="shrink-0" />
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="text-sm text-muted">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

type InputProps = Omit<ComponentProps<"input">, "id"> & Omit<FieldShellProps, "children">;

export function TextField({ id, label, hint, error, optional, className, ...rest }: InputProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control, "h-13", error ? "border-danger" : "border-line-strong", className)}
        {...rest}
      />
    </FieldShell>
  );
}

type TextAreaProps = Omit<ComponentProps<"textarea">, "id"> & Omit<FieldShellProps, "children">;

export function TextAreaField({ id, label, hint, error, optional, className, ...rest }: TextAreaProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control, "min-h-36 resize-y py-3.5", error ? "border-danger" : "border-line-strong", className)}
        {...rest}
      />
    </FieldShell>
  );
}

type SelectProps = Omit<ComponentProps<"select">, "id"> &
  Omit<FieldShellProps, "children"> & { options: readonly string[]; placeholder: string };

export function SelectField({ id, label, hint, error, optional, options, placeholder, className, ...rest }: SelectProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className={cn(control, "h-13 appearance-none pr-11", error ? "border-danger" : "border-line-strong", className)}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </FieldShell>
  );
}
