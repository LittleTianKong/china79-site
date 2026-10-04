"use client";

import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/lib/content";
import { useLanguage } from "@/components/LanguageProvider";

const copy = {
  en: {
    eyebrow: "Analysis",
    title: "Research, commentary, and perspectives.",
    description:
      "China79 covers Chinese politics, economics, security, culture, foreign policy, and the evolving U.S.-China relationship.",
  },

  zh: {
    eyebrow: "分析",
    title: "研究、评论与观点。",
    description:
      "China79 关注中国政治、经济、安全、文化、外交政策以及不断演变的美中关系。",
  },
};

export default function AnalysisPageClient() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="container page-shell">
      <div className="page-header">
        <div className="eyebrow">{t.eyebrow}</div>
        <h1>{t.title}</h1>
        <p>{t.description}</p>
      </div>

      <div className="card-grid wide-cards">
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            article={article}
          />
        ))}
      </div>
    </section>
  );
}
