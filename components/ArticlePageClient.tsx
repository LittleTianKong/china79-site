"use client";

import type { Article } from "@/lib/content";
import { useLanguage } from "@/components/LanguageProvider";

export default function ArticlePageClient({
  article,
}: {
  article: Article;
}) {
  const { language } = useLanguage();

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

  const draftNote =
    language === "zh"
      ? "网站草稿说明：本文目前为版式设计使用的占位内容。网站正式公开前，应替换为具有完整资料来源支持的最终版本。"
      : "Draft site note: this article content is placeholder copy for layout purposes and should be replaced with fully sourced final work before public launch.";

  return (
    <article className="container article-page">
      <div className="article-header">
        <div className="eyebrow">{section}</div>
        <h1>{title}</h1>
        <p className="article-dek">{dek}</p>
        <div className="article-byline">{byline}</div>
      </div>

      <div className="article-body">
        {body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="draft-note">{draftNote}</div>
    </article>
  );
}
