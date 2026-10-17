import type { Metadata } from "next";
import AboutPageClient from "@/components/AboutPageClient";

export const metadata: Metadata = {
  title: "About the Initiative",
  description:
    "China79 Initiative’s mission, vision, and three pillars: Data & Transparency, Research & Understanding, and Cooperation & Dialogue.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
