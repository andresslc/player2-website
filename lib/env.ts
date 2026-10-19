// Environment access in one place. Names match .env.example.

export function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export type BookingProvider = "calendly" | "cal";

export type BookingConfig =
  | { configured: true; url: string; provider: BookingProvider }
  | { configured: false };

// Launch is blocked until NEXT_PUBLIC_BOOKING_URL is set (app-spec C2). Until then every booking
// button points at the visible #booking-not-configured notice instead of failing silently.
export function bookingConfig(): BookingConfig {
  const url = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  if (!url) return { configured: false };
  const provider: BookingProvider =
    process.env.NEXT_PUBLIC_BOOKING_PROVIDER === "cal" || /\/\/(?:[\w-]+\.)*cal\.com\//.test(url) ? "cal" : "calendly";
  return { configured: true, url, provider };
}

export function emailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const leadsTo = process.env.LEADS_TO_EMAIL;
  if (!apiKey || !from || !leadsTo) return { configured: false as const };
  return { configured: true as const, apiKey, from, leadsTo };
}
