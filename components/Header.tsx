import Image from "next/image";
import Link from "next/link";

const nav = [
  ["Analysis", "/analysis"],
  ["Policy & Outreach", "/policy-outreach"],
  ["Interviews", "/interviews"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="China79 home">
          <Image src="/china79-logo.png" alt="China79" width={252} height={92} priority />
        </Link>
        <nav aria-label="Primary navigation">
          {nav.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
