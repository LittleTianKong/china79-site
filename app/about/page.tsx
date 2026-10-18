import AboutPageClient from "@/components/AboutPageClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About the Initiative",
  description:
    "China79 Initiative’s mission, vision, and three pillars: Data & Transparency, Research & Understanding, and Cooperation & Dialogue.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageClient />;
}
