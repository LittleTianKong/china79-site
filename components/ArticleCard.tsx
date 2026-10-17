"use client";

import Link from "next/link";
import type { Article } from "@/lib/content";
import { useLanguage } from "@/components/LanguageProvider";

export default function ArticleCard({ article }: { article: Article }) {
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

  return (
    <article className="article-card">
      <div className="card-kicker">{section}</div>

      <h3>
        <Link href={`/analysis/${article.slug}`}>
          {title}
        </Link>
      </h3>

      <p>{dek}</p>

      <div className="card-meta">
        {date} · {readTime}
      </div>
    </article>
  );
}
