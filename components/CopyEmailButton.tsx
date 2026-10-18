"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./CopyEmailButton.module.css";

type CopyEmailButtonProps = {
  email: string;
  language: "en" | "zh";
  theme?: "light" | "dark";
};

export default function CopyEmailButton({
  email,
  language,
  theme = "light",
}: CopyEmailButtonProps) {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<"copied" | "manual" | null>(null);
  const mounted = useRef(true);
  const inFlight = useRef(false);
  const fallbackInput = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const statusId = useId();
  const isChinese = language === "zh";

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (status === "manual") {
      fallbackInput.current?.focus();
      fallbackInput.current?.select();
    }
  }, [status]);

  async function copyEmail() {
    if (inFlight.current) return;
    inFlight.current = true;
    setPending(true);
    setStatus(null);

    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(email);
      if (mounted.current) setStatus("copied");
    } catch {
      if (mounted.current) setStatus("manual");
    } finally {
      inFlight.current = false;
      if (mounted.current) setPending(false);
    }
  }

  return (
    <div className={`${styles.copyEmail} ${styles[theme]}`}>
      <button
        className={styles.button}
        type="button"
        onClick={copyEmail}
        disabled={pending}
        aria-busy={pending}
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
          <path d="M7 6V3.5H16.5V13H14M3.5 7H13V16.5H3.5Z" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        {pending
          ? isChinese ? "正在复制…" : "Copying…"
          : isChinese ? "复制邮箱" : "Copy email"}
      </button>
      <p className={styles.status} id={statusId} role="status" aria-live="polite" aria-atomic="true">
        {status === "copied" && (isChinese ? "邮箱已复制。" : "Email copied.")}
        {status === "manual" && (isChinese
          ? "请选中下方邮箱地址并手动复制。"
          : "Select and copy the email address below.")}
      </p>
      {status === "manual" && (
        <div className={styles.fallback}>
          <label htmlFor={inputId}>{isChinese ? "邮箱地址" : "Email address"}</label>
          <input
            ref={fallbackInput}
            id={inputId}
            className={styles.input}
            type="text"
            value={email}
            readOnly
            autoComplete="off"
            spellCheck={false}
            aria-describedby={statusId}
            onFocus={(event) => event.currentTarget.select()}
            onClick={(event) => event.currentTarget.select()}
          />
        </div>
      )}
    </div>
  );
}
