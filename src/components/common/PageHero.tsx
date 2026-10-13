import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Eyebrow } from "@/components/ui/Typography";

/** Editorial page header used by every inner page. */
export function PageHero({ crumbs, eyebrow, title, intro, aside }: { crumbs: Crumb[]; eyebrow: string; title: ReactNode; intro: ReactNode; aside?: ReactNode }) {
  return (
    <header className="border-b border-line pt-32 pb-14 md:pt-40 md:pb-20">
      <div className="container-site">
        <Breadcrumbs items={crumbs} className="mb-10 md:mb-14" />
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="flex flex-col gap-6 lg:col-span-8">
            <div className="animate-rise"><Eyebrow>{eyebrow}</Eyebrow></div>
            <h1 className="text-h1 caps animate-rise [animation-delay:80ms]">{title}</h1>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-4 lg:pb-2">
            <p className="text-lead text-muted animate-rise [animation-delay:160ms]">{intro}</p>
            {aside && <div className="animate-rise [animation-delay:240ms]">{aside}</div>}
          </div>
        </div>
      </div>
    </header>
  );
}
