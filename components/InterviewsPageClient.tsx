"use client";

import { useLanguage } from "@/components/LanguageProvider";

const copy = {
  en: {
    eyebrow: "Interviews",
    title: "Perspectives from people who engage with China directly.",
    description:
      "China79 will publish conversations with scholars, practitioners, business leaders, students, and others whose work offers insight into China and the bilateral relationship.",
    comingSoon: "First interview coming soon.",
    note:
      "This page is ready for your first Q&A. When you publish one, it can become a featured item on the homepage automatically.",
  },

  zh: {
    eyebrow: "访谈",
    title: "来自直接参与中国事务人士的观点。",
    description:
      "China79 将发布与学者、政策实践者、企业人士、学生及其他相关人士的对话，他们的工作与经验能够为理解中国及美中关系提供新的视角。",
    comingSoon: "首篇访谈即将发布。",
    note:
      "本页面已经为首篇问答访谈做好准备。发布后，该访谈也可以成为首页的重点内容。",
  },
};

export default function InterviewsPageClient() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="container page-shell">
      <div className="page-header">
        <div className="eyebrow">{t.eyebrow}</div>
        <h1>{t.title}</h1>
        <p>{t.description}</p>
      </div>

      <div className="empty-state">
        <div className="empty-index">01</div>

        <div>
          <h2>{t.comingSoon}</h2>
          <p>{t.note}</p>
        </div>
      </div>
    </section>
  );
}
