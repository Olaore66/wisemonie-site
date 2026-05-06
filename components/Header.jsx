import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand-link" aria-label="Wisemonie home">
          <img src="/images/logo2.svg" alt="Wisemonie" className="brand-logo" />
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="/#features">Features</a>
          <a href="/#how-it-works">How It Works</a>
          <Link href="/security">Security</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <a href="/#download" className="button button--primary header-cta">
          Join the Waitlist
        </a>
      </div>
    </header>
  );
}
