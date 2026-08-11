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
    "Add income, create your plan, set rules, and spend from assigned envelopes — see how Wisemonie aligns your finances.",
  alternates: { canonical: "/how-it-works" }
};

export default function HowItWorksPage() {
  return (
    <main className="page-shell page-shell--wide">
      <Reveal as="section" className="page-hero">
        <SectionIllustration side="left" />
        <Badge icon="route">HOW IT WORKS</Badge>
        <h1>
          Four steps to <span>plan-aligned spending.</span>
        </h1>
        <p>
          Add income, assign it to commitments, set the rules, and spend from the plan — not
          from one undivided balance.
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
        <h2>Then your plan runs itself</h2>
        <p>Once set, every envelope opens on schedule. No maths, no reminders, no willpower.</p>
        <WeekReleaseTimeline />
      </Reveal>
    </main>
  );
}
