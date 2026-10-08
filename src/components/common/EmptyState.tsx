import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

/** Calm, guiding empty state — always offers a next step. */
export function EmptyState({ icon = "grid", title, body, action }: { icon?: IconName; title: string; body: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-line-strong bg-paper/60 px-6 py-16 text-center">
      <span className="mb-6 grid size-14 place-items-center rounded-full bg-linen text-brass-ink">
        <Icon name={icon} size={24} />
      </span>
      <h3 className="text-h3 text-ink">{title}</h3>
      <p className="mt-3 max-w-md text-muted">{body}</p>
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
