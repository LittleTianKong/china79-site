import PolicyPageClient from "@/components/PolicyPageClient";
import { pageMetadata } from "@/lib/seo";

// Retained for older links; the active navigation uses /interviews.
export const metadata = pageMetadata({
  title: "Cooperation & Dialogue",
  description:
    "Informed dialogue on pragmatic U.S.–China cooperation, grounded in historical evidence and recognition of legitimate disagreements and security concerns.",
  path: "/policy-outreach",
  index: false,
});

export default function PolicyPage() {
  return <PolicyPageClient />;
}
