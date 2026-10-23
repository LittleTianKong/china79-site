"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { trumpFirstAdministrationDataset as dataset } from "@/lib/datasets";
import styles from "./DatasetArchiveClient.module.css";

const copy = {
  en: {
    back: "Back to the dataset",
    label: "Release archive",
    title: "Every version, kept available.",
    description: "Download a specific published version of this dataset, review its release notes, and use its permanent page when citing it. Previous versions remain accessible when a new version is published.",
    firstRelease: "This is the first published version. Future releases will appear here alongside the earlier versions.",
    version: "Version",
    current: "Current",
    archived: "Archived",
    published: "Published",
    retained: "Records retained",
    included: "Included in counts",
    excluded: "Excluded records",
    view: "View version & citation",
    download: "Download",
    github: "View release on GitHub",
    license: "License",
    releases: "Published versions",
  },
  zh: {
    back: "返回数据集",
    label: "历史版本",
    title: "每个版本，持续可查。",
    description: "下载此数据集的指定已发布版本，查看版本说明，并在引用时使用该版本的永久页面。新版本发布后，先前版本仍可访问。",
    firstRelease: "目前为首个已发布版本。后续版本将在此列出，先前版本也会保留。",
    version: "版本",
    current: "当前版本",
    archived: "历史版本",
    published: "发布日期",
    retained: "保留记录",
    included: "计入统计",
    excluded: "未计入统计",
    view: "查看版本及引文",
    download: "下载",
    github: "在 GitHub 查看此版本",
    license: "许可协议",
    releases: "已发布版本",
  },
} as const;

export default function DatasetArchiveClient() {
  const { language } = useLanguage();
  const t = copy[language];
  const number = new Intl.NumberFormat(language === "zh" ? "zh-CN" : "en-US");

  return (
    <div className={`dataset-detail-page ${styles.page}`}>
      <div className="container dataset-breadcrumb">
        <Link href={dataset.path}><span aria-hidden="true">←</span>{t.back}</Link>
      </div>
      <section className={`container ${styles.intro}`} aria-labelledby="archive-title">
        <div className="kicker">{t.label}</div>
        <h1 id="archive-title">{t.title}</h1>
        <p className={styles.datasetTitle}>{dataset.title[language]}</p>
        <p className={styles.description}>{t.description}</p>
        {dataset.releases.length === 1 && <p className={styles.firstRelease}>{t.firstRelease}</p>}
      </section>
      <section className={`container ${styles.releases}`} aria-label={t.releases}>
        <ol className={styles.list}>
          {dataset.releases.map((release) => {
            const current = release.version === dataset.release.version;
            return (
              <li key={release.version}>
                <article className={styles.card} aria-labelledby={`release-${release.version}`}>
                  <div className={styles.heading}>
                    <h2 id={`release-${release.version}`}><Link href={release.path}>{t.version} {release.version}</Link></h2>
                    <span className={`${styles.badge} ${current ? styles.current : styles.archived}`}>{current ? t.current : t.archived}</span>
                  </div>
                  <p className={styles.meta}>
                    <span>{t.published}: <time dateTime={release.date}>{release.date}</time></span>
                    <span>{t.license}: <a href={release.license}>CC BY 4.0</a></span>
                  </p>
                  <p className={styles.notes}>{release.notes[language]}</p>
                  <dl className={styles.counts}>
                    <div><dt>{t.retained}</dt><dd>{number.format(release.retainedRecords)}</dd></div>
                    <div><dt>{t.included}</dt><dd>{number.format(release.includedRecords)}</dd></div>
                    <div><dt>{t.excluded}</dt><dd>{number.format(release.excludedRecords)}</dd></div>
                  </dl>
                  <div className={styles.actions}>
                    <Link className={styles.permalink} href={release.path}>{t.view}<span aria-hidden="true"> →</span></Link>
                    <div className={styles.files}>
                      {release.files.map((file) => <a key={file.name} href={file.url} aria-label={`${t.download} ${file.format} · ${t.version} ${release.version}`}>{t.download} {file.format}<span aria-hidden="true"> ↓</span></a>)}
                    </div>
                  </div>
                  <a className={styles.github} href={release.url}>{t.github}<span aria-hidden="true"> ↗</span></a>
                </article>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
