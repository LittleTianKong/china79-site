import DataPageClient from "@/components/DataPageClient";
import StructuredData from "@/components/StructuredData";
import { catalogStructuredData, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "U.S.–China Relations Datasets",
  description:
    "Explore China79’s flagship series of eight planned datasets documenting official U.S.–China engagement, with transparent sources, clear methods, and freely accessible releases.",
  path: "/data",
});

export default function DataPage() {
  return <><StructuredData data={catalogStructuredData} /><DataPageClient /></>;
}
