import DatasetMemberClient from "@/components/DatasetMemberClient";
import StructuredData from "@/components/StructuredData";
import { pageMetadata, trumpDatasetStructuredData } from "@/lib/seo";
import { trumpFirstAdministrationDataset } from "@/lib/datasets";

export const metadata = pageMetadata({
  title: trumpFirstAdministrationDataset.title.en,
  description: "The first dataset in China79’s flagship series: publicly documented official U.S.–China contacts during Trump’s first administration, with 745 retained records and 719 included in the default count. First release forthcoming.",
  path: trumpFirstAdministrationDataset.path,
});

export default function TrumpFirstAdministrationPage() {
  return <><StructuredData data={trumpDatasetStructuredData} /><DatasetMemberClient /></>;
}
