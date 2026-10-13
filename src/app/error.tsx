"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Typography";
import { site } from "@/content/site";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-site flex min-h-[80svh] flex-col justify-center pt-32 pb-20" role="alert">
      <Eyebrow>Something went wrong</Eyebrow>
      <h1 className="mt-6 max-w-2xl text-h1 caps">We couldn&apos;t load this page.</h1>
      <p className="text-lead mt-6 max-w-xl text-muted">
        It&apos;s likely a temporary hiccup. Try again, or reach the studio directly on {site.phones[0].display}.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button onClick={reset} icon="arrowRight">Try again</Button>
        <ButtonLink href="/" variant="secondary" icon={null}>Go to the homepage</ButtonLink>
      </div>
      {error.digest && <p className="mt-10 text-xs text-muted">Reference: {error.digest}</p>}
    </section>
  );
}
