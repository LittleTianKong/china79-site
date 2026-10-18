import type { MetadataRoute } from "next";
import { absoluteUrl, indexedPaths } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return indexedPaths.map((path) => ({ url: absoluteUrl(path) }));
}
