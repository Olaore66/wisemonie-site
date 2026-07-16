import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import MotionButton from "@/components/MotionButton";
import SectionIllustration from "@/components/SectionIllustration";

export const metadata = {
  title: "About",
  description:
    "Learn about wisemonie's mission to bring clarity to personal finance through envelope-based budgeting.",
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
          A personal finance app that helps you budget smarter, control spending, and manage money
          intentionally.
        </p>
      </Reveal>

      <Reveal as="section" className="content-card stack">
        <div>
          <h2>Our Core Purpose</h2>
          <p>
            The wisemonie app uses envelope budgeting, automation and insights to help you plan
            expenses, track spending, and build healthier money habits.
          </p>
        </div>
        <div>
          <h2>Why we built it</h2>
          <p>
            Wisemonie is a personal finance platform built for everyday income earners. This site is
            informational. It shares details about the product and its features.
          </p>
          <p>
            Registration, budgeting and transactions all happen inside the wisemonie mobile app.
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
        <h2>Start Budgeting Smarter</h2>
        <MotionButton as="a" href="/#download" className="button button--primary">
          Get Early Access
        </MotionButton>
      </Reveal>
    </main>
  );
}
