"use client";

import { useLanguage } from "@/components/LanguageProvider";

const copy = {
  en: {
    eyebrow: "Data",
    title: "Open data for better U.S.-China research.",
    dek:
      "China79 is developing accessible databases and research tools designed to make information on U.S.-China relations easier to explore, compare, and use.",

    status: "Database · In Development",
    databaseTitle: "China79 Research Database",
    databaseDek:
      "A searchable public resource bringing together structured information relevant to U.S.-China policy, research, and public understanding.",

    comingTitle: "What to expect",
    itemOne: "Searchable and filterable records",
    itemTwo: "Clearly documented sources and methodology",
    itemThree: "Downloadable data for independent research",
    itemFour: "Regular updates as new information becomes available",

    note:
      "The first China79 database is currently in development. Additional information on scope, methodology, and data access will be published here.",
  },

  zh: {
    eyebrow: "数据",
    title: "以开放数据支持更深入的美中研究。",
    dek:
      "China79 正在开发便于获取的数据库和研究工具，使有关美中关系的信息更易于检索、比较和使用。",

    status: "数据库 · 开发中",
    databaseTitle: "China79 研究数据库",
    databaseDek:
      "一个可搜索的公共资源，汇集与美中政策、研究和公众理解相关的结构化信息。",

    comingTitle: "未来功能",
    itemOne: "可搜索和筛选的数据记录",
    itemTwo: "清晰记录的数据来源与研究方法",
    itemThree: "可下载的数据，支持独立研究",
    itemFour: "随着新信息发布持续更新",

    note:
      "China79 的首个数据库目前正在开发中。有关数据库范围、研究方法和数据获取方式的更多信息将在此发布。",
  },
};

export default function DataPageClient() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <div className="page-shell">
      <section className="container page-header">
        <div className="eyebrow">{t.eyebrow}</div>
        <h1>{t.title}</h1>
        <p>{t.dek}</p>
      </section>

      <section className="container section-rule data-section">
        <div className="database-preview">
          <div className="kicker">{t.status}</div>

          <h2>{t.databaseTitle}</h2>

          <p>{t.databaseDek}</p>

          <div className="database-features">
            <h3>{t.comingTitle}</h3>

            <ul>
              <li>{t.itemOne}</li>
              <li>{t.itemTwo}</li>
              <li>{t.itemThree}</li>
              <li>{t.itemFour}</li>
            </ul>
          </div>

          <p className="database-note">{t.note}</p>
        </div>
      </section>
    </div>
  );
}
