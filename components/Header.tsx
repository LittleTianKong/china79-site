"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const nav = {
  en: [
    ["Data", "/data"],
    ["Research", "/analysis"],
    ["About", "/about"],
    ["Interviews", "/interviews"],
    ["Contact", "/contact"],
  ],
  zh: [
    ["数据", "/data"],
    ["研究", "/analysis"],
    ["关于", "/about"],
    ["访谈", "/interviews"],
    ["联系", "/contact"],
  ],
};

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigationRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (menuOpen) navigationRef.current?.querySelector("a")?.focus();
  }, [menuOpen]);

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          event.preventDefault();
          setMenuOpen(false);
          menuToggleRef.current?.focus();
        }
      }}
    >
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="China79 home" onClick={() => setMenuOpen(false)}>
          <Image
            src="/china79-logo.svg"
            alt="China79 Initiative"
            width={1338}
            height={328}
            priority
          />
        </Link>

        <div className="header-actions">
          <nav
            ref={navigationRef}
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
                className="nav-jump-link"
                aria-current={
                  pathname === href || pathname.startsWith(`${href}/`)
                    ? "page"
                    : undefined
                }
                onClick={() => setMenuOpen(false)}
              >
                <span>{label}</span>
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
            ref={menuToggleRef}
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
