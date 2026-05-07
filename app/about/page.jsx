import Badge from "@/components/Badge";
import Icon from "@/components/Icon";

export const metadata = {
  title: "About",
  description:
    "Learn about wisemonie's mission to bring clarity to personal finance through envelope-based budgeting."
};

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <Badge icon="diamond">Company and product</Badge>
        <h1>
          About <span>wisemonie</span>
        </h1>
        <p>
          A personal finance management platform designed to help individuals budget smarter,
          control spending, and manage money intentionally.
        </p>
      </section>

      <section className="content-card stack">
        <div>
          <h2>Our Core Purpose</h2>
          <p>
            The wisemonie mobile application uses envelope-based budgeting, automation, and
            financial insights to help users plan expenses, track spending, and build healthier
            financial habits.
          </p>
        </div>
        <div>
          <h2>About OLX Digital Services</h2>
          <p>
            wisemonie is a product of OLX Digital Services, a technology company focused on
            building digital financial tools. The wisemonie website is an informational platform
            created to provide details about the product and its features.
          </p>
          <p>
            User registration, budgeting activities, and financial transactions are carried out
            solely within the wisemonie mobile application.
          </p>
        </div>
      </section>

      <section className="notice-card">
        <Icon name="info" />
        <div>
          <h2>Important Disclosure</h2>
          <p>
            wisemonie does not operate as a bank or financial institution. All payments and
            transfers initiated within the app are processed through licensed third-party payment
            service providers and partner financial institutions. OLX Digital Services does not
            hold or store customer funds.
          </p>
        </div>
      </section>

      <section className="cta-card">
        <h2>Start Budgeting Smarter</h2>
        <a href="/#download" className="button button--primary">
          Join the Waitlist
        </a>
      </section>
    </main>
  );
}
