import Image from "next/image";
import { site, whatsappLink } from "@/content/site";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/Icon";

/** Closing call to action, reused at the end of most pages. */
export function CtaBand({
  title = "Let’s design the home you’ll live in for years.",
  body = "Tell us about your floor plan and how you live. The first consultation carries no obligation — and no advance is taken until you approve the 3D designs.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="container-site pb-20 md:pb-28">
      <div className="on-dark relative isolate overflow-hidden rounded-lg bg-espresso px-6 py-16 text-ivory sm:px-12 md:py-24 lg:px-20" data-reveal="fade">
        <Image
          src="/images/home/2.png"
          alt=""
          fill
          sizes="(min-width: 1320px) 1240px, 100vw"
          className="-z-10 object-cover opacity-35"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-espresso via-espresso/85 to-espresso/40" />
        <div className="max-w-2xl">
          <h2 id="cta-title" className="text-h2 text-ivory">{title}</h2>
          <p className="text-lead mt-6 text-ivory-muted">{body}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/contact" variant="light" size="lg">
              Book a consultation
            </ButtonLink>
            <ButtonAnchor
              href={whatsappLink("Hello Home Karigar, I'd like to discuss interiors for my home.")}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline-light"
              size="lg"
              icon={null}
              iconLeft={<BrandIcon name="WhatsApp" size={18} />}
            >
              WhatsApp us
            </ButtonAnchor>
            <ButtonAnchor href={`tel:${site.phones[0].e164}`} variant="outline-light" size="lg" icon={null}>
              Call {site.phones[0].display}
            </ButtonAnchor>
          </div>
        </div>
      </div>
    </section>
  );
}
