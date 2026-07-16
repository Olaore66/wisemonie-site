import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import RevealGroup from "@/components/RevealGroup";
import RevealItem from "@/components/RevealItem";
import SectionIllustration from "@/components/SectionIllustration";
import WeekReleaseTimeline from "@/components/WeekReleaseTimeline";
import { flowSteps } from "@/data/productContent";

export const metadata = {
  title: "How It Works",
  description:
    "See how wisemonie helps you add income, protect essentials, set spending rules, and spend directly from smart envelopes.",
  alternates: { canonical: "/how-it-works" }
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
          Wisemonie turns your income into a clear plan, so you spend with structure instead of
          guessing from one balance.
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

      <Reveal as="section" className="viz-section viz-section--wide">
        <h2>Then your week runs itself</h2>
        <p>Once the rhythm is set, every envelope opens at its time. No maths, no reminders.</p>
        <WeekReleaseTimeline />
      </Reveal>
    </main>
  );
}
