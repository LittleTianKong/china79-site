"use client";

import Link from "next/link";
import DatasetCover from "@/components/DatasetCover";
import { useLanguage } from "@/components/LanguageProvider";
import { trumpFirstAdministrationDataset as featuredDataset } from "@/lib/datasets";
import { dataCopy, initiative } from "@/lib/initiative";
import styles from "./HomeDatasetFeature.module.css";

const copy = {
  en: {
    browse: "Explore our data",
    latestRelease: "Latest dataset",
    available: "Now available",
    coverSeries: "Dataset 01 · Flagship Series",
    coverPeriod: "Trump I · 2017–2021",
    featuredSummary:
      "Explore the documented official contacts of Trump’s first administration, with source links, counting decisions, and a codebook to guide your analysis.",
    records: "Records",
    fields: "Data fields",
    cells: "Populated data cells",
    datasetAction: "View & download dataset",
    datasetCitation: "Copy a citation",
    dataTitle: "A clearer record. A more informed conversation.",
    dataIntro:
      "China79 brings detailed, source-linked records of U.S.–China engagement into freely accessible datasets. We make the historical record easier to explore, compare, and understand, supporting research and a more informed public conversation about the relationship.",
    collectionLabel: "Flagship Series",
    collectionAction: "Explore the series",
    collectionSummary:
      "Our flagship series is planned to include eight datasets documenting publicly recorded official U.S.–China engagements since 1979. Freely accessible files, source references, and consistent definitions will support comparisons across historical periods and U.S. administrations.",
    collectionQuestions: "Questions behind the series",
    collectionRelease:
      "The first dataset is available now. Data files, source notes, and methodology will accompany each additional release.",
    originTitle: "Why 1979?",
    originSubtitle: "The starting point of a changing relationship.",
    originDescription:
      "In 1979, the United States and the People’s Republic of China established diplomatic relations. Our flagship series of eight datasets begins with that milestone, documenting official engagements across the decades that followed.",
    approach: "Read about our approach",
    researchLabel: "Analysis",
    researchTitle: "Research grounded in evidence.",
    researchText:
      "Explore how U.S.–China engagement, competition, and cooperation have evolved through analysis grounded in the historical record.",
    researchAction: "Read our analysis",
    dialogueLabel: "Interviews",
    dialogueTitle: "Perspectives shaped by experience.",
    dialogueText:
      "Our interview series will bring together scholars, practitioners, and people with firsthand experience of China and the bilateral relationship.",
    dialogueAction: "Explore interviews",
  },
  zh: {
    browse: "探索数据",
    latestRelease: "最新数据集",
    available: "已发布",
    coverSeries: "数据集01 · 旗舰系列",
    coverPeriod: "特朗普第一届政府 · 2017—2021",
    featuredSummary:
      "探索特朗普第一届政府期间有公开记录的官方接触，并通过来源链接、统计处理说明和编码手册开展分析。",
    records: "记录",
    fields: "数据字段",
    cells: "已填数据单元格",
    datasetAction: "查看并下载数据集",
    datasetCitation: "复制引文",
    dataTitle: "更清晰的记录，更有依据的讨论。",
    dataIntro:
      "China79 将详细、附有来源链接的美中接触记录整理为可免费获取的数据集。我们让历史记录更便于探索、比较和理解，为研究以及关于双边关系的公共讨论提供更扎实的依据。",
    collectionLabel: "旗舰系列",
    collectionAction: "探索本系列",
    collectionSummary:
      "我们的旗舰系列计划包含8个数据集，记录1979年以来有公开记录的美中官方接触。可免费获取的数据文件、来源说明和一致的定义，将支持跨历史时期、跨美国政府的比较研究。",
    collectionQuestions: "本系列关注的问题",
    collectionRelease:
      "首个数据集现已发布。后续各数据集发布时，我们将一并提供数据文件、来源说明和研究方法。",
    originTitle: "为什么从1979年开始？",
    originSubtitle: "一段不断演变的关系，由此展开。",
    originDescription:
      "1979年，美国与中华人民共和国正式建立外交关系。我们的旗舰系列由8个数据集组成，以这一里程碑为起点，记录此后数十年间的两国官方接触。",
    approach: "了解我们的研究原则",
    researchLabel: "分析",
    researchTitle: "以证据为基础，理解关系变化。",
    researchText:
      "通过基于历史记录的分析，考察美中接触、竞争与合作如何随时间演变。",
    researchAction: "阅读分析",
    dialogueLabel: "访谈",
    dialogueTitle: "从亲身经历中，理解不同视角。",
    dialogueText:
      "我们的访谈系列将邀请学者、实践者及亲历者，分享他们对中国及美中关系的观察与经验。",
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

export default function HomePageClient() {
  const { language } = useLanguage();
  const identity = initiative[language];
  const data = dataCopy[language];
  const t = copy[language];
  const number = new Intl.NumberFormat(language === "zh" ? "zh-CN" : "en-US");
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
            <p className="initiative-description">
              {identity.description.split(/(federal-level|U\.S\.–China)/).map((part, index) => (
                <span key={index} className={part === "federal-level" || part === "U.S.–China" ? "initiative-phrase" : undefined}>{part}</span>
              ))}
            </p>
            <div className="initiative-actions">
              <Link className="primary-link" href="/data">
                {t.browse}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className={`container ${styles.section}`} aria-labelledby="home-featured-dataset-title">
        <div className={styles.feature}>
          <Link
            className={styles.cover}
            href={featuredDataset.path}
            aria-label={`${t.datasetAction}: ${featuredDataset.title[language]}`}
          >
            <DatasetCover
              title={featuredDataset.shortTitle[language]}
              seriesLabel={t.coverSeries}
              periodLabel={t.coverPeriod}
            />
          </Link>
          <div className={styles.copy}>
            <div className={styles.labels}>
              <span className="kicker">{t.latestRelease}</span>
              <span className={styles.status}>{t.available}</span>
            </div>
            <h2 id="home-featured-dataset-title">
              <Link href={featuredDataset.path}>{featuredDataset.title[language]}</Link>
            </h2>
            <p className={styles.summary}>{t.featuredSummary}</p>
            <dl className={styles.facts}>
              <div><dt>{t.records}</dt><dd>{number.format(featuredDataset.retainedRecords)}</dd></div>
              <div><dt>{featuredDataset.populatedCells !== undefined ? t.cells : t.fields}</dt><dd>{number.format(featuredDataset.populatedCells ?? featuredDataset.fieldCount)}</dd></div>
            </dl>
            <div className={styles.actions}>
              <Link className="primary-link" href={featuredDataset.path}>
                {t.datasetAction}<span aria-hidden="true">→</span>
              </Link>
              <Link className="text-link" href={`${featuredDataset.path}#citation`}>
                {t.datasetCitation}<span aria-hidden="true">→</span>
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
              {t.dataTitle}
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
              <Link href="/data/us-china-engagement">{data.collectionTitle}</Link>
            </h3>
            <p>{t.collectionSummary}</p>
            <Link className="text-link collection-action" href="/data/us-china-engagement">
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
      <section
        className="container supporting-work home-supporting-work"
        id="analysis-and-interviews"
      >
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
