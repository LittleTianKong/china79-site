import DataPageClient from "@/components/DataPageClient";
import StructuredData from "@/components/StructuredData";
import { catalogStructuredData, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "U.S.–China Relations Datasets",
  description:
    "Explore China79’s flagship series on official U.S.–China engagement: one released dataset and seven planned datasets, with transparent sources and clear methods.",
  path: "/data",
});

export default function DataPage() {
  return <><StructuredData data={catalogStructuredData} /><DataPageClient /></>;
}
