import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { pad2 } from "@/lib/utils";

/** What makes the experience seamless — each a promise the studio keeps elsewhere on the site. */
const PROMISES = [
  { title: "One team, start to finish", text: "Designers, site managers and karigars under one roof — one point of contact from the first sketch to the keys." },
  { title: "Designed before it is built", text: "Every room is approved in photo-real 3D first, so what we build is exactly what you have already seen." },
  { title: "Materials you can verify", text: "Branded plywood and hardware arrive on site with their own QR codes, for you to inspect and authenticate." },
  { title: "Progress you can see", text: "Regular updates and site visits, with our designers supervising every stage of the work." },
];

/**
 * "A seamless experience": the studio's promise in four commitments, set as a ruled row beneath a centred
 * title in the site's heading voice, closing on the way into its finished homes.
 */
export function SeamlessExperience() {
  return (
    <section aria-labelledby="seamless-title" className="bg-ivory pb-14 md:pb-20">
      <div className="container-site">
        <div className="flex flex-col items-center text-center">
          <h2
            id="seamless-title"
            className="caps font-display text-[min(clamp(2.6rem,1rem+4vw,4.75rem),max(2.1rem,0.2rem+10vw))] leading-[0.86] font-normal tracking-[-0.055em] text-ink [clip-path:none]!"
            data-reveal
          >
            A seamless{" "}
            <em className="inline-block font-script text-[1.3em] leading-[0] font-normal tracking-normal normal-case not-italic text-oxblood">
              Experience.
            </em>
          </h2>
          <p className="mt-6 max-w-2xl leading-[1.55] text-muted" data-reveal>
            With Home Karigar, transforming your home is a single, unhurried journey. While we do the heavy lifting, all you need to
            do is walk into your new home.
          </p>
        </div>

        <ol className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map((p, i) => (
            <li
              key={p.title}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="border-b border-line py-7 sm:px-6 sm:[&:nth-child(even)]:border-l lg:border-b-0 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:first-child)]:border-l"
            >
              <p className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-[linear-gradient(135deg,#6e5038,#583c26)] text-white">
                  <Icon name="check" size={15} />
                </span>
                <span className="font-display text-[0.9375rem] tabular-nums text-muted">{pad2(i + 1)}</span>
              </p>
              <h3 className="mt-5 font-display text-[1.25rem] leading-tight tracking-[-0.03em] text-ink">{p.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">{p.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-center" data-reveal>
          <ButtonLink href="/projects" variant="timber" icon="arrowUpRight">
            See all projects
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
