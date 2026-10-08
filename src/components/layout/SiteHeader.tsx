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

  const overHero = pathname === "/" && !scrolled && !open;

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
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-500 ease-[var(--ease-premium)]",
          overHero
            ? "on-dark border-b border-transparent text-ivory"
            : open
              ? "on-dark border-b border-transparent bg-espresso text-ivory"
              : "border-b border-line/80 bg-ivory/85 text-ink backdrop-blur-xl backdrop-saturate-150",
        )}
      >
        <div className="container-site flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
          <Link href="/" aria-label={`${site.name} — home`} className="relative z-10 -m-2 rounded-sm p-2">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative inline-flex h-10 items-center rounded-full px-4 text-[0.9375rem] transition-colors duration-300",
                        active ? "opacity-100" : "opacity-75 hover:opacity-100",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-4 bottom-1.5 h-px origin-left bg-current transition-transform duration-500 ease-[var(--ease-premium)]",
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
              variant={overHero ? "light" : "primary"}
              className="max-sm:hidden"
            >
              Book a consultation
            </ButtonLink>
            <button
              ref={toggleRef}
              type="button"
              className="relative z-10 -mr-2 grid size-11 place-items-center rounded-full lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-3 w-6" aria-hidden>
                <span
                  className={cn(
                    "absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-[var(--ease-premium)]",
                    open && "translate-y-[5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[1.5px] bg-current transition-[transform,width] duration-500 ease-[var(--ease-premium)]",
                    open ? "w-full -translate-y-[5px] -rotate-45" : "w-4",
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
            className="on-dark fixed inset-0 z-40 flex flex-col overflow-y-auto bg-espresso pt-24 text-ivory lg:hidden"
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
                      className="group flex items-center justify-between py-4 font-display text-[2rem] leading-tight"
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
                Book a consultation
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
