import PolicyPageClient from "@/components/PolicyPageClient";
import { pageMetadata } from "@/lib/seo";

// Retained for older links; the active navigation uses /interviews.
export const metadata = pageMetadata({
  title: "Perspectives & Dialogue",
  description:
    "Informed public discussion of U.S.–China relations, supported by accessible evidence, historical context, and diverse perspectives.",
  path: "/policy-outreach",
  index: false,
});

export default function PolicyPage() {
  return <PolicyPageClient />;
}
