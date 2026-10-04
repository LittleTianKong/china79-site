"use client";

import { useLanguage } from "@/components/LanguageProvider";

const copy = {
  en: {
    eyebrow: "About",
    title:
      "China79 is an independent initiative focused on U.S.-China relations.",

    paragraph1:
      "China79 publishes research, analysis, interviews, and commentary on Chinese politics, economics, security, culture, and China’s role in the international system.",

    paragraph2:
      "China79 was created around the belief that the U.S.-China relationship should be understood through more than competition alone. Our work examines areas of disagreement alongside opportunities for cooperation, dialogue, and mutual benefit, with the goal of encouraging a more informed and nuanced discussion of the bilateral relationship.",

    paragraph3:
      "Beyond publication, China79 seeks to bring research and analysis into policy conversations through congressional outreach, policy briefs, and correspondence with policymakers. By connecting research with practical engagement, the initiative aims to contribute thoughtful perspectives to discussions shaping U.S. policy toward China.",

    focus: "Focus",
    analysis: "Analysis",
    dialogue: "Dialogue",
    policyOutreach: "Policy outreach",
    interviews: "Interviews",
    relations: "U.S.-China relations",
  },

  zh: {
    eyebrow: "关于",
    title:
      "China79 是一个专注于美中关系的独立倡议。",

    paragraph1:
      "China79 发布有关中国政治、经济、安全、文化以及中国在国际体系中角色的研究、分析、访谈和评论。",

    paragraph2:
      "China79 的创立基于这样一种理念：理解美中关系不应只通过竞争这一单一视角。我们的工作在分析双方分歧的同时，也关注合作、对话与互利的可能性，旨在推动对双边关系更加深入、全面和细致的讨论。",

    paragraph3:
      "除出版研究成果之外，China79 还希望通过国会交流、政策简报以及与政策制定者的通信，将研究和分析带入实际政策讨论。通过将研究与政策实践相结合，本倡议希望为塑造美国对华政策的讨论提供有建设性的观点。",

    focus: "重点领域",
    analysis: "分析",
    dialogue: "对话",
    policyOutreach: "政策交流",
    interviews: "访谈",
    relations: "美中关系",
  },
};

export default function AboutPageClient() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="container page-shell about-page">
      <div className="page-header">
        <div className="eyebrow">{t.eyebrow}</div>
        <h1>{t.title}</h1>
      </div>

      <div className="prose-grid">
        <div className="prose-main">
          <p>{t.paragraph1}</p>
          <p>{t.paragraph2}</p>
          <p>{t.paragraph3}</p>
        </div>

        <aside className="principles">
          <div className="kicker">{t.focus}</div>

          <p>{t.analysis}</p>
          <p>{t.dialogue}</p>
          <p>{t.policyOutreach}</p>
          <p>{t.interviews}</p>
          <p>{t.relations}</p>
        </aside>
      </div>
    </section>
  );
}
