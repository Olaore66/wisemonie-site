import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import WaitlistForm from "@/components/WaitlistForm";

const heroStats = [
  ["Protect", "Transport before month-end"],
  ["Separate", "Food, bills, savings"],
  ["Relief", "Less money anxiety"]
];

const featureCards = [
  {
    icon: "account_balance_wallet",
    title: "Essential money stays protected",
    text: "Keep transport, food, bills, rent, and savings in separate envelopes before daily spending begins."
  },
  {
    icon: "directions_bus",
    title: "Transport does not get swallowed",
    text: "Set aside movement money early so getting to work, school, or business is not a month-end panic."
  },
  {
    icon: "rule",
    title: "Spending has boundaries",
    text: "Create simple conditions for each category so impulse spending does not silently attack essentials."
  },
  {
    icon: "receipt_long",
    title: "You can see what changed",
    text: "Track what happened, which envelope was affected, and what is still safe for the rest of the month."
  }
];

const flowSteps = [
  {
    icon: "priority_high",
    title: "Name what must not fail",
    text: "Start with transport, food, bills, rent, savings, and other responsibilities that carry real pressure."
  },
  {
    icon: "dataset",
    title: "Give each naira a job",
    text: "Move money into envelopes so responsibilities are handled before spending starts."
  },
  {
    icon: "send_money",
    title: "Spend without losing the plan",
    text: "Pay from the right category and know what remains for the days ahead."
  }
];

const allocations = [
  ["Transport", "NGN 45,000", "88%"],
  ["Food", "NGN 60,000", "56%"],
  ["Bills", "NGN 120,000", "92%"]
];

const assuranceItems = [
  {
    icon: "lock",
    title: "Built around real financial pressure",
    text: "Wisemonie is designed for the person trying to stretch money across responsibilities, not just view charts."
  },
  {
    icon: "visibility",
    title: "No more guessing from one balance",
    text: "See what is for transport, what is for food, what is for bills, and what can actually be spent."
  },
  {
    icon: "support_agent",
    title: "Join early and shape the solution",
    text: "The waitlist helps us bring Wisemonie to people who need more control before the month runs out."
  }
];

function ProductPreview() {
  return (
    <div className="product-preview" aria-label="Wisemonie mobile app preview">
      <div className="floating-ledger floating-ledger--top" aria-hidden="true">
        <Icon name="south_west" />
        <div>
          <span>Transport saved</span>
          <strong>NGN 45,000</strong>
        </div>
      </div>

      <div className="phone-stage phone-stage--image phone-stage--hero">
        <img
          src="/images/wisemonie1.jpeg"
          alt="Wisemonie app home dashboard"
          className="phone-hero-image"
        />
      </div>

      <div className="floating-ledger floating-ledger--bottom" aria-hidden="true">
        <Icon name="verified" />
        <div>
          <span>Month-end</span>
          <strong>Essentials covered</strong>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <article className="feature-card reveal-card">
      <Icon name={icon} />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function BudgetMotion() {
  return (
    <div className="budget-motion" aria-label="Example budget allocation progress">
      <div className="panel-heading">
        <strong>Live allocation</strong>
        <Icon name="auto_graph" />
      </div>
      {allocations.map(([name, amount, width]) => (
        <div className="budget-row" key={name}>
          <div>
            <div className="budget-row__top">
              <strong>{name}</strong>
              <span>{amount}</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ "--target-width": width }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-copy">
            <Badge icon="volunteer_activism">Built for financial breathing room</Badge>
            <h1>Make your money last till month-end.</h1>
            <p className="hero-lede">
              We know the stress of watching salary disappear while transport, food, bills, and
              emergencies are still waiting. Wisemonie helps you protect essential money first, so
              you do not run out of transport before the month ends.
            </p>
            <div className="hero-actions">
              <a href="#download" className="button button--primary">
                Join the Waitlist
              </a>
              <a href="#features" className="button button--secondary">
                Explore Features
              </a>
            </div>
            <div className="hero-stats">
              {heroStats.map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>

          <ProductPreview />
        </div>

        <div className="motion-strip" aria-hidden="true">
          <div className="motion-strip__track">
            <span>Plan</span>
            <span>Protect Transport</span>
            <span>Food</span>
            <span>Bills</span>
            <span>Save</span>
            <span>Breathe</span>
            <span>Allocate</span>
            <span>Spend</span>
            <span>Plan</span>
            <span>Protect Transport</span>
            <span>Food</span>
            <span>Bills</span>
            <span>Save</span>
            <span>Breathe</span>
            <span>Allocate</span>
            <span>Spend</span>
          </div>
        </div>
      </section>

      <section id="features" className="section app-section">
        <div className="section-heading section-heading--left">
          <Badge icon="psychology_alt">A system for everyday pressure</Badge>
          <h2>When money is tight, clarity is not a luxury. It is survival.</h2>
          <p>
            Wisemonie turns one overwhelming balance into protected categories, so essentials are
            handled before impulse spending, surprise needs, or small leaks take over.
          </p>
        </div>

        <div className="feature-grid">
          {featureCards.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section className="section showcase-section">
        <div className="showcase-copy">
          <Badge icon="directions_bus">Protect the essentials</Badge>
          <h2>Your transport money should not disappear by accident.</h2>
          <p>
            Wisemonie helps you separate the money you need to move around, eat, pay bills, and
            keep going, before the month becomes stressful.
          </p>
          <div className="check-list">
            <div>
              <Icon name="check_circle" />
              <span>
                <strong>See active budgets quickly</strong>
                Know what is still available for essentials before making a spending decision.
              </span>
            </div>
            <div>
              <Icon name="check_circle" />
              <span>
                <strong>Create room for change</strong>
                Adjust envelopes when life changes without losing sight of what must be protected.
              </span>
            </div>
          </div>
        </div>

        <div className="showcase-visual">
          <div className="phone-stage phone-stage--image phone-stage--secondary">
            <img
              src="/images/wisemonie2.jpeg"
              alt="Wisemonie app budgets screen"
              className="phone-hero-image"
            />
          </div>
          <BudgetMotion />
        </div>
      </section>

      <section id="how-it-works" className="section flow-section">
        <div className="section-heading">
          <Badge icon="route">How it works</Badge>
          <h2>A practical system for protecting money before stress begins.</h2>
        </div>
        <div className="flow-grid">
          {flowSteps.map((step, index) => (
            <article className="flow-card reveal-card" key={step.title}>
              <div className="flow-card__number">{index + 1}</div>
              <Icon name={step.icon} />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section assurance-section">
        <div className="assurance-copy">
          <Badge icon="verified_user">Why it matters</Badge>
          <h2>Wisemonie is for people who are tired of reaching month-end unprepared.</h2>
        </div>
        <div className="assurance-list">
          {assuranceItems.map((item) => (
            <article key={item.title}>
              <Icon name={item.icon} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="download" className="section cta-section">
        <div className="download-card">
          <Badge icon="bolt">Early access</Badge>
          <h2>Join the waitlist for a better way to manage money.</h2>
          <p>
            Be first to try Wisemonie and start building a system that protects transport, food,
            bills, savings, and the things that matter before the month ends.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </main>
  );
}
