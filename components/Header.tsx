"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

const nav = {
  en: [
    ["About", "/about"],
    ["Research", "/analysis"],
    ["Data", "/data"],
    ["Policy & Outreach", "/policy-outreach"],
    ["Contact", "/contact"],
  ],
  zh: [
    ["关于", "/about"],
    ["研究", "/analysis"],
    ["数据", "/data"],
    ["政策与交流", "/policy-outreach"],
    ["联系", "/contact"],
  ],
};

export default function Header() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="China79 home">
          <Image
            src="/china79-logo.png"
            alt="China79 Initiative"
            width={340}
            height={124}
            priority
          />
        </Link>

        <div className="header-actions">
          <nav aria-label="Primary navigation">
            {nav[language].map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>

          <button
            className="language-toggle"
            onClick={toggleLanguage}
            type="button"
            aria-label={
              language === "en"
                ? "Switch site to Chinese"
                : "Switch site to English"
            }
          >
            {language === "en" ? "中文" : "EN"}
          </button>
        </div>
      </div>
    </header>
  );
}
