import DatasetMemberClient from "@/components/DatasetMemberClient";
import StructuredData from "@/components/StructuredData";
import { pageMetadata, trumpDatasetStructuredData } from "@/lib/seo";
import { trumpFirstAdministrationDataset } from "@/lib/datasets";

export const metadata = pageMetadata({
  title: trumpFirstAdministrationDataset.title.en,
  description: `Download China79’s dataset of official U.S.–China contacts during Trump’s first administration: 745 retained records and 719 included in the default count. Version ${trumpFirstAdministrationDataset.release.version} is available under CC BY 4.0.`,
  path: trumpFirstAdministrationDataset.path,
});

export default function TrumpFirstAdministrationPage() {
  return <><StructuredData data={trumpDatasetStructuredData} /><DatasetMemberClient /></>;
}
