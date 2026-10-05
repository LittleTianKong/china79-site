"use client";

import Image from "next/image";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { articles, policyItems } from "@/lib/content";
import { useLanguage } from "@/components/LanguageProvider";

const copy = {
  en: {
    eyebrow: "Policy Advocacy · Research · Data",
    heroTitle: "Understanding U.S.-China relations beyond competition.",
    heroDek:
      "The China79 Initiative advocates for U.S.-China policy that extends beyond a binary view of the relationship centered on competition to one that also recognizes opportunities for partnership and mutual benefit, supported by independent research and accessible data.",

    featuredAnalysis: "Featured Research",
    readAnalysis: "Read research →",

    howChina79Works: "How China79 works",

    advocacyTitle: "Policy Advocacy",
    advocacyText:
      "Turning research into practical policy recommendations and congressional outreach.",

    researchTitle: "Research",
    researchText:
      "Independent analysis of the forces shaping U.S.-China relations.",

    dataTitle: "Data",
    dataText:
      "Accessible datasets and tools that support better research and policymaking.",

    exploreWork: "About the Initiative →",

    latestAnalysis: "Latest Publications",
    viewAll: "View all →",

    policyLabel: "Policy & Outreach",
    policyTitle: "Research beyond publication.",
policyDek:
  "China79 translates research into actionable policy recommendations and brings those ideas directly into policy discussions through congressional outreach and engagement.",
    viewPolicy: "View policy work →",

    perspectives: "Perspectives & Interviews",
    interviewsTitle: "Conversations with people who work on China.",
    interviewsDek:
      "China79 will feature interviews with scholars, practitioners, business leaders, students, and others whose experience offers insight into China and the U.S.-China relationship.",
    exploreInterviews: "Explore interviews →",

    aboutLabel: "About China79",
    aboutDek:
      "China79 is an independent initiative focused on advancing deeper analysis and informed dialogue on China and the U.S.-China relationship.",
    learnMore: "Learn more →",
  },

  zh: {
    eyebrow: "政策倡议 · 研究 · 数据",
    heroTitle: "超越竞争，理解美中关系。",
    heroDek:
      "China79倡议主张，美中政策应超越以竞争为中心的二元关系观，同时认识到伙伴关系与互利所带来的机遇，并以独立研究和可获取的数据为支撑。",

    featuredAnalysis: "重点研究",
    readAnalysis: "阅读研究 →",

    howChina79Works: "China79 的工作方式",

    advocacyTitle: "政策倡议",
    advocacyText:
      "将研究转化为切实可行的政策建议，并通过与国会办公室的交流推动政策讨论。",

    researchTitle: "研究",
    researchText:
      "独立分析塑造美中关系的政治、经济与社会力量。",

    dataTitle: "数据",
    dataText:
      "提供可获取的数据集与研究工具，为深入研究和政策制定提供支持。",

    exploreWork: "关于本倡议 →",

    latestAnalysis: "最新出版物",
    viewAll: "查看全部 →",

    policyLabel: "政策与交流",
    policyTitle: "让研究走出出版物。",
    policyDek:
  "China79 将研究转化为可落实的政策建议，并通过国会交流与政策参与，将这些观点直接带入政策讨论。",
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

  const featured = articles.find(
  (article) => article.slug === "competition-and-cooperation"
)!;

const latest = [
  articles.find(
    (article) => article.slug === "cooperation-beyond-competition"
  )!,
  articles.find(
    (article) => article.slug === "mandarin-pipeline"
  )!,
  articles.find(
    (article) => article.slug === "video-games-soft-power"
  )!,
];

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

        <div className="hero-image-wrap">
          <Image
            src="/beijing-skyline.jpg"
            alt="Beijing skyline"
            width={1536}
            height={1024}
            className="hero-image"
            priority
          />
        </div>

        <div className="image-credit">
          Photo: zhang kaiyv / Unsplash
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
          <div className="kicker">{t.howChina79Works}</div>

          <div className="mission-pillar">
            <h3>{t.advocacyTitle}</h3>
            <p>{t.advocacyText}</p>
          </div>

          <div className="mission-pillar">
            <h3>{t.researchTitle}</h3>
            <p>{t.researchText}</p>
          </div>

          <div className="mission-pillar">
            <h3>{t.dataTitle}</h3>
            <p>{t.dataText}</p>
          </div>

          <Link className="text-link" href="/about">
            {t.exploreWork}
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
