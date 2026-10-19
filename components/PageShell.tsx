import type { ReactNode } from "react";
import { site } from "@/content/site";
import { bookingConfig, type BookingConfig } from "@/lib/env";
import { BookingNotice, BookingScript } from "@/components/Booking";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function PageShell({ children }: { children: (booking: BookingConfig) => ReactNode }) {
  const booking = bookingConfig();
  return (
    <>
      {!booking.configured ? <BookingNotice {...site.bookingNotice} /> : null}
      <Header booking={booking} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children(booking)}
      </main>
      <Footer />
      <BookingScript booking={booking} />
    </>
  );
}
