import { notFound } from "next/navigation";
import DatasetMemberClient from "@/components/DatasetMemberClient";
import StructuredData from "@/components/StructuredData";
import { getTrumpDatasetRelease, trumpFirstAdministrationReleases } from "@/lib/datasets";
import { pageMetadata, trumpReleaseStructuredData } from "@/lib/seo";

type VersionPageProps = { params: Promise<{ version: string }> };

export function generateStaticParams() {
  return trumpFirstAdministrationReleases.map((release) => ({ version: release.version }));
}

export async function generateMetadata({ params }: VersionPageProps) {
  const release = getTrumpDatasetRelease((await params).version);
  if (!release) notFound();
  return pageMetadata({
    title: `Trump First Administration Dataset — Version ${release.version}`,
    description: `Download and cite version ${release.version} of China79’s Trump first administration dataset, published ${release.date}: ${release.retainedRecords} retained records, ${release.includedRecords} included in the default count.`,
    path: release.path,
  });
}

export default async function TrumpDatasetVersionPage({ params }: VersionPageProps) {
  const release = getTrumpDatasetRelease((await params).version);
  if (!release) notFound();
  return <><StructuredData data={trumpReleaseStructuredData(release)} /><DatasetMemberClient release={release} versionPage /></>;
}
