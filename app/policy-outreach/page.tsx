import type { Metadata } from "next";
import { policyItems } from "@/lib/content";

export const metadata: Metadata = { title: "Policy & Outreach" };

export default function PolicyPage() {
  return (
    <section className="container page-shell">
      <div className="page-header">
        <div className="eyebrow">Policy & Outreach</div>
        <h1>Research designed to enter the policy conversation.</h1>
        <p>China79 develops policy briefs, recommendations, and correspondence for policymakers on issues shaping U.S.-China relations.</p>
      </div>
      <div className="policy-list">
        {policyItems.map(item => (
          <article key={item.title} className="policy-list-item">
            <div className="policy-type">{item.type}</div>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <span className="status-pill">{item.status}</span>
          </article>
        ))}
      </div>
      <div className="outreach-note">
        <h2>Congressional outreach</h2>
        <p>As China79 develops policy work, this page can archive public versions of letters, recommendations, and briefs submitted to congressional offices. Any description of outreach should reflect what actually occurred.</p>
      </div>
    </section>
  );
}
