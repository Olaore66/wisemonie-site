import Link from "next/link";

const productLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/security", label: "Security" },
  { href: "/#download", label: "Waitlist" }
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/security", label: "Security" }
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/cookie-policy", label: "Cookie Policy" }
];

function FooterColumn({ title, links }) {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      {links.map((link) => (
        <Link href={link.href} key={link.href}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="footer-brand">
          <img src="/images/logo2.svg" alt="Wisemonie" />
          <p>Helping people protect essentials, reduce financial stress, and make money last longer.</p>
          <div className="social-links" aria-label="Social links">
            <a href="https://x.com/wisemonie_app" aria-label="Follow Wisemonie on X">
              X
            </a>
            <a
              href="https://www.instagram.com/wisemonie_app/"
              aria-label="Follow Wisemonie on Instagram"
            >
              IG
            </a>
            <a
              href="https://whatsapp.com/channel/0029Vb6kU683bbUy3azQF047"
              aria-label="Follow Wisemonie on WhatsApp"
            >
              WA
            </a>
          </div>
        </div>
        <div className="footer-grid">
          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 OLX Digital Services. All rights reserved.</p>
        <p>Wisemonie is a personal finance management application.</p>
      </div>
    </footer>
  );
}
