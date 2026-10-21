"use client";

import Link from "next/link";
import ResearchArtwork from "@/components/ResearchArtwork";
import { articles } from "@/lib/content";
import { useLanguage } from "@/components/LanguageProvider";

const copy = {
  en: {
    eyebrow: "Research & understanding",
    title: "Research grounded", titleEnd: "in the record.",
    description: "Independent analysis of U.S.–China relations, built on historical evidence. We examine the forces that shape competition, cooperation, and the choices in between.",
    navigation: "Explore our research", projects: "Research projects", approach: "Our approach", submit: "Submit research",
    featured: "Featured project", status: "In development", view: "View project", read: "Read analysis",
    release: "Full analysis and sources will be published when this research is ready.",
    agenda: "Research agenda", agendaTitle: "Ideas we’re exploring.",
    agendaText: "Forthcoming work on the policies, people, and ideas that shape the relationship.",
    approachTitle: "The question is a starting point.",
    approachText: "Our questions begin with the historical record. Evidence determines the answers, and transparent sources let readers examine our conclusions.",
    principles: [
      { title: "Start with the record.", text: "Ground arguments in documented events and sources that readers can examine." },
      { title: "Make uncertainty visible.", text: "Explain what the evidence supports, where it is incomplete, and what remains open to debate." },
      { title: "Follow the findings.", text: "Examine conflict and failed dialogue with the same care as successful cooperation." },
    ],
    dataLink: "Explore the data behind our work",
    contribute: "Contribute to China79", contributeTitle: "Have research to share?",
    contributeText: "We welcome proposals and research submissions on U.S.–China relations. Send a short summary of your work and its sources to start a conversation.",
  },
  zh: {
    eyebrow: "研究与理解",
    title: "以历史为基础，", titleEnd: "以证据为依据。",
    description: "以历史证据为基础，独立分析美中关系。我们考察影响竞争、合作以及政策选择的各种因素。",
    navigation: "探索研究", projects: "研究项目", approach: "研究方法", submit: "提交研究",
    featured: "重点项目", status: "研究中", view: "查看项目", read: "阅读全文",
    release: "研究准备就绪后，我们将发布完整分析及资料来源。",
    agenda: "研究议题", agendaTitle: "我们正在探索的问题。",
    agendaText: "关注塑造两国关系的政策、人物与观念，相关研究将陆续推出。",
    approachTitle: "问题是研究的起点。",
    approachText: "我们从历史记录出发提出问题，让证据决定答案，并以透明的来源帮助读者检验我们的结论。",
    principles: [
      { title: "从历史记录出发。", text: "以有据可查的事件和资料为基础，让读者能够检验论据。" },
      { title: "明确呈现不确定性。", text: "说明证据能够支持哪些结论、资料存在哪些缺口，以及哪些问题仍有待讨论。" },
      { title: "以研究发现为准绳。", text: "以同样严谨的态度考察冲突、对话失败与成功合作。" },
    ],
    dataLink: "探索研究背后的数据",
    contribute: "参与 China79", contributeTitle: "有研究想与我们分享？",
    contributeText: "我们欢迎关于美中关系的研究建议与投稿。请发送简要介绍及相关资料来源，与我们交流。",
  },
};

const artwork = {
  "cooperation-beyond-competition": "cooperation",
  "mandarin-pipeline": "education",
  "video-games-soft-power": "culture",
} as const;

export default function AnalysisPageClient() {
  const { language } = useLanguage();
  const t = copy[language];
  const [featured, ...projects] = articles;
  const title = (article: typeof featured) => language === "zh" ? article.titleZh : article.title;
  const summary = (article: typeof featured) => language === "zh" ? article.dekZh : article.dek;
  const category = (article: typeof featured) => language === "zh" ? article.sectionZh : article.section;

  return (
    <div className="research-page">
      <header className="container research-header">
        <div><div className="eyebrow">{t.eyebrow}</div><h1>{t.title}<br />{t.titleEnd}</h1></div>
        <p>{t.description}</p>
      </header>

      <nav className="container research-navigation" aria-label={t.navigation}>
        <a href="#research-projects">{t.projects}</a>
        <a href="#research-approach">{t.approach}</a>
        <a href="#research-submissions">{t.submit}<span aria-hidden="true">↗</span></a>
      </nav>

      <section className="container research-projects" id="research-projects" aria-label={t.projects}>
        <article className="research-feature">
          <ResearchArtwork variant="relationship" />
          <div className="research-feature-copy">
            <div className="research-feature-labels"><span className="kicker">{t.featured}</span>{featured.status === "in-development" && <span className="release-status">{t.status}</span>}</div>
            <div className="research-category">{category(featured)}</div>
            <h2><Link href={`/analysis/${featured.slug}`}>{title(featured)}</Link></h2>
            <p>{summary(featured)}</p>
            <Link className="text-link" href={`/analysis/${featured.slug}`}>{featured.status === "in-development" ? t.view : t.read}<span aria-hidden="true">→</span></Link>
            {featured.status === "in-development" && <p className="research-release-note">{t.release}</p>}
          </div>
        </article>

        <div className="research-agenda-heading">
          <div><div className="kicker">{t.agenda}</div><h2>{t.agendaTitle}</h2></div>
          <p>{t.agendaText}</p>
        </div>
        <div className="research-grid">
          {projects.map(article => <article className="research-preview" key={article.slug}>
            <ResearchArtwork variant={artwork[article.slug as keyof typeof artwork] ?? "relationship"} />
            <div className="research-preview-copy">
              <div className="research-category">{category(article)}</div>
              <h3><Link href={`/analysis/${article.slug}`}>{title(article)}</Link></h3>
              <p>{summary(article)}</p>
              <div className="research-preview-footer">
                {article.status === "in-development" && <span className="research-project-status">{t.status}</span>}
                <Link className="text-link" href={`/analysis/${article.slug}`} aria-label={`${article.status === "in-development" ? t.view : t.read}: ${title(article)}`}>{article.status === "in-development" ? t.view : t.read}<span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </article>)}
        </div>
      </section>

      <section className="research-approach" id="research-approach" aria-labelledby="research-approach-title">
        <div className="container">
          <div className="research-approach-heading"><div><div className="eyebrow">{t.approach}</div><h2 id="research-approach-title">{t.approachTitle}</h2></div><p>{t.approachText}</p></div>
          <div className="research-principles">{t.principles.map((principle, index) => <div key={principle.title}><span aria-hidden="true">0{index + 1}</span><h3>{principle.title}</h3><p>{principle.text}</p></div>)}</div>
          <Link className="research-data-link" href="/data">{t.dataLink}<span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="container research-submissions" id="research-submissions" aria-labelledby="research-submissions-title">
        <div><div className="kicker">{t.contribute}</div><h2 id="research-submissions-title">{t.contributeTitle}</h2><p>{t.contributeText}</p></div>
        <a className="research-email" href="mailto:contact@china79.org">contact@china79.org<span aria-hidden="true">↗</span></a>
      </section>
    </div>
  );
}
