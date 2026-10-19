// Small shared pieces used across every section. All values resolve to DESIGN.md tokens.
import type { ComponentProps, ReactNode } from "react";
import type { Slot } from "@/content/site";

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export type Tone = "cream" | "cream-2" | "ink" | "forest";

const toneClasses: Record<Tone, string> = {
  cream: "bg-surface text-on-surface",
  "cream-2": "bg-surface-raised text-on-surface",
  ink: "on-dark bg-surface-dark text-on-surface-dark",
  forest: "on-dark bg-forest text-cream",
};

export function Section({
  id,
  tone = "cream",
  labelledBy,
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cx(toneClasses[tone], "py-2xl sm:py-3xl", className)}>
      <div className="mx-auto w-full max-w-container-max px-gutter sm:px-gutter-lg">{children}</div>
    </section>
  );
}

// HUD tags label, they never instruct (DESIGN.md Components).
export function HudTag({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark" | "forest";
  className?: string;
}) {
  const tones = {
    light: "bg-cream-2 text-ink",
    dark: "bg-ink text-leaf",
    forest: "bg-forest text-cream",
  };
  return <span className={cx("type-hud-md inline-block rounded-sm px-sm py-xs", tones[tone], className)}>{children}</span>;
}

export function SectionHeading({
  id,
  hud,
  hudTone,
  heading,
  intro,
  className,
}: {
  id: string;
  hud?: string;
  hudTone?: "light" | "dark" | "forest";
  heading: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={cx("max-w-prose-max", className)}>
      {hud ? <HudTag tone={hudTone}>{hud}</HudTag> : null}
      <h2 id={id} className={cx("type-headline-lg text-balance", hud && "mt-md")}>
        {heading}
      </h2>
      {intro ? <p className="type-body-lg mt-md">{intro}</p> : null}
    </div>
  );
}

// The 4-point sparkle from the "O" of TWO (DESIGN.md Shapes). Decoration only.
export function Sparkle({ className, outlined = false }: { className?: string; outlined?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={cx("fill-spark", outlined && "stroke-ink", className)}>
      <path
        d="M12 1c.9 6.6 3.9 9.8 10.5 11-6.6 1.2-9.6 4.4-10.5 11-.9-6.6-3.9-9.8-10.5-11C8.1 10.8 11.1 7.6 12 1z"
        strokeWidth={outlined ? 1.6 : 0}
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Renders real copy, or a highlighted gap that cannot be mistaken for content.
export function SlotText({ slot, className }: { slot: Slot; className?: string }) {
  if (typeof slot === "string") return <span className={className}>{slot}</span>;
  return (
    <span
      data-placeholder
      className={cx("type-label-md inline-block rounded-sm border-stroke border-dashed border-ink bg-spark px-md py-sm text-ink", className)}
    >
      [NEEDED: {slot.needed}]
    </span>
  );
}

const buttonBase =
  "type-label-lg sticker-press inline-flex min-h-control-lg items-center justify-center gap-sm rounded-full border-stroke px-lg py-sm text-center text-ink no-underline hover:bg-spark focus-visible:bg-spark disabled:pointer-events-none disabled:opacity-70";

export function buttonClass(variant: "primary" | "secondary" = "primary", className?: string) {
  return cx(buttonBase, variant === "primary" ? "bg-leaf" : "bg-cream hover:bg-cream-2 focus-visible:bg-cream-2", className);
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: "primary" | "secondary" }) {
  return <button className={buttonClass(variant, className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"a"> & { variant?: "primary" | "secondary" }) {
  return <a className={buttonClass(variant, className)} {...props} />;
}
