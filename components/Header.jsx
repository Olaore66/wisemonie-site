"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/features", label: "Features" },
  { href: "/who-its-for", label: "Who it's for" },
  { href: "/trust", label: "Trust" },
  { href: "/blog", label: "Blog" }
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [raised, setRaised] = useState(false);
  const home = pathname === "/";

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setRaised(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lagoon = home && !raised;

  return (
    <header className={`site-header ${lagoon ? "site-header--lagoon" : "site-header--paper"}`}>
      <div className="site-header__inner">
        <Link href="/" className="brand-link" aria-label="wisemonie home">
          <img src="/images/logo2.svg" alt="wisemonie" className="brand-logo" />
        </Link>

        <button
          type="button"
          className={`mobile-nav-toggle ${menuOpen ? "mobile-nav-toggle--open" : ""}`}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="mobile-nav-toggle__bar" />
          <span className="mobile-nav-toggle__bar" />
          <span className="mobile-nav-toggle__bar" />
          <span className="sr-only">
            {menuOpen ? "Close navigation" : "Open navigation"}
          </span>
        </button>

        <nav
          id="primary-navigation"
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
          aria-label="Primary navigation"
        >
          {navItems.map((item) => {
            const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="https://play.google.com/store/apps/details?id=com.wisemonie"
          target="_blank"
          rel="noopener"
          className="header-cta"
          aria-label="Get Wisemonie on Google Play"
        >
          <img src="/images/google-play-badge.png" alt="" />
        </Link>
      </div>
    </header>
  );
}
