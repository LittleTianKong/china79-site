import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { articles, policyItems } from "@/lib/content";

export default function HomePage() {
  const [featured, ...latest] = articles;
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow">Independent U.S.-China Affairs Initiative</div>
          <h1>Understanding the relationship beyond a single frame.</h1>
          <p className="hero-dek">China79 publishes analysis, interviews, and policy commentary on the forces shaping U.S.-China relations — including areas of competition, cooperation, and mutual interest.</p>
        </div>
      </section>

      <section className="container featured-grid section-rule">
        <div className="featured-story">
          <div className="kicker">Featured Analysis</div>
          <h2><Link href={`/analysis/${featured.slug}`}>{featured.title}</Link></h2>
          <p>{featured.dek}</p>
          <div className="story-meta">{featured.section} · {featured.date} · {featured.readTime}</div>
          <Link className="text-link" href={`/analysis/${featured.slug}`}>Read analysis →</Link>
        </div>
        <aside className="mission-panel">
          <div className="kicker">What China79 does</div>
          <p>Research and analysis are only part of the project. China79 also develops research-based policy recommendations and brings them into broader conversations through congressional outreach.</p>
          <Link className="text-link" href="/policy-outreach">Policy & Outreach →</Link>
        </aside>
      </section>

      <section className="container section-rule section-block">
        <div className="section-heading">
          <h2>Latest Analysis</h2>
          <Link href="/analysis">View all →</Link>
        </div>
        <div className="card-grid">
          {latest.map(article => <ArticleCard article={article} key={article.slug} />)}
          <ArticleCard article={featured} />
        </div>
      </section>

      <section className="policy-band">
        <div className="container policy-layout">
          <div>
            <div className="eyebrow light">Policy & Outreach</div>
            <h2>Research beyond publication.</h2>
            <p>China79 develops concise, research-based recommendations for policymakers and engages congressional offices on issues shaping the bilateral relationship.</p>
          </div>
          <div className="policy-card">
            <div className="policy-type">{policyItems[0].type} · {policyItems[0].status}</div>
            <h3>{policyItems[0].title}</h3>
            <p>{policyItems[0].summary}</p>
            <Link href="/policy-outreach">View policy work →</Link>
          </div>
        </div>
      </section>

      <section className="container split-section section-block">
        <div>
          <div className="kicker">Perspectives & Interviews</div>
          <h2>Conversations with people who work on China.</h2>
          <p>China79 will feature interviews with scholars, practitioners, business leaders, students, and others whose experience offers insight into China and the U.S.-China relationship.</p>
          <Link className="text-link" href="/interviews">Explore interviews →</Link>
        </div>
        <div className="about-callout">
          <div className="kicker">About China79</div>
          <p>China79 is an independent initiative dedicated to informed analysis and dialogue on China and U.S.-China relations.</p>
          <Link className="text-link" href="/about">Learn more →</Link>
        </div>
      </section>
    </>
  );
}
