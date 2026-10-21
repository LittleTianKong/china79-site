import AboutPageClient from "@/components/AboutPageClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About the Initiative",
  description:
    "China79 Initiative makes detailed, well-sourced data freely accessible to support research, public understanding, and informed discussion of U.S.–China relations.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageClient />;
}
