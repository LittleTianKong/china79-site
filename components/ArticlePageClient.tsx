"use client";

import Link from "next/link";
import type { Article } from "@/lib/content";
import { useLanguage } from "@/components/LanguageProvider";

const copy = {
  en: {
    back: "All research",
    status: "In development",
    forthcoming: "Forthcoming analysis",
    noticeTitle: "Research takes time. Evidence comes first.",
    notice:
      "This page introduces a topic currently being developed by China79. The full analysis, sources, and any supporting material will be published here when the work is ready.",
    note:
      "Have a source, a question, or research to contribute? We welcome suggestions as this work develops.",
    explore: "Explore our research",
    contact: "Contact China79",
  },
  zh: {
    back: "所有研究",
    status: "研究中",
    forthcoming: "即将推出的分析",
    noticeTitle: "研究需要时间，证据始终优先。",
    notice:
      "本页介绍 China79 正在研究的一个议题。研究完成后，我们将在此发布完整分析、资料来源及相关研究材料。",
    note:
      "您是否有相关资料、问题或希望分享的研究？我们欢迎在研究过程中提供意见与建议。",
    explore: "探索我们的研究",
    contact: "联系 China79",
  },
} as const;

export default function ArticlePageClient({
  article,
}: {
  article: Article;
}) {
  const { language } = useLanguage();
  const t = copy[language];
  const isInDevelopment = article.status === "in-development";

  const section =
    language === "zh" ? article.sectionZh : article.section;

  const title =
    language === "zh" ? article.titleZh : article.title;

  const dek =
    language === "zh" ? article.dekZh : article.dek;

  const date =
    language === "zh" ? article.dateZh : article.date;

  const readTime =
    language === "zh" ? article.readTimeZh : article.readTime;

  const author =
    language === "zh" ? article.authorZh : article.author;

  const body =
    language === "zh" ? article.bodyZh : article.body;

  const byline =
    language === "zh"
      ? `作者：${author} · ${date} · ${readTime}`
      : `By ${author} · ${date} · ${readTime}`;

  return (
    <article className="container research-detail-page">
      <div className="research-detail-breadcrumb">
        <Link href="/analysis">
          <span aria-hidden="true">←</span> {t.back}
        </Link>
      </div>
      <header className="research-detail-header">
        <div className="research-detail-labels">
          <div className="eyebrow">{section}</div>
          {isInDevelopment && (
            <span className="release-status">{t.status}</span>
          )}
        </div>
        <h1>{title}</h1>
        <p className="research-detail-dek">{dek}</p>
        {!isInDevelopment && (
          <div className="research-detail-byline">{byline}</div>
        )}
      </header>

      {isInDevelopment ? (
        <section
          className="research-detail-notice"
          aria-labelledby="research-detail-notice-title"
        >
          <div className="research-detail-notice-copy">
            <div className="research-detail-notice-label">{t.forthcoming}</div>
            <h2 id="research-detail-notice-title">{t.noticeTitle}</h2>
            <p>{t.notice}</p>
            <p className="research-detail-note">{t.note}</p>
          </div>
          <div className="research-detail-actions">
            <Link className="primary-link" href="/analysis">
              {t.explore} <span aria-hidden="true">→</span>
            </Link>
            <a className="text-link" href="mailto:contact@china79.org">
              {t.contact} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      ) : (
        <div className="research-detail-body">
          {body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
    </article>
  );
}
