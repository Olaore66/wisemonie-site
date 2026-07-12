import Link from "next/link";

const productLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/features", label: "Features" },
  { href: "/who-its-for", label: "Who it's for" },
  { href: "/trust", label: "Trust" },
  { href: "/#download", label: "Private beta" },
  { href: "/faq", label: "FAQ" }
];

const companyLinks = [
  { href: "/about", label: "About wisemonie" },
  { href: "/contact", label: "Contact" }
];

const legalLinks = [
  { href: "/terms-of-use", label: "Terms of Use" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/delete-account", label: "Delete account" }
];

const socialLinks = [
  { href: "https://www.instagram.com/wisemonie_app/", label: "Instagram", icon: "instagram" },
  { href: "https://x.com/wisemonie_app", label: "X", icon: "x" },
  { href: "https://whatsapp.com/channel/0029Vb6kU683bbUy3azQF047", label: "WhatsApp", icon: "whatsapp" }
];

function SocialIcon({ name }) {
  const paths = {
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    x: <path d="M4 4l7.2 8.4L4.6 20h2.8l5.1-5.9 5 5.9H20l-7-8.2L19.4 4h-2.8l-4.9 5.6L7 4H4z" />,
    whatsapp: (
      <>
        <path d="M5.2 19l1-3A7.8 7.8 0 1 1 9 18.3l-3.8.7z" />
        <path d="M9.2 8.4c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.5c.1.2.1.4 0 .6l-.4.5c-.1.2-.1.3 0 .5.4.8 1.2 1.6 2.2 2.1.2.1.4.1.5-.1l.6-.7c.1-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5 0 .7-.5 1.6-1.1 1.9-.6.3-2.7.4-5.1-1.9-2.4-2.3-2.8-4.4-2.5-5 .2-.3.6-.9.9-1.1z" />
      </>
    )
  };

  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      {links.map((link) =>
        link.href.startsWith("http") || link.href.startsWith("mailto:") ? (
          <a className={link.icon ? "footer-social-link" : undefined} href={link.href} key={link.href}>
            {link.icon ? <SocialIcon name={link.icon} /> : null}
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
          <p>One salary. A full week. Lived on time.</p>
        </div>
        <div className="footer-grid">
          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
          <FooterColumn title="Social" links={socialLinks} />
        </div>
      </div>
      <div className="footer-bottom">
        <p>Wisemonie. Built on regulated Nigerian rails.</p>
        <p>&copy; 2026 Wisemonie. All rights reserved.</p>
      </div>
    </footer>
  );
}
