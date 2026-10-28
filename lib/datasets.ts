export type DatasetRelease = {
  version: string;
  date: string;
  updated?: string;
  tag: string;
  url: string;
  path: string;
  license: string;
  files: readonly { name: string; label: string; format: string; encodingFormat: string; url: string }[];
  retainedRecords: number;
  includedRecords: number;
  excludedRecords: number;
  fieldCount: number;
  populatedCells?: number;
  notes: { en: string; zh: string };
  citation: string;
  bibtex: string;
};

const trumpDatasetPath = "/data/us-china-engagement/trump-first-administration";

// Published snapshots, newest first. Add a new entry for an update; retain old
// entries and their GitHub assets so version links and citations stay usable.
export const trumpFirstAdministrationReleases: readonly DatasetRelease[] = [
  {
    version: "2.0.0",
    date: "2026-10-23",
    updated: "2026-10-28",
    tag: "us-china-engagement-trump1-v2.0.0",
    url: "https://github.com/LittleTianKong/china79-site/releases/tag/us-china-engagement-trump1-v2.0.0",
    path: `${trumpDatasetPath}/versions/2.0.0`,
    license: "https://creativecommons.org/licenses/by/4.0/",
    retainedRecords: 1500,
    includedRecords: 1500,
    excludedRecords: 0,
    fieldCount: 23,
    populatedCells: 34476,
    notes: {
      en: "Refreshed on October 28, 2026 within the existing 2.0.0 release: 1,500 documented contact records across 23 fields, all included in the total. The records include 19 unresolved contact groups and 7 aggregate records, each counted once; the total does not represent 1,500 separately identifiable meetings. Verification notes and ID history are retained in the workbook. The source Codebook’s working revision label was aligned to public version 2.0.0. No additional version or archive copy was created; version 1.0.0 remains unchanged.",
      zh: "2026年10月28日，在原有2.0.0版本内更新：现含1,500条有公开资料支持的接触记录、23个字段，全部纳入总数。其中19条为分组尚未厘清的接触记录，7条为汇总记录，各计一次；总数并不代表1,500场可单独识别的会晤。工作簿保留核验备注及编号历史。来源编码手册中的工作修订编号已统一为公开版本2.0.0，未增加新版本或历史副本；1.0.0版保持不变。",
    },
    files: [
      { name: "us-china-engagement-data-trump1-v2.0.0.csv", label: "CSV", format: "CSV", encodingFormat: "text/csv", url: "https://github.com/LittleTianKong/china79-site/releases/download/us-china-engagement-trump1-v2.0.0/us-china-engagement-data-trump1-v2.0.0.csv" },
      { name: "us-china-engagement-data-trump1-v2.0.0.xlsx", label: "Excel workbook", format: "XLSX", encodingFormat: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", url: "https://github.com/LittleTianKong/china79-site/releases/download/us-china-engagement-trump1-v2.0.0/us-china-engagement-data-trump1-v2.0.0.xlsx" },
      { name: "us-china-engagement-data-trump1-v2.0.0.zip", label: "Complete package", format: "ZIP", encodingFormat: "application/zip", url: "https://github.com/LittleTianKong/china79-site/releases/download/us-china-engagement-trump1-v2.0.0/us-china-engagement-data-trump1-v2.0.0.zip" },
    ],
    citation: `Rhind-Tutt, Michael C. (2026). U.S.–China Official Contacts: Trump’s First Administration (2017–2021) (Version 2.0.0) [Dataset]. China79 Initiative. https://china79.org${trumpDatasetPath}/versions/2.0.0`,
    bibtex: `@misc{rhindtutt_china79_trump1_v2_0_0,
  author = {Rhind-Tutt, Michael C.},
  title = {{U.S.–China Official Contacts: Trump’s First Administration (2017–2021)}},
  year = {2026},
  version = {2.0.0},
  howpublished = {China79 Initiative},
  note = {Version 2.0.0; dataset; licensed under CC BY 4.0},
  url = {https://china79.org${trumpDatasetPath}/versions/2.0.0}
}`,
  },
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
    fieldCount: 22,
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
  fieldCount: currentTrumpRelease.fieldCount,
  populatedCells: currentTrumpRelease.populatedCells,
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
