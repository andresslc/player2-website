"use client";

// DESIGN.md Components, "Header": cream, sticky, ink rule once scrolled; phones get a menu button
// and keep the primary button visible.
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { site } from "@/content/site";
import type { BookingConfig } from "@/lib/env";
import { BookingButton } from "@/components/Booking";
import { cx } from "@/components/primitives";

export function Header({ booking }: { booking: BookingConfig }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cx(
        "sticky top-0 z-40 bg-surface transition-shadow duration-150",
        (scrolled || open) && "shadow-rule",
      )}
    >
      <a
        href="#main"
        className="type-label-md sr-only rounded-sm bg-spark px-md py-sm text-ink focus:not-sr-only focus:absolute focus:left-gutter focus:top-sm"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-header-sm max-w-container-max items-center justify-between gap-md px-gutter sm:h-header sm:px-gutter-lg">
        <Link href="/" className="shrink-0" aria-label={`${site.name}, home`}>
          <Image
            src="/brand/wordmark-color.svg"
            alt=""
            width={140}
            height={73}
            priority
            unoptimized style={{ height: "auto" }}
            className="h-auto w-wordmark-min"
          />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-lg">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="type-label-md text-ink no-underline hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-sm">
          <BookingButton booking={booking} className="px-md sm:px-lg">
            <span className="sm:hidden">{site.bookCtaShort}</span>
            <span className="hidden sm:inline">{site.bookCta}</span>
          </BookingButton>
          <button
            type="button"
            className="inline-flex size-tap-min items-center justify-center rounded-full border-stroke border-ink bg-cream text-ink md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="flex w-md flex-col gap-xs">
              <span className="h-stroke bg-ink" />
              <span className={cx("h-stroke bg-ink", open && "opacity-0")} />
              <span className="h-stroke bg-ink" />
            </span>
          </button>
        </div>
      </div>

      <nav id={menuId} aria-label="Main" hidden={!open} className="border-t-stroke border-ink bg-surface md:hidden">
        <ul className="mx-auto flex max-w-container-max flex-col px-gutter py-sm">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="type-title-md flex min-h-tap-min items-center text-ink no-underline"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
