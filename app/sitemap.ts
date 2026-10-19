import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";

// Privacy and Terms are left out while they are placeholders (noindex); add them back with real text.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteUrl()}/`, changeFrequency: "monthly", priority: 1 }];
}
