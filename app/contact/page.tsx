import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="container page-shell">
      <div className="page-header">
        <div className="eyebrow">Contact</div>
        <h1>Get in touch with China79.</h1>
        <p>For general inquiries, policy correspondence, interview ideas, and potential contributions, use the addresses below.</p>
      </div>
      <div className="contact-grid">
        <a className="contact-card" href="mailto:contact@china79.org">
          <span>General inquiries</span>
          <strong>contact@china79.org</strong>
        </a>
        <a className="contact-card" href="mailto:policy@china79.org">
          <span>Policy & congressional outreach</span>
          <strong>policy@china79.org</strong>
        </a>
        <a className="contact-card" href="mailto:mrhindtutt@china79.org">
          <span>Direct contact</span>
          <strong>mrhindtutt@china79.org</strong>
        </a>
      </div>
    </section>
  );
}
