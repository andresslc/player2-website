"use client";

// "Book a free Recon Call" everywhere on the site (app-spec, Route table: Booking).
// Progressive enhancement: always a real link that opens the booking page in a new tab. When the
// provider's embed script has loaded, the click opens its popup instead.
// The Cal.com path is unverified until a real Cal.com link exists (build log).
import Script from "next/script";
import type { MouseEvent, ReactNode } from "react";
import type { BookingConfig } from "@/lib/env";
import { buttonClass } from "@/components/primitives";

type CalendlyApi = { initPopupWidget: (options: { url: string }) => void };
type CalApi = ((action: string, options?: Record<string, unknown>) => void) & { loaded?: boolean };

declare global {
  interface Window {
    Calendly?: CalendlyApi;
    Cal?: CalApi;
  }
}

function calLinkFrom(url: string) {
  try {
    return new URL(url).pathname.replace(/^\/+|\/+$/g, "");
  } catch {
    return "";
  }
}

export function BookingButton({
  booking,
  children,
  variant = "primary",
  className,
}: {
  booking: BookingConfig;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  if (!booking.configured) {
    return (
      <a href="#booking-not-configured" className={buttonClass(variant, className)}>
        {children}
      </a>
    );
  }

  function openPopup(event: MouseEvent<HTMLAnchorElement>) {
    if (!booking.configured || event.metaKey || event.ctrlKey || event.shiftKey) return;
    if (booking.provider === "calendly" && window.Calendly) {
      event.preventDefault();
      window.Calendly.initPopupWidget({ url: booking.url });
    } else if (booking.provider === "cal" && window.Cal) {
      event.preventDefault();
      window.Cal("modal", { calLink: calLinkFrom(booking.url) });
    }
  }

  return (
    <a
      href={booking.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={openPopup}
      className={buttonClass(variant, className)}
    >
      {children}
      <span className="sr-only"> (opens a booking window)</span>
    </a>
  );
}

// Loaded once, after the page is idle, and only when booking is configured.
export function BookingScript({ booking }: { booking: BookingConfig }) {
  if (!booking.configured) return null;
  if (booking.provider === "calendly") {
    return (
      <>
        <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      </>
    );
  }
  // Cal.com's documented embed bootstrap, then init.
  return (
    <Script id="cal-embed" strategy="lazyOnload">
      {`(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init"); Cal("init", { origin: "https://cal.com" });`}
    </Script>
  );
}

export function BookingNotice({ heading, body }: { heading: string; body: string }) {
  return (
    <div id="booking-not-configured" role="note" className="border-b-stroke border-ink bg-spark text-ink">
      <div className="mx-auto max-w-container-max px-gutter py-md sm:px-gutter-lg">
        <p className="type-title-md">{heading}</p>
        <p className="type-body-sm mt-xs">{body}</p>
      </div>
    </div>
  );
}
