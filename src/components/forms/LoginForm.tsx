"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { TextField } from "./Field";
import { EMAIL_RE } from "./validation";

/**
 * Client-portal sign-in. The existing site has no authentication backend,
 * so this validates input and explains how access is granted rather than
 * pretending to sign the visitor in. Wire `onSubmit` to the auth provider
 * once the portal exists.
 */
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [notice, setNotice] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!email.trim()) next.email = "Enter the email your designer registered.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "That email address doesn't look right.";
    if (!password) next.password = "Enter your password.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(next.email ? "login-email" : "login-password")?.focus();
      return;
    }
    setNotice(true);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <TextField
        id="login-email"
        type="email"
        label="Email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <div className="relative">
        <TextField
          id="login-password"
          type={showPassword ? "text" : "password"}
          label="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          className="pr-20"
        />
        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          className="absolute right-3 top-[2.35rem] h-9 rounded-full px-3 text-sm text-muted hover:bg-linen hover:text-ink"
          aria-pressed={showPassword}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {notice && (
        <div role="status" className="flex animate-rise gap-3 rounded-md border border-line bg-linen/70 p-4 text-sm text-ink-soft [animation-duration:0.4s]">
          <Icon name="shield" size={20} className="mt-0.5 shrink-0 text-brass-ink" />
          <p>
            Portal access is set up by your project designer once your design is underway. If you&apos;re an active client,
            ask your designer for an invitation, or{" "}
            <Link href="/contact" className="font-medium underline underline-offset-4">contact the studio</Link>.
          </p>
        </div>
      )}

      <Button type="submit" size="lg" icon="arrowRight" className="mt-2 w-full">
        Sign in
      </Button>
    </form>
  );
}
