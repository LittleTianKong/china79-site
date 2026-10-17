"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { initiative } from "@/lib/initiative";

const footerCopy = {
  en: {
    description: "Independent data and analysis on U.S.–China relations.",

    general: "General",
    policy: "Policy",

    explore: "Explore",
    research: "Research",
    data: "Data",
    policyOutreach: "Cooperation & Dialogue",
    interviews: "Interviews",
    about: "About",
    contact: "Contact",

    copyright: "China79 Initiative. Independent data, research, and dialogue.",
  },

  zh: {
    description: "关于美中关系的独立数据与分析。",

    general: "一般联系",
    policy: "政策",

    explore: "浏览",
    research: "研究",
    data: "数据",
    policyOutreach: "合作与对话",
    interviews: "访谈",
    about: "关于",
    contact: "联系",

    copyright: "China79 倡议。独立的数据、研究与对话。",
  },
};

export default function Footer() {
  const { language } = useLanguage();
  const t = footerCopy[language];

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" aria-label="China79 home">
            <Image
              src="/china79-logo.svg"
              alt="China79 Initiative"
              width={1338}
              height={328}
              className="footer-logo"
            />
          </Link>

          <p className="footer-tagline">{initiative[language].tagline}</p>
          <p>{t.description}</p>
        </div>

        <div className="footer-contact">
          <div className="footer-contact-group">
            <strong>{t.general}</strong>
            <a href="mailto:contact@china79.org">contact@china79.org</a>
          </div>

          <div className="footer-contact-group">
            <strong>{t.policy}</strong>
            <a href="mailto:policy@china79.org">policy@china79.org</a>
          </div>
        </div>

        <div className="footer-links">
          <strong>{t.explore}</strong>

          <Link href="/data">{t.data}</Link>
          <Link href="/analysis">{t.research}</Link>
          <Link href="/policy-outreach">{t.policyOutreach}</Link>
          <Link href="/interviews">{t.interviews}</Link>
          <Link href="/about">{t.about}</Link>
          <Link href="/contact">{t.contact}</Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} {t.copyright}
        </p>
      </div>
    </footer>
  );
}
