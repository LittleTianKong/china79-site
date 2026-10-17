"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const nav = {
  en: [
    ["Data", "/data"],
    ["Research", "/analysis"],
    ["About", "/about"],
    ["Dialogue", "/policy-outreach"],
    ["Contact", "/contact"],
  ],
  zh: [
    ["数据", "/data"],
    ["研究", "/analysis"],
    ["关于", "/about"],
    ["对话", "/policy-outreach"],
    ["联系", "/contact"],
  ],
};

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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
          <nav
            id="primary-navigation"
            className={
              menuOpen ? "primary-navigation is-open" : "primary-navigation"
            }
            aria-label={language === "zh" ? "主导航" : "Primary navigation"}
          >
            {nav[language].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={
                  pathname === href || pathname.startsWith(`${href}/`)
                    ? "page"
                    : undefined
                }
                onClick={() => setMenuOpen(false)}
              >
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
          <button
            className="menu-toggle"
            type="button"
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {language === "zh"
              ? menuOpen
                ? "关闭"
                : "菜单"
              : menuOpen
                ? "Close"
                : "Menu"}
          </button>
        </div>
      </div>
    </header>
  );
}
