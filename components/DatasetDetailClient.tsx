"use client";

import Link from "next/link";
import DatasetCover from "@/components/DatasetCover";
import DatasetCitation from "@/components/DatasetCitation";
import { useLanguage } from "@/components/LanguageProvider";
import { historicalEngagementDataset as dataset } from "@/lib/datasets";
import { dataCopy } from "@/lib/initiative";

const copy = {
  en: {
    back: "All datasets", flagship: "Flagship dataset", period: "Since 1979",
    author: "Created by", publisher: "Published by",
    coverage: "Historical scope", coverageValue: "From 1979",
    source: "Source basis", sourceValue: "Publicly documented records",
    access: "Planned access", accessValue: "Freely accessible",
    cite: "Cite this dataset", request: "Ask about access",
    availability: "This dataset is in development. Data files and release documentation are not yet available to download.",
    overview: "About the dataset",
    overviewTitle: "A record of engagement across changing times.",
    overviewText: "The project documents official engagement between the United States and China, including periods of cooperation, competition, and crisis. It is being developed to support comparisons across historical periods, policy areas, and U.S. administrations.",
    documentation: "With each release", documentationTitle: "The evidence behind the data.",
    documentationText: "Sources, inclusion criteria, coding decisions, and known limitations will accompany the data. Release-specific coverage and version information will make it clear what each file contains.",
    questions: "Questions this dataset can support",
    contactTitle: "Have a source or a question?",
    contactText: "We welcome source suggestions, corrections, and inquiries about the dataset.",
    contactAction: "Contact China79",
  },
  zh: {
    back: "所有数据集", flagship: "旗舰数据集", period: "1979年以来",
    author: "作者", publisher: "发布机构",
    coverage: "历史范围", coverageValue: "始于1979年",
    source: "来源基础", sourceValue: "有公开记录的资料",
    access: "计划获取方式", accessValue: "免费获取",
    cite: "引用此数据集", request: "咨询获取方式",
    availability: "本数据集仍在开发中，数据文件及发布文档尚未开放下载。",
    overview: "关于数据集", overviewTitle: "记录不断变化的两国交往。",
    overviewText: "本项目记录美国与中国的官方接触，涵盖合作、竞争与危机等不同时期，旨在支持跨历史时期、政策领域及美国政府的比较研究。",
    documentation: "随每次发布提供", documentationTitle: "让数据背后的证据可供查验。",
    documentationText: "我们将在数据发布时说明资料来源、收录标准、编码规则及已知局限，并明确每次发布的覆盖范围与版本信息。",
    questions: "数据集可以支持的研究问题",
    contactTitle: "有资料来源或问题想分享？", contactText: "我们欢迎来源建议、资料更正及关于数据集的咨询。", contactAction: "联系 China79",
  },
};

export default function DatasetDetailClient() {
  const { language } = useLanguage();
  const t = copy[language];
  const data = dataCopy[language];
  return (
    <div className="dataset-detail-page">
      <div className="container dataset-breadcrumb"><Link href="/data"><span aria-hidden="true">←</span>{t.back}</Link></div>
      <section className="container dataset-detail-hero" aria-labelledby="dataset-title">
        <div className="dataset-detail-copy">
          <div className="dataset-feature-labels"><span className="kicker">{t.flagship}</span><span className="release-status">{data.status}</span></div>
          <h1 id="dataset-title">{dataset.title[language]}</h1>
          <p className="dataset-summary">{dataset.summary[language]}</p>
          <div className="dataset-attribution">
            <div><span>{t.author}</span><strong>{dataset.author}</strong></div>
            <div><span>{t.publisher}</span><strong>{dataset.publisher}</strong></div>
          </div>
          <dl className="dataset-facts">
            <div><dt>{t.coverage}</dt><dd>{t.coverageValue}</dd></div>
            <div><dt>{t.source}</dt><dd>{t.sourceValue}</dd></div>
            <div><dt>{t.access}</dt><dd>{t.accessValue}</dd></div>
          </dl>
          <div className="dataset-feature-actions">
            <a className="primary-link" href="#citation">{t.cite}<span aria-hidden="true">↓</span></a>
            <a className="text-link" href="mailto:contact@china79.org">{t.request}<span aria-hidden="true">↗</span></a>
          </div>
          <p className="dataset-release-note">{t.availability}</p>
        </div>
        <div className="dataset-detail-cover"><DatasetCover title={dataset.title[language]} seriesLabel={t.flagship} periodLabel={t.period} /></div>
      </section>
      <section className="container dataset-detail-overview">
        <article><div className="kicker">{t.overview}</div><h2>{t.overviewTitle}</h2><p>{t.overviewText}</p></article>
        <article><div className="kicker">{t.documentation}</div><h2>{t.documentationTitle}</h2><p>{t.documentationText}</p></article>
      </section>
      <section className="container dataset-detail-questions" aria-labelledby="dataset-questions-title">
        <h2 id="dataset-questions-title">{t.questions}</h2>
        <ol>{data.questions.map((question) => <li key={question}>{question}</li>)}</ol>
      </section>
      <div className="container"><DatasetCitation citation={dataset.citation} bibtex={dataset.bibtex} /></div>
      <section className="container dataset-contact-banner">
        <div><h2>{t.contactTitle}</h2><p>{t.contactText}</p></div>
        <a className="text-link" href="mailto:contact@china79.org">{t.contactAction}<span aria-hidden="true">↗</span></a>
      </section>
    </div>
  );
}
