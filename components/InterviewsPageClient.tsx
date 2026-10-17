"use client";

import InterviewVideoPlaceholder from "@/components/InterviewVideoPlaceholder";
import { useLanguage } from "@/components/LanguageProvider";

const copy = {
  en: {
    eyebrow: "Interviews", title: "Understanding through conversation.",
    description: "Conversations with scholars, practitioners, and people whose firsthand experiences offer insight into China and U.S.–China relations.",
    navigation: "Explore interviews", series: "The series", future: "Future conversations", suggest: "Suggest a guest",
    seriesName: "China79 Interviews", video: "Video forthcoming", status: "Coming soon",
    featureLabel: "Interview series", featureTitle: "Perspectives shaped by experience.",
    featureText: "We’re developing a video interview series that brings research, professional experience, and personal perspectives into the conversation.",
    featureNote: "Our first guest and topic will be announced once confirmed. The video will be published here when it is ready.",
    futureLabel: "Conversations ahead", futureTitle: "More voices. More perspectives.",
    futureText: "Further video conversations will appear here as the series develops.",
    cardTitle: "Future interview", cardText: "Guest and topic to be announced.",
    invitation: "Join the conversation", contactTitle: "Whose perspective should we hear?",
    contactText: "Recommend a guest, suggest a question, or get in touch about taking part in an interview. We welcome perspectives grounded in research, professional practice, and firsthand experience.",
  },
  zh: {
    eyebrow: "访谈", title: "通过交流，增进理解。",
    description: "与学者、实践者和亲历者对话，从他们的工作与经验中获得理解中国及美中关系的新视角。",
    navigation: "探索访谈", series: "访谈系列", future: "未来的对话", suggest: "推荐嘉宾",
    seriesName: "China79 访谈", video: "视频即将推出", status: "敬请期待",
    featureLabel: "访谈系列", featureTitle: "从亲身经历中，理解不同视角。",
    featureText: "我们正在筹备视频访谈系列，将研究、专业经验与个人视角带入交流。",
    featureNote: "首位嘉宾与访谈主题将在确认后公布，视频将在准备就绪后于此发布。",
    futureLabel: "即将展开的交流", futureTitle: "更多声音，更多视角。",
    futureText: "随着系列逐步展开，我们将在此发布更多视频访谈。",
    cardTitle: "未来访谈", cardText: "嘉宾与主题待公布。",
    invitation: "参与交流", contactTitle: "您希望听到谁的观点？",
    contactText: "欢迎推荐嘉宾、提出问题，或联系我们探讨参与访谈。我们期待来自学术研究、专业实践与亲身经历的不同视角。",
  },
};

export default function InterviewsPageClient() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <div className="interviews-page">
      <header className="container interviews-header">
        <div><div className="eyebrow">{t.eyebrow}</div><h1>{t.title}</h1></div>
        <p>{t.description}</p>
      </header>

      <nav className="container interviews-navigation" aria-label={t.navigation}>
        <a href="#interview-series">{t.series}</a>
        <a href="#future-conversations">{t.future}</a>
        <a href="#interview-contact">{t.suggest}<span aria-hidden="true">↗</span></a>
      </nav>

      <section className="container interviews-series" id="interview-series" aria-labelledby="interviews-series-title">
        <div className="interviews-feature">
          <InterviewVideoPlaceholder label={t.video} seriesLabel={t.seriesName} />
          <div className="interviews-feature-copy">
            <div className="interviews-feature-labels"><span className="kicker">{t.featureLabel}</span><span className="release-status">{t.status}</span></div>
            <h2 id="interviews-series-title">{t.featureTitle}</h2>
            <p>{t.featureText}</p>
            <p className="interviews-feature-note">{t.featureNote}</p>
            <a className="text-link" href="mailto:contact@china79.org">{t.suggest}<span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="container interviews-future" id="future-conversations" aria-labelledby="interviews-future-title">
        <div className="interviews-future-heading"><div><div className="kicker">{t.futureLabel}</div><h2 id="interviews-future-title">{t.futureTitle}</h2></div><p>{t.futureText}</p></div>
        <div className="interviews-grid">
          {[0, 1, 2].map(slot => (
            <article className="interviews-future-card" key={slot}>
              <InterviewVideoPlaceholder label={t.video} seriesLabel={t.seriesName} variant="light" />
              <div className="interviews-future-card-copy"><h3>{t.cardTitle}</h3><p>{t.cardText}</p><span>{t.status}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="container interviews-contact" id="interview-contact" aria-labelledby="interviews-contact-title">
        <div><div className="kicker">{t.invitation}</div><h2 id="interviews-contact-title">{t.contactTitle}</h2><p>{t.contactText}</p></div>
        <a href="mailto:contact@china79.org">contact@china79.org<span aria-hidden="true">↗</span></a>
      </section>
    </div>
  );
}
