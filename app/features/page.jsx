import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import { moneyFeatures } from "@/data/productContent";

export const metadata = {
  title: "Features",
  description:
    "Explore wisemonie's smart envelopes, essential-first allocation, spending rules, alerts, and money tracking features."
};

export default function FeaturesPage() {
  return (
    <main className="page-shell page-shell--wide">
      <section className="page-hero">
        <Badge icon="apps">FEATURES</Badge>
        <h1>
          Features built for <span>real money pressure.</span>
        </h1>
        <p>
          Plan your budget into smart envelopes, protect essentials, get helpful guidance, and
          spend from the app based on the conditions you define.
        </p>
      </section>

      <section className="money-feature-grid">
        {moneyFeatures.map((feature) => (
          <article className="money-feature-card reveal-card" key={feature.title}>
            <Icon name={feature.icon} />
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
