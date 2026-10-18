"use client";

import CopyEmailButton from "@/components/CopyEmailButton";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/components/LanguageProvider";
import { useState } from "react";
import { ContactTopic } from "@/lib/contact";

const copy = {
  en: {
    eyebrow: "Contact",
    title: "Start a conversation.",
    description: "Have a question about our data, research to share, or a guest to recommend? Get in touch with China79.",
    navigation: "Contact China79", general: "General inquiries", contribute: "Ways to contribute", other: "Other contacts",
    inboxTitle: "One place to start.",
    inboxText: "Our main inbox for datasets, research, interviews, source suggestions, and corrections.",
    emailNote: "Use the contact form below, or email us directly using your preferred email service.",
    write: "Write a message",
    guideTitle: "What would you like to discuss?",
    guideText: "A little context helps us understand your question or proposal. All four routes below reach our general inbox.",
    guides: [
      { title: "Datasets & access", text: "Tell us which dataset you’re interested in, your question about its coverage, and how you hope to use it.", action: "Email about datasets", subject: "Dataset inquiry" },
      { title: "Research submissions", text: "Share a brief summary of your research, its sources, and any links you’d like us to consider.", action: "Submit research", subject: "Research submission" },
      { title: "Interviews & guests", text: "Recommend a guest, suggest a conversation topic, or tell us about an experience you could bring to an interview.", action: "Suggest an interview", subject: "Interview suggestion" },
      { title: "Sources & corrections", text: "Point us to a source or an item that needs a closer look. Include the relevant page, record, and supporting evidence.", action: "Share a source or correction", subject: "Source suggestion or correction" },
    ],
    otherTitle: "A more specific conversation?", policyLabel: "Policy correspondence", policyTitle: "Policy & collaboration",
    policyText: "For policy-related questions and potential policy collaborations.",
    direct: "Direct contact", directText: "For correspondence addressed to Michael C. Rhind-Tutt.",
  },

  zh: {
    eyebrow: "联系",
    title: "让交流从这里开始。",
    description: "有数据问题、研究想法，或希望推荐访谈嘉宾？欢迎联系 China79。",
    navigation: "联系 China79", general: "一般咨询", contribute: "参与方式", other: "其他联系方式",
    inboxTitle: "从这里与我们联系。",
    inboxText: "有关数据集、研究、访谈、来源建议及资料更正，请使用我们的主要联系邮箱。",
    emailNote: "您可以使用联系表单，也可以通过常用的邮箱服务直接致信我们。",
    write: "撰写消息",
    guideTitle: "您想与我们讨论什么？",
    guideText: "简要说明相关背景，有助于我们理解您的问题或建议。以下四种联系方式均发送至主要联系邮箱。",
    guides: [
      { title: "数据集与获取方式", text: "请说明您关注的数据集、有关覆盖范围的问题，以及希望如何使用数据。", action: "咨询数据集", subject: "数据集咨询" },
      { title: "研究投稿", text: "欢迎分享研究的简要介绍、资料来源及希望我们参考的相关链接。", action: "提交研究", subject: "研究投稿" },
      { title: "访谈与嘉宾", text: "推荐嘉宾、提出访谈主题，或介绍您能够在访谈中分享的经验。", action: "提出访谈建议", subject: "访谈建议" },
      { title: "来源与更正", text: "欢迎推荐资料来源，或指出需要进一步核实的内容。请附上相关页面、记录及支持证据。", action: "分享来源或更正", subject: "来源建议或资料更正" },
    ],
    otherTitle: "有更具体的联系需求？", policyLabel: "政策交流", policyTitle: "政策与合作",
    policyText: "如有政策相关问题或希望探讨政策合作，请使用此邮箱。",
    direct: "直接联系", directText: "如需直接致信 Michael C. Rhind-Tutt，请使用此邮箱。",
  },
};

const guideTopics: ContactTopic[] = ["datasets", "research", "interviews", "corrections"];

export default function ContactPageClient({ deliveryEnabled = false }: { deliveryEnabled?: boolean }) {
  const { language } = useLanguage();
  const [formTopic, setFormTopic] = useState<ContactTopic | null>(null);
  const t = copy[language];

  return (
    <div className="contact-page">
      <header className="container contact-page-header">
        <div><div className="eyebrow">{t.eyebrow}</div><h1>{t.title}</h1></div>
        <p>{t.description}</p>
      </header>

      <nav className="container contact-page-navigation" aria-label={t.navigation}>
        <a href="#general-inquiries">{t.general}</a>
        <a href="#ways-to-contribute">{t.contribute}</a>
        <a href="#other-contacts">{t.other}</a>
      </nav>

      <section className="container contact-inbox" id="general-inquiries" aria-labelledby="contact-inbox-title">
        <span className="contact-inbox-mark" aria-hidden="true">@</span>
        <div className="contact-inbox-content">
          <div className="eyebrow">{t.general}</div>
          <h2 id="contact-inbox-title">{t.inboxTitle}</h2>
          <a className="contact-inbox-email" href="mailto:contact@china79.org">contact@china79.org<span aria-hidden="true">↗</span></a>
          <p>{t.inboxText}</p>
          <p className="contact-inbox-note">{t.emailNote}</p>
        </div>
        <div className="contact-inbox-copy"><button className="contact-write-button" type="button" onClick={() => setFormTopic("general")}>{t.write}<span aria-hidden="true">↗</span></button><CopyEmailButton email="contact@china79.org" language={language} theme="dark" /></div>
      </section>

      <section className="container contact-guides" id="ways-to-contribute" aria-labelledby="contact-guides-title">
        <div className="contact-section-heading"><div><div className="kicker">{t.contribute}</div><h2 id="contact-guides-title">{t.guideTitle}</h2></div><p>{t.guideText}</p></div>
        <div className="contact-guides-grid">{t.guides.map((guide, index) => (
          <article key={guide.subject}>
            <span className="contact-guide-number" aria-hidden="true">0{index + 1}</span>
            <h3>{guide.title}</h3><p>{guide.text}</p>
            <button type="button" className="text-link contact-guide-action" onClick={() => setFormTopic(guideTopics[index])}>{guide.action}<span aria-hidden="true">↗</span></button>
          </article>
        ))}</div>
      </section>

      <section className="container contact-other" id="other-contacts" aria-labelledby="contact-other-title">
        <div className="kicker">{t.other}</div><h2 id="contact-other-title">{t.otherTitle}</h2>
        <div className="contact-other-grid">
          <article><div className="contact-other-label">{t.policyLabel}</div><h3>{t.policyTitle}</h3><p>{t.policyText}</p><a href="mailto:policy@china79.org">policy@china79.org<span aria-hidden="true">↗</span></a></article>
          <article><div className="contact-other-label">{t.direct}</div><h3>Michael C. Rhind-Tutt</h3><p>{t.directText}</p><a href="mailto:mrhindtutt@china79.org">mrhindtutt@china79.org<span aria-hidden="true">↗</span></a></article>
        </div>
      </section>
      <ContactForm topic={formTopic} language={language} deliveryEnabled={deliveryEnabled} onClose={() => setFormTopic(null)} />
    </div>
  );
}
