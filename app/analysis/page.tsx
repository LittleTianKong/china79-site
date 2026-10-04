import type { Metadata } from "next";
import AnalysisPageClient from "@/components/AnalysisPageClient";

export const metadata: Metadata = {
  title: "Analysis",
};

export default function AnalysisPage() {
  return <AnalysisPageClient />;
}
