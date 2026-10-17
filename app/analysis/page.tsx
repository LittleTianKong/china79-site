import type { Metadata } from "next";
import AnalysisPageClient from "@/components/AnalysisPageClient";

export const metadata: Metadata = {
  title: "Research & Understanding",
  description:
    "China79’s research uses historical evidence to examine patterns of cooperation, competition, and diplomatic engagement in U.S.–China relations.",
};

export default function AnalysisPage() {
  return <AnalysisPageClient />;
}
