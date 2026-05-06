import Badge from "@/components/Badge";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Contact",
  description: "Get in touch with the Wisemonie team for questions, feedback, or support."
};

const contactItems = [
  { icon: "business", label: "Business Name", value: "OLX Digital Services" },
  { icon: "smartphone", label: "Product", value: "Wisemonie" },
  {
    icon: "mail",
    label: "Email",
    value: "wisemoniehelpdesk@gmail.com",
    href: "mailto:wisemoniehelpdesk@gmail.com"
  }
];

export default function ContactPage() {
  return (
    <main className="page-shell page-shell--wide">
      <section className="page-hero">
        <Badge icon="support_agent">Support and partnership</Badge>
        <h1>
          Contact <span>Us</span>
        </h1>
        <p>
          If you have questions, feedback, or need support related to Wisemonie, you can reach us
          using the contact details below.
        </p>
      </section>

      <section className="contact-grid">
        <div className="content-card contact-card">
          {contactItems.map((item) => (
            <div className="contact-item" key={item.label}>
              <div className="contact-icon">
                <Icon name={item.icon} />
              </div>
              <div>
                <span>{item.label}</span>
                {item.href ? <a href={item.href}>{item.value}</a> : <strong>{item.value}</strong>}
              </div>
            </div>
          ))}
          <p className="muted-copy">We aim to respond to inquiries as promptly as possible.</p>
        </div>

        <div className="content-card">
          <h2>Send a message</h2>
          <form action="https://formspree.io/f/mdkqqyjq" method="POST" className="contact-form">
            <label>
              Name
              <input type="text" name="name" required />
            </label>
            <label>
              Email
              <input type="email" name="email" required />
            </label>
            <label>
              Message
              <textarea name="message" rows="4" required />
            </label>
            <button type="submit" className="button button--primary">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
