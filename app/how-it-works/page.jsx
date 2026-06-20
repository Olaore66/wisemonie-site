import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import RevealGroup from "@/components/RevealGroup";
import RevealItem from "@/components/RevealItem";
import SectionIllustration from "@/components/SectionIllustration";
import { flowSteps } from "@/data/productContent";

export const metadata = {
  title: "How It Works",
  description:
    "See how wisemonie helps you add income, protect essentials, set spending rules, and spend directly from smart envelopes."
};

export default function HowItWorksPage() {
  return (
    <main className="page-shell page-shell--wide">
      <Reveal as="section" className="page-hero">
        <SectionIllustration side="left" />
        <Badge icon="route">HOW IT WORKS</Badge>
        <h1>
          A simple flow for <span>controlled spending.</span>
        </h1>
        <p>
          wisemonie turns your income into a clear plan, then helps you spend with structure
          instead of guessing from one account balance.
        </p>
      </Reveal>

      <RevealGroup as="section" className="flow-grid">
        {flowSteps.map((step, index) => (
          <RevealItem as="article" className="flow-card" key={step.title}>
            <div className="flow-card__number">{index + 1}</div>
            <Icon name={step.icon} />
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </main>
  );
}
