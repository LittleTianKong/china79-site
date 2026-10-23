import { datasetCatalog } from "@/lib/datasets";
import { getDatasetDownloads } from "@/lib/dataset-downloads";

// Keep only the shared provider fetch cache. Stacking a route/CDN cache on top
// of it can keep the first release's zero total visible long after downloads.
export const revalidate = 0;

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dataset = datasetCatalog.flatMap((item) => [item, ...(item.members ?? [])]).find((item) => item.slug === slug);
  if (!dataset) return Response.json({ error: "Unknown dataset" }, { status: 404 });
  try {
    // Series totals follow each member's current release. Member endpoints keep
    // historical files available so archived pages can select their own totals.
    const currentTags = "members" in dataset ? dataset.members.flatMap((member) => member.release?.tag ? [member.release.tag] : []) : [];
    const source = currentTags.length ? { ...dataset.downloads, releaseTags: currentTags } : dataset.downloads;
    const stats = await getDatasetDownloads(source);
    return Response.json(stats, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Download statistics unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
