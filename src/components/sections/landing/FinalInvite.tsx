import Image from "next/image";
import { site, whatsappLink } from "@/content/site";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { BrandIcon, Icon } from "@/components/ui/Icon";

/** Light outline buttons on the photograph, filling white with walnut text and icon on hover. (`!` overrides the
    secondary variant's own colours, which cn() does not merge away.) */
const ON_WALNUT = "border-white/40! bg-transparent! text-white! hover:border-white! hover:bg-white! hover:text-[#583c26]!";

/**
 * The closing invitation: the dining room shown whole and uncovered, with the heading, note and the three
 * ways to get in touch set straight over its darker lower edge.
 */
export function FinalInvite() {
  return (
    <section aria-labelledby="invite-title" className="relative isolate">
      {/* The photograph at its own proportions, so the whole room shows, ceiling to floor. */}
      <div className="relative min-h-[46rem] overflow-hidden sm:aspect-[1024/788] sm:min-h-0">
        <Image src="/images/dinning1.jpg" alt="Dining room designed by Home Karigar, with a sculptural ribbon chandelier over a stone-topped table, tan upholstered chairs and a botanical mural wall" fill sizes="100vw" quality={90} className="object-cover object-[32%_50%] sm:object-top" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="container-site absolute inset-x-0 bottom-0 pb-8 md:pb-12">
          <p className="eyebrow text-white/80" data-reveal>
            Begin with a conversation
          </p>
          <h2 id="invite-title" className="mt-4 max-w-4xl text-h2 caps text-white [text-shadow:0_2px_30px_rgb(0_0_0/0.35)]" data-reveal>
            Your home,{" "}
            <em className="inline-block font-script text-[1.3em] leading-[0] font-normal tracking-normal normal-case not-italic text-[#c9a27c] [text-shadow:0_2px_24px_rgb(0_0_0/0.45)]">
              considered
            </em>{" "}
            from the first line.
          </h2>
          {/* The note and the ways to get in touch, set straight on the photograph like the heading. */}
          <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10" data-reveal>
            <p className="max-w-xl text-[0.9375rem] leading-relaxed text-white/90 [text-shadow:0_1px_12px_rgb(0_0_0/0.4)]">
              Share your floor plan and how you live. The first consultation carries no obligation.
              <span className="mt-1 block text-[0.8125rem] text-white/60">{site.hours.display}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="light" className="max-sm:w-full">
                Book a design consultation
              </ButtonLink>
              <ButtonAnchor
                href={whatsappLink("Hello Home Karigar, I'd like to discuss interiors for my home.")}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                icon={null}
                iconLeft={<BrandIcon name="WhatsApp" size={16} />}
                className={`${ON_WALNUT} max-sm:flex-1`}
              >
                WhatsApp
              </ButtonAnchor>
              <ButtonAnchor
                href={`tel:${site.phones[0].e164}`}
                variant="secondary"
                icon={null}
                iconLeft={<Icon name="phone" size={18} />}
                className={`${ON_WALNUT} max-sm:flex-1`}
              >
                Call
              </ButtonAnchor>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
