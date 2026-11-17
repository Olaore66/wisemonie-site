import EssentialFirstFlow from "@/components/EssentialFirstFlow";
import EnvelopeFilm from "@/components/EnvelopeFilm";
import FeatureList from "@/components/FeatureList";

export const metadata = {
  title: "Features",
  description:
    "Envelopes, release schedules, spending rules, bills, a clear view of what is available, and help for an unusual expense.",
  alternates: { canonical: "/features" }
};

export default function FeaturesPage() {
  return (
    <main className="page-shell page-shell--wide page-features">
      <section className="feat">
        <div className="feat__hero feat__hero--film">
          <div>
            <h1>Features that keep your plan and your spending aligned.</h1>
            <p>
              Envelopes, release schedules, spending rules, and real-time visibility — everything you need to spend from your plan, not past it.
            </p>
          </div>
          <EnvelopeFilm />
        </div>
        <FeatureList />
      </section>

      <section className="feat-order">
        <div className="feat-order__copy">
          <h2>Essentials first.</h2>
          <img className="scene-photo" src="/images/brand/scene-clock.jpg" alt="" />
        </div>
        <EssentialFirstFlow />
      </section>
    </main>
  );
}
