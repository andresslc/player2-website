import Image from "next/image";
import { site } from "@/content/site";
import { BookingButton } from "@/components/Booking";
import { PageShell } from "@/components/PageShell";
import { ButtonLink, HudTag, Section } from "@/components/primitives";

export default function NotFound() {
  return (
    <PageShell>
      {(booking) => (
        <Section labelledBy="not-found-heading">
          <div className="grid items-center gap-xl md:grid-cols-[1fr_auto]">
            <div className="max-w-prose-max">
              <HudTag tone="dark">{site.notFound.hud}</HudTag>
              <h1 id="not-found-heading" className="type-headline-lg mt-md">
                {site.notFound.heading}
              </h1>
              <p className="type-body-lg mt-md">{site.notFound.body}</p>
              <div className="mt-xl flex flex-col gap-md sm:flex-row sm:flex-wrap">
                <ButtonLink href="/">{site.notFound.home}</ButtonLink>
                <BookingButton booking={booking} variant="secondary">
                  {site.bookCta}
                </BookingButton>
              </div>
            </div>
            <Image src="/brand/badge-color.svg" alt="" width={701} height={700} unoptimized style={{ height: "auto" }} className="mx-auto w-badge-sm md:w-[calc(var(--spacing-badge-sm)*2)]" />
          </div>
        </Section>
      )}
    </PageShell>
  );
}
