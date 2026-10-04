"use client";

import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { articles, policyItems } from "@/lib/content";
import { useLanguage } from "@/components/LanguageProvider";

const copy = {
  en: {
    eyebrow: "Independent U.S.-China Affairs Initiative",
    heroTitle: "Understanding the relationship beyond a single frame.",
    heroDek:
      "China79 publishes analysis, interviews, and policy commentary on the forces shaping U.S.-China relations — including areas of competition, cooperation, and mutual interest.",

    featuredAnalysis: "Featured Analysis",
    readAnalysis: "Read analysis →",

    whatChina79Does: "What China79 does",
    mission:
      "Research and analysis are only part of the project. China79 also develops research-based policy recommendations and brings them into broader conversations through congressional outreach.",
    policyOutreach: "Policy & Outreach →",

    latestAnalysis: "Latest Analysis",
    viewAll: "View all →",

    policyLabel: "Policy & Outreach",
    policyTitle: "Research beyond publication.",
    policyDek:
      "China79 develops concise, research-based recommendations for policymakers and engages congressional offices on issues shaping the bilateral relationship.",
    viewPolicy: "View policy work →",

    perspectives: "Perspectives & Interviews",
    interviewsTitle: "Conversations with people who work on China.",
    interviewsDek:
      "China79 will feature interviews with scholars, practitioners, business leaders, students, and others whose experience offers insight into China and the U.S.-China relationship.",
    exploreInterviews: "Explore interviews →",

    aboutLabel: "About China79",
    aboutDek:
      "China79 is an independent initiative dedicated to informed analysis and dialogue on China and U.S.-China relations.",
    learnMore: "Learn more →",
  },

  zh: {
    eyebrow: "独立美中关系研究倡议",
    heroTitle: "超越单一视角，理解美中关系。",
    heroDek:
      "China79 发布有关塑造美中关系的分析、访谈和政策评论，探讨竞争、合作以及双方共同利益等议题。",

    featuredAnalysis: "重点分析",
    readAnalysis: "阅读分析 →",

    whatChina79Does: "China79 的工作",
    mission:
      "研究与分析只是 China79 工作的一部分。我们也提出以研究为基础的政策建议，并通过与美国国会办公室的沟通，将这些观点带入更广泛的政策讨论。",
    policyOutreach: "政策与交流 →",

    latestAnalysis: "最新分析",
    viewAll: "查看全部 →",

    policyLabel: "政策与交流",
    policyTitle: "让研究走出出版物。",
    policyDek:
      "China79 为政策制定者提出简明、以研究为基础的政策建议，并就影响美中双边关系的重要议题与美国国会办公室进行交流。",
    viewPolicy: "查看政策工作 →",

    perspectives: "观点与访谈",
    interviewsTitle: "与长期关注中国的人对话。",
    interviewsDek:
      "China79 将采访学者、政策实践者、企业人士、学生及其他具有相关经验的人士，从不同角度理解中国及美中关系。",
    exploreInterviews: "浏览访谈 →",

    aboutLabel: "关于 China79",
    aboutDek:
      "China79 是一个独立倡议，致力于推动有关中国及美中关系的深入分析与理性对话。",
    learnMore: "了解更多 →",
  },
};

export default function HomePage() {
  const { language } = useLanguage();
  const t = copy[language];

  const [featured, ...latest] = articles;
  const policyItem = policyItems[0];

  const featuredTitle =
    language === "zh" ? featured.titleZh : featured.title;

  const featuredDek =
    language === "zh" ? featured.dekZh : featured.dek;

  const featuredSection =
    language === "zh" ? featured.sectionZh : featured.section;

  const featuredDate =
    language === "zh" ? featured.dateZh : featured.date;

  const featuredReadTime =
    language === "zh" ? featured.readTimeZh : featured.readTime;

  const policyType =
    language === "zh" ? policyItem.typeZh : policyItem.type;

  const policyStatus =
    language === "zh" ? policyItem.statusZh : policyItem.status;

  const policyItemTitle =
    language === "zh" ? policyItem.titleZh : policyItem.title;

  const policySummary =
    language === "zh" ? policyItem.summaryZh : policyItem.summary;

  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow">{t.eyebrow}</div>

          <h1>{t.heroTitle}</h1>

          <p className="hero-dek">{t.heroDek}</p>
        </div>
      </section>

      <section className="container featured-grid section-rule">
        <div className="featured-story">
          <div className="kicker">{t.featuredAnalysis}</div>

          <h2>
            <Link href={`/analysis/${featured.slug}`}>
              {featuredTitle}
            </Link>
          </h2>

          <p>{featuredDek}</p>

          <div className="story-meta">
            {featuredSection} · {featuredDate} · {featuredReadTime}
          </div>

          <Link
            className="text-link"
            href={`/analysis/${featured.slug}`}
          >
            {t.readAnalysis}
          </Link>
        </div>

        <aside className="mission-panel">
          <div className="kicker">{t.whatChina79Does}</div>

          <p>{t.mission}</p>

          <Link
            className="text-link"
            href="/policy-outreach"
          >
            {t.policyOutreach}
          </Link>
        </aside>
      </section>

      <section className="container section-rule section-block">
        <div className="section-heading">
          <h2>{t.latestAnalysis}</h2>

          <Link href="/analysis">{t.viewAll}</Link>
        </div>

        <div className="card-grid">
          {latest.map((article) => (
            <ArticleCard article={article} key={article.slug} />
          ))}

          <ArticleCard article={featured} />
        </div>
      </section>

      <section className="policy-band">
        <div className="container policy-layout">
          <div>
            <div className="eyebrow light">
              {t.policyLabel}
            </div>

            <h2>{t.policyTitle}</h2>

            <p>{t.policyDek}</p>
          </div>

          <div className="policy-card">
            <div className="policy-type">
              {policyType} · {policyStatus}
            </div>

            <h3>{policyItemTitle}</h3>

            <p>{policySummary}</p>

            <Link href="/policy-outreach">
              {t.viewPolicy}
            </Link>
          </div>
        </div>
      </section>

      <section className="container split-section section-block">
        <div>
          <div className="kicker">
            {t.perspectives}
          </div>

          <h2>{t.interviewsTitle}</h2>

          <p>{t.interviewsDek}</p>

          <Link
            className="text-link"
            href="/interviews"
          >
            {t.exploreInterviews}
          </Link>
        </div>

        <div className="about-callout">
          <div className="kicker">
            {t.aboutLabel}
          </div>

          <p>{t.aboutDek}</p>

          <Link
            className="text-link"
            href="/about"
          >
            {t.learnMore}
          </Link>
        </div>
      </section>
    </>
  );
}
