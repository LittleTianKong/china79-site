import type { Metadata } from "next";
import DataPageClient from "@/components/DataPageClient";

export const metadata: Metadata = {
  title: "Data & Transparency",
  description:
    "Explore China79’s developing historical engagement datasets and our commitments to transparent sources, clear methodology, and accessible data on U.S.–China relations.",
};

export default function DataPage() {
  return <DataPageClient />;
}
