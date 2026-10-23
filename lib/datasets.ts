export type DatasetRelease = {
  version: string;
  date: string;
  tag: string;
  url: string;
  path: string;
  license: string;
  files: readonly { name: string; label: string; format: string; encodingFormat: string; url: string }[];
  retainedRecords: number;
  includedRecords: number;
  excludedRecords: number;
  notes: { en: string; zh: string };
  citation: string;
  bibtex: string;
};

const trumpDatasetPath = "/data/us-china-engagement/trump-first-administration";

// Published snapshots, newest first. Add a new entry for an update; retain old
// entries and their GitHub assets so version links and citations stay usable.
export const trumpFirstAdministrationReleases: readonly DatasetRelease[] = [
  {
    version: "1.0.0",
    date: "2026-10-17",
    tag: "us-china-engagement-trump1-v1.0.0",
    url: "https://github.com/LittleTianKong/china79-site/releases/tag/us-china-engagement-trump1-v1.0.0",
    path: `${trumpDatasetPath}/versions/1.0.0`,
    license: "https://creativecommons.org/licenses/by/4.0/",
    retainedRecords: 745,
    includedRecords: 719,
    excludedRecords: 26,
    notes: {
      en: "Initial public release: 745 retained records, including 719 included in the default count and 26 excluded records retained for transparency.",
      zh: "首次公开发布：共保留745条记录，其中719条计入默认统计，另有26条未计入统计但保留供查验。",
    },
    files: [
      { name: "us-china-engagement-data-trump1-v1.0.0.csv", label: "CSV", format: "CSV", encodingFormat: "text/csv", url: "https://github.com/LittleTianKong/china79-site/releases/download/us-china-engagement-trump1-v1.0.0/us-china-engagement-data-trump1-v1.0.0.csv" },
      { name: "us-china-engagement-data-trump1-v1.0.0.xlsx", label: "Excel workbook", format: "XLSX", encodingFormat: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", url: "https://github.com/LittleTianKong/china79-site/releases/download/us-china-engagement-trump1-v1.0.0/us-china-engagement-data-trump1-v1.0.0.xlsx" },
      { name: "us-china-engagement-data-trump1-v1.0.0.zip", label: "Complete package", format: "ZIP", encodingFormat: "application/zip", url: "https://github.com/LittleTianKong/china79-site/releases/download/us-china-engagement-trump1-v1.0.0/us-china-engagement-data-trump1-v1.0.0.zip" },
    ],
    citation: `Rhind-Tutt, Michael C. (2026). U.S.–China Official Contacts: Trump’s First Administration (2017–2021) (Version 1.0.0) [Dataset]. China79 Initiative. https://china79.org${trumpDatasetPath}/versions/1.0.0`,
    bibtex: `@misc{rhindtutt_china79_trump1_v1_0_0,
  author = {Rhind-Tutt, Michael C.},
  title = {{U.S.–China Official Contacts: Trump’s First Administration (2017–2021)}},
  year = {2026},
  version = {1.0.0},
  howpublished = {China79 Initiative},
  note = {Version 1.0.0; dataset; licensed under CC BY 4.0},
  url = {https://china79.org${trumpDatasetPath}/versions/1.0.0}
}`,
  },
];

const currentTrumpRelease = trumpFirstAdministrationReleases[0];

export function getTrumpDatasetRelease(version: string) {
  return trumpFirstAdministrationReleases.find((release) => release.version === version);
}

export const trumpFirstAdministrationDataset = {
  slug: "us-china-engagement-trump1",
  path: trumpDatasetPath,
  url: "https://china79.org/data/us-china-engagement/trump-first-administration",
  author: "Michael C. Rhind-Tutt",
  publisher: "China79 Initiative",
  title: {
    en: "U.S.–China Official Contacts: Trump’s First Administration (2017–2021)",
    zh: "美中官方接触：特朗普第一届政府（2017—2021年）",
  },
  shortTitle: { en: "U.S.–China Official Contacts", zh: "美中官方接触" },
  summary: {
    en: "A curated dataset of publicly documented official U.S.–China contacts and proceedings during Trump’s first administration, from January 20, 2017 through January 20, 2021.",
    zh: "本数据集整理特朗普第一届政府期间（2017年1月20日至2021年1月20日）有公开记录的美中官方接触及相关活动。",
  },
  retainedRecords: currentTrumpRelease.retainedRecords,
  includedRecords: currentTrumpRelease.includedRecords,
  excludedRecords: currentTrumpRelease.excludedRecords,
  downloads: {
    owner: "LittleTianKong",
    repository: "china79-site",
    tagPrefix: "us-china-engagement-trump1-v",
    assetPrefix: "us-china-engagement-data-trump1-",
  },
  releases: trumpFirstAdministrationReleases,
  release: currentTrumpRelease,
  citation: currentTrumpRelease.citation,
  bibtex: currentTrumpRelease.bibtex,
} as const;

export const historicalEngagementDataset = {
  slug: "us-china-engagement",
  path: "/data/us-china-engagement",
  url: "https://china79.org/data/us-china-engagement",
  author: "Michael C. Rhind-Tutt",
  publisher: "China79 Initiative",
  kind: "series",
  datasetCount: 8,
  members: [trumpFirstAdministrationDataset],
  downloads: {
    owner: "LittleTianKong",
    repository: "china79-site",
    tagPrefix: "us-china-engagement-",
    assetPrefix: "us-china-engagement-data-",
  },
  title: { en: "U.S.–China historical engagement", zh: "美中历史接触与对话" },
  summary: {
    en: "Our flagship series is planned to include eight datasets, building toward the most comprehensive freely accessible record of publicly documented official U.S.–China engagements since 1979.",
    zh: "我们的旗舰系列计划收录8个数据集，旨在为1979年以来有公开记录的美中官方接触建立最全面、可免费获取的资料库。",
  },
  citation: "Rhind-Tutt, Michael C. (n.d.). U.S.–China historical engagement [Dataset series in development]. China79 Initiative. https://china79.org/data/us-china-engagement",
  bibtex: `@misc{rhindtutt_china79_engagement,
  author = {Rhind-Tutt, Michael C.},
  title = {{U.S.–China} historical engagement},
  howpublished = {China79 Initiative},
  note = {Series of eight datasets in development},
  url = {https://china79.org/data/us-china-engagement}
}`,
} as const;

export const datasetCatalog = [historicalEngagementDataset] as const;
