import DatasetDetailClient from "@/components/DatasetDetailClient";
import StructuredData from "@/components/StructuredData";
import { pageMetadata, seriesStructuredData } from "@/lib/seo";
import { historicalEngagementDataset } from "@/lib/datasets";

export const metadata = pageMetadata({
  title: "U.S.–China historical engagement series",
  description: "China79 Initiative’s flagship series of eight datasets by Michael C. Rhind-Tutt, documenting official U.S.–China engagements since 1979. The first dataset is available; seven further datasets are planned.",
  path: historicalEngagementDataset.path,
});

export default function HistoricalEngagementDatasetPage() {
  return <><StructuredData data={seriesStructuredData} /><DatasetDetailClient /></>;
}
