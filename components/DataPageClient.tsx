"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { dataCopy } from "@/lib/initiative";

export default function DataPageClient() {
  const { language } = useLanguage();
  const t = dataCopy[language];
  return (
    <div className="page-shell">
      <section className="container page-header">
        <div className="eyebrow">{t.label}</div>
        <h1>{t.title}</h1>
        <p>{t.description}</p>
      </section>
      <section
        className="container collection-section section-rule"
        aria-labelledby="collection-title"
      >
        <div className="collection-heading">
          <span className="kicker">{t.collectionLabel}</span>
          <span className="release-status">{t.status}</span>
        </div>
        <h2 id="collection-title">{t.collectionTitle}</h2>
        <p className="collection-description">{t.collectionDescription}</p>
        <p className="collection-availability">{t.availability}</p>
        <div className="research-questions">
          <h3>{t.questionsLabel}</h3>
          <ol>
            {t.questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ol>
        </div>
      </section>
      <section
        className="container publishing-section section-rule"
        aria-labelledby="standards-title"
      >
        <div className="kicker">{t.standardsLabel}</div>
        <h2 id="standards-title">{t.standardsTitle}</h2>
        <div className="publishing-standards">
          {t.standards.map((standard) => (
            <article key={standard.title}>
              <h3>{standard.title}</h3>
              <p>{standard.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="container data-contact section-rule">
        <div>
          <h2>{t.contactLabel}</h2>
          <p>{t.contactText}</p>
        </div>
        <Link className="primary-link" href="/contact">
          {t.contactAction} <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}
