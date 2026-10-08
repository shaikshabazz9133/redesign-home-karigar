import type { Metadata } from "next";
import Link from "next/link";
import { primaryNav } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Typography";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[80svh] flex-col justify-center pt-32 pb-20">
      <Eyebrow>Error 404</Eyebrow>
      <h1 className="mt-6 max-w-2xl text-h1">This room hasn&apos;t been designed yet.</h1>
      <p className="text-lead mt-6 max-w-xl text-muted">
        The page you were looking for may have moved. Here are a few places to continue.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to the homepage</ButtonLink>
        <ButtonLink href="/projects" variant="secondary" icon={null}>Browse projects</ButtonLink>
      </div>
      <nav aria-label="Helpful links" className="mt-16 border-t border-line pt-8">
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-muted">
          {primaryNav.map((n) => (
            <li key={n.href}><Link href={n.href} className="link-line hover:text-ink">{n.label}</Link></li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
