import { faqs } from "@/content/studio";
import { faqSchema } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/common/JsonLd";
import { SectionHeading } from "@/components/ui/Typography";
import { ButtonLink } from "@/components/ui/Button";

/** An answer's paragraphs, with its **emphasised** phrases set in ink against the muted text. */
function Answer({ text }: { text: string }) {
  return (
    <div className="max-w-2xl space-y-4 pb-7 pr-12 text-muted">
      {text.split("\n\n").map((para) => (
        <p key={para}>
          {para.split("**").map((part, i) => (i % 2 ? <strong key={i} className="font-medium text-ink">{part}</strong> : part))}
        </p>
      ))}
    </div>
  );
}

/** Native <details> accordion: accessible, zero JavaScript, animated in CSS. The heading column stays in view
    beside the long list on large screens. */
export function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="pt-7 pb-14 md:pt-10 md:pb-20">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
          <SectionHeading
            eyebrow="Questions"
            title={<span id="faq-title">Before you begin</span>}
            intro="Straight answers about payments, materials and how a project runs."
          />
          <div className="mt-8" data-reveal>
            <ButtonLink href="/contact" variant="secondary">
              Ask us anything else
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          {faqs.map((f, i) => (
            <details key={f.q} className="hk-faq group border-b border-line first:border-t" name="faq" data-reveal style={{ "--i": i % 3 } as React.CSSProperties}>
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-left text-lg font-medium text-ink transition-colors hover:text-oxblood md:text-xl">
                <span className="font-display font-normal">{f.q}</span>
                <span
                  aria-hidden
                  className="hk-faq-icon relative grid size-9 shrink-0 place-items-center rounded-full border border-line-strong transition-colors duration-300 group-open:border-ink group-open:bg-ink before:absolute before:h-px before:w-3 before:bg-current after:absolute after:h-3 after:w-px after:bg-current group-open:text-ivory"
                />
              </summary>
              <Answer text={f.a} />
            </details>
          ))}
        </div>
      </div>
      <JsonLd data={faqSchema(faqs)} />
    </section>
  );
}
