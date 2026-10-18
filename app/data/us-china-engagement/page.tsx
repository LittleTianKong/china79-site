import DatasetDetailClient from "@/components/DatasetDetailClient";
import StructuredData from "@/components/StructuredData";
import { pageMetadata, seriesStructuredData } from "@/lib/seo";
import { historicalEngagementDataset } from "@/lib/datasets";

export const metadata = pageMetadata({
  title: "U.S.–China historical engagement series",
  description: "China79 Initiative’s flagship series of eight planned datasets by Michael C. Rhind-Tutt, documenting publicly recorded official U.S.–China engagements since 1979. Explore the series and its first dataset.",
  path: historicalEngagementDataset.path,
});

export default function HistoricalEngagementDatasetPage() {
  return <><StructuredData data={seriesStructuredData} /><DatasetDetailClient /></>;
}
