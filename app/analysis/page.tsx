import AnalysisPageClient from "@/components/AnalysisPageClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "U.S.–China Research & Analysis",
  description:
    "China79’s research uses historical evidence to examine patterns of cooperation, competition, and diplomatic engagement in U.S.–China relations.",
  path: "/analysis",
});

export default function AnalysisPage() {
  return <AnalysisPageClient />;
}
