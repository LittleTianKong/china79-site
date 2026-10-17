"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { dataCopy, initiative } from "@/lib/initiative";

const copy = {
  en: {
    browse: "Explore our data",
    about: "About the initiative",
    dataTitle: "Evidence comes first.",
    dataIntro:
      "Our work starts with the historical record. We are building accessible datasets to help researchers, policymakers, and the public examine how the relationship evolves.",
    collectionAction: "Explore the collection",
    approach: "Read about our approach",
    researchLabel: "Research & understanding",
    researchTitle: "From historical records to better questions.",
    researchText:
      "Data gives analysis a foundation. Our research examines patterns of engagement, competition, and cooperation—and what the evidence can and cannot tell us.",
    researchAction: "Explore research",
    dialogueLabel: "Cooperation & dialogue",
    dialogueTitle: "A shared starting point for informed discussion.",
    dialogueText:
      "Reliable evidence can help people understand legitimate disagreements, recognize security concerns, and identify opportunities for mutually beneficial cooperation.",
    dialogueAction: "Our approach to dialogue",
    credit: "Photo: zhang kaiyv / Unsplash",
  },
  zh: {
    browse: "探索数据",
    about: "关于本倡议",
    dataTitle: "从证据出发。",
    dataIntro:
      "我们的工作始于历史记录。我们正在构建易于获取的数据集，帮助研究人员、政策制定者和公众考察双边关系的演变。",
    collectionAction: "探索数据集系列",
    approach: "了解我们的研究原则",
    researchLabel: "研究与理解",
    researchTitle: "从历史记录中，提出更好的问题。",
    researchText:
      "数据为分析奠定基础。我们的研究考察接触、竞争与合作的规律，并探讨证据能够以及不能说明什么。",
    researchAction: "浏览研究",
    dialogueLabel: "合作与对话",
    dialogueTitle: "为知情讨论建立共同起点。",
    dialogueText:
      "可靠的证据有助于理解合理分歧、认识安全关切，并发现互利合作的机会。",
    dialogueAction: "了解我们的对话理念",
    credit: "摄影：zhang kaiyv / Unsplash",
  },
};

export default function HomePage() {
  const { language } = useLanguage();
  const identity = initiative[language];
  const data = dataCopy[language];
  const t = copy[language];
  return (
    <>
      <section className="container initiative-hero">
        <div className="initiative-hero-grid">
          <div>
            <div className="eyebrow">{identity.name}</div>
            <h1>
              {identity.taglineLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
          </div>
          <div className="initiative-hero-intro">
            <p className="initiative-description">{identity.description}</p>
            <p>{identity.introduction}</p>
            <div className="initiative-actions">
              <Link className="primary-link" href="/data">
                {t.browse}
                <span aria-hidden="true">↗</span>
              </Link>
              <Link className="text-link" href="/about">
                {t.about} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-image-wrap initiative-image">
          <Image
            src="/beijing-skyline.jpg"
            alt={language === "zh" ? "北京城市天际线" : "Beijing skyline"}
            width={1536}
            height={1024}
            className="hero-image"
            priority
          />
        </div>
        <div className="image-credit">{t.credit}</div>
      </section>
      <section
        className="container data-gateway section-rule"
        aria-labelledby="home-data-title"
      >
        <div className="data-gateway-intro">
          <div className="kicker">{data.label}</div>
          <h2 id="home-data-title">{t.dataTitle}</h2>
          <p>{t.dataIntro}</p>
        </div>
        <article className="collection-feature">
          <div className="collection-heading">
            <span className="collection-label">{data.collectionLabel}</span>
            <span className="release-status">{data.status}</span>
          </div>
          <h3>
            <Link href="/data">{data.collectionTitle}</Link>
          </h3>
          <p>{data.collectionDescription}</p>
          <p className="collection-availability">{data.availability}</p>
          <Link className="text-link" href="/data">
            {t.collectionAction} <span aria-hidden="true">→</span>
          </Link>
        </article>
      </section>
      <section className="container mission-vision section-rule">
        <div>
          <h2>{identity.missionLabel}</h2>
          <p>{identity.mission}</p>
        </div>
        <div>
          <h2>{identity.visionLabel}</h2>
          <p>{identity.vision}</p>
        </div>
      </section>
      <section
        className="container pillars-section section-rule"
        aria-labelledby="pillars-title"
      >
        <div className="section-heading">
          <h2 id="pillars-title">{identity.pillarsLabel}</h2>
        </div>
        <div className="initiative-pillars">
          {identity.pillars.map((pillar, index) => (
            <article key={pillar.title}>
              <span className="pillar-number" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="evidence-band">
        <div className="container evidence-layout">
          <div>
            <div className="eyebrow light">{identity.evidenceLabel}</div>
            <h2>{identity.evidenceTitle}</h2>
          </div>
          <div>
            <p>{identity.evidence}</p>
            <p className="evidence-note">{identity.evidenceNote}</p>
            <Link href="/about#approach">
              {t.approach} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="container supporting-work">
        <article>
          <div className="kicker">{t.researchLabel}</div>
          <h2>{t.researchTitle}</h2>
          <p>{t.researchText}</p>
          <Link className="text-link" href="/analysis">
            {t.researchAction} <span aria-hidden="true">→</span>
          </Link>
        </article>
        <article>
          <div className="kicker">{t.dialogueLabel}</div>
          <h2>{t.dialogueTitle}</h2>
          <p>{t.dialogueText}</p>
          <Link className="text-link" href="/policy-outreach">
            {t.dialogueAction} <span aria-hidden="true">→</span>
          </Link>
        </article>
      </section>
    </>
  );
}
