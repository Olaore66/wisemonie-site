import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import RevealGroup from "@/components/RevealGroup";
import RevealItem from "@/components/RevealItem";
import SectionIllustration from "@/components/SectionIllustration";
import { trustCards } from "@/data/productContent";

export const metadata = {
  title: "Trust",
  description:
    "Your money lives with a regulated bank. Wisemonie adds the plan layer — envelopes, rules, and timing you control.",
  alternates: { canonical: "/trust" }
};

export default function TrustPage() {
  return (
    <main className="page-shell page-shell--wide page-trust">
      <Reveal as="section" className="page-hero">
        <SectionIllustration side="left" />
        <Badge icon="shield_lock">TRUST &amp; SECURITY</Badge>
        <h1>Rubies holds the money.</h1>
        <p>
          Funds sit with Rubies Microfinance Bank under CBN regulation. Wisemonie is the plan.
          Clear rules, transparent money movement, and you still control every lock.
        </p>
      </Reveal>

      <RevealGroup as="section" className="trust-grid">
        {trustCards.map((card) => (
          <RevealItem as="article" className="trust-card" key={card.title}>
            <Icon name={card.icon} />
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </main>
  );
}
