import type { Metadata } from "next";
import DataPageClient from "@/components/DataPageClient";

export const metadata: Metadata = {
  title: "Data & Transparency",
  description:
    "Explore China79’s flagship series of eight planned datasets documenting official U.S.–China engagement, with transparent sources, clear methods, and freely accessible releases.",
};

export default function DataPage() {
  return <DataPageClient />;
}
