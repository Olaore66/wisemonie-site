import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import RevealGroup from "@/components/RevealGroup";
import RevealItem from "@/components/RevealItem";
import SectionIllustration from "@/components/SectionIllustration";
import EssentialFirstFlow from "@/components/EssentialFirstFlow";
import { moneyFeatures } from "@/data/productContent";

export const metadata = {
  title: "Features",
  description:
    "Explore wisemonie's AI personal finance assistant, smart envelopes, essential-first allocation, spending rules, alerts, and money tracking features.",
  alternates: { canonical: "/features" }
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
          Plan into smart envelopes, protect essentials, and spend on the conditions you set.
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

      <Reveal as="section" className="viz-section">
        <h2>Essentials come first, always</h2>
        <p>
          The rule behind every envelope: your non-negotiables are funded on payday, before flex
          money exists.
        </p>
        <EssentialFirstFlow />
      </Reveal>
    </main>
  );
}
