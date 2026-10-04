"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Language = "en" | "zh";

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("china79-language");

    if (savedLanguage === "zh" || savedLanguage === "en") {
      setLanguage(savedLanguage);

      document.documentElement.lang =
        savedLanguage === "zh" ? "zh-CN" : "en";
    }
  }, []);

  function toggleLanguage() {
    const nextLanguage = language === "en" ? "zh" : "en";

    setLanguage(nextLanguage);

    localStorage.setItem("china79-language", nextLanguage);

    document.documentElement.lang =
      nextLanguage === "zh" ? "zh-CN" : "en";
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}
