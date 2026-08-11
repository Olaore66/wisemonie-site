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
    "Smart envelopes, scheduled releases, spending rules, and AI assistance — the features that keep your financial plan and your spending aligned.",
  alternates: { canonical: "/features" }
};

export default function FeaturesPage() {
  return (
    <main className="page-shell page-shell--wide">
      <Reveal as="section" className="page-hero">
        <SectionIllustration side="right" />
        <Badge icon="apps">FEATURES</Badge>
        <h1>
          Features that keep your plan <span>and your spending aligned.</span>
        </h1>
        <p>
          Envelopes, release schedules, spending rules, and real-time visibility — everything you
          need to spend from your plan, not past it.
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
        <h2>Non-negotiables are funded first, always</h2>
        <p>
          Before you see any flex money, rent, tithe, savings, and family are already set aside.
          That&apos;s the foundation of every plan.
        </p>
        <EssentialFirstFlow />
      </Reveal>
    </main>
  );
}
