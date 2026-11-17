import WhoAudience from "@/components/WhoAudience";
import WhoFit from "@/components/WhoFit";
import { targetPersona } from "@/data/productContent";

export const metadata = {
  title: "Who It's For",
  description:
    "Wisemonie is for anyone whose financial plan and spending don't stay aligned — salary earners, freelancers, students, business owners, and couples.",
  alternates: { canonical: "/who-its-for" }
};

export default function WhoItsForPage() {
  return (
    <main className="page-shell page-shell--wide page-who">
      <section className="feat">
        <div className="feat__hero">
          <div>
            <h1>{targetPersona.heading}.</h1>
            <p>{targetPersona.intro}</p>
          </div>
          <img className="scene-photo who__art" src="/images/brand/scene-people.jpg" alt="" />
        </div>
        <WhoAudience />
      </section>

      <section className="feat-order">
        <div className="feat-order__copy">
          <h2>If that's you.</h2>
          <img className="scene-photo" src="/images/brand/scene-envelopes.jpg" alt="" />
        </div>
        <WhoFit />
      </section>
    </main>
  );
}
