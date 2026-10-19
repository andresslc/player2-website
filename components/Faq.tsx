// DESIGN.md Components, "FAQ": native <details> so open/closed state is announced and works without JS.
import type { Slot } from "@/content/site";
import { SlotText } from "@/components/primitives";

export function Faq({ items }: { items: readonly { q: string; a: Slot }[] }) {
  return (
    <ul className="mt-xl grid max-w-prose-max gap-md">
      {items.map((item) => (
        <li key={item.q}>
          <details className="group rounded-md border-stroke border-ink bg-surface open:bg-surface-raised">
            <summary className="type-title-md flex min-h-tap-min cursor-pointer list-none items-center justify-between gap-md p-md marker:hidden [&::-webkit-details-marker]:hidden">
              {item.q}
              <span
                aria-hidden="true"
                className="type-headline-sm grid size-xl shrink-0 place-items-center rounded-full border-stroke border-ink bg-leaf leading-none text-ink transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="type-body-md px-md pb-md">
              <SlotText slot={item.a} />
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
