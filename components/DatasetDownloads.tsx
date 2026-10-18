"use client";

import { useEffect, useId, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import type { DatasetDownloadStats } from "@/lib/dataset-downloads";
import styles from "./DatasetDownloads.module.css";

const copy = {
  en: {
    label: "Releases & downloads", title: "Follow the data.", total: "File downloads", loading: "Loading download statistics…",
    forthcoming: "Downloads open with the first release.", forthcomingText: "Data files and their download totals will appear here when the dataset is published.",
    seriesForthcomingText: "Data files and download totals will appear here as datasets in the series are released.",
    seriesSummary: "Across all published files in the series", release: "Release",
    currentRelease: "Download release", currentReleaseLink: "View this release on GitHub", refreshing: "Download counts are updating.",
    refreshingText: "The released files are available above. Counts will appear after the next statistics refresh.",
    unavailable: "Download statistics are temporarily unavailable.", retry: "Try again", releases: "View releases on GitHub",
    method: "How downloads are counted", explanation: "Totals come from GitHub’s counters for the published dataset files listed here. Repeat and automated downloads can be included. These are file-download counts, not unique people or confirmation that a file was saved. Totals refresh periodically.",
    file: "Dataset file", version: "Version", downloads: "Downloads", download: "Download", summary: "Across published dataset files", pending: "Download totals available after release",
  },
  zh: {
    label: "版本与下载", title: "追踪数据的使用。", total: "文件下载次数", loading: "正在加载下载统计…",
    forthcoming: "首次发布后开放下载。", forthcomingText: "数据集发布后，此处将显示数据文件及其下载次数。",
    seriesForthcomingText: "随着本系列中的数据集逐步发布，此处将显示数据文件及其下载次数。",
    seriesSummary: "本系列所有已发布文件的合计", release: "发布版本",
    currentRelease: "下载版本", currentReleaseLink: "在 GitHub 查看此版本", refreshing: "下载统计正在更新。",
    refreshingText: "您可以通过上方链接下载已发布文件。统计将在下次刷新后显示。",
    unavailable: "下载统计暂时无法获取。", retry: "重试", releases: "在 GitHub 查看发布版本",
    method: "下载次数如何统计", explanation: "统计来自 GitHub 对此处列出的已发布数据文件的下载计数，可能包含重复下载及自动化下载。这是文件下载次数，不代表独立用户人数，也不能确认文件已保存。统计会定期更新。",
    file: "数据文件", version: "版本", downloads: "下载次数", download: "下载", summary: "所有已发布数据文件的合计", pending: "发布后将显示下载统计",
  },
};

type DatasetRelease = {
  version: string;
  date: string;
  url: string;
  license: string;
  files: readonly { name: string; label: string; format: string; encodingFormat: string; url: string }[];
};

export default function DatasetDownloads({ slug, compact = false, kind = "dataset", release, releaseTitle }: {
  slug: string;
  compact?: boolean;
  kind?: "dataset" | "series";
  release?: DatasetRelease;
  releaseTitle?: string;
}) {
  const { language } = useLanguage();
  const [stats, setStats] = useState<DatasetDownloadStats | null>(null);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  const titleId = useId();
  const t = copy[language];
  const number = new Intl.NumberFormat(language === "zh" ? "zh-CN" : "en-US");
  const hasCurrentFiles = release?.files.every((file) => stats?.files.some((counted) => counted.name === file.name)) ?? false;

  useEffect(() => {
    const controller = new AbortController();
    setFailed(false);
    setStats(null);
    fetch(`/api/downloads/${encodeURIComponent(slug)}`, { cache: "no-store", signal: AbortSignal.any([controller.signal, AbortSignal.timeout(12000)]) })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unavailable");
        const data = await response.json();
        if (!["available", "unreleased"].includes(data.status) || !Array.isArray(data.files)) throw new Error("Invalid statistics");
        if (!controller.signal.aborted) setStats(data);
      })
      .catch(() => { if (!controller.signal.aborted) setFailed(true); });
    return () => controller.abort();
  }, [slug, retry]);

  if (compact) return <div className={styles.compact}>
    <svg width="16" height="18" viewBox="0 0 20 22" fill="none" aria-hidden="true"><path d="M10 2v11m-4-4 4 4 4-4M3 15v4h14v-4" stroke="currentColor" strokeWidth="1.5" /></svg>
    <span>{failed ? t.unavailable : !stats ? t.loading : stats.total === null ? release ? t.refreshing : t.pending : `${number.format(stats.total)} ${t.downloads.toLowerCase()}`}</span>
  </div>;

  return <section className={styles.panel} id="downloads" aria-labelledby={titleId}>
    <div className={styles.heading}><div><div className="kicker">{t.label}</div><h2 id={titleId}>{t.title}</h2></div>{stats?.total !== null && stats?.total !== undefined && <div className={styles.total}><strong>{number.format(stats.total)}</strong><span>{t.total}</span></div>}</div>
    {release && !hasCurrentFiles && <div className={styles.empty}>
      <div>
        <h3>{t.currentRelease} {release.version}</h3>
        {releaseTitle && <p>{releaseTitle}</p>}
        <p><time dateTime={release.date}>{release.date}</time> · <a href={release.license}>CC BY 4.0</a></p>
        <div className="dataset-feature-actions">{release.files.map((file) => <a className={styles.releaseLink} key={file.name} href={file.url} aria-label={`${t.download}: ${file.label}`}>{t.download} {file.format}<span aria-hidden="true"> ↓</span></a>)}</div>
        <a className={styles.releaseLink} href={release.url}>{t.currentReleaseLink}<span aria-hidden="true"> ↗</span></a>
      </div>
    </div>}
    {failed ? <div className={styles.notice} role="status"><p>{t.unavailable}</p><button type="button" onClick={() => setRetry((value) => value + 1)}>{t.retry} →</button></div> : !stats ? <p className={styles.notice} role="status">{t.loading}</p> : stats.status === "unreleased" ? <div className={styles.empty}>
      <div className={styles.icon} aria-hidden="true"><svg width="28" height="30" viewBox="0 0 20 22" fill="none"><path d="M10 2v11m-4-4 4 4 4-4M3 15v4h14v-4" stroke="currentColor" strokeWidth="1.2" /></svg></div><div><h3>{release ? t.refreshing : t.forthcoming}</h3><p>{release ? t.refreshingText : kind === "series" ? t.seriesForthcomingText : t.forthcomingText}</p></div>
    </div> : <>
      <p className={styles.caption}>{kind === "series" ? t.seriesSummary : t.summary}</p>
      <div className={styles.tableWrap}><table><caption className={styles.visuallyHidden}>{t.label}</caption><thead><tr><th scope="col">{t.file}</th><th scope="col">{kind === "series" ? t.release : t.version}</th><th scope="col">{t.downloads}</th><th scope="col"><span className={styles.visuallyHidden}>{t.download}</span></th></tr></thead><tbody>{stats.files.map((file) => <tr key={file.id}><th scope="row"><span className={styles.format}>{file.format}</span><span className={styles.filename}>{file.name}</span></th><td>{file.version}</td><td className={styles.count}>{number.format(file.count)}</td><td><a href={file.url} aria-label={`${t.download}: ${file.name}`}>{t.download}<span aria-hidden="true"> ↓</span></a></td></tr>)}</tbody></table></div>
      <a className={styles.releaseLink} href={stats.releasesUrl}>{t.releases} ↗</a>
    </>}
    <details className={styles.method}><summary>{t.method}</summary><p>{t.explanation}</p></details>
  </section>;
}
