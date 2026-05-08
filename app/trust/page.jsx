import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import { trustCards } from "@/data/productContent";

export const metadata = {
  title: "Trust",
  description:
    "Learn how wisemonie approaches regulated infrastructure, user-controlled rules, clear money movement, and transparent fees."
};

export default function TrustPage() {
  return (
    <main className="page-shell page-shell--wide">
      <section className="page-hero">
        <Badge icon="shield_lock">TRUST &amp; SECURITY</Badge>
        <h1>
          Secure by design. <span>Controlled by you.</span>
        </h1>
        <p>
          wisemonie is built around clear rules, transparent money movement, and regulated wallet
          and payment infrastructure.
        </p>
      </section>

      <section className="trust-grid">
        {trustCards.map((card) => (
          <article className="trust-card reveal-card" key={card.title}>
            <Icon name={card.icon} />
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
