import type { Metadata } from "next";

export const metadata: Metadata = { title: "Interviews" };

export default function InterviewsPage() {
  return (
    <section className="container page-shell">
      <div className="page-header">
        <div className="eyebrow">Interviews</div>
        <h1>Perspectives from people who engage with China directly.</h1>
        <p>China79 will publish conversations with scholars, practitioners, business leaders, students, and others whose work offers insight into China and the bilateral relationship.</p>
      </div>
      <div className="empty-state">
        <div className="empty-index">01</div>
        <div>
          <h2>First interview coming soon.</h2>
          <p>This page is ready for your first Q&A. When you publish one, it can become a featured item on the homepage automatically.</p>
        </div>
      </div>
    </section>
  );
}
