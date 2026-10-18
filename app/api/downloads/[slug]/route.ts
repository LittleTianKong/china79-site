import { datasetCatalog } from "@/lib/datasets";
import { getDatasetDownloads } from "@/lib/dataset-downloads";

export const revalidate = 900;

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dataset = datasetCatalog.find((item) => item.slug === slug);
  if (!dataset) return Response.json({ error: "Unknown dataset" }, { status: 404 });
  try {
    const stats = await getDatasetDownloads(dataset.downloads);
    return Response.json(stats, { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600" } });
  } catch {
    return Response.json({ error: "Download statistics unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
