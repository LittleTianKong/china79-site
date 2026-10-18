import HomePageClient from "@/components/HomePageClient";
import { pageMetadata, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({ title: "Better Data. Better Dialogue.", description: SITE_DESCRIPTION, path: "/" }),
  title: { absolute: `${SITE_NAME} | Better Data. Better Dialogue.` },
};

export default function HomePage() {
  return <HomePageClient />;
}
