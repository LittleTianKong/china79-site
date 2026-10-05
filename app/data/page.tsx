import type { Metadata } from "next";
import DataPageClient from "@/components/DataPageClient";

export const metadata: Metadata = {
  title: "Data",
};

export default function DataPage() {
  return <DataPageClient />;
}
