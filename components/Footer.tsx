import Image from "next/image";
import { site } from "@/content/site";
import { SlotText } from "@/components/primitives";

export function Footer() {
  return (
    <footer className="on-dark bg-surface-dark text-on-surface-dark">
      <div className="mx-auto grid max-w-container-max gap-xl px-gutter py-2xl sm:grid-cols-3 sm:px-gutter-lg">
        <div>
          <Image src="/brand/wordmark-color.svg" alt={site.name} width={180} height={94} unoptimized style={{ height: "auto" }} className="h-auto w-wordmark-min" />
          <p className="type-hud-md mt-md text-leaf">{site.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-col gap-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={`/${item.href}`} className="type-label-md text-cream">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="type-title-md">{site.footer.contactHeading}</h2>
          <ul className="mt-md flex flex-col items-start gap-sm">
            {site.footer.contact.map((slot, i) => (
              <li key={i}>
                <SlotText slot={slot} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t-stroke border-forest">
        <div className="mx-auto flex max-w-container-max flex-wrap items-center justify-between gap-md px-gutter py-lg sm:px-gutter-lg">
          <p className="type-body-sm">{site.footer.copyright}</p>
          <ul className="flex gap-lg">
            {site.footer.legal.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="type-body-sm text-cream">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
