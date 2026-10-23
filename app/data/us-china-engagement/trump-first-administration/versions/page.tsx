import DatasetArchiveClient from "@/components/DatasetArchiveClient";
import { trumpFirstAdministrationDataset as dataset } from "@/lib/datasets";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Trump First Administration Dataset — Version Archive",
  description: "Browse published versions of China79’s Trump first administration dataset, with permanent version pages, release notes, citations, and CSV, Excel, and ZIP downloads.",
  path: `${dataset.path}/versions`,
});

export default function TrumpDatasetVersionsPage() {
  return <DatasetArchiveClient />;
}
