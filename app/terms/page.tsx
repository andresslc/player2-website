import type { Metadata } from "next";
import { site } from "@/content/site";
import { LegalPage } from "@/components/LegalPage";

// Kept out of search results until the real text replaces the placeholder (build log).
export const metadata: Metadata = { title: site.legal.terms.title, robots: { index: false } };

export default function TermsPage() {
  return <LegalPage {...site.legal.terms} />;
}
