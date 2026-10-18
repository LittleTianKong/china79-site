"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const copy = {
  en: {
    label: "Citation",
    title: "Cite this dataset",
    seriesTitle: "Cite this series",
    seriesDescription: "This citation refers to the series of eight planned datasets. Cite individual datasets separately when using their records; publication years and version details will be added with their releases.",
    description:
      "This is a project citation while the dataset is in development. Publication year, version, and release details will be added when the data is published.",
    formats: "Citation format",
    plainText: "Plain text",
    bibtex: "BibTeX",
    plainTextLabel: "Plain text citation",
    bibtexLabel: "BibTeX citation",
    copy: "Copy citation",
    copying: "Copying…",
    copied: "Copied",
    copyingStatus: "Copying the citation…",
    copiedStatus: "Citation copied to clipboard.",
    manualStatus:
      "Automatic copying is unavailable. The citation is selected; use your device’s Copy command, Ctrl+C, or Command+C to copy it.",
  },
  zh: {
    label: "引用",
    title: "引用此数据集",
    seriesTitle: "引用本系列",
    seriesDescription: "以下引文适用于计划收录8个数据集的系列。使用其中某个数据集的记录时，请单独引用该数据集；正式发布时将补充出版年份及版本信息。",
    description:
      "数据集仍在开发中，以下为项目引用格式。数据发布时将补充出版年份、版本及发布信息。",
    formats: "引用格式",
    plainText: "纯文本",
    bibtex: "BibTeX",
    plainTextLabel: "纯文本引文",
    bibtexLabel: "BibTeX 引文",
    copy: "复制引文",
    copying: "正在复制…",
    copied: "已复制",
    copyingStatus: "正在复制引文…",
    copiedStatus: "引文已复制到剪贴板。",
    manualStatus:
      "无法自动复制。引文已选中，请使用设备的复制功能，或按 Ctrl+C / Command+C 进行复制。",
  },
} as const;

type CitationFormat = "text" | "bibtex";
type CopyStatus = "idle" | "copying" | "copied" | "manual";

export default function DatasetCitation({
  citation,
  bibtex,
  kind = "dataset",
  description,
}: {
  citation: string;
  bibtex: string;
  kind?: "dataset" | "series";
  description?: string;
}) {
  const { language } = useLanguage();
  const t = copy[language];
  const [format, setFormat] = useState<CitationFormat>("text");
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const copyRequestRef = useRef(0);
  const copyingRef = useRef(false);
  const citationText = format === "text" ? citation : bibtex;

  useEffect(() => {
    copyRequestRef.current += 1;
    copyingRef.current = false;
    setCopyStatus("idle");

    return () => {
      copyRequestRef.current += 1;
      copyingRef.current = false;
    };
  }, [citation, bibtex]);

  function changeFormat(nextFormat: CitationFormat) {
    if (copyingRef.current) return;
    setFormat(nextFormat);
    setCopyStatus("idle");
  }

  async function copyCitation() {
    if (copyingRef.current) return;

    copyingRef.current = true;
    const request = ++copyRequestRef.current;
    setCopyStatus("copying");

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API is unavailable");
      }

      await navigator.clipboard.writeText(citationText);

      if (request === copyRequestRef.current) {
        setCopyStatus("copied");
      }
    } catch {
      if (request === copyRequestRef.current) {
        textareaRef.current?.focus();
        textareaRef.current?.select();
        setCopyStatus("manual");
      }
    } finally {
      if (request === copyRequestRef.current) {
        copyingRef.current = false;
      }
    }
  }

  const statusMessage =
    copyStatus === "copying"
      ? t.copyingStatus
      : copyStatus === "copied"
        ? t.copiedStatus
        : copyStatus === "manual"
          ? t.manualStatus
          : "";

  return (
    <section
      id="citation"
      className="dataset-citation"
      aria-labelledby="dataset-citation-title"
    >
      <div className="dataset-citation-heading">
        <div className="dataset-citation-label">{t.label}</div>
        <h2 id="dataset-citation-title">{kind === "series" ? t.seriesTitle : t.title}</h2>
        <p
          id="dataset-citation-description"
          className="dataset-citation-description"
        >
          {description ?? (kind === "series" ? t.seriesDescription : t.description)}
        </p>
      </div>
      <div className="dataset-citation-controls">
        <div
          className="dataset-citation-formats"
          role="group"
          aria-label={t.formats}
        >
          <button
            type="button"
            className="dataset-citation-format"
            aria-pressed={format === "text"}
            aria-controls="dataset-citation-text"
            disabled={copyStatus === "copying"}
            onClick={() => changeFormat("text")}
          >
            {t.plainText}
          </button>
          <button
            type="button"
            className="dataset-citation-format"
            aria-pressed={format === "bibtex"}
            aria-controls="dataset-citation-text"
            disabled={copyStatus === "copying"}
            onClick={() => changeFormat("bibtex")}
          >
            {t.bibtex}
          </button>
        </div>
        <button
          type="button"
          className="dataset-citation-copy"
          disabled={copyStatus === "copying"}
          onClick={copyCitation}
        >
          {copyStatus === "copying"
            ? t.copying
            : copyStatus === "copied"
              ? t.copied
              : t.copy}
        </button>
      </div>
      <textarea
        id="dataset-citation-text"
        ref={textareaRef}
        className="dataset-citation-text"
        aria-label={format === "text" ? t.plainTextLabel : t.bibtexLabel}
        aria-describedby="dataset-citation-description"
        lang="en"
        readOnly
        spellCheck={false}
        rows={format === "text" ? 5 : 10}
        value={citationText}
      />
      <p
        className="dataset-citation-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {statusMessage}
      </p>
    </section>
  );
}
