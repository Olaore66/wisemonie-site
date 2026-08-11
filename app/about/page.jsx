import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import StoreButtons from "@/components/StoreButtons";
import SectionIllustration from "@/components/SectionIllustration";

export const metadata = {
  title: "About",
  description:
    "Learn about wisemonie's mission to align your financial plans with your spending.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <main className="page-shell">
      <Reveal as="section" className="page-hero">
        <SectionIllustration side="right" />
        <Badge icon="diamond">Company and product</Badge>
        <h1>
          About <span>wisemonie</span>
        </h1>
        <p>
          A personal finance app that aligns your financial plans with your actual spending.
        </p>
      </Reveal>

      <Reveal as="section" className="content-card stack">
        <div>
          <h2>Our Core Purpose</h2>
          <p>
            Wisemonie closes the gap between what you planned for your money and what actually
            happens to it. Using envelopes, automation, and spending rules, every naira is assigned
            to a purpose before it&apos;s spent.
          </p>
        </div>
        <div>
          <h2>Why we built it</h2>
          <p>
            Everyone makes a plan on payday. Almost no one sticks to it — not because of
            discipline, but because nothing in a regular bank account enforces the plan. Wisemonie
            provides that missing structure.
          </p>
          <p>
            Registration, planning, and transactions all happen inside the wisemonie mobile app.
          </p>
        </div>
      </Reveal>

      <Reveal as="section" className="notice-card">
        <Icon name="info" />
        <div>
          <h2>Important Disclosure</h2>
          <p>
            wisemonie is not a bank or financial institution. Payments and transfers in the app are
            processed by licensed third-party providers and partner institutions. Wisemonie does not
            hold or store customer funds.
          </p>
        </div>
      </Reveal>

      <Reveal as="section" className="cta-card">
        <h2>Align your plan and your spending.</h2>
        <StoreButtons layout="row" />
      </Reveal>
    </main>
  );
}
