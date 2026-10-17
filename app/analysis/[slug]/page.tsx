import { notFound } from "next/navigation";
import { articles } from "@/lib/content";
import ArticlePageClient from "@/components/ArticlePageClient";

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
