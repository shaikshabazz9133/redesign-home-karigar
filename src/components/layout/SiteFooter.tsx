import Link from "next/link";
import { site, whatsappLink } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { BrandIcon, Icon } from "@/components/ui/Icon";

/** The homes the studio designs, as listed in the footer; each opens the services page. */
const SERVICES = ["Apartment Living", "Private Residency", "Independent Homes", "Luxury Villas", "Complete Renovation"];

/** The Bengaluru neighbourhoods the studio works across. */
const AREAS = ["HSR Layout", "Koramangala", "Whitefield", "Electronic City", "Indiranagar", "JP Nagar", "Bellandur", "Sarjapur", "Yelahanka"];

/**
 * The footer: the mark, its line and the social links across the top; below a rule, three columns —
 * services, the Bengaluru neighbourhoods served, and the studio's details, its address on a single line
 * from xl. Columns stack to two on tablets and one on phones.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer id="site-footer" className="on-dark bg-espresso text-ivory">
      <div className="container-site pt-16 pb-10 md:pt-24">
        <div className="flex flex-col gap-8 border-b border-line-dark pb-12 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label={`${site.name} — home`} className="w-fit">
              <Logo />
            </Link>
            <p className="max-w-md text-ivory-muted">
              Complete residential interiors in Bengaluru, designed in 3D, built with branded materials and delivered as
              promised.
            </p>
          </div>
          <ul className="flex shrink-0 gap-2" aria-label="Social media">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${s.label}`}
                  className="grid size-11 place-items-center rounded-full border border-line-dark text-ivory-muted transition-colors duration-300 hover:border-brass hover:text-brass"
                >
                  <BrandIcon name={s.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-12">
          <FooterColumn title="Services" className="lg:col-span-3">
            {SERVICES.map((s) => (
              <FooterLink key={s} href="/services">
                {s}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Bangalore" className="lg:col-span-4">
            {AREAS.map((a) => (
              <li key={a} className="text-ivory-muted">
                Interior Designers in {a}
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Studio" className="sm:col-span-2 lg:col-span-5">
            <li className="flex gap-3 text-ivory-muted">
              <Icon name="pin" size={18} className="mt-1 shrink-0 text-brass" />
              <span className="xl:whitespace-nowrap">{site.address.display}</span>
            </li>
            {site.phones.map((p) => (
              <li key={p.e164}>
                <a href={`tel:${p.e164}`} className="flex items-center gap-3 text-ivory-muted transition-colors hover:text-ivory">
                  <Icon name="phone" size={18} className="shrink-0 text-brass" />
                  {p.display}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all text-ivory-muted transition-colors hover:text-ivory">
                <Icon name="mail" size={18} className="shrink-0 text-brass" />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-ivory-muted transition-colors hover:text-ivory"
              >
                <BrandIcon name="WhatsApp" size={16} className="ml-px shrink-0 text-brass" />
                Chat on WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-3 text-ivory-muted">
              <Icon name="clock" size={18} className="shrink-0 text-brass" />
              {site.hours.display}
            </li>
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line-dark pt-8 text-sm text-ivory-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="eyebrow mb-6 font-sans text-brass">{title}</h2>
      <ul className="flex flex-col gap-3.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="link-line text-ivory-muted transition-colors duration-300 hover:text-ivory">
        {children}
      </Link>
    </li>
  );
}
