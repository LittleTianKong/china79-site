import type { Metadata } from "next";
import { articles } from "@/lib/content";
import { historicalEngagementDataset, trumpFirstAdministrationDataset, type DatasetRelease } from "@/lib/datasets";
import { initiative } from "@/lib/initiative";

// Keep canonicals, crawler files, and structured data on the same public origin.
export const SITE_URL = "https://china79.org";
export const SITE_NAME = "China79 Initiative";
export const SITE_DESCRIPTION = initiative.en.description;

export function absoluteUrl(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new Error("A site URL must use a root-relative path.");
  }
  const url = new URL(path, SITE_URL);
  if (url.origin !== SITE_URL) throw new Error("A site URL must stay on the canonical origin.");
  return url.toString();
}

export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const image = { url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: "China79 Initiative — Better Data. Better Dialogue." };
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: { index, follow: true },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      locale: "en_US",
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}

export function isPublishedArticle(article: { status?: string }) {
  return article.status === "published";
}

export const indexedPaths = [
  "/",
  "/about",
  "/data",
  historicalEngagementDataset.path,
  trumpFirstAdministrationDataset.path,
  `${trumpFirstAdministrationDataset.path}/versions`,
  ...trumpFirstAdministrationDataset.releases.map((release) => release.path),
  "/analysis",
  "/interviews",
  "/contact",
  ...articles.filter(isPublishedArticle).map((article) => `/analysis/${article.slug}`),
];

const organizationId = absoluteUrl("/#organization");
const websiteId = absoluteUrl("/#website");
const catalogId = absoluteUrl("/data#catalog");
const seriesId = absoluteUrl(`${historicalEngagementDataset.path}#series`);
const datasetId = absoluteUrl(`${trumpFirstAdministrationDataset.path}#dataset`);
const trumpRelease = trumpFirstAdministrationDataset.release;

export const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: SITE_NAME,
      url: absoluteUrl("/"),
      description: SITE_DESCRIPTION,
      logo: { "@type": "ImageObject", url: absoluteUrl("/china79-logo.svg"), width: 1338, height: 328 },
      email: "contact@china79.org",
      contactPoint: { "@type": "ContactPoint", contactType: "public engagement", email: "contact@china79.org", url: absoluteUrl("/contact") },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: SITE_NAME,
      url: absoluteUrl("/"),
      description: SITE_DESCRIPTION,
      publisher: { "@id": organizationId },
      inLanguage: ["en", "zh-CN"],
    },
  ],
};

export const catalogStructuredData = {
  "@context": "https://schema.org",
  "@type": "DataCatalog",
  "@id": catalogId,
  name: "China79 Data Catalog",
  description: "China79 Initiative’s data catalog, featuring a flagship series of eight datasets on publicly documented official U.S.–China engagements since 1979. The first dataset, covering Trump’s first administration, is available under CC BY 4.0. Seven further datasets are planned.",
  url: absoluteUrl("/data"),
  publisher: { "@id": organizationId },
  isPartOf: { "@id": websiteId },
  hasPart: { "@id": seriesId },
  dataset: [{ "@id": datasetId }],
};

export const seriesStructuredData = {
  "@context": "https://schema.org",
  "@type": "DataCatalog",
  "@id": seriesId,
  name: "U.S.–China Historical Engagement: Flagship Series",
  alternateName: historicalEngagementDataset.title.zh,
  description: `${historicalEngagementDataset.summary.en} The first dataset covers Trump’s first administration and is available under CC BY 4.0. Seven further datasets are planned.`,
  url: absoluteUrl(historicalEngagementDataset.path),
  publisher: { "@id": organizationId },
  creator: { "@type": "Person", name: historicalEngagementDataset.author },
  isPartOf: { "@id": catalogId },
  dataset: [{ "@id": datasetId }],
  creativeWorkStatus: "Series in development: one dataset released, seven planned",
};

// This full Dataset description belongs only on its canonical landing page.
// Release metadata and download URLs match the published files in lib/datasets.ts.
export const trumpDatasetStructuredData = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "@id": datasetId,
  name: trumpFirstAdministrationDataset.title.en,
  alternateName: trumpFirstAdministrationDataset.title.zh,
  description: `${trumpFirstAdministrationDataset.summary.en} Version ${trumpRelease.version} retains ${trumpRelease.retainedRecords} records, of which ${trumpRelease.includedRecords} are included in the default count and ${trumpRelease.excludedRecords} are retained as excluded records for transparency. This is a curated catalog, not an exhaustive census of every contact. The dataset is published under CC BY 4.0.`,
  url: absoluteUrl(trumpFirstAdministrationDataset.path),
  identifier: trumpFirstAdministrationDataset.slug,
  version: trumpRelease.version,
  datePublished: trumpRelease.date,
  dateModified: trumpRelease.updated ?? trumpRelease.date,
  license: trumpRelease.license,
  isAccessibleForFree: true,
  citation: trumpFirstAdministrationDataset.citation,
  distribution: trumpRelease.files.map((file) => ({
    "@type": "DataDownload",
    name: file.label,
    encodingFormat: file.encodingFormat,
    contentUrl: file.url,
    license: trumpRelease.license,
  })),
  creator: { "@type": "Person", name: trumpFirstAdministrationDataset.author },
  publisher: { "@id": organizationId },
  includedInDataCatalog: [{ "@id": seriesId }, { "@id": catalogId }],
  temporalCoverage: "2017-01-20/2021-01-20",
  keywords: ["U.S.–China relations", "Sino-American relations", "official contacts", "diplomatic engagement", "Trump administration", "historical data"],
  inLanguage: "en",
  creativeWorkStatus: "Published",
};

export function trumpReleaseStructuredData(release: DatasetRelease) {
  return {
    ...trumpDatasetStructuredData,
    "@id": absoluteUrl(`${release.path}#dataset`),
    url: absoluteUrl(release.path),
    identifier: `${trumpFirstAdministrationDataset.slug}-v${release.version}`,
    version: release.version,
    datePublished: release.date,
    dateModified: release.updated ?? release.date,
    license: release.license,
    description: `${trumpFirstAdministrationDataset.summary.en} Version ${release.version} retains ${release.retainedRecords} records, of which ${release.includedRecords} are included in the default count and ${release.excludedRecords} are retained as excluded records for transparency. ${release.notes.en}`,
    citation: release.citation,
    distribution: release.files.map((file) => ({
      "@type": "DataDownload",
      name: file.label,
      encodingFormat: file.encodingFormat,
      contentUrl: file.url,
      license: release.license,
    })),
    isPartOf: { "@id": datasetId },
  };
}

export function serializeStructuredData(data: unknown) {
  // Prevent a content field from ending the inline script element.
  return JSON.stringify(data).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
