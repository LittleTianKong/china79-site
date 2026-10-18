import type { Metadata } from "next";
import DatasetDetailClient from "@/components/DatasetDetailClient";

export const metadata: Metadata = {
  title: "U.S.–China historical engagement series",
  description: "China79 Initiative’s flagship series of eight planned datasets by Michael C. Rhind-Tutt, documenting publicly recorded official U.S.–China engagements since 1979. Explore the series and its first dataset.",
};

export default function HistoricalEngagementDatasetPage() {
  return <DatasetDetailClient />;
}
