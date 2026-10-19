// Home: DESIGN.md "Home page, top to bottom", blocks 1 to 11.
import Image from "next/image";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/env";
import { BookingButton } from "@/components/Booking";
import { Faq } from "@/components/Faq";
import { CartridgeCard, LeakCard, LevelMap, OrderLocks, type IconName } from "@/components/game";
import { LeakReport } from "@/components/LeakReport";
import { PageShell } from "@/components/PageShell";
import { ButtonLink, HudTag, Section, SectionHeading, SlotText, Sparkle } from "@/components/primitives";

export default function Home() {
  // Only known facts (app-spec "Content rules"): no address, phone, ratings or prices.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: siteUrl(),
    description: site.meta.description,
    slogan: site.tagline,
  };

  return (
    <PageShell>
      {(booking) => (
        <>
          {/* 2. Hero */}
          <section aria-labelledby="hero-heading" className="bg-surface">
            <div className="mx-auto grid max-w-container-max items-center gap-xl px-gutter pt-xl pb-2xl sm:px-gutter-lg sm:pb-3xl md:grid-cols-[1.15fr_0.85fr]">
              <div>
                <HudTag tone="dark">{site.hero.hud}</HudTag>
                <h1 id="hero-heading" className="type-headline-display mt-md text-balance">
                  {site.hero.headline}
                </h1>
                <p className="type-body-lg mt-lg max-w-prose-max">{site.hero.lede}</p>
                <div className="mt-xl flex flex-col gap-md sm:flex-row sm:flex-wrap">
                  <BookingButton booking={booking}>{site.bookCta}</BookingButton>
                  <ButtonLink href="#leak-report" variant="secondary">
                    {site.hero.secondaryCta}
                  </ButtonLink>
                </div>
                <p className="type-body-sm mt-md">{site.hero.reassurance}</p>
              </div>
              <div className="relative mx-auto w-3/5 max-w-badge-lg md:w-full">
                <Image
                  src="/brand/badge-color.svg"
                  alt=""
                  width={440}
                  height={440}
                  priority
                  unoptimized
                  style={{ height: "auto" }}
                  className="h-auto w-full"
                />
                <Sparkle className="animate-twinkle-once absolute -top-sm right-[6%] size-xl" outlined />
                <Sparkle className="animate-twinkle-once absolute bottom-[8%] -left-sm size-lg [animation-delay:450ms]" outlined />
              </div>
            </div>
          </section>

          {/* 3. Where the money leaks */}
          <Section labelledBy="leaks-heading" className="pt-0 sm:pt-0">
            <SectionHeading id="leaks-heading" heading={site.leaks.heading} intro={site.leaks.intro} />
            <ul className="mt-xl grid gap-lg sm:grid-cols-2 md:grid-cols-4">
              {site.leaks.items.map((item) => (
                <LeakCard key={item.title} icon={item.icon as IconName} title={item.title} body={item.body} />
              ))}
            </ul>
          </Section>

          {/* 4. Leak Report */}
          <Section id="leak-report" tone="ink" labelledBy="leak-report-heading">
            <SectionHeading
              id="leak-report-heading"
              hud={site.leakReport.hud}
              hudTone="forest"
              heading={site.leakReport.heading}
              intro={site.leakReport.intro}
            />
            <LeakReport booking={booking} />
          </Section>

          {/* 5. How it works */}
          <Section id="how-it-works" labelledBy="how-heading">
            <SectionHeading id="how-heading" heading={site.howItWorks.heading} />
            <LevelMap steps={site.howItWorks.steps} />
            <p className="type-title-md mt-xl max-w-prose-max">{site.howItWorks.closer}</p>
          </Section>

          {/* 6. What we fix */}
          <Section id="what-we-fix" tone="cream-2" labelledBy="offers-heading">
            <SectionHeading id="offers-heading" heading={site.offers.heading} intro={site.offers.intro} />
            <ul className="mt-xl grid gap-xl sm:grid-cols-2 md:grid-cols-3">
              {site.offers.items.map((offer) => (
                <CartridgeCard key={offer.game} {...offer} outcomeLabel={site.offers.whatItDoes} />
              ))}
            </ul>
          </Section>

          {/* 7. Why the order matters */}
          <Section tone="forest" labelledBy="order-heading">
            <div className="max-w-prose-max">
              <h2 id="order-heading" className="type-headline-lg text-balance">
                {site.order.heading}
              </h2>
              <p className="type-body-lg mt-md">{site.order.body}</p>
            </div>
            <OrderLocks locks={site.order.locks} />
          </Section>

          {/* 8. Who we are */}
          <Section labelledBy="about-heading">
            <div className="grid items-start gap-xl md:grid-cols-[1fr_auto]">
              <div className="max-w-prose-max">
                <h2 id="about-heading" className="type-headline-lg text-balance">
                  {site.about.heading}
                </h2>
                {site.about.paragraphs.map((p) => (
                  <p key={p} className="type-body-lg mt-md">
                    {p}
                  </p>
                ))}
                <p className="mt-lg">
                  <SlotText slot={site.about.team} />
                </p>
              </div>
              <Image
                src="/brand/badge-mono.svg"
                alt=""
                width={200}
                height={200}
                unoptimized
                style={{ height: "auto" }}
                className="hidden h-auto w-badge-sm md:block"
              />
            </div>
          </Section>

          {/* 9. FAQ */}
          <Section id="faq" tone="cream-2" labelledBy="faq-heading">
            <SectionHeading id="faq-heading" heading={site.faq.heading} />
            <Faq items={site.faq.items} />
          </Section>

          {/* 10. Closing */}
          <Section tone="ink" labelledBy="closing-heading">
            <div className="relative max-w-prose-max">
              <HudTag tone="forest">{site.closing.hud}</HudTag>
              <h2 id="closing-heading" className="type-headline-lg mt-md text-balance">
                {site.closing.heading}
              </h2>
              <p className="type-body-lg mt-md">{site.closing.body}</p>
              <BookingButton booking={booking} className="mt-xl">
                {site.bookCta}
              </BookingButton>
              <Sparkle className="absolute -top-sm -right-xl hidden size-xl sm:block" />
            </div>
          </Section>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        </>
      )}
    </PageShell>
  );
}
