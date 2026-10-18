import InterviewsPageClient from "@/components/InterviewsPageClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Interviews",
  description: "China79’s forthcoming video interview series will explore China and U.S.–China relations through conversations with scholars, practitioners, and people with firsthand experience.",
  path: "/interviews",
});

export default function InterviewsPage() {
  return <InterviewsPageClient />;
}
