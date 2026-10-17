"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { initiative } from "@/lib/initiative";

const copy = {
  en: {
    label: "About the initiative",
    introduction:
      "China79 Initiative is an independent, data-driven foreign policy initiative committed to pragmatic U.S.–China cooperation. We bring historical evidence into public understanding, research, and informed dialogue.",
    dataAction: "Explore our data",
    contactAction: "Get in touch",
  },
  zh: {
    label: "关于本倡议",
    introduction:
      "China79 倡议是一个以数据为基础的独立外交政策倡议，致力于推动务实的美中合作。我们以历史证据促进公众理解、研究与知情对话。",
    dataAction: "探索数据",
    contactAction: "联系我们",
  },
};

export default function AboutPageClient() {
  const { language } = useLanguage();
  const identity = initiative[language];
  const t = copy[language];
  return (
    <div className="page-shell">
      <section className="container page-header">
        <div className="eyebrow">{t.label}</div>
        <h1>{identity.tagline}</h1>
        <p>{t.introduction}</p>
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
        aria-labelledby="about-pillars-title"
      >
        <div className="section-heading">
          <h2 id="about-pillars-title">{identity.pillarsLabel}</h2>
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
      <section
        className="container approach-section section-rule"
        id="approach"
        aria-labelledby="approach-title"
      >
        <div className="kicker">{identity.evidenceLabel}</div>
        <h2 id="approach-title">{identity.evidenceTitle}</h2>
        <p>{identity.evidence}</p>
        <p>{identity.evidenceNote}</p>
        <div className="initiative-actions">
          <Link className="primary-link" href="/data">
            {t.dataAction} <span aria-hidden="true">→</span>
          </Link>
          <Link className="text-link" href="/contact">
            {t.contactAction} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
