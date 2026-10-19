import { PageShell } from "@/components/PageShell";
import { Section, SlotText } from "@/components/primitives";
import type { Slot } from "@/content/site";

export function LegalPage({ title, body }: { title: string; body: Slot }) {
  return (
    <PageShell>
      {() => (
        <Section labelledBy="legal-heading">
          <div className="max-w-prose-max">
            <h1 id="legal-heading" className="type-headline-lg">
              {title}
            </h1>
            <div className="type-body-md mt-lg">
              <SlotText slot={body} />
            </div>
          </div>
        </Section>
      )}
    </PageShell>
  );
}
