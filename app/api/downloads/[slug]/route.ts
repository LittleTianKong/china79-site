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
    const stats = await getDatasetDownloads(dataset.downloads);
    return Response.json(stats, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Download statistics unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
