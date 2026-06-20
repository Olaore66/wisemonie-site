import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import WaitlistForm from "@/components/WaitlistForm";
import HeroNotification from "@/components/HeroNotification";
import SectionIllustration from "@/components/SectionIllustration";
import TiltCard from "@/components/TiltCard";
import BudgetMotion from "@/components/BudgetMotion";
import FaqAccordion from "@/components/FaqAccordion";
import MotionButton from "@/components/MotionButton";
import Reveal from "@/components/Reveal";
import RevealGroup from "@/components/RevealGroup";
import RevealItem from "@/components/RevealItem";
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

export default function HomePage() {
  return (
    <main>
      <section className="hero-section">
        <SectionIllustration side="right" />
        <div className="hero-grid">
          <div className="hero-copy">
            <Badge icon="volunteer_activism">Private beta opening soon &middot; Built on regulated Nigerian rails</Badge>
            <h1>Everyone&apos;s fine on payday. Almost nobody is by week 3.</h1>
            <p className="hero-subhead">
              Half of Nigeria&apos;s income earners quietly reach for a loan app before the next one
              lands. Nobody talks about it. Wisemonie is built so you never have to.
            </p>
            <p className="hero-lede">
              Wisemonie holds your income in{" "}
              <span className="hero-highlight">structured envelopes</span> for transport, food,
              bills, savings, and emergencies. It only releases{" "}
              <span className="hero-highlight">today&apos;s spending limit</span> when you actually
              need it, so you reach the next payday without breaking your plan, and without anyone
              ever knowing how close it got.
            </p>
            <div className="hero-actions">
              <MotionButton as="a" href="#download" className="button button--primary">
                Get Early Access
              </MotionButton>
              <MotionButton as="a" href="/how-it-works" className="button button--secondary">
                See how it works &rarr;
              </MotionButton>
            </div>
          </div>

          <ProductPreview />
        </div>
      </section>

      <section className="section why-section">
        <SectionIllustration side="left" />
        <Reveal as="div" className="section-heading">
          <Badge icon="psychology_alt">WHY WISEMONIE</Badge>
          <h2>One reality, one solution.</h2>
        </Reveal>
        <div className="why-statement">
          <Reveal as="p" variant="up">
            <strong>Income lands.</strong> You write the plan in your head: rent savings,
            food, transport, internet, tithe, something for your parents.
          </Reveal>
          <Reveal as="p" variant="up">
            <strong>By day 6,</strong> you&apos;ve spent transport money on lunch out, twice. By day
            12, you&apos;re &ldquo;borrowing from next week.&rdquo; By day 20, you&apos;re on the
            loan apps.
          </Reveal>
          <Reveal as="p" variant="up">
            <strong>You don&apos;t have a money problem. You have an allocation problem.</strong>{" "}
            The money exists. The plan exists. What doesn&apos;t exist is the layer between them.
          </Reveal>
          <Reveal as="p" variant="up" className="why-statement__cta">
            Wisemonie is that layer.
          </Reveal>
        </div>
      </section>

      <section id="problem" className="section app-section">
        <SectionIllustration side="right" />
        <Reveal as="div" className="section-heading section-heading--left">
          <Badge icon="psychology_alt">THE PROBLEM</Badge>
          <h2>Money stress starts when everything sits in one account.</h2>
          <p>
            Most people are not bad with money. The problem is that income, bills, transport,
            food, savings, emergencies, and impulse spending often sit together in one account
            making it hard to know what is safe to spend.
          </p>
        </Reveal>

        <RevealGroup as="div" className="feature-grid">
          {problemCards.map(({ icon, title, text }) => (
            <RevealItem as="article" className="feature-card" key={title}>
              <Icon name={icon} />
              <h3>{title}</h3>
              <p>{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="section transition-section">
        <Reveal as="div" className="transition-statement">
          <h2>Financial peace starts with structure.</h2>
          <p>
            When your money has a clear purpose, you can protect what matters, reduce pressure, and make better decisions with what remains.
          </p>
        </Reveal>
      </section>

      <section id="solution" className="section showcase-section solution-section">
        <Reveal as="div" variant="left" className="showcase-copy">
          <Badge icon="tune">THE SOLUTION</Badge>
          <h2>Give every part of your money a purpose.</h2>
          <p>
            wisemonie helps you divide your income into smart money envelopes, set rules for each
            envelope, and spend with more intention without accidentally using money meant for
            something important.
          </p>
          <RevealGroup as="div" className="solution-list">
            {solutionCards.map(({ icon, title, text }) => (
              <RevealItem as="article" className="solution-card" key={title}>
                <Icon name={icon} />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>

        <Reveal as="div" variant="right" className="showcase-visual">
          <div className="phone-stage phone-stage--image phone-stage--secondary">
            <img
              src="/images/wisemonie2.jpeg"
              alt="wisemonie app budgets screen"
              className="phone-hero-image"
            />
          </div>
          <BudgetMotion />
        </Reveal>
      </section>

      <section id="features" className="section feature-section">
        <SectionIllustration side="left" />
        <Reveal as="div" className="section-heading">
          <Badge icon="apps">FEATURES</Badge>
          <h2>Built for the everyday money pressure.</h2>
          <p>
            wisemonie is designed to help you protect essential money, manage daily spending, and
            stay disciplined across every income cycle.
          </p>
        </Reveal>

        <RevealGroup as="div" className="money-feature-grid">
          {moneyFeatures.map(({ icon, title, text }) => (
            <RevealItem as="article" className="money-feature-card" key={title}>
              <Icon name={icon} />
              <h3>{title}</h3>
              <p>{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section id="how-it-works" className="section flow-section">
        <SectionIllustration side="right" />
        <Reveal as="div" className="section-heading">
          <Badge icon="route">HOW IT WORKS</Badge>
          <h2>A simple system for spending with more control.</h2>
        </Reveal>
        <RevealGroup as="div" className="flow-grid">
          {flowSteps.map((step, index) => (
            <RevealItem as="article" className="flow-card" key={step.title}>
              <div className="flow-card__number">{index + 1}</div>
              <Icon name={step.icon} />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="section app-screens-section">
        <Reveal as="div" className="section-heading">
          <h2>See your money by purpose, not just balance.</h2>
          <p>
            wisemonie is designed to show what each part of your money is for, what has been used,
            and what is still available, so you can make decisions with clarity.
          </p>
        </Reveal>

        <RevealGroup as="div" className="app-screen-grid">
          {appScreens.map(({ title, text }) => (
            <RevealItem as="article" className="app-screen-card" key={title}>
              <div className="app-screen-card__caption">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section id="who-its-for" className="section persona-section">
        <SectionIllustration side="left" />
        <Reveal as="div" className="section-heading">
          <Badge icon="groups">WHO IT&apos;S FOR</Badge>
          <h2>{targetPersona.heading}</h2>
          <p>{targetPersona.intro}</p>
        </Reveal>

        <Reveal as="div" variant="scale" className="persona-card">
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
      </section>

      <section className="section emotional-section">
        <Reveal as="div" className="section-heading">
          <h2>Less money pressure. More clarity to grow.</h2>
          <p>
            When money is unstructured, every decision feels heavier. wisemonie helps reduce the
            pressure by giving your income a clear job, so you can stop reacting, start
            planning, and build toward financial stability.
          </p>
        </Reveal>
        <RevealGroup as="div" className="emotional-grid">
          {emotionalValues.map(({ icon, title, text }) => (
            <RevealItem as="article" className="emotional-card" key={title}>
              <Icon name={icon} />
              <h3>{title}</h3>
              <p>{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section id="trust" className="section trust-section">
        <SectionIllustration side="right" />
        <Reveal as="div" className="section-heading">
          <Badge icon="shield_lock">TRUST &amp; SECURITY</Badge>
          <h2>Secure by design. User-controlled by default.</h2>
          <p>
            wisemonie is designed to work with regulated wallet and payment infrastructure while
            wisemonie provides the money-structure and spending-control layer.
          </p>
        </Reveal>
        <RevealGroup as="div" className="trust-grid">
          {trustCards.map(({ icon, title, text }) => (
            <RevealItem as="article" className="trust-card" key={title}>
              <Icon name={icon} />
              <h3>{title}</h3>
              <p>{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section id="download" className="section cta-section">
        <SectionIllustration side="left" />
        <Reveal as="div" variant="scale" className="download-card">
          <Badge icon="bolt">PRIVATE BETA</Badge>
          <h2>Join the early-access list.</h2>
          <p>
            We are opening private beta in phases. Drop your email and be among the first to test
            Wisemonie and stop the loan-app cycle for good.
          </p>
          <WaitlistForm />
          <p className="private-beta-note">Coming to Android and iOS.</p>
        </Reveal>
      </section>

      <section id="faq" className="section faq-section">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer }
              }))
            })
          }}
        />
        <Reveal as="div" className="section-heading">
          <Badge icon="help">FAQ</Badge>
          <h2>Questions people ask before joining.</h2>
        </Reveal>
        <FaqAccordion items={faqItems} />
      </section>

      <section className="section final-cta-section">
        <SectionIllustration side="right" />
        <Reveal as="div" className="final-cta-card">
          <h2>Give your money structure before the pressure starts.</h2>
          <p>
            Join the Wisemonie early-access list and be among the first to stop the loan-app cycle
            for good.
          </p>
          <MotionButton as="a" href="#download" className="button button--primary">
            Get Early Access
          </MotionButton>
        </Reveal>
      </section>
    </main>
  );
}
