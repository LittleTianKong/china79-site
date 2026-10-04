import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section className="container page-shell about-page">
      <div className="page-header">
        <div className="eyebrow">About</div>
        <h1>China79 is an independent initiative focused on U.S.-China relations.</h1>
      </div>
      <div className="prose-grid">
        <div className="prose-main">
          <p>China79 publishes research, analysis, interviews, and commentary on Chinese politics, economics, security, culture, and China’s role in the international system.</p>
          <p>China79 was created around the belief that the U.S.-China relationship should be understood through more than competition alone. Our work examines areas of disagreement alongside opportunities for cooperation, dialogue, and mutual benefit, with the goal of encouraging a more informed and nuanced discussion of the bilateral relationship.</p>
          <p>Beyond publication, China79 seeks to bring research and analysis into policy conversations through congressional outreach, policy briefs, and correspondence with policymakers. By connecting research with practical engagement, the initiative aims to contribute thoughtful perspectives to discussions shaping U.S. policy toward China.</p>
        </div>
        <aside className="principles">
          <div className="kicker">Focus</div>
          <p>Analysis</p>
          <p>Dialogue</p>
          <p>Policy outreach</p>
          <p>Interviews</p>
          <p>U.S.-China relations</p>
        </aside>
      </div>
    </section>
  );
}
