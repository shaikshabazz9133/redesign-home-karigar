import type { Metadata } from "next";
import { site, whatsappLink } from "@/content/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { MapEmbed } from "@/components/common/MapEmbed";
import { ContactForm } from "@/components/forms/ContactForm";
import { Eyebrow } from "@/components/ui/Typography";
import { BrandIcon, Icon, type IconName } from "@/components/ui/Icon";

export const metadata: Metadata = pageMetadata({
  title: "Contact Interior Designers in Bengaluru",
  description: `Book a consultation with Home Karigar in Bengaluru. Call ${site.phones[0].display}, WhatsApp the studio or send an enquiry — open ${site.hours.display}.`,
  path: "/contact",
});

export default function ContactPage() {
  const details: { icon: IconName; label: string; content: React.ReactNode; wide?: boolean }[] = [
    {
      icon: "phone",
      label: "Call",
      content: site.phones.map((p) => (
        <a key={p.e164} href={`tel:${p.e164}`} className="link-line block w-fit">{p.display}</a>
      )),
    },
    { icon: "clock", label: "Hours", content: site.hours.display },
    { icon: "mail", label: "Email", content: <a href={`mailto:${site.email}`} className="link-line">{site.email}</a>, wide: true },
    { icon: "pin", label: "Studio", content: site.address.display, wide: true },
  ];

  return (
    <>
      <section className="container-site pt-32 pb-20 md:pt-40 md:pb-28" aria-labelledby="contact-title">
        <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
        <div className="mt-10 grid gap-14 md:mt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="animate-rise"><Eyebrow>Contact</Eyebrow></div>
            <h1 id="contact-title" className="mt-6 text-h1 caps animate-rise [animation-delay:80ms]">Let&apos;s talk about your home</h1>
            <p className="text-lead mt-6 text-muted animate-rise [animation-delay:160ms]">
              Tell us a little about your space. A designer will get back to you within studio hours — the first consultation
              carries no obligation.
            </p>

            <a
              href={whatsappLink("Hello Home Karigar, I'd like to discuss interiors for my home.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 flex items-center gap-4 rounded-md border border-line bg-paper p-5 transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-soft animate-rise [animation-delay:240ms]"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-success/10 text-success">
                <BrandIcon name="WhatsApp" size={22} />
              </span>
              <span className="flex-1">
                <span className="block font-medium text-ink">Prefer WhatsApp?</span>
                <span className="block text-sm text-muted">Message the studio directly — usually the fastest reply.</span>
              </span>
              <Icon name="arrowUpRight" size={18} className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              {details.map((d) => (
                <div key={d.label} className={`flex gap-4 ${d.wide ? "sm:col-span-2" : ""}`}>
                  <Icon name={d.icon} size={20} className="mt-0.5 shrink-0 text-brass-ink" />
                  <div>
                    <dt className="eyebrow text-muted">{d.label}</dt>
                    <dd className="mt-2 text-ink-soft">{d.content}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-lg border border-line bg-paper/70 p-6 shadow-soft sm:p-10 animate-rise [animation-delay:200ms]">
              <h2 className="mb-8 text-h3">Send an enquiry</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="visit-title" className="container-site pb-20 md:pb-28">
        <div className="mb-8 flex items-end justify-between gap-6" data-reveal>
          <h2 id="visit-title" className="text-h2 caps">Visit the studio</h2>
        </div>
        <div data-reveal><MapEmbed /></div>
      </section>
    </>
  );
}
