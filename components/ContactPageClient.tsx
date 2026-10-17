"use client";

import { useLanguage } from "@/components/LanguageProvider";

const copy = {
  en: {
    eyebrow: "Contact",
    title: "Get in touch with China79.",
    description:
      "For dataset questions, source suggestions, corrections, research contributions, and opportunities for dialogue, use the addresses below.",
    general: "Data & general inquiries",
    policy: "Policy & dialogue",
    direct: "Direct contact",
  },

  zh: {
    eyebrow: "联系",
    title: "联系 China79。",
    description:
      "如有数据集问题、来源建议、资料更正、研究贡献或对话合作意向，请通过以下邮箱联系我们。",
    general: "数据与一般咨询",
    policy: "政策与对话",
    direct: "直接联系",
  },
};

export default function ContactPageClient() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="container page-shell">
      <div className="page-header">
        <div className="eyebrow">{t.eyebrow}</div>
        <h1>{t.title}</h1>
        <p>{t.description}</p>
      </div>

      <div className="contact-grid">
        <a className="contact-card" href="mailto:contact@china79.org">
          <span>{t.general}</span>
          <strong>contact@china79.org</strong>
        </a>

        <a className="contact-card" href="mailto:policy@china79.org">
          <span>{t.policy}</span>
          <strong>policy@china79.org</strong>
        </a>

        <a className="contact-card" href="mailto:mrhindtutt@china79.org">
          <span>{t.direct}</span>
          <strong>mrhindtutt@china79.org</strong>
        </a>
      </div>
    </section>
  );
}
