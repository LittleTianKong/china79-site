"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { initiative } from "@/lib/initiative";

const copy = {
  en: {
    title: "Better dialogue starts with shared understanding.",
    description:
      "China79 supports informed discussion of opportunities for pragmatic U.S.–China cooperation, grounded in evidence and recognition of legitimate disagreements and security concerns.",
    evidenceTitle: "Bring the historical record into the conversation.",
    evidenceText:
      "Understanding when dialogue has continued, broken down, or produced results can help us ask more useful questions about the relationship today.",
    evidenceAction: "Explore our data",
    perspectivesTitle: "Make room for informed perspectives.",
    perspectivesText:
      "Different experiences and interpretations can sharpen a discussion. Our interviews section provides a place for perspectives from scholars, researchers, diplomats, and practitioners as conversations are published.",
    perspectivesAction: "Interviews & perspectives",
    contactTitle: "Contribute to the conversation",
    contactText:
      "Share a research question, suggest a source or interview, or get in touch about a potential collaboration.",
    contactAction: "Contact China79",
  },
  zh: {
    title: "更好的对话，始于共同理解。",
    description:
      "China79 支持以证据为基础、充分认识合理分歧与安全关切的知情讨论，探索务实的美中合作机会。",
    evidenceTitle: "将历史记录带入讨论。",
    evidenceText:
      "理解对话何时持续、何时中断以及何时取得成果，有助于我们对今天的双边关系提出更有价值的问题。",
    evidenceAction: "探索数据",
    perspectivesTitle: "为知情观点留出空间。",
    perspectivesText:
      "不同的经历与解读有助于深化讨论。随着访谈陆续发布，我们的访谈栏目将为学者、研究人员、外交人士和政策实践者提供分享观点的空间。",
    perspectivesAction: "访谈与观点",
    contactTitle: "参与对话",
    contactText: "分享研究问题，推荐来源或访谈人选，或联系我们探讨合作。",
    contactAction: "联系 China79",
  },
};

export default function PolicyPageClient() {
  const { language } = useLanguage();
  const t = copy[language];
  const identity = initiative[language];
  return (
    <div className="page-shell">
      <section className="container page-header">
        <div className="eyebrow">{identity.pillars[2].title}</div>
        <h1>{t.title}</h1>
        <p>{t.description}</p>
      </section>
      <section className="container supporting-work section-rule">
        <article>
          <h2>{t.evidenceTitle}</h2>
          <p>{t.evidenceText}</p>
          <Link className="text-link" href="/data">
            {t.evidenceAction} <span aria-hidden="true">→</span>
          </Link>
        </article>
        <article>
          <h2>{t.perspectivesTitle}</h2>
          <p>{t.perspectivesText}</p>
          <Link className="text-link" href="/interviews">
            {t.perspectivesAction} <span aria-hidden="true">→</span>
          </Link>
        </article>
      </section>
      <section className="container approach-section section-rule">
        <div className="kicker">{identity.evidenceLabel}</div>
        <h2>{identity.evidenceTitle}</h2>
        <p>{identity.evidence}</p>
      </section>
      <section className="container data-contact section-rule">
        <div>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactText}</p>
        </div>
        <Link className="primary-link" href="/contact">
          {t.contactAction} <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}
