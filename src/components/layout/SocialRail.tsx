"use client";

import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/content/site";
import { BrandIcon, Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const social = (label: string) => site.socials.find((s) => s.label === label)?.href ?? "";

/** Every way to reach the studio, in the order they appear. `fill` names the brand colour on hover. */
const LINKS = [
  { key: "instagram", href: social("Instagram"), label: "Follow on Instagram", icon: <BrandIcon name="Instagram" size={18} /> },
  {
    key: "whatsapp",
    href: whatsappLink("Hi Home Karigar, I'd like to talk about interiors for my home."),
    label: "Chat on WhatsApp",
    icon: <BrandIcon name="WhatsApp" size={18} />,
  },
  { key: "mail", href: `mailto:${site.email}`, label: "Write to us", icon: <Icon name="mail" size={19} /> },
].filter((l) => l.href);

/**
 * The studio's social and contact links as frosted-glass discs. `row` sits in the home hero beside the
 * call to action; `rail` stacks them for the floating left rail, with labels that slide out to the right
 * (above on the row). Styles: `.hk-social*` in globals.css.
 */
export function SocialLinks({ layout, className }: { layout: "row" | "rail"; className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2.5", layout === "rail" ? "flex-col" : "flex-row", className)}>
      {LINKS.map((l, i) => (
        <li key={l.key} style={{ "--i": i } as React.CSSProperties}>
          <a
            href={l.href}
            target={l.key === "mail" ? undefined : "_blank"}
            rel={l.key === "mail" ? undefined : "noopener noreferrer"}
            aria-label={l.label}
            className={cn("hk-social-disc group relative grid size-11 place-items-center rounded-full text-white", `hk-social-${l.key}`)}
          >
            <span className="relative z-10 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110">
              {l.icon}
            </span>
            <span aria-hidden className={cn("hk-social-tip", layout === "rail" ? "hk-social-tip-side" : "hk-social-tip-top")}>
              {l.label}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * A floating rail on the left edge (md and up). On the home page it waits until the visitor scrolls past
 * the hero — where the same links sit beside the call to action — then slides in; elsewhere it shows once
 * the page has loaded.
 */
export function SocialRail() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) {
      const t = window.setTimeout(() => setShown(true), 600);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting), { rootMargin: "-25% 0px 0px 0px" });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Social"
      data-shown={shown || undefined}
      className="hk-social-rail fixed left-[clamp(0.75rem,1.6vw,1.75rem)] top-1/2 z-40 hidden -translate-y-1/2 md:block"
    >
      <span aria-hidden className="hk-social-line mx-auto mb-3 block h-12 w-px bg-gradient-to-b from-transparent to-current opacity-50" />
      <SocialLinks layout="rail" />
      <span aria-hidden className="hk-social-line mx-auto mt-3 block h-12 w-px bg-gradient-to-t from-transparent to-current opacity-50" />
    </nav>
  );
}
