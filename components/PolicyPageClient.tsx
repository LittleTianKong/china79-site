"use client";

import { policyItems } from "@/lib/content";
import { useLanguage } from "@/components/LanguageProvider";

const copy = {
  en: {
    eyebrow: "Policy & Outreach",
    title: "Research designed to enter the policy conversation.",
    description:
      "China79 develops policy briefs, recommendations, and correspondence for policymakers on issues shaping U.S.-China relations.",
    outreachTitle: "Congressional outreach",
    outreachText:
      "As China79 develops policy work, this page can archive public versions of letters, recommendations, and briefs submitted to congressional offices. Any description of outreach should reflect what actually occurred.",
  },

  zh: {
    eyebrow: "政策与交流",
    title: "让研究进入政策讨论。",
    description:
      "China79 围绕影响美中关系的重要议题，为政策制定者撰写政策简报、建议和政策交流材料。",
    outreachTitle: "国会交流",
    outreachText:
      "随着 China79 推进政策研究，本页面可用于存档提交给美国国会办公室的公开版信函、政策建议和简报。任何有关政策交流的描述都应准确反映实际发生的工作。",
  },
};

export default function PolicyPageClient() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="container page-shell">
      <div className="page-header">
        <div className="eyebrow">{t.eyebrow}</div>
        <h1>{t.title}</h1>
        <p>{t.description}</p>
      </div>

      <div className="policy-list">
        {policyItems.map((item) => {
          const type =
            language === "zh" ? item.typeZh : item.type;

          const title =
            language === "zh" ? item.titleZh : item.title;

          const summary =
            language === "zh" ? item.summaryZh : item.summary;

          const status =
            language === "zh" ? item.statusZh : item.status;

          return (
            <article
              key={item.title}
              className="policy-list-item"
            >
              <div className="policy-type">
                {type}
              </div>

              <h2>{title}</h2>

              <p>{summary}</p>

              <span className="status-pill">
                {status}
              </span>
            </article>
          );
        })}
      </div>

      <div className="outreach-note">
        <h2>{t.outreachTitle}</h2>
        <p>{t.outreachText}</p>
      </div>
    </section>
  );
}
