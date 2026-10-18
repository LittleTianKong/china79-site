"use client";

import Link from "next/link";
import DatasetCover from "@/components/DatasetCover";
import DatasetCitation from "@/components/DatasetCitation";
import DatasetDownloads from "@/components/DatasetDownloads";
import { useLanguage } from "@/components/LanguageProvider";
import { historicalEngagementDataset as dataset } from "@/lib/datasets";
import { dataCopy } from "@/lib/initiative";
import styles from "./DatasetSeries.module.css";

const copy = {
  en: {
    back: "All data", flagship: "Flagship Series", period: "Since 1979", datasets: "datasets",
    author: "Created by", publisher: "Published by",
    coverage: "Historical scope", coverageValue: "From 1979",
    size: "Series size",
    access: "Planned access", accessValue: "Freely accessible",
    cite: "Cite this series", request: "Ask about access", downloads: "Downloads",
    availability: "Eight datasets are planned for this series. Releases will be published individually; data files are not yet available on this site.",
    overview: "About the series",
    overviewTitle: "Eight datasets. One historical record.",
    overviewText: "The series documents official engagement between the United States and China, including periods of cooperation, competition, and crisis. Together, the datasets are being developed to support comparisons across historical periods, policy areas, and U.S. administrations.",
    documentation: "With each release", documentationTitle: "The evidence behind the data.",
    documentationText: "Each dataset will have its own scope, source documentation, inclusion criteria, coding decisions, and known limitations. Version and release details will make it clear what each file contains.",
    questions: "Questions this series can support",
    contactTitle: "Have a source or a question?",
    contactText: "We welcome source suggestions, corrections, and inquiries about the series or its individual datasets.",
    contactAction: "Contact China79",
    members: "Inside the series", membersTitle: "Eight datasets. Published individually.",
    first: "Dataset 01 of 08", forthcoming: "First release forthcoming", explore: "Explore dataset", memberCitation: "Cite this dataset",
    retained: "Records retained", included: "Default included count", periodLabel: "Coverage period", periodValue: "2017–2021",
    remaining: "Seven further datasets are planned. Their titles, scopes, and release details will be added as they are prepared for publication.",
  },
  zh: {
    back: "所有数据", flagship: "旗舰系列", period: "1979年以来", datasets: "个数据集",
    author: "作者", publisher: "发布机构",
    coverage: "历史范围", coverageValue: "始于1979年",
    size: "系列规模",
    access: "计划获取方式", accessValue: "免费获取",
    cite: "引用本系列", request: "咨询获取方式", downloads: "下载",
    availability: "本系列计划收录8个数据集，并将逐一发布。目前本站尚未开放数据文件下载。",
    overview: "关于本系列", overviewTitle: "八个数据集，共同记录两国交往。",
    overviewText: "本系列记录美国与中国的官方接触，涵盖合作、竞争与危机等不同时期。这些数据集旨在共同支持跨历史时期、政策领域及美国政府的比较研究。",
    documentation: "随每次发布提供", documentationTitle: "让数据背后的证据可供查验。",
    documentationText: "每个数据集都将说明各自的覆盖范围、资料来源、收录标准、编码规则及已知局限，并提供版本与发布信息，明确各文件的具体内容。",
    questions: "本系列可以支持的研究问题",
    contactTitle: "有资料来源或问题想分享？", contactText: "我们欢迎来源建议、资料更正及关于本系列或其中各数据集的咨询。", contactAction: "联系 China79",
    members: "系列内容", membersTitle: "八个数据集，逐一发布。",
    first: "第01个数据集，共08个", forthcoming: "首次发布筹备中", explore: "了解数据集", memberCitation: "引用此数据集",
    retained: "保留记录数", included: "默认纳入计数", periodLabel: "覆盖时期", periodValue: "2017—2021年",
    remaining: "另有7个数据集正在规划中。随着各数据集准备发布，我们将补充其名称、覆盖范围及版本信息。",
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
            <div><dt>{t.size}</dt><dd>{dataset.datasetCount} {t.datasets}</dd></div>
            <div><dt>{t.access}</dt><dd>{t.accessValue}</dd></div>
          </dl>
          <div className="dataset-feature-actions">
            <a className="primary-link" href="#citation">{t.cite}<span aria-hidden="true">↓</span></a>
            <a className="text-link" href="#downloads">{t.downloads}<span aria-hidden="true">↓</span></a>
            <a className="text-link" href="mailto:contact@china79.org">{t.request}<span aria-hidden="true">↗</span></a>
          </div>
          <p className="dataset-release-note">{t.availability}</p>
        </div>
        <div className="dataset-detail-cover"><DatasetCover title={dataset.title[language]} seriesLabel={t.flagship} periodLabel={`${dataset.datasetCount} ${t.datasets} · ${t.period}`} /></div>
      </section>
      <section className="container dataset-detail-overview">
        <article><div className="kicker">{t.overview}</div><h2>{t.overviewTitle}</h2><p>{t.overviewText}</p></article>
        <article><div className="kicker">{t.documentation}</div><h2>{t.documentationTitle}</h2><p>{t.documentationText}</p></article>
      </section>
      <section className={`container ${styles.members}`} aria-labelledby="series-members-title">
        <div className="kicker">{t.members}</div><h2 id="series-members-title">{t.membersTitle}</h2>
        {dataset.members.map((member) => <article className={styles.card} key={member.slug}>
          <Link className={styles.cover} href={member.path} aria-label={`${t.explore}: ${member.title[language]}`}><DatasetCover title={member.shortTitle[language]} seriesLabel={t.first} periodLabel={language === "zh" ? "特朗普第一届政府 · 2017—2021年" : "Trump I · 2017–2021"} /></Link>
          <div><div className="dataset-feature-labels"><span className="kicker">{t.first}</span><span className="release-status">{t.forthcoming}</span></div><h3><Link href={member.path}>{member.title[language]}</Link></h3><p>{member.summary[language]}</p>
            <dl className="dataset-facts"><div><dt>{t.periodLabel}</dt><dd>{t.periodValue}</dd></div><div><dt>{t.retained}</dt><dd>{member.retainedRecords}</dd></div><div><dt>{t.included}</dt><dd>{member.includedRecords}</dd></div></dl>
            <div className="dataset-feature-actions"><Link className="primary-link" href={member.path}>{t.explore}<span aria-hidden="true">→</span></Link><Link className="text-link" href={member.path + "#citation"}>{t.memberCitation}<span aria-hidden="true">↗</span></Link></div>
          </div>
        </article>)}
        <p className={styles.remaining}>{t.remaining}</p>
      </section>
      <section className="container dataset-detail-questions" aria-labelledby="dataset-questions-title">
        <h2 id="dataset-questions-title">{t.questions}</h2>
        <ol>{data.questions.map((question) => <li key={question}>{question}</li>)}</ol>
      </section>
      <div className="container"><DatasetDownloads slug={dataset.slug} kind={dataset.kind} /><DatasetCitation citation={dataset.citation} bibtex={dataset.bibtex} kind={dataset.kind} /></div>
      <section className="container dataset-contact-banner">
        <div><h2>{t.contactTitle}</h2><p>{t.contactText}</p></div>
        <a className="text-link" href="mailto:contact@china79.org">{t.contactAction}<span aria-hidden="true">↗</span></a>
      </section>
    </div>
  );
}
