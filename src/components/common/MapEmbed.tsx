import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

/** The studio on Google Maps, shown straight away; the iframe loads lazily as it nears the viewport. */
export function MapEmbed() {
  const q = encodeURIComponent(site.mapQuery);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-line bg-linen sm:aspect-[16/9] lg:aspect-[21/8]">
      <iframe
        src={`https://maps.google.com/maps?q=${q}&output=embed&z=15`}
        title={`${site.name} studio location — ${site.address.display}`}
        className="size-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${q}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-3 bottom-3 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm text-ivory shadow-soft transition-colors hover:bg-oxblood"
      >
        Get directions <Icon name="arrowUpRight" size={16} />
      </a>
    </div>
  );
}
