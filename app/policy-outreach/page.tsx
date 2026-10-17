import type { Metadata } from "next";
import PolicyPageClient from "@/components/PolicyPageClient";

export const metadata: Metadata = {
  title: "Cooperation & Dialogue",
  description:
    "Informed dialogue on pragmatic U.S.–China cooperation, grounded in historical evidence and recognition of legitimate disagreements and security concerns.",
};

export default function PolicyPage() {
  return <PolicyPageClient />;
}
