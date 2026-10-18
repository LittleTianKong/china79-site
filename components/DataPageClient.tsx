"use client";

import Link from "next/link";
import DatasetCover from "@/components/DatasetCover";
import DatasetDownloads from "@/components/DatasetDownloads";
import { useLanguage } from "@/components/LanguageProvider";
import { datasetCatalog } from "@/lib/datasets";
import { dataCopy } from "@/lib/initiative";
import seriesStyles from "./DatasetSeries.module.css";

const copy = {
  en: {
    titleLead: "U.S.–China relations,", titleEnd: "in data.",
    intro: "Historical evidence, organized for discovery. Our flagship series brings together one released dataset and seven planned datasets on official U.S.–China engagement.",
    navigation: "Explore our data", collection: "Flagship Series", principles: "Publishing principles", citation: "Cite the series",
    flagship: "Flagship Series", period: "Since 1979", datasets: "datasets",
    author: "Created by", publisher: "Published by",
    coverage: "Historical scope", coverageValue: "From 1979",
    size: "Series size",
    access: "Series progress", accessValue: "1 released · 7 planned",
    view: "View series", cite: "Cite this series",
    release: "The first dataset includes release files and documentation. Further datasets will be added as they are prepared for publication.",
    principlesTitle: "Built to be used. Documented to be checked.",
    contactTitle: "Help build a better record.",
    contactText: "For dataset requests, source suggestions, or questions about access, contact China79.",
    contactAction: "Get in touch",
    first: "First in the series", forthcoming: "Available now",
  },
  zh: {
    titleLead: "用数据，", titleEnd: "理解美中关系。",
    intro: "让历史证据更便于发现和使用。我们的旗舰系列包含1个已发布的数据集及7个规划中的数据集，共同记录美中官方接触。",
    navigation: "探索数据", collection: "旗舰系列", principles: "发布原则", citation: "引用本系列",
    flagship: "旗舰系列", period: "1979年以来", datasets: "个数据集",
    author: "作者", publisher: "发布机构",
    coverage: "历史范围", coverageValue: "始于1979年",
    size: "系列规模",
    access: "系列进度", accessValue: "已发布1个 · 规划中7个",
    view: "查看系列", cite: "引用本系列",
    release: "首个数据集已提供发布文件与说明文档。后续数据集将在准备就绪后逐一发布。",
    principlesTitle: "便于使用，也经得起检验。",
    contactTitle: "共同完善历史记录。",
    contactText: "如需申请数据集、推荐来源或咨询获取方式，欢迎联系 China79。",
    contactAction: "联系我们",
    first: "系列首个数据集", forthcoming: "现已发布",
  },
};

export default function DataPageClient() {
  const { language } = useLanguage();
  const t = copy[language];
  const data = dataCopy[language];
  return (
    <div className="data-catalog-page">
      <header className="container data-catalog-header">
        <div>
          <div className="eyebrow">{data.label}</div>
          <h1>{t.titleLead}<br />{t.titleEnd}</h1>
        </div>
        <p>{t.intro}</p>
      </header>

      <nav className="container data-catalog-navigation" aria-label={t.navigation}>
        <a href="#dataset-collection">{t.collection}</a>
        <a href="#publishing-principles">{t.principles}</a>
        <Link href={datasetCatalog[0].path + "#citation"}>{t.citation}<span aria-hidden="true">↗</span></Link>
      </nav>

      <section className="container dataset-catalog" id="dataset-collection" aria-label={t.collection}>
        {datasetCatalog.map((dataset) => (
          <article className="dataset-feature" key={dataset.slug}>
            <Link className={`dataset-feature-cover ${seriesStyles.catalogCover}`} href={dataset.path} aria-label={t.view + ": " + dataset.title[language]}>
              <DatasetCover title={dataset.title[language]} seriesLabel={t.flagship} periodLabel={`${dataset.datasetCount} ${t.datasets} · ${t.period}`} />
            </Link>
            <div className="dataset-feature-body">
              <div className="dataset-feature-labels">
                <span className="kicker">{t.flagship}</span>
                <span className="release-status">{data.status}</span>
              </div>
              <h2><Link href={dataset.path}>{dataset.title[language]}</Link></h2>
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
                <Link className="primary-link" href={dataset.path}>{t.view}<span aria-hidden="true">→</span></Link>
                <Link className="text-link" href={dataset.path + "#citation"}>{t.cite}<span aria-hidden="true">↗</span></Link>
              </div>
              <p className="dataset-release-note">{t.release}</p>
              <div className={seriesStyles.teaser}><span>{t.first} · {t.forthcoming}</span><Link href={dataset.members[0].path}>{dataset.members[0].title[language]}<span aria-hidden="true"> ↗</span></Link></div>
              <DatasetDownloads slug={dataset.slug} compact kind={dataset.kind} release={dataset.members[0].release} />
            </div>
          </article>
        ))}
      </section>

      <section className="container dataset-principles" id="publishing-principles" aria-labelledby="dataset-principles-title">
        <div className="kicker">{data.standardsLabel}</div>
        <h2 id="dataset-principles-title">{t.principlesTitle}</h2>
        <div className="dataset-principles-grid">
          {data.standards.map((standard, index) => (
            <article key={standard.title}>
              <span className="dataset-principle-number" aria-hidden="true">0{index + 1}</span>
              <h3>{standard.title}</h3>
              <p>{standard.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container dataset-contact-banner">
        <div><h2>{t.contactTitle}</h2><p>{t.contactText}</p></div>
        <a className="text-link" href="mailto:contact@china79.org">{t.contactAction}<span aria-hidden="true">↗</span></a>
      </section>
    </div>
  );
}
