import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import SectionIllustration from "@/components/SectionIllustration";
import { targetPersona } from "@/data/productContent";

export const metadata = {
  title: "Who It's For",
  description:
    "Wisemonie is built first for Nigerian income earners making ₦200K-₦700K a month who watch their budget fall apart by week 3.",
  alternates: { canonical: "/who-its-for" }
};

export default function WhoItsForPage() {
  return (
    <main className="page-shell page-shell--wide">
      <Reveal as="section" className="page-hero">
        <SectionIllustration side="right" />
        <Badge icon="groups">WHO IT&apos;S FOR</Badge>
        <h1>
          Built for one person <span>first.</span>
        </h1>
        <p>{targetPersona.intro}</p>
      </Reveal>

      <Reveal as="section" variant="scale" className="persona-card">
        <div className="check-list">
          {targetPersona.points.map((point) => (
            <div key={point}>
              <Icon name="check_circle" />
              <span>{point}</span>
            </div>
          ))}
        </div>
        <p className="persona-card__closing">{targetPersona.closing}</p>
        <p className="persona-card__note">{targetPersona.note}</p>
      </Reveal>
    </main>
  );
}
