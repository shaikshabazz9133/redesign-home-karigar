"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { primaryNav, site, whatsappLink } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { BrandIcon, Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Over the home page's full-bleed hero the bar starts transparent with light type, then turns solid. */
  const atTop = pathname === "/" && !scrolled && !open;

  /* The header stays put; it only turns solid once the page leaves the top.
     State changes once per threshold crossing, so scrolling never flickers. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the menu whenever the route changes. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  /* Modal behaviour for the mobile menu: lock scroll, inert page, Esc, focus. */
  useEffect(() => {
    if (!open) return;
    const page = [document.getElementById("main-content"), document.getElementById("site-footer")];
    document.documentElement.style.overflow = "hidden";
    page.forEach((el) => el?.setAttribute("inert", ""));
    const toggle = toggleRef.current;
    const first = panelRef.current?.querySelector<HTMLElement>("a");
    first?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      page.forEach((el) => el?.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <LazyMotion features={domAnimation} strict>
      {/* From md: a floating glass bar, inset from the screen edges. Over the home hero it starts clear with
          light type; everywhere else (and once the page scrolls) it frosts over whatever passes beneath. Its
          inner edges line up with `.container-site`, so the logo and nav never shift when it changes state.
          Phones: no bar at all — just the stone mark and the menu button floating over the page. */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-3">
        <div
          className={cn(
            "hk-header-bar pointer-events-auto mx-auto flex h-16 w-full max-w-[81rem] items-center justify-between gap-6 border max-md:border-transparent px-[clamp(1rem,4vw,2.5rem)] md:h-[4.25rem] md:w-[calc(100%-1rem)] md:rounded-[1.25rem] md:px-[calc(clamp(1rem,4vw,2.5rem)-0.5rem)]",
            atTop || open
              ? "on-dark border-transparent text-ivory"
              : "hk-glass text-ink",
          )}
        >
          {/* Full lockup on larger screens; on mobile, the transparent stone mark alone. */}
          <Link href="/" aria-label={`${site.name} — home`} className="relative z-10 -m-2 rounded-sm p-2">
            <Logo markOnlyOnMobile />
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative inline-flex h-10 items-center whitespace-nowrap rounded-full px-3 text-[0.75rem] font-medium uppercase tracking-[0.08em] transition-colors duration-300 2xl:px-4",
                        active ? "opacity-100" : "opacity-75 hover:opacity-100",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-3 bottom-1.5 h-px origin-left bg-current transition-transform duration-500 ease-[var(--ease-premium)] 2xl:inset-x-4",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink
              href="/contact"
              variant="timber"
              icon="arrowUpRight"
              className="max-sm:hidden"
            >
              Begin Your Project
            </ButtonLink>
            <button
              ref={toggleRef}
              type="button"
              className={cn(
                "relative z-10 -mr-2 grid size-11 place-items-center rounded-full transition-[background-color,box-shadow,color] duration-500 xl:hidden",
                /* Phones have no bar behind the button, so once off the hero it carries its own small
                   dark glass disc — legible over photographs and ivory sections alike. */
                !(atTop || open) &&
                  "max-md:mr-0 max-md:bg-espresso/45 max-md:text-ivory max-md:shadow-[inset_0_1px_0_rgb(255_255_255/0.15),0_8px_24px_-10px_rgb(29_24_21/0.5)] max-md:backdrop-blur-md",
              )}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {/* Three lines; the middle one slips away and the outer two cross into an X. */}
              <span className="relative block h-3.5 w-6" aria-hidden>
                <span
                  className={cn(
                    "absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-[var(--ease-premium)]",
                    open && "translate-y-[6.25px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-current transition-[opacity,transform] duration-300 ease-[var(--ease-premium)]",
                    open && "translate-x-2 opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-[var(--ease-premium)]",
                    open && "-translate-y-[6.25px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="on-dark fixed inset-0 z-40 flex flex-col overflow-y-auto bg-espresso pt-24 text-ivory xl:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav aria-label="Mobile" className="container-site flex-1">
              <ul className="flex flex-col border-t border-line-dark">
                {[{ label: "Home", href: "/" }, ...primaryNav].map((item, i) => (
                  <m.li
                    key={item.href}
                    className="border-b border-line-dark"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="group flex items-center justify-between py-4 caps font-display text-[2.25rem] font-medium leading-none tracking-[-0.04em]"
                    >
                      <span className={cn(pathname === item.href ? "text-brass" : "text-ivory")}>{item.label}</span>
                      <Icon name="arrowRight" className="opacity-40 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                    </Link>
                  </m.li>
                ))}
              </ul>
            </nav>
            <m.div
              className="container-site flex flex-col gap-6 py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <ButtonLink href="/contact" variant="light" size="lg" className="w-full">
                Begin your project
              </ButtonLink>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <a href={`tel:${site.phones[0].e164}`} className="flex h-12 items-center justify-center gap-2 rounded-full border border-line-dark">
                  <Icon name="phone" size={18} /> Call
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center justify-center gap-2 rounded-full border border-line-dark"
                >
                  <BrandIcon name="WhatsApp" size={16} /> WhatsApp
                </a>
              </div>
              <p className="text-sm text-ivory-muted">{site.hours.display}</p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
