"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { contactSubject, contactTopics, ContactMessage, ContactTopic, formatContactMessage } from "@/lib/contact";
import styles from "./ContactForm.module.css";

const copy = {
  en: {
    eyebrow: "Contact China79", title: "What’s on your mind?", close: "Close contact form",
    intro: "Share a little context. Your message is addressed to contact@china79.org.",
    topic: "Topic", topics: ["General inquiry", "Datasets & access", "Research submission", "Interviews & guests", "Sources & corrections"],
    name: "Your name", email: "Email address", organization: "Organization", optional: "optional", message: "Your message",
    required: "Name, email, and message are required.",
    placeholders: ["How can we help?", "Which dataset are you interested in, and how do you hope to use it?", "Tell us about your research. Include a summary and links to your work and sources.", "Who would you like to hear from? Share a guest, topic, or relevant experience.", "Include the relevant page or record, the source, and any supporting evidence."],
    links: "For research, documents, or videos, include a link in your message.",
    privacy: "China79 will use the details you provide to respond to your inquiry.",
    draftNote: "This form prepares an email draft. Review and send it in your email app, or copy it into your preferred email service.",
    send: "Send message", sending: "Sending…", draft: "Prepare email draft", cancel: "Cancel",
    successTitle: "Thank you for getting in touch.", successText: "Your message has been submitted to China79.", done: "Done",
    error: "Your message wasn’t sent. Please try again, or use the email option below. Your text is still here.",
    invalid: "Please check your name, email address, and message, then try again.",
    limited: "There have been several submissions. Please wait a few minutes, or use the email option below.",
    draftTitle: "Your email draft is ready.", draftHelp: "Nothing has been sent yet. Open your mail app to review and send it, or copy the draft into your email service.",
    open: "Open email app", copy: "Copy email draft", copied: "Draft copied.", manual: "Select and copy the draft below.",
    back: "Back to form", fallback: "Use email instead", draftLabel: "Email draft", to: "To", subject: "Subject",
  },
  zh: {
    eyebrow: "联系 China79", title: "您想与我们交流什么？", close: "关闭联系表单",
    intro: "请简要介绍相关背景。您的消息将发送至 contact@china79.org。",
    topic: "主题", topics: ["一般咨询", "数据集与获取方式", "研究投稿", "访谈与嘉宾", "来源与更正"],
    name: "您的姓名", email: "邮箱地址", organization: "所属机构", optional: "选填", message: "您的消息",
    required: "姓名、邮箱及消息内容为必填项。",
    placeholders: ["我们可以为您提供什么帮助？", "请说明您关注的数据集及希望如何使用数据。", "请简要介绍您的研究，并附上研究成果与资料来源的链接。", "欢迎推荐嘉宾、提出访谈主题，或介绍您能够分享的相关经验。", "请附上相关页面或记录、资料来源及支持证据。"],
    links: "如需分享研究、文档或视频，请在消息中附上链接。",
    privacy: "China79 将使用您提供的信息回复您的咨询。",
    draftNote: "此表单将生成邮件草稿。请在邮件应用中确认并发送，或复制到常用的邮箱服务中。",
    send: "发送消息", sending: "正在发送…", draft: "生成邮件草稿", cancel: "取消",
    successTitle: "感谢您的联系。", successText: "您的消息已提交至 China79。", done: "完成",
    error: "消息尚未发送。请重试，或使用下方的邮件选项。您填写的内容已保留。",
    invalid: "请检查姓名、邮箱地址及消息内容后重试。",
    limited: "提交次数较多，请稍候几分钟再试，或使用下方的邮件选项。",
    draftTitle: "邮件草稿已准备好。", draftHelp: "消息尚未发送。请打开邮件应用确认并发送，或将草稿复制到常用的邮箱服务中。",
    open: "打开邮件应用", copy: "复制邮件草稿", copied: "草稿已复制。", manual: "请选中并复制下方草稿。",
    back: "返回表单", fallback: "改用邮件发送", draftLabel: "邮件草稿", to: "收件人", subject: "主题",
  },
};

type Props = { topic: ContactTopic | null; language: "en" | "zh"; deliveryEnabled: boolean; onClose: () => void };

export default function ContactForm({ topic, language, deliveryEnabled, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const resultTitle = useRef<HTMLHeadingElement>(null);
  const draftText = useRef<HTMLTextAreaElement>(null);
  const busy = useRef(false);
  const [data, setData] = useState<ContactMessage>({ topic: "general", name: "", email: "", organization: "", message: "" });
  const [website, setWebsite] = useState("");
  const [view, setView] = useState<"form" | "sent" | "draft">("form");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<"invalid" | "limited" | "error" | null>(null);
  const [copyStatus, setCopyStatus] = useState<"copied" | "manual" | null>(null);
  const t = copy[language];

  useEffect(() => {
    if (topic) {
      setData((previous) => ({ ...previous, topic }));
      setError(null);
      setCopyStatus(null);
      setView("form");
      if (!dialog.current?.open) dialog.current?.showModal();
    } else dialog.current?.close();
  }, [topic]);

  useEffect(() => {
    if (view !== "form") resultTitle.current?.focus();
  }, [view]);

  function update(field: keyof ContactMessage, value: string) {
    setData((previous) => ({ ...previous, [field]: value }));
    setError(null);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    if (!data.name.trim() || data.message.trim().length < 10) { setError("invalid"); return; }
    if (!deliveryEnabled) { setView("draft"); return; }
    busy.current = true;
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website }), signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        setError(response.status === 400 ? "invalid" : response.status === 429 ? "limited" : "error");
        return;
      }
      setView("sent");
      setData({ topic: data.topic, name: "", email: "", organization: "", message: "" });
    } catch { setError("error"); }
    finally { busy.current = false; setPending(false); }
  }

  const body = formatContactMessage(data);
  const draft = `${t.to}: contact@china79.org\n${t.subject}: ${contactSubject[data.topic]}\n\n${body}`;

  async function copyDraft() {
    try { await navigator.clipboard.writeText(draft); setCopyStatus("copied"); }
    catch { setCopyStatus("manual"); draftText.current?.focus(); draftText.current?.select(); }
  }

  return (
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="contact-form-title" aria-describedby="contact-form-description" onClose={onClose} onCancel={(event) => { if (busy.current) event.preventDefault(); }}>
      <div className={styles.header}>
        <div><div className="kicker">{t.eyebrow}</div><h2 id="contact-form-title">{t.title}</h2></div>
        <button className={styles.close} type="button" onClick={onClose} disabled={pending} aria-label={t.close}>×</button>
      </div>
      {view === "form" ? <form onSubmit={submit} className={styles.form}>
        <p id="contact-form-description" className={styles.intro}>{t.intro}</p>
        <p className={styles.required}>{t.required}</p>
        <fieldset disabled={pending}>
          <label htmlFor="contact-topic">{t.topic}</label>
          <select id="contact-topic" name="topic" value={data.topic} onChange={(event) => update("topic", event.target.value)}>{contactTopics.map((value, index) => <option key={value} value={value}>{t.topics[index]}</option>)}</select>
          <div className={styles.row}>
            <div><label htmlFor="contact-name">{t.name}</label><input autoComplete="name" id="contact-name" name="name" required maxLength={100} value={data.name} onChange={(event) => update("name", event.target.value)} /></div>
            <div><label htmlFor="contact-email">{t.email}</label><input type="email" autoComplete="email" id="contact-email" name="email" required maxLength={254} value={data.email} onChange={(event) => update("email", event.target.value)} /></div>
          </div>
          <label htmlFor="contact-organization">{t.organization} <span>({t.optional})</span></label>
          <input autoComplete="organization" id="contact-organization" name="organization" maxLength={150} value={data.organization} onChange={(event) => update("organization", event.target.value)} />
          <label htmlFor="contact-message">{t.message}</label>
          <textarea id="contact-message" name="message" required minLength={10} maxLength={5000} rows={5} placeholder={t.placeholders[contactTopics.indexOf(data.topic)]} value={data.message} onChange={(event) => update("message", event.target.value)} aria-describedby="contact-message-help" />
          <p id="contact-message-help" className={styles.hint}>{t.links} <span>{data.message.length}/5000</span></p>
          <div className={styles.trap} aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" name="website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" /></div>
        </fieldset>
        <p className={styles.note}>{deliveryEnabled ? t.privacy : t.draftNote}</p>
        {error && <div className={styles.error} role="alert"><p>{t[error]}</p><button type="button" className={styles.textButton} onClick={() => setView("draft")}>{t.fallback} →</button></div>}
        <div className={styles.actions}><button className={styles.primary} type="submit" disabled={pending} aria-busy={pending}>{pending ? t.sending : deliveryEnabled ? t.send : t.draft}<span aria-hidden="true">↗</span></button><button className={styles.secondary} type="button" onClick={onClose} disabled={pending}>{t.cancel}</button></div>
        <p className={styles.status} role="status">{pending ? t.sending : ""}</p>
      </form> : view === "sent" ? <div className={styles.result}>
        <span className={styles.check} aria-hidden="true">✓</span><h3 ref={resultTitle} tabIndex={-1}>{t.successTitle}</h3><p id="contact-form-description">{t.successText}</p><button type="button" className={styles.primary} onClick={onClose}>{t.done}</button>
      </div> : <div className={styles.result}>
        <h3 ref={resultTitle} tabIndex={-1}>{t.draftTitle}</h3><p id="contact-form-description">{t.draftHelp}</p>
        <label className={styles.draftLabel} htmlFor="contact-email-draft">{t.draftLabel}</label><textarea className={styles.draft} id="contact-email-draft" ref={draftText} readOnly rows={8} value={draft} onFocus={(event) => event.currentTarget.select()} />
        <div className={styles.actions}><a className={styles.primary} href={`mailto:contact@china79.org?subject=${encodeURIComponent(contactSubject[data.topic])}&body=${encodeURIComponent(body)}`}>{t.open}<span aria-hidden="true">↗</span></a><button className={styles.secondary} type="button" onClick={copyDraft}>{t.copy}</button></div>
        <p className={styles.status} role="status">{copyStatus ? t[copyStatus] : ""}</p><button className={styles.textButton} type="button" onClick={() => { setView("form"); setCopyStatus(null); }}>{t.back} →</button>
      </div>}
    </dialog>
  );
}
