"use client";

import { useRef, useState } from "react";
import { site, whatsappLink } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { BrandIcon, Icon } from "@/components/ui/Icon";
import { SelectField, TextAreaField, TextField } from "./Field";
import { normalisePhone, validateEnquiry, type EnquiryErrors, type EnquiryValues } from "./validation";

const EMPTY: EnquiryValues = { name: "", phone: "", email: "", home: "", message: "" };
const HOME_TYPES = ["2 BHK", "3 BHK", "3.5 BHK", "4 BHK or larger", "Villa / independent house"] as const;
const ORDER: (keyof EnquiryValues)[] = ["name", "phone", "email", "home", "message"];

/**
 * Enquiry form. As on the existing site, a valid enquiry is handed off to
 * the studio's WhatsApp with all details pre-filled.
 */
export function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryValues, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const update = (name: keyof EnquiryValues, value: string) => {
    const next = { ...values, [name]: name === "phone" ? normalisePhone(value) : value };
    setValues(next);
    if (touched[name]) setErrors(validateEnquiry(next));
  };

  const blur = (name: keyof EnquiryValues) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validateEnquiry(values));
  };

  const shown = (name: keyof EnquiryValues) => (touched[name] ? errors[name] : undefined);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    setTouched({ name: true, phone: true, email: true, home: true, message: true });
    const firstInvalid = ORDER.find((k) => found[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#enquiry-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");
    const text = [
      "*New Enquiry – Home Karigar*",
      "",
      `*Name:* ${values.name.trim()}`,
      `*Email:* ${values.email.trim()}`,
      `*Phone:* ${values.phone}`,
      values.home ? `*Home:* ${values.home}` : null,
      "",
      "*Message:*",
      values.message.trim(),
    ]
      .filter((l): l is string => typeof l === "string")
      .join("\n");

    const url = whatsappLink(text);
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
    window.setTimeout(() => setStatus("sent"), 450);
  };

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-6 rounded-lg border border-line bg-paper p-8 md:p-12">
        <SuccessMark />
        <div>
          <h2 className="text-h3">Thank you, {values.name.trim().split(" ")[0]}.</h2>
          <p className="mt-3 max-w-md text-muted">
            Your enquiry is ready in WhatsApp — just press send. A designer will respond within studio hours ({site.hours.display}).
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[0.9375rem] text-ivory transition-colors hover:bg-oxblood"
          >
            <BrandIcon name="WhatsApp" size={16} /> WhatsApp didn&apos;t open?
          </a>
          <a href={`tel:${site.phones[0].e164}`} className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/20 px-5 text-[0.9375rem] hover:border-ink">
            <Icon name="phone" size={18} /> Call {site.phones[0].display}
          </a>
        </div>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setTouched({});
            setErrors({});
            setStatus("idle");
          }}
          className="link-line text-sm text-muted hover:text-ink"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const errorCount = Object.keys(errors).filter((k) => touched[k as keyof EnquiryValues]).length;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-6" aria-describedby="enquiry-note">
      <div aria-live="polite" className="sr-only">
        {errorCount > 0 && `${errorCount} ${errorCount === 1 ? "field needs" : "fields need"} attention.`}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id="enquiry-name"
          name="name"
          label="Full name"
          autoComplete="name"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          onBlur={() => blur("name")}
          error={shown("name")}
          required
        />
        <TextField
          id="enquiry-phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          label="Mobile number"
          autoComplete="tel-national"
          placeholder="10-digit number"
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
          onBlur={() => blur("phone")}
          error={shown("phone")}
          required
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id="enquiry-email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          onBlur={() => blur("email")}
          error={shown("email")}
          required
        />
        <SelectField
          id="enquiry-home"
          name="home"
          label="Home type"
          optional
          placeholder="Select"
          options={HOME_TYPES}
          value={values.home}
          onChange={(e) => update("home", e.target.value)}
        />
      </div>
      <TextAreaField
        id="enquiry-message"
        name="message"
        label="About your home"
        placeholder="Community, possession date, rooms you'd like designed…"
        value={values.message}
        onChange={(e) => update("message", e.target.value)}
        onBlur={() => blur("message")}
        error={shown("message")}
        required
      />
      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p id="enquiry-note" className="max-w-sm text-sm text-muted">
          Submitting opens WhatsApp with your details pre-filled. We never share your information.
        </p>
        <Button type="submit" size="lg" icon={status === "sending" ? null : "arrowRight"} disabled={status === "sending"} className="sm:w-auto">
          {status === "sending" ? (
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-ivory/30 border-t-ivory" />
              Opening WhatsApp…
            </span>
          ) : (
            "Send enquiry"
          )}
        </Button>
      </div>
    </form>
  );
}

function SuccessMark() {
  return (
    <span className="grid size-14 place-items-center rounded-full bg-success/10 text-success">
      <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="m5 12.5 4.5 4.5L19 7.5" pathLength={1} className="[stroke-dasharray:1] [stroke-dashoffset:1] motion-safe:animate-[hk-draw_0.7s_0.15s_var(--ease-premium)_forwards] motion-reduce:[stroke-dashoffset:0]" />
      </svg>
    </span>
  );
}
