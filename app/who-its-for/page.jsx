import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import { audienceCards } from "@/data/productContent";

export const metadata = {
  title: "Who It's For",
  description:
    "wisemonie is designed for salary earners, freelancers, students, side hustlers, families, and anyone managing everyday financial pressure."
};

export default function WhoItsForPage() {
  return (
    <main className="page-shell page-shell--wide">
      <section className="page-hero">
        <Badge icon="groups">WHO IT&apos;S FOR</Badge>
        <h1>
          Built for people managing <span>real-life money.</span>
        </h1>
        <p>
          Whether your income is fixed, irregular, shared, or stretched across many needs,
          wisemonie helps make each naira easier to plan.
        </p>
      </section>

      <section className="assurance-list">
        {audienceCards.map((item) => (
          <article className="reveal-card" key={item.title}>
            <Icon name={item.icon} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
