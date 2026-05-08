import Badge from "@/components/Badge";
import { faqItems } from "@/data/productContent";

export const metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about wisemonie, private beta access, spending rules, locks, fees, and who the app is for."
};

export default function FaqPage() {
  return (
    <main className="page-shell page-shell--wide">
      <section className="page-hero">
        <Badge icon="help">FAQ</Badge>
        <h1>
          Questions before <span>joining wisemonie.</span>
        </h1>
        <p>
          Quick answers about how wisemonie works, what it controls, and what to expect before
          joining the private beta.
        </p>
      </section>

      <section className="faq-grid">
        {faqItems.map((item) => (
          <article className="faq-item reveal-card" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
