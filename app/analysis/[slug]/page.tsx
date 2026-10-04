import { notFound } from "next/navigation";
import { articles } from "@/lib/content";

export function generateStaticParams() {
  return articles.map(article => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  if (!article) notFound();

  return (
    <article className="container article-page">
      <div className="article-header">
        <div className="eyebrow">{article.section}</div>
        <h1>{article.title}</h1>
        <p className="article-dek">{article.dek}</p>
        <div className="article-byline">By {article.author} · {article.date} · {article.readTime}</div>
      </div>
      <div className="article-body">
        {article.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>
      <div className="draft-note">Draft site note: this article content is placeholder copy for layout purposes and should be replaced with fully sourced final work before public launch.</div>
    </article>
  );
}
