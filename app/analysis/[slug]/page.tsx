import { notFound } from "next/navigation";
import { articles } from "@/lib/content";
import ArticlePageClient from "@/components/ArticlePageClient";
import { isPublishedArticle, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  return pageMetadata({
    title: article.title,
    description: isPublishedArticle(article) ? article.dek : `${article.dek} Full analysis and sources are forthcoming.`,
    path: `/analysis/${article.slug}`,
    index: isPublishedArticle(article),
  });
}

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = articles.find(
    (item) => item.slug === slug
  );

  if (!article) {
    notFound();
  }

  return <ArticlePageClient article={article} />;
}
