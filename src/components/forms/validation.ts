export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Normalises Indian mobile input: strips spaces/symbols and a leading +91 / 0. */
export function normalisePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits.slice(0, 10);
}

export interface EnquiryValues {
  name: string;
  phone: string;
  email: string;
  home: string;
  message: string;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

export function validateEnquiry(v: EnquiryValues): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (!v.name.trim()) e.name = "Please tell us your name.";
  if (!v.phone.trim()) e.phone = "Please add a phone number so we can call you back.";
  else if (!/^\d{10}$/.test(v.phone)) e.phone = "Enter a valid 10-digit mobile number.";
  if (!v.email.trim()) e.email = "Please add your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "That email address doesn't look right.";
  if (!v.message.trim()) e.message = "A line or two about your home helps us prepare.";
  return e;
}
