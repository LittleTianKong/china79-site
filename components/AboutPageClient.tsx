"use client";

import Link from "next/link";
import AboutOriginArtwork from "@/components/AboutOriginArtwork";
import { useLanguage } from "@/components/LanguageProvider";
import { initiative } from "@/lib/initiative";

const copy = {
  en: {
    label: "About the initiative",
    title: "Building understanding.", titleEnd: "Informing dialogue.",
    introduction: "China79 Initiative is an independent, data-driven foreign policy initiative focused on U.S.–China relations. We bring historical evidence into public understanding, research, and informed dialogue.",
    navigation: "About China79", purpose: "Our purpose", origin: "Why 1979?", work: "What we’re building", principles: "Our principles",
    originLabel: "The year behind our name", originTitle: "A starting point for understanding.",
    originDate: "1 January 1979",
    originText: "The United States and the People’s Republic of China established diplomatic relations on January 1, 1979.",
    originProject: "That milestone is the starting point for our flagship series of eight datasets, which is being developed to document publicly recorded official engagements across the decades that followed.",
    originSource: "Historical background", originSourceName: "U.S. Department of State, Office of the Historian",
    originAction: "Explore the flagship series",
    workTitle: "One purpose. Three connected areas of work.",
    workText: "Data provides the foundation. Research asks what it means. Interviews bring experience and perspective into the conversation.",
    areas: [
      { text: "We are building freely accessible datasets on U.S.–China relations, with traceable sources, clear definitions, and transparent documentation.", action: "Explore our data", href: "/data" },
      { text: "Our developing research examines patterns of engagement, competition, and cooperation through historical evidence.", action: "Explore our research", href: "/analysis" },
      { text: "We are developing interviews with scholars, practitioners, and people with firsthand experience of China and the bilateral relationship.", action: "Explore interviews", href: "/interviews" },
    ],
    standardsAction: "Read our publishing principles",
    contactLabel: "Connect with China79", contactTitle: "Good questions start conversations.",
    contactText: "Suggest a source, share research, or propose an interview. We welcome thoughtful contributions to understanding the relationship.",
  },
  zh: {
    label: "关于本倡议",
    title: "增进理解，", titleEnd: "让对话更有依据。",
    introduction: "China79 倡议是一个以数据为基础、关注美中关系的独立外交政策倡议。我们以历史证据促进公众理解、研究与知情对话。",
    navigation: "关于 China79", purpose: "我们的使命", origin: "为什么是1979年？", work: "我们正在建设的工作", principles: "我们的原则",
    originLabel: "名称背后的年份", originTitle: "理解两国关系的一个起点。",
    originDate: "1979年1月1日",
    originText: "1979年1月1日，美国与中华人民共和国正式建立外交关系。",
    originProject: "我们的旗舰系列由8个数据集组成，以这一里程碑为起点，正在整理此后数十年间有公开记录的两国官方接触。",
    originSource: "了解历史背景", originSourceName: "美国国务院历史学家办公室",
    originAction: "了解旗舰系列",
    workTitle: "一个共同目标，三个相互关联的工作领域。",
    workText: "数据提供基础，研究探讨其意义，访谈为交流带来经验与不同视角。",
    areas: [
      { text: "我们正在建设可免费获取的美中关系数据集，并提供可追溯的来源、明确的定义与透明的说明文档。", action: "探索数据", href: "/data" },
      { text: "我们的研究以历史证据为基础，考察接触、竞争与合作的规律。", action: "探索研究", href: "/analysis" },
      { text: "我们正在筹备与学者、实践者及亲历者的访谈，呈现关于中国和双边关系的经验与视角。", action: "探索访谈", href: "/interviews" },
    ],
    standardsAction: "了解数据发布原则",
    contactLabel: "联系 China79", contactTitle: "好问题，让交流开始。",
    contactText: "欢迎推荐资料来源、分享研究或提出访谈建议，共同增进对双边关系的理解。",
  },
};

export default function AboutPageClient() {
  const { language } = useLanguage();
  const identity = initiative[language];
  const t = copy[language];
  return (
    <div className="about-page">
      <header className="container about-header">
        <div><div className="eyebrow">{t.label}</div><h1>{t.title}<br /><span>{t.titleEnd}</span></h1></div>
        <p>{t.introduction}</p>
      </header>

      <nav className="container about-navigation" aria-label={t.navigation}>
        <a href="#our-purpose">{t.purpose}</a>
        <a href="#why-1979">{t.origin}</a>
        <a href="#our-work">{t.work}</a>
        <a href="#approach">{t.principles}</a>
      </nav>

      <section className="container about-purpose" id="our-purpose" aria-label={t.purpose}>
        <div className="about-mission"><h2>{identity.missionLabel}</h2><p>{identity.mission}</p></div>
        <div className="about-vision"><h2>{identity.visionLabel}</h2><p>{identity.vision}</p></div>
      </section>

      <section className="container about-origin" id="why-1979" aria-labelledby="about-origin-title">
        <div className="about-origin-visual" aria-hidden="true">
          <span className="about-origin-year">1979<span>.</span></span>
          <AboutOriginArtwork />
          <span className="about-origin-date">{t.originDate}</span>
        </div>
        <div className="about-origin-copy">
          <div className="kicker">{t.originLabel}</div>
          <h2 id="about-origin-title">{t.originTitle}</h2>
          <p>{t.originText}</p>
          <p>{t.originProject}</p>
          <Link className="text-link" href="/data/us-china-engagement">{t.originAction}<span aria-hidden="true">→</span></Link>
          <div className="about-origin-source"><a href="https://history.state.gov/milestones/1977-1980/china-policy">{t.originSource}<span aria-hidden="true">↗</span></a><span>{t.originSourceName}</span></div>
        </div>
      </section>

      <section className="container about-work" id="our-work" aria-labelledby="about-work-title">
        <div className="about-work-heading"><div><div className="kicker">{t.work}</div><h2 id="about-work-title">{t.workTitle}</h2></div><p>{t.workText}</p></div>
        <div className="about-work-list">{t.areas.map((area, index) => (
          <article key={area.href}>
            <span className="about-work-number" aria-hidden="true">0{index + 1}</span>
            <h3><Link href={area.href}>{identity.pillars[index].title}</Link></h3>
            <p>{area.text}</p>
            <Link className="text-link" href={area.href}>{area.action}<span aria-hidden="true">↗</span></Link>
          </article>
        ))}</div>
      </section>

      <section className="about-principles" id="approach" aria-labelledby="about-principles-title">
        <div className="container about-principles-layout">
          <div><div className="eyebrow">{t.principles}</div><h2 id="about-principles-title">{identity.evidenceTitle}</h2></div>
          <div className="about-principles-copy"><p>{identity.evidence}</p><p className="about-principles-note">{identity.evidenceNote}</p><Link href="/data#publishing-principles">{t.standardsAction}<span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>

      <section className="container about-contact" aria-labelledby="about-contact-title">
        <div><div className="kicker">{t.contactLabel}</div><h2 id="about-contact-title">{t.contactTitle}</h2><p>{t.contactText}</p></div>
        <a href="mailto:contact@china79.org">contact@china79.org<span aria-hidden="true">↗</span></a>
      </section>
    </div>
  );
}
