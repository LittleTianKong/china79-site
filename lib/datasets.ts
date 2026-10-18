export const trumpFirstAdministrationDataset = {
  slug: "us-china-engagement-trump1",
  path: "/data/us-china-engagement/trump-first-administration",
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
  retainedRecords: 745,
  includedRecords: 719,
  excludedRecords: 26,
  downloads: {
    owner: "LittleTianKong",
    repository: "china79-site",
    tagPrefix: "us-china-engagement-trump1-v",
    assetPrefix: "us-china-engagement-data-trump1-",
  },
  citation: "Rhind-Tutt, Michael C. (2026). U.S.–China Official Contacts: Trump’s First Administration (2017–2021) (Version 1) [Dataset; public release forthcoming]. China79 Initiative. https://china79.org/data/us-china-engagement/trump-first-administration",
  bibtex: `@misc{rhindtutt_china79_trump1,
  author = {Rhind-Tutt, Michael C.},
  title = {{U.S.–China Official Contacts: Trump’s First Administration (2017–2021)}},
  year = {2026},
  version = {1},
  howpublished = {China79 Initiative},
  note = {Version 1; dataset; public release forthcoming},
  url = {https://china79.org/data/us-china-engagement/trump-first-administration}
}`,
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
