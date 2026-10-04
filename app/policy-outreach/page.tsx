import type { Metadata } from "next";
import PolicyPageClient from "@/components/PolicyPageClient";

export const metadata: Metadata = {
  title: "Policy & Outreach",
};

export default function PolicyPage() {
  return <PolicyPageClient />;
}
