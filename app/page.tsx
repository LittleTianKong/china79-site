"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { dataCopy, initiative } from "@/lib/initiative";

const copy = {
  en: {
    browse: "Explore our data",
    analysisAction: "Read our analysis",
    dataTitleLead: "Documenting ",
    dataTitleSubject: "U.S.–China",
    dataTitleEnd: " engagement.",
    dataIntro:
      "We’re building a public record of diplomatic engagement between the United States and China, covering periods of cooperation, competition, and crisis.",
    collectionLabel: "Flagship dataset",
    collectionAction: "View collection details",
    collectionSummary:
      "Our forthcoming dataset aims to provide the most comprehensive freely accessible record of publicly documented official U.S.–China engagements since 1979. It will support comparisons across historical periods and U.S. administrations.",
    collectionQuestions: "Questions behind the dataset",
    collectionRelease:
      "The dataset will be published with source notes and methodology when it is ready.",
    originTitle: "Why 1979?",
    originSubtitle: "The starting point of a changing relationship.",
    originDescription:
      "In 1979, the United States and the People’s Republic of China established diplomatic relations. Our flagship dataset begins with that milestone, documenting official engagements across the decades that followed.",
    approach: "Read about our approach",
    researchLabel: "Research & understanding",
    researchTitle: "From historical records to better questions.",
    researchText:
      "Data gives analysis a foundation. Our research examines patterns of engagement, competition, and cooperation—and what the evidence can and cannot tell us.",
    researchAction: "Explore research",
    dialogueLabel: "Cooperation & dialogue",
    dialogueTitle: "Understanding through conversation.",
    dialogueText:
      "Conversations with scholars, practitioners, and people with firsthand experience offer new perspectives on China and the bilateral relationship.",
    dialogueAction: "Explore interviews",
  },
  zh: {
    browse: "探索数据",
    analysisAction: "阅读分析",
    dataTitleLead: "记录",
    dataTitleSubject: "美中交往",
    dataTitleEnd: "的历史。",
    dataIntro:
      "我们正在构建一份公开的美中外交接触记录，涵盖合作、竞争与危机等不同时期。",
    collectionLabel: "旗舰数据集",
    collectionAction: "查看数据集详情",
    collectionSummary:
      "本数据集正在开发中，旨在为1979年以来有公开记录的美中官方接触建立最全面、可免费获取的资料库，支持跨历史时期、跨美国政府的比较研究。",
    collectionQuestions: "本数据集关注的问题",
    collectionRelease:
      "数据集完成后，我们将一并发布数据文件、来源说明和研究方法。",
    originTitle: "为什么从1979年开始？",
    originSubtitle: "一段不断演变的关系，由此展开。",
    originDescription:
      "1979年，美国与中华人民共和国正式建立外交关系。我们的旗舰数据集以这一里程碑为起点，记录此后数十年间的两国官方接触。",
    approach: "了解我们的研究原则",
    researchLabel: "研究与理解",
    researchTitle: "从历史记录中，提出更好的问题。",
    researchText:
      "数据为分析奠定基础。我们的研究考察接触、竞争与合作的规律，并探讨证据能够以及不能说明什么。",
    researchAction: "浏览研究",
    dialogueLabel: "合作与对话",
    dialogueTitle: "通过访谈，增进理解。",
    dialogueText:
      "访谈学者、实践者及拥有亲身经历的人士，为理解中国及美中关系带来不同的视角。",
    dialogueAction: "浏览访谈",
  },
};

function PillarIllustration({ index }: { index: number }) {
  return (
    <div className="pillar-illustration" aria-hidden="true">
      <svg viewBox="0 0 320 160" fill="none" focusable="false">
        <circle className="pillar-art-surface" cx="160" cy="79" r="62" />
        <path className="pillar-art-guide" d="M34 142H286" />
        {index === 0 && (
          <g>
            <path className="pillar-art-guide" d="M110 23H208V119M98 35H196V131" />
            <rect className="pillar-art-paper" x="84" y="47" width="98" height="88" rx="3" />
            <path className="pillar-art-accent" d="M100 65H145" />
            <path d="M100 84H106M118 84H165M100 101H106M118 101H156M100 118H106M118 118H147" />
            <circle className="pillar-art-seal" cx="212" cy="108" r="26" />
            <path className="pillar-art-accent" d="M200 108L208 116L225 98" />
          </g>
        )}
        {index === 1 && (
          <g>
            <path className="pillar-art-guide" d="M48 112H272M64 106V118M112 106V118M160 106V118M208 106V118M256 106V118" />
            <path d="M58 91L103 62L145 84L187 46L242 68" />
            <circle className="pillar-art-paper" cx="58" cy="91" r="5" />
            <circle className="pillar-art-paper" cx="103" cy="62" r="5" />
            <circle className="pillar-art-paper" cx="242" cy="68" r="5" />
            <circle className="pillar-art-lens" cx="168" cy="68" r="42" />
            <path className="pillar-art-accent" d="M145 84L168 63L187 46M199 99L234 134" />
            <circle className="pillar-art-point" cx="168" cy="63" r="4" />
          </g>
        )}
        {index === 2 && (
          <g>
            <path className="pillar-art-seal" d="M142 69H242A12 12 0 0 1 254 81V115A12 12 0 0 1 242 127H226V141L206 127H142A12 12 0 0 1 130 115V81A12 12 0 0 1 142 69Z" />
            <path className="pillar-art-paper" d="M76 28H176A12 12 0 0 1 188 40V78A12 12 0 0 1 176 90H113L91 106V90H76A12 12 0 0 1 64 78V40A12 12 0 0 1 76 28Z" />
            <path d="M85 49H164M85 66H142" />
            <path className="pillar-art-accent" d="M154 108H229" />
            <circle className="pillar-art-point" cx="207" cy="89" r="3" />
            <circle className="pillar-art-point" cx="220" cy="89" r="3" />
            <circle className="pillar-art-point" cx="233" cy="89" r="3" />
          </g>
        )}
      </svg>
    </div>
  );
}

export default function HomePage() {
  const { language } = useLanguage();
  const identity = initiative[language];
  const data = dataCopy[language];
  const t = copy[language];
  return (
    <>
      <section className="container initiative-hero">
        <div className="initiative-hero-copy">
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
            <div className="initiative-actions">
              <Link className="primary-link" href="/data">
                {t.browse}
                <span aria-hidden="true">→</span>
              </Link>
              <Link className="text-link" href="/analysis">
                {t.analysisAction} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section
        className="container data-gateway section-rule"
        aria-labelledby="home-data-title"
      >
        <div className="data-gateway-header">
          <div>
            <div className="kicker">{data.label}</div>
            <h2 id="home-data-title">
              {t.dataTitleLead}<span>{t.dataTitleSubject}</span>{t.dataTitleEnd}
            </h2>
          </div>
          <p>{t.dataIntro}</p>
        </div>
        <article className="collection-feature">
          <div className="collection-feature-main">
            <div className="collection-heading">
              <span className="collection-label">{t.collectionLabel}</span>
              <span className="release-status">{data.status}</span>
            </div>
            <h3>
              <Link href="/data">{data.collectionTitle}</Link>
            </h3>
            <p>{t.collectionSummary}</p>
            <Link className="text-link collection-action" href="/data">
              {t.collectionAction} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="collection-question-preview">
            <h4>{t.collectionQuestions}</h4>
            <ol>
              {data.questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ol>
          </div>
          <p className="collection-release-note">{t.collectionRelease}</p>
        </article>
      </section>
      <section
        className="container origin-section section-rule"
        id="why-1979"
        aria-labelledby="origin-title"
      >
        <div className="origin-year" aria-hidden="true">1979</div>
        <div className="origin-copy">
          <h2 id="origin-title">{t.originTitle}</h2>
          <p className="origin-subtitle">{t.originSubtitle}</p>
          <p className="origin-description">{t.originDescription}</p>
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
              <PillarIllustration index={index} />
              <div className="pillar-contact">
                <p>{pillar.contactPrompt}</p>
                <a href="mailto:contact@china79.org">contact@china79.org</a>
              </div>
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
          <Link className="text-link" href="/interviews">
            {t.dialogueAction} <span aria-hidden="true">→</span>
          </Link>
        </article>
      </section>
    </>
  );
}
