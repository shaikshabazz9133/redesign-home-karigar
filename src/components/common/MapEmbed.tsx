"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

/** Click-to-load map: keeps Google Maps' heavy scripts off the critical path. */
export function MapEmbed() {
  const [load, setLoad] = useState(false);
  const q = encodeURIComponent(site.mapQuery);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-line bg-linen sm:aspect-[16/9] lg:aspect-[21/8]">
      {load ? (
        <iframe
          src={`https://maps.google.com/maps?q=${q}&output=embed&z=15`}
          title={`${site.name} studio location — ${site.address.display}`}
          className="size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-5 bg-[radial-gradient(circle_at_50%_45%,var(--color-paper),var(--color-linen))] p-6 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-oxblood text-ivory shadow-soft">
            <Icon name="pin" size={24} />
          </span>
          <p className="max-w-xs text-ink-soft">{site.address.display}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => setLoad(true)} className="h-11 rounded-full bg-ink px-5 text-sm text-ivory transition-colors hover:bg-oxblood">
              Show interactive map
            </button>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${q}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/20 px-5 text-sm hover:border-ink"
            >
              Get directions <Icon name="arrowUpRight" size={16} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
