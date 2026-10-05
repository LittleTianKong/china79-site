"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

const footerCopy = {
  en: {
    description:
      "Policy advocacy, independent research, accessible data, and perspectives on U.S.-China relations.",

    general: "General",
    policy: "Policy",

    explore: "Explore",
    research: "Research",
    data: "Data",
    policyOutreach: "Policy & Outreach",
    interviews: "Interviews",
    about: "About",
    contact: "Contact",

    copyright:
      "© 2026 China79 Initiative. Independent U.S.-China policy initiative.",
  },

  zh: {
    description:
      "聚焦美中关系的政策倡议、独立研究、开放数据与多元观点。",

    general: "一般联系",
    policy: "政策",

    explore: "浏览",
    research: "研究",
    data: "数据",
    policyOutreach: "政策与交流",
    interviews: "访谈",
    about: "关于",
    contact: "联系",

    copyright:
      "© 2026 China79倡议。独立美中政策倡议。",
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
              src="/china79-logo.png"
              alt="China79 Initiative"
              width={340}
              height={124}
              className="footer-logo"
            />
          </Link>

          <p>{t.description}</p>
        </div>

        <div className="footer-contact">
          <div className="footer-contact-group">
            <strong>{t.general}</strong>
            <a href="mailto:contact@china79.org">
              contact@china79.org
            </a>
          </div>

          <div className="footer-contact-group">
            <strong>{t.policy}</strong>
            <a href="mailto:policy@china79.org">
              policy@china79.org
            </a>
          </div>
        </div>

        <div className="footer-links">
          <strong>{t.explore}</strong>

          <Link href="/analysis">{t.research}</Link>
          <Link href="/data">{t.data}</Link>
          <Link href="/policy-outreach">{t.policyOutreach}</Link>
          <Link href="/interviews">{t.interviews}</Link>
          <Link href="/about">{t.about}</Link>
          <Link href="/contact">{t.contact}</Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>{t.copyright}</p>
      </div>
    </footer>
  );
}
