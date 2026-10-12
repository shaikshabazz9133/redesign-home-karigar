import { ImageFrame } from "@/components/motion/ImageFrame";
import Image from "next/image";
import { site, whatsappLink } from "@/content/site";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { BrandIcon, Icon } from "@/components/ui/Icon";

/** Full-bleed photograph with a floating invitation card. */
export function FinalInvite() {
  return (
    <section aria-labelledby="invite-title" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <ImageFrame fill reveal={false} parallax={0.18}>
          <Image src="/images/stock/living-warm-open.jpg" alt="" fill sizes="100vw" className="object-cover" />
        </ImageFrame>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/0 to-black/30" />
      </div>
      <div className="container-site flex min-h-[38rem] items-center justify-end py-20 md:min-h-[44rem]">
        <div className="w-full max-w-lg rounded-lg bg-ivory/95 p-8 shadow-float backdrop-blur-md md:p-12" data-reveal>
          <p className="eyebrow text-muted">Begin with a conversation</p>
          <h2 id="invite-title" className="mt-5 text-h2">
            Your home, <em className="italic text-oxblood">considered</em> from the first line.
          </h2>
          <p className="mt-5 text-muted">
            Share your floor plan and how you live. The first consultation carries no obligation.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <ButtonLink href="/contact" size="lg" className="w-full">Book a design consultation</ButtonLink>
            <div className="grid grid-cols-2 gap-3">
              <ButtonAnchor
                href={whatsappLink("Hello Home Karigar, I'd like to discuss interiors for my home.")}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                icon={null}
                iconLeft={<BrandIcon name="WhatsApp" size={16} />}
              >
                WhatsApp
              </ButtonAnchor>
              <ButtonAnchor href={`tel:${site.phones[0].e164}`} variant="secondary" icon={null} iconLeft={<Icon name="phone" size={18} />}>
                Call
              </ButtonAnchor>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted">{site.hours.display}</p>
        </div>
      </div>
    </section>
  );
}
