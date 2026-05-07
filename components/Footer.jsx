import Link from "next/link";

const productLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#features", label: "Features" },
  { href: "/#download", label: "Private beta" },
  { href: "/#faq", label: "FAQ" }
];

const companyLinks = [
  { href: "/about", label: "About wisemonie" },
  { href: "/contact", label: "Contact" },
  { href: "mailto:wisemoniehelpdesk@gmail.com?subject=wisemonie%20pitch%20deck", label: "Pitch deck" }
];

const legalLinks = [
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/privacy-policy", label: "Privacy Policy" }
];

const socialLinks = [
  { href: "https://www.instagram.com/wisemonie_app/", label: "Instagram" },
  { href: "https://x.com/wisemonie_app", label: "X" },
  { href: "https://whatsapp.com/channel/0029Vb6kU683bbUy3azQF047", label: "WhatsApp" }
];

function FooterColumn({ title, links }) {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      {links.map((link) =>
        link.href.startsWith("http") || link.href.startsWith("mailto:") ? (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ) : (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        )
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="footer-brand">
          <img src="/images/logo2.svg" alt="wisemonie" />
          <p>Plan your money. Protect essentials. Spend with control.</p>
        </div>
        <div className="footer-grid">
          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
          <FooterColumn title="Social" links={socialLinks} />
        </div>
      </div>
      <div className="footer-bottom">
        <p>wisemonie is a product of OLX Digital Services.</p>
        <p>&copy; 2026 OLX Digital Services. All rights reserved.</p>
      </div>
    </footer>
  );
}
