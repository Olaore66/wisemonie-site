import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import WaitlistForm from "@/components/WaitlistForm";
import HeroNotification from "@/components/HeroNotification";
import TiltCard from "@/components/TiltCard";
import {
  faqItems,
  flowSteps,
  moneyFeatures,
  targetPersona,
  trustCards
} from "@/data/productContent";

const problemCards = [
  {
    icon: "warning",
    title: "Essentials get exposed",
    text: "Money meant for food, transport, bills, or savings can easily be touched before you realise it."
  },
  {
    icon: "priority_high",
    title: "Discipline is hard under pressure",
    text: "When everything is accessible at once, impulse spending becomes easier than sticking to the plan."
  },
  {
    icon: "history",
    title: "Most tools react too late",
    text: "Expense trackers show what happened after the money is gone. wisemonie is designed to guide spending before it happens."
  },
  {
    icon: "stress_management",
    title: "Financial pressure builds quietly",
    text: "A few unplanned expenses early in the month can create stress, borrowing, missed bills, or broken savings later."
  }
];

const solutionCards = [
  {
    icon: "shield",
    title: "Protect what matters first",
    text: "Set aside money for essentials like food, transport, bills, rent, savings, and emergencies."
  },
  {
    icon: "rule",
    title: "Create spending boundaries",
    text: "Use limits, timing rules, and smart envelopes to reduce impulse spending."
  },
  {
    icon: "visibility",
    title: "Know what is safe to spend",
    text: "See what is available for each purpose instead of guessing from one total balance."
  },
  {
    icon: "tune",
    title: "Stay flexible without losing control",
    text: "Adjust your money plan when life changes, while still keeping visibility and discipline."
  }
];

const appScreens = [
  {
    title: "Create your money plan",
    text: "Set the amount, duration, and purpose for your money cycle."
  },
  {
    title: "Split into envelopes",
    text: "Divide money into essentials, savings, bills, transport, and flexible spending."
  },
  {
    title: "Track your position",
    text: "See what is available and what should stay protected."
  },
  {
    title: "Spend through rules",
    text: "Use money within the limits and conditions you created."
  }
];

const allocations = [
  ["Transport", "NGN 45,000", "88%"],
  ["Food", "NGN 60,000", "56%"],
  ["Bills", "NGN 120,000", "92%"]
];

const emotionalValues = [
  {
    icon: "lightbulb",
    title: "Clarity",
    text: "Know what is safe to spend."
  },
  {
    icon: "rule",
    title: "Discipline",
    text: "Stay within the structure you created."
  },
  {
    icon: "self_improvement",
    title: "Peace of mind",
    text: "Protect essentials before pressure builds."
  }
];

function ProductPreview() {
  return (
    <div className="product-preview" aria-label="wisemonie mobile app preview">
      <HeroNotification />

      <TiltCard className="phone-tilt-wrap">
        <div className="phone-stage phone-stage--image phone-stage--hero">
          <img
            src="/images/wisemonie1.jpeg"
            alt="wisemonie app home dashboard"
            className="phone-hero-image"
          />
        </div>
      </TiltCard>
    </div>
  );
}

function ProblemCard({ icon, title, text }) {
  return (
    <article className="feature-card reveal-card">
      <Icon name={icon} />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function SolutionCard({ icon, title, text }) {
  return (
    <article className="solution-card reveal-card">
      <Icon name={icon} />
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

function MoneyFeatureCard({ icon, title, text }) {
  return (
    <article className="money-feature-card reveal-card">
      <Icon name={icon} />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function AppScreenCard({ title, text }) {
  return (
    <article className="app-screen-card reveal-card">
      <div className="app-screen-card__caption">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

function BudgetMotion() {
  return (
    <div className="budget-motion reveal-scale" aria-label="Example budget allocation progress">
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
            <Badge icon="volunteer_activism">Private beta opening soon &middot; Built on regulated Nigerian rails</Badge>
            <h1>Hi, I&apos;m Abraham. I&apos;m building Wisemonie.</h1>
            <p className="hero-subhead">
              Because by week 3 of every month, half of Nigeria&apos;s salary earners are reaching
              for loan apps. Including me &mdash; that&apos;s why I built this.
            </p>
            <p className="hero-lede">
              Wisemonie holds your salary in{" "}
              <span className="hero-highlight">structured envelopes</span> &mdash; transport, food,
              bills, savings, emergencies &mdash; and only releases{" "}
              <span className="hero-highlight">today&apos;s spending limit</span> when you actually
              need it. So you reach the next payday without breaking your own plan, and stop the
              loan-app cycle for good.
            </p>
            <div className="hero-actions">
              <a href="#download" className="button button--primary">
                Get Early Access
              </a>
              <a href="/how-it-works" className="button button--secondary">
                See how it works &rarr;
              </a>
            </div>
          </div>

          <ProductPreview />
        </div>
      </section>

      <section className="section why-section">
        <div className="section-heading">
          <Badge icon="psychology_alt">WHY WISEMONIE</Badge>
          <h2>One reality, one solution.</h2>
        </div>
        <div className="why-statement">
          <p className="reveal-up">
            <strong>Salary lands.</strong> You write the plan in your head &mdash; rent savings,
            food, transport, internet, tithe, something for your parents.
          </p>
          <p className="reveal-up">
            <strong>By day 6,</strong> you&apos;ve spent transport money on lunch out, twice. By day
            12, you&apos;re &ldquo;borrowing from next week.&rdquo; By day 20, you&apos;re on the
            loan apps.
          </p>
          <p className="reveal-up">
            <strong>You don&apos;t have a money problem. You have an allocation problem.</strong>{" "}
            The money exists. The plan exists. What doesn&apos;t exist is the layer between them.
          </p>
          <p className="why-statement__cta reveal-up">Wisemonie is that layer.</p>
        </div>
      </section>

      <section id="problem" className="section app-section">
        <div className="section-heading section-heading--left">
          <Badge icon="psychology_alt">THE PROBLEM</Badge>
          <h2>Money stress starts when everything sits in one account.</h2>
          <p>
            Most people are not bad with money. The problem is that salary, bills, transport,
            food, savings, emergencies, and impulse spending often sit together in one account
            making it hard to know what is safe to spend.
          </p>
        </div>

        <div className="feature-grid">
          {problemCards.map((problem) => (
            <ProblemCard key={problem.title} {...problem} />
          ))}
        </div>
      </section>

      <section className="section transition-section">
        <div className="transition-statement">
          <h2>Financial peace starts with structure.</h2>
          <p>
            When your money has a clear purpose, you can protect what matters, reduce pressure, and make better decisions with what remains.
          </p>
        </div>
      </section>

      <section id="solution" className="section showcase-section solution-section">
        <div className="showcase-copy reveal-left">
          <Badge icon="tune">THE SOLUTION</Badge>
          <h2>Give every part of your money a purpose.</h2>
          <p>
            wisemonie helps you divide your income into smart money envelopes, set rules for each
            envelope, and spend with more intention without accidentally using money meant for
            something important.
          </p>
          <div className="solution-list">
            {solutionCards.map((solution) => (
              <SolutionCard key={solution.title} {...solution} />
            ))}
          </div>
        </div>

        <div className="showcase-visual reveal-right">
          <div className="phone-stage phone-stage--image phone-stage--secondary">
            <img
              src="/images/wisemonie2.jpeg"
              alt="wisemonie app budgets screen"
              className="phone-hero-image"
            />
          </div>
          <BudgetMotion />
        </div>
      </section>

      <section id="features" className="section feature-section">
        <div className="section-heading">
          <Badge icon="apps">FEATURES</Badge>
          <h2>Built for the everyday money pressure.</h2>
          <p>
            wisemonie is designed to help you protect essential money, manage daily spending, and
            stay disciplined across every income cycle.
          </p>
        </div>

        <div className="money-feature-grid">
          {moneyFeatures.map((feature) => (
            <MoneyFeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section id="how-it-works" className="section flow-section">
        <div className="section-heading">
          <Badge icon="route">HOW IT WORKS</Badge>
          <h2>A simple system for spending with more control.</h2>
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

      <section className="section app-screens-section">
        <div className="section-heading">
          <h2>See your money by purpose, not just balance.</h2>
          <p>
            wisemonie is designed to show what each part of your money is for, what has been used,
            and what is still available &mdash; so you can make decisions with clarity.
          </p>
        </div>

        <div className="app-screen-grid">
          {appScreens.map((screen) => (
            <AppScreenCard key={screen.title} {...screen} />
          ))}
        </div>
      </section>

      <section id="who-its-for" className="section persona-section">
        <div className="section-heading">
          <Badge icon="groups">WHO IT&apos;S FOR</Badge>
          <h2>{targetPersona.heading}</h2>
          <p>{targetPersona.intro}</p>
        </div>

        <div className="persona-card reveal-up">
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
        </div>
      </section>

      <section className="section emotional-section">
        <div className="section-heading">
          <h2>Less money pressure. More clarity to grow.</h2>
          <p>
            When money is unstructured, every decision feels heavier. wisemonie helps reduce the
            pressure by giving your income a clear job &mdash; so you can stop reacting, start
            planning, and build toward financial stability.
          </p>
        </div>
        <div className="emotional-grid">
          {emotionalValues.map((value) => (
            <article className="emotional-card reveal-card" key={value.title}>
              <Icon name={value.icon} />
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="trust" className="section trust-section">
        <div className="section-heading">
          <Badge icon="shield_lock">TRUST &amp; SECURITY</Badge>
          <h2>Secure by design. User-controlled by default.</h2>
          <p>
            wisemonie is designed to work with regulated wallet and payment infrastructure while
            wisemonie provides the money-structure and spending-control layer.
          </p>
        </div>
        <div className="trust-grid">
          {trustCards.map((card) => (
            <article className="trust-card reveal-card" key={card.title}>
              <Icon name={card.icon} />
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="download" className="section cta-section">
        <div className="download-card">
          <Badge icon="bolt">PRIVATE BETA</Badge>
          <h2>Join the early-access list.</h2>
          <p>
            We are opening private beta in phases. Drop your email and be among the first to test
            Wisemonie and stop the loan-app cycle for good.
          </p>
          <WaitlistForm />
          <p className="private-beta-note">Coming to Android and iOS.</p>
        </div>
      </section>

      <section id="faq" className="section faq-section">
        <div className="section-heading">
          <Badge icon="help">FAQ</Badge>
          <h2>Questions people ask before joining.</h2>
        </div>
        <div className="faq-grid">
          {faqItems.map((item) => (
            <article className="faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section final-cta-section">
        <div className="final-cta-card">
          <h2>Give your money structure before the pressure starts.</h2>
          <p>
            Join the Wisemonie early-access list and be among the first to stop the loan-app cycle
            for good.
          </p>
          <a href="#download" className="button button--primary">
            Get Early Access
          </a>
        </div>
      </section>
    </main>
  );
}
