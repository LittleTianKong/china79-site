import type { Metadata } from "next";
import DatasetMemberClient from "@/components/DatasetMemberClient";

export const metadata: Metadata = {
  title: "U.S.–China Official Contacts: Trump’s First Administration (2017–2021)",
  description: "The first dataset in China79’s flagship series: publicly documented official U.S.–China contacts during Trump’s first administration, with 745 retained records and 719 included in the default count. First release forthcoming.",
};

export default function TrumpFirstAdministrationPage() {
  return <DatasetMemberClient />;
}
