"use client";

import Link from "next/link";
import DatasetCover from "@/components/DatasetCover";
import DatasetCitation from "@/components/DatasetCitation";
import DatasetDownloads from "@/components/DatasetDownloads";
import { useLanguage } from "@/components/LanguageProvider";
import { trumpFirstAdministrationDataset as dataset, type DatasetRelease } from "@/lib/datasets";
import styles from "./DatasetMemberClient.module.css";

const copy = {
  en: {
    back: "Back to the flagship series",
    series: "Dataset 01 of 08",
    coverSeries: "Dataset 01 · Flagship Series",
    coverPeriod: "Trump I · 2017–2021",
    status: "Available now",
    author: "Created by",
    publisher: "Published by",
    coverage: "Coverage dates",
    start: "Jan 20, 2017",
    end: "Jan 20, 2021",
    retained: "Records retained",
    included: "Included in counts",
    records: "Records",
    fields: "Data fields",
    cells: "Populated data cells",
    allIncluded: "All records are included in the default count.",
    cite: "Cite this dataset",
    downloads: "Downloads",
    downloadData: "Download data",
    history: "Version archive",
    archived: "Archived version",
    versionPage: "Permanent version page",
    latest: "View the latest dataset",
    archiveNote: "This page preserves the files, record counts, and citation for this release.",
    version: "Release version",
    released: "Published",
    updated: "Files updated",
    license: "License",
    availability: "Download the CSV, Excel workbook, or complete release package below. The dataset is available under CC BY 4.0.",
    countingTitle: "What the counts mean.",
    countingNote: "Rows can be excluded from counts because of grouping, date eligibility, or duplicate handling. Exclusion does not, by itself, mean that no contact took place.",
    scopeLabel: "Scope & coverage",
    scopeTitle: "One administration in focus.",
    scopeText: "The catalogue covers publicly documented official contacts and proceedings from January 20, 2017 through January 20, 2021. It spans executive agencies, congressional offices and staff, military, consular, technical, and other public institutions. This is a curated catalogue, not an exhaustive census of every official contact.",
    evidenceLabel: "Reading the evidence",
    evidenceTitle: "Context matters.",
    evidenceText: "Dates can be uncertain or expressed as bounds. Read date fields alongside status, sources, and notes. Topic & Context Tags describe context; they do not, on their own, prove which subjects were discussed. Consult Topic Evidence and the codebook when assessing those claims.",
    citationNote: "Cite the exact version used in your work. This citation links to its permanent version page.",
  },
  zh: {
    back: "返回旗舰系列",
    series: "第01个数据集 · 共08个",
    coverSeries: "数据集01 · 旗舰系列",
    coverPeriod: "特朗普第一届政府 · 2017—2021",
    status: "现已发布",
    author: "作者",
    publisher: "发布机构",
    coverage: "覆盖日期",
    start: "2017年1月20日",
    end: "2021年1月20日",
    retained: "保留记录",
    included: "计入统计",
    records: "记录",
    fields: "数据字段",
    cells: "已填数据单元格",
    allIncluded: "所有记录均计入默认统计。",
    cite: "引用此数据集",
    downloads: "下载",
    downloadData: "下载数据",
    history: "历史版本",
    archived: "历史版本",
    versionPage: "版本永久页面",
    latest: "查看最新数据集",
    archiveNote: "本页面保留此版本的文件、记录数量及引用格式。",
    version: "发布版本",
    released: "发布日期",
    updated: "文件更新日期",
    license: "许可协议",
    availability: "您可以在下方下载 CSV、Excel 工作簿或完整发布包。本数据集采用 CC BY 4.0 许可协议。",
    countingTitle: "如何理解这些数字。",
    countingNote: "因分组、日期是否符合范围或重复记录等原因，部分行未计入统计。未计入统计本身并不意味着相关接触没有发生。",
    scopeLabel: "范围与覆盖",
    scopeTitle: "聚焦一届美国政府。",
    scopeText: "本目录收录2017年1月20日至2021年1月20日期间有公开记录的官方接触与相关活动，涉及行政部门、国会办公室及工作人员、军方、领事机构、技术机构及其他公共机构。这是一份经过整理的目录，并非对所有官方接触的穷尽性普查。",
    evidenceLabel: "如何阅读证据",
    evidenceTitle: "结合背景理解记录。",
    evidenceText: "日期可能存在不确定性或以范围表示。请结合状态、来源及备注阅读日期字段。“Topic & Context Tags”提供背景，不能单独证明会谈讨论了相关主题；判断时应参照“Topic Evidence”和编码手册。",
    citationNote: "请引用研究中实际使用的版本。以下引文链接至该版本的永久页面。",
  },
};

export default function DatasetMemberClient({ release = dataset.release, versionPage = false }: { release?: DatasetRelease; versionPage?: boolean }) {
  const { language } = useLanguage();
  const t = copy[language];
  const number = new Intl.NumberFormat(language === "zh" ? "zh-CN" : "en-US");
  const archived = release.version !== dataset.release.version;
  const allIncluded = release.retainedRecords === release.includedRecords && release.excludedRecords === 0;

  return (
    <div className={`dataset-detail-page ${styles.page}`}>
      <div className="container dataset-breadcrumb">
        <Link href="/data/us-china-engagement"><span aria-hidden="true">←</span>{t.back}</Link>
      </div>
      {versionPage && <aside className={`container ${styles.versionNotice}`} aria-label={t.versionPage}>
        <div><strong>{archived ? t.archived : t.versionPage} · {release.version}</strong><p>{t.archiveNote}</p><p>{release.notes[language]}</p></div>
        <Link className="text-link" href={dataset.path}>{t.latest}<span aria-hidden="true"> →</span></Link>
      </aside>}
      <section className="container dataset-detail-hero" aria-labelledby="dataset-title">
        <div className="dataset-detail-copy">
          <div className="dataset-feature-labels">
            <span className="kicker">{t.series}</span>
            <span className="release-status">{archived ? t.archived : t.status}</span>
          </div>
          <h1 className={styles.title} id="dataset-title">{dataset.title[language]}</h1>
          <p className="dataset-summary">{dataset.summary[language]}</p>
          <div className="dataset-attribution">
            <div><span>{t.author}</span><strong>{dataset.author}</strong></div>
            <div><span>{t.publisher}</span><strong>{dataset.publisher}</strong></div>
          </div>
          <dl className={`dataset-facts ${styles.facts}`}>
            <div>
              <dt>{t.coverage}</dt>
              <dd className={styles.dates}>
                <time dateTime="2017-01-20">{t.start}</time>
                <span aria-hidden="true">—</span>
                <time dateTime="2021-01-20">{t.end}</time>
              </dd>
            </div>
            <div><dt>{allIncluded ? t.records : t.retained}</dt><dd><strong className={styles.number}>{number.format(release.retainedRecords)}</strong></dd></div>
            <div><dt>{allIncluded ? release.populatedCells !== undefined ? t.cells : t.fields : t.included}</dt><dd><strong className={styles.number}>{number.format(allIncluded ? release.populatedCells ?? release.fieldCount : release.includedRecords)}</strong></dd></div>
          </dl>
          {allIncluded && <p className={styles.inclusionNote}>{t.allIncluded}</p>}
          <dl className="dataset-facts">
            <div><dt>{t.version}</dt><dd>{release.version}</dd></div>
            <div><dt>{t.released}</dt><dd><time dateTime={release.date}>{release.date}</time></dd></div>
            {release.updated && <div><dt>{t.updated}</dt><dd><time dateTime={release.updated}>{release.updated}</time></dd></div>}
            <div><dt>{t.license}</dt><dd><a href={release.license}>CC BY 4.0</a></dd></div>
          </dl>
          <div className="dataset-feature-actions">
            <a className="primary-link" href="#downloads">{t.downloadData}<span aria-hidden="true">↓</span></a>
            <a className="text-link" href="#citation">{t.cite}<span aria-hidden="true">↓</span></a>
            <Link className="text-link" href={`${dataset.path}/versions`}>{t.history}<span aria-hidden="true">→</span></Link>
          </div>
          <p className="dataset-release-note">{t.availability}</p>
        </div>
        <div className="dataset-detail-cover">
          <DatasetCover title={dataset.shortTitle[language]} seriesLabel={t.coverSeries} periodLabel={t.coverPeriod} />
        </div>
      </section>

      {!allIncluded && <section className={`container ${styles.countingNote}`} aria-labelledby="counting-note-title">
        <h2 id="counting-note-title">{t.countingTitle}</h2>
        <div>
          <p>{language === "zh" ? <>
            本目录共保留 <strong>{number.format(release.retainedRecords)}</strong> 行记录。其中 <strong>{number.format(release.includedRecords)}</strong> 行的“Counting Status”为“Include”，计入统计；另有 <strong>{number.format(release.excludedRecords)}</strong> 行未计入统计，但仍保留供查验。
          </> : <>
            The catalogue retains <strong>{number.format(release.retainedRecords)}</strong> rows: <strong>{number.format(release.includedRecords)}</strong> marked “Include” in Counting Status, plus <strong>{number.format(release.excludedRecords)}</strong> excluded rows kept for transparency.
          </>}</p>
          <p>{t.countingNote}</p>
        </div>
      </section>}

      <section className="container dataset-detail-overview" aria-label={language === "zh" ? "数据集范围与阅读说明" : "Dataset scope and reading guidance"}>
        <article><div className="kicker">{t.scopeLabel}</div><h2>{t.scopeTitle}</h2><p>{t.scopeText}</p></article>
        <article><div className="kicker">{t.evidenceLabel}</div><h2>{t.evidenceTitle}</h2><p>{t.evidenceText}</p></article>
      </section>
      <div className="container">
        <DatasetDownloads slug={dataset.slug} release={release} />
        <DatasetCitation citation={release.citation} bibtex={release.bibtex} description={t.citationNote} />
      </div>
    </div>
  );
}
