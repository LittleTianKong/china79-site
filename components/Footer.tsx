import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-mark">CHINA79</div>
          <p>Analysis, dialogue, and perspectives on U.S.-China relations.</p>
        </div>
        <div>
          <p><strong>General</strong><br/><a href="mailto:contact@china79.org">contact@china79.org</a></p>
          <p><strong>Policy</strong><br/><a href="mailto:policy@china79.org">policy@china79.org</a></p>
        </div>
        <div>
          <p><strong>Explore</strong></p>
          <p><Link href="/analysis">Analysis</Link><br/><Link href="/policy-outreach">Policy & Outreach</Link><br/><Link href="/about">About</Link></p>
        </div>
      </div>
      <div className="container footer-bottom">© 2026 China79. Independent U.S.-China affairs initiative.</div>
    </footer>
  );
}
