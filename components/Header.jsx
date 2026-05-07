import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand-link" aria-label="wisemonie home">
          <img src="/images/logo2.svg" alt="wisemonie" className="brand-logo" />
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="/#how-it-works">How it works</a>
          <a href="/#features">Features</a>
          <a href="/#who-its-for">Who it&apos;s for</a>
          <a href="/#trust">Trust</a>
          <a href="/#faq">FAQ</a>
        </nav>
        <a href="/#download" className="button button--primary header-cta">
          Join Waitlist
        </a>
      </div>
    </header>
  );
}
