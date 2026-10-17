import type { Metadata } from "next";
import DatasetDetailClient from "@/components/DatasetDetailClient";

export const metadata: Metadata = {
  title: "U.S.–China historical engagement dataset",
  description: "The flagship China79 Initiative dataset project by Michael C. Rhind-Tutt, documenting publicly recorded official U.S.–China engagements since 1979. Explore its scope and copy the project citation.",
};

export default function HistoricalEngagementDatasetPage() {
  return <DatasetDetailClient />;
}
