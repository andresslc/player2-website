// The B-side of the A+B mix: game devices that carry the theme (DESIGN.md Overview, "Theme dial").
// Plain words always sit next to them; none of these is the only carrier of meaning.
import { cx, HudTag } from "@/components/primitives";

// 8x8 pixel icons on the 4px grid. "x" ink, "g" leaf, "t" tan, "n" tan-dark, "." empty.
// DRAFT art drawn during the build; the designer may replace it (DESIGN.md open gaps, C8).
const ICONS = {
  phone: ["xx......", "xgx.....", "xggx....", ".xgx....", "..xgx.xx", "...xgxgx", "....xggx", ".....xx."],
  quote: ["xxxxxx..", "xttttxx.", "xtxxtxtx", "xttttttx", "xtxxxxtx", "xttttttx", "xtxxxttx", "xxxxxxxx"],
  star: ["...xx...", "..xggx..", "xxggggxx", "xggggggx", ".xggggx.", ".xgxxgx.", "xgx..xgx", "xx....xx"],
  mail: ["xxxxxxxx", "xxttttxx", "xtxttxtx", "xttxxttx", "xttttttx", "xtnnnntx", "xxxxxxxx", "........"],
  lock: ["..xxxx..", ".x....x.", ".x....x.", "xxxxxxxx", "xttttttx", "xttxxttx", "xttttttx", "xxxxxxxx"],
  unlock: ["..xxxx..", ".x....x.", ".x......", "xxxxxxxx", "xggggggx", "xggxxggx", "xggggggx", "xxxxxxxx"],
  next: ["..xxxx..", ".x....x.", ".x....x.", "xxxxxxxx", "xnnnnnnx", "xnnxxnnx", "xnnnnnnx", "xxxxxxxx"],
} as const;

export type IconName = keyof typeof ICONS;

const fills: Record<string, string> = { x: "fill-ink", g: "fill-leaf", t: "fill-tan", n: "fill-tan-dark" };

export function PixelIcon({ name, className }: { name: IconName; className?: string }) {
  const rects: { x: number; y: number; c: string }[] = [];
  ICONS[name].forEach((row, y) => [...row].forEach((c, x) => c !== "." && rects.push({ x, y, c })));
  return (
    <svg viewBox="0 0 8 8" aria-hidden="true" focusable="false" shapeRendering="crispEdges" className={cx("size-icon", className)}>
      {rects.map(({ x, y, c }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} className={fills[c]} />
      ))}
    </svg>
  );
}

export function LeakCard({ icon, title, body }: { icon: IconName; title: string; body: string }) {
  return (
    <li className="rounded-md border-stroke border-ink bg-surface-raised p-lg">
      <PixelIcon name={icon} />
      <h3 className="type-title-md mt-md">{title}</h3>
      <p className="type-body-md mt-sm">{body}</p>
    </li>
  );
}

// "How it works" as a level map: horizontal on desktop, vertical on phones (DESIGN.md Components).
export function LevelMap({ steps }: { steps: readonly { name: string; body: string }[] }) {
  return (
    <ol className="relative mt-xl grid gap-lg md:grid-cols-5 md:gap-md">
      <span aria-hidden="true" className="absolute top-0 bottom-0 left-[calc(var(--spacing-level-node)/2_-_var(--spacing-track)/2)] w-track bg-forest md:top-[calc(var(--spacing-level-node)/2_-_var(--spacing-track)/2)] md:right-[10%] md:bottom-auto md:left-[10%] md:h-track md:w-auto" />
      {steps.map((step, i) => (
        <li key={step.name} className="relative grid grid-cols-[var(--spacing-level-node)_1fr] content-start items-start gap-md md:grid-cols-1 md:justify-items-center md:text-center">
          <span
            className={cx(
              "type-hud-md pixel-corners grid size-level-node place-items-center",
              i === 0 ? "bg-leaf text-ink" : "bg-forest text-cream",
            )}
            aria-hidden="true"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="type-title-md">
              <span className="sr-only">Step {i + 1}: </span>
              {step.name}
            </h3>
            {i === 0 ? <p className="type-hud-md mt-xs text-forest">You start here</p> : null}
            <p className="type-body-sm mt-sm">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// Offer cards shaped like the cartridge in the wordmark: leaf stripe, ink rule, sticker shadow.
export function CartridgeCard({
  game,
  title,
  bullets,
  outcome,
  note,
  outcomeLabel,
}: {
  game: string;
  title: string;
  bullets: readonly string[];
  outcome: string;
  note: string | null;
  outcomeLabel: string;
}) {
  return (
    <li className="flex flex-col overflow-hidden rounded-lg border-stroke border-ink bg-surface shadow-sticker">
      <div aria-hidden="true" className="h-cartridge-stripe border-b-stroke border-ink bg-leaf" />
      <div className="flex flex-1 flex-col p-lg">
        <h3 className="type-headline-sm text-balance">{title}</h3>
        <p className="mt-sm flex flex-wrap items-center gap-sm">
          <HudTag>{game}</HudTag>
          {note ? <span className="type-label-md text-forest">{note}</span> : null}
        </p>
        <ul className="type-body-sm mt-md list-disc space-y-xs pl-lg marker:text-forest">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <p className="type-body-sm mt-auto border-t-stroke border-cream-2 pt-md">
          <strong className="font-bold">{outcomeLabel}:</strong> {outcome}
        </p>
      </div>
    </li>
  );
}

// "Why the order matters": three slots, the third locked until the front door holds.
export function OrderLocks({
  locks,
}: {
  locks: readonly { game: string; plain: string; state: string; stateLabel: string }[];
}) {
  const icon: Record<string, IconName> = { unlocked: "unlock", next: "next", locked: "lock" };
  return (
    <ol className="mt-xl grid gap-md md:grid-cols-3">
      {locks.map((l, i) => (
        <li
          key={l.game}
          className={cx(
            "flex items-start gap-md rounded-md border-stroke p-lg",
            l.state === "locked" ? "border-dashed border-cream bg-forest" : "border-cream bg-ink",
          )}
        >
          <span className="rounded-sm bg-cream p-xs">
            <PixelIcon name={icon[l.state]} />
          </span>
          <div>
            <p className="type-hud-md text-cream">
              <span className="sr-only">Step {i + 1}, </span>
              {l.stateLabel}
            </p>
            <p className="type-title-md mt-xs">{l.plain}</p>
            <p className="type-body-sm mt-xs">{l.game}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
