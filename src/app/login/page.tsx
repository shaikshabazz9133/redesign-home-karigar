import type { Metadata } from "next";
import Link from "next/link";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { pageMetadata } from "@/lib/seo/metadata";
import { LoginForm } from "@/components/forms/LoginForm";
import { Eyebrow } from "@/components/ui/Typography";

export const metadata: Metadata = pageMetadata({
  title: "Client Portal Sign In",
  description: "Sign in to the Home Karigar client portal.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <section className="grid min-h-[100svh] lg:grid-cols-2">
      <div className="flex items-center px-4 pt-32 pb-20 sm:px-10 lg:px-20">
        <div className="mx-auto w-full max-w-md">
          <Eyebrow>Client portal</Eyebrow>
          <h1 className="mt-6 text-h2 caps">Welcome back</h1>
          <p className="mt-4 text-muted">Track designs, approvals and site progress for your home.</p>
          <div className="mt-10">
            <LoginForm />
          </div>
          <p className="mt-8 text-sm text-muted">
            Not a client yet?{" "}
            <Link href="/contact" className="font-medium text-oxblood underline underline-offset-4">
              Book a consultation
            </Link>
          </p>
        </div>
      </div>
      <div className="relative hidden bg-linen lg:block">
        <LoadingImage src="/images/home/3.png" alt="" fill sizes="50vw" className="object-cover" />
      </div>
    </section>
  );
}
