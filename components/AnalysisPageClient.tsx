"use client";

import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/lib/content";
import { useLanguage } from "@/components/LanguageProvider";

const copy = {
  en: {
    eyebrow: "Research & understanding",
    title: "Understanding the relationship through evidence.",
    description:
      "Our research uses historical evidence to examine patterns of cooperation, competition, and diplomatic engagement. Data informs our questions; findings follow the evidence.",
  },

  zh: {
    eyebrow: "研究与理解",
    title: "以证据理解双边关系。",
    description:
      "我们的研究运用历史证据考察合作、竞争与外交接触的规律。数据帮助我们提出问题，研究结论以证据为依据。",
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
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
