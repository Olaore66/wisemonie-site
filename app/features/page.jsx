import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import RevealGroup from "@/components/RevealGroup";
import RevealItem from "@/components/RevealItem";
import SectionIllustration from "@/components/SectionIllustration";
import { moneyFeatures } from "@/data/productContent";

export const metadata = {
  title: "Features",
  description:
    "Explore wisemonie's AI personal finance assistant, smart envelopes, essential-first allocation, spending rules, alerts, and money tracking features."
};

export default function FeaturesPage() {
  return (
    <main className="page-shell page-shell--wide">
      <Reveal as="section" className="page-hero">
        <SectionIllustration side="right" />
        <Badge icon="apps">FEATURES</Badge>
        <h1>
          Features built for <span>real money pressure.</span>
        </h1>
        <p>
          Plan your budget into smart envelopes, protect essentials, get helpful guidance, and
          spend from the app based on the conditions you define.
        </p>
      </Reveal>

      <RevealGroup as="section" className="money-feature-grid">
        {moneyFeatures.map((feature) => (
          <RevealItem as="article" className="money-feature-card" key={feature.title}>
            <Icon name={feature.icon} />
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </main>
  );
}
