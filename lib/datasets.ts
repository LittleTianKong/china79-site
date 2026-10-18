export const historicalEngagementDataset = {
  slug: "us-china-engagement",
  path: "/data/us-china-engagement",
  url: "https://china79-site.vercel.app/data/us-china-engagement",
  author: "Michael C. Rhind-Tutt",
  publisher: "China79 Initiative",
  downloads: {
    owner: "LittleTianKong",
    repository: "china79-site",
    tagPrefix: "us-china-engagement-v",
    assetPrefix: "us-china-engagement-data-",
  },
  title: { en: "U.S.–China historical engagement", zh: "美中历史接触与对话" },
  summary: {
    en: "Our flagship project aims to build the most comprehensive freely accessible dataset of publicly documented official U.S.–China engagements since 1979.",
    zh: "我们的旗舰项目旨在建立最全面、可免费获取的数据集，收录1979年以来有公开记录的美中官方接触。",
  },
  citation: "Rhind-Tutt, Michael C. (n.d.). U.S.–China historical engagement [Dataset in development]. China79 Initiative. https://china79-site.vercel.app/data/us-china-engagement",
  bibtex: `@misc{rhindtutt_china79_engagement,
  author = {Rhind-Tutt, Michael C.},
  title = {{U.S.–China} historical engagement},
  howpublished = {China79 Initiative},
  note = {Dataset in development},
  url = {https://china79-site.vercel.app/data/us-china-engagement}
}`,
} as const;

export const datasetCatalog = [historicalEngagementDataset] as const;
