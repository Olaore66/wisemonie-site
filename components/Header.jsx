"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const MotionLink = motion(Link);

const navItems = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/features", label: "Features" },
  { href: "/who-its-for", label: "Who it's for" },
  { href: "/trust", label: "Trust" },
  { href: "/faq", label: "FAQ" }
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="site-header">
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
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <MotionLink
          href="/#download"
          className="button button--primary header-cta"
          {...(shouldReduceMotion
            ? {}
            : {
                whileHover: { y: -3, scale: 1.02 },
                whileTap: { scale: 0.96 },
                transition: { type: "spring", stiffness: 400, damping: 22 }
              })}
        >
          Get Early Access
        </MotionLink>
      </div>
    </header>
  );
}
