import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/lib/content";

export const metadata: Metadata = { title: "Analysis" };

export default function AnalysisPage() {
  return (
    <section className="container page-shell">
      <div className="page-header">
        <div className="eyebrow">Analysis</div>
        <h1>Research, commentary, and perspectives.</h1>
        <p>China79 covers Chinese politics, economics, security, culture, foreign policy, and the evolving U.S.-China relationship.</p>
      </div>
      <div className="card-grid wide-cards">
        {articles.map(article => <ArticleCard key={article.slug} article={article} />)}
      </div>
    </section>
  );
}
