import Link from "next/link";
import { cn } from "@/lib/utils";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { JsonLd } from "./JsonLd";

export interface Crumb {
  name: string;
  path: string;
}

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. */
export function Breadcrumbs({ items, tone = "dark", className }: { items: Crumb[]; tone?: "dark" | "light"; className?: string }) {
  const trail = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
        <ol className={cn("flex flex-wrap items-center gap-x-2 gap-y-1", tone === "dark" ? "text-muted" : "text-ivory-muted")}>
          {trail.map((c, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={tone === "dark" ? "text-ink" : "text-ivory"}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="link-line hover:text-current">
                      {c.name}
                    </Link>
                    <span aria-hidden className="opacity-50">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
