import Link from "next/link";
import type { Article } from "@/lib/content";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="article-card">
      <div className="card-kicker">{article.section}</div>
      <h3><Link href={`/analysis/${article.slug}`}>{article.title}</Link></h3>
      <p>{article.dek}</p>
      <div className="card-meta">{article.date} · {article.readTime}</div>
    </article>
  );
}
