import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import StoreButtons from "@/components/StoreButtons";
import HeroNotification from "@/components/HeroNotification";
import SectionIllustration from "@/components/SectionIllustration";
import SalaryAllocation from "@/components/SalaryAllocation";
import HeroPerson from "@/components/HeroPerson";
import TiltCard from "@/components/TiltCard";
import BudgetMotion from "@/components/BudgetMotion";
import WeekCalendar from "@/components/WeekCalendar";
import FaqAccordion from "@/components/FaqAccordion";
import MotionButton from "@/components/MotionButton";
import Reveal from "@/components/Reveal";
import RevealGroup from "@/components/RevealGroup";
import RevealItem from "@/components/RevealItem";
import {
  faqItems,
  flowSteps,
  homeAudience,
  moneyFeatures,
  trustCards,
  weekCalendar
} from "@/data/productContent";
import { publicImage } from "@/data/assets";

const HERO_PHOTO_ALT =
  "A young man checking Wisemonie on his phone — every naira already assigned to a purpose";

const problemCards = [
  {
    icon: "query_stats",
    title: "You planned it. Then spent past it.",
    text: "You had a plan on payday. By week two the plan is in your head and the money is everywhere else."
  },
  {
    icon: "schedule",
    title: "One balance hides ten commitments.",
    text: "Your bank shows ₦85K. But ₦40K is rent, ₦15K is tithe, ₦10K is family. The number lies about what's actually available."
  },
  {
    icon: "volunteer_activism",
    title: "Good intentions with no guardrails.",
    text: "You meant to set aside ₦5K for mum every week. Nothing stopped you from spending it on something else first."
  },
  {
    icon: "favorite",
    title: "Guilt replaces every spending decision.",
    text: "Can I afford this lunch? Should I go out tonight? Every purchase triggers a mental audit because nothing is pre-decided."
  }
];

const solutionCards = [
  {
    icon: "utensils",
    title: "Every naira has a job before you spend it.",
    text: "Lunch money is lunch money. It can't accidentally become transport or data. Your plan holds."
  },
  {
    icon: "gift",
    title: "Commitments are funded, not remembered.",
    text: "Tithe, offering, family support — each sits in its own envelope, protected until the moment it's needed."
  },
  {
    icon: "volunteer_activism",
    title: "Spending guilt disappears.",
    text: "When money is pre-assigned, every purchase is a yes-or-no against your own plan. No mental maths, no second-guessing."
  },
  {
    icon: "favorite",
    title: "Your plan survives the whole month.",
    text: "Not just payday week. Week two, three, four — the structure holds because the money is already separated."
  }
];

function ProductPreview() {
  return (
    <div className="product-preview" aria-label="wisemonie mobile app preview">
      <HeroNotification />

      <TiltCard className="phone-tilt-wrap">
        <div className="phone-stage phone-stage--image phone-stage--hero">
          <img
            src="/images/dashboard.png"
            alt="Wisemonie app home screen: a ₦30,824 balance with budgets and envelopes"
            className="phone-hero-image"
            fetchPriority="high"
          />
        </div>
      </TiltCard>
    </div>
  );
}

export default function HomePage() {
  const heroPhoto = publicImage("hero-person.jpg");

  return (
    <main>
      <section className="hero-section">
        <SectionIllustration side="right" />
        <div className="hero-grid">
          <div className="hero-copy">
            <Badge icon="volunteer_activism">
              Live on Google Play{" "}
              <span className="eyebrow__secondary">&middot; Built on regulated Nigerian rails</span>
            </Badge>
            <h1>Your financial plan and your spending, finally aligned.</h1>
            <p className="hero-subhead">
              Wisemonie makes sure the money you planned for rent stays rent, the money for family stays family, and every naira you spend comes from a decision you already made.
            </p>
            <p className="hero-lede">
              <span className="hero-highlight">Create a plan. Assign money to it. Spend only from what you assigned. No willpower required.</span>
            </p>
            <div className="hero-actions hero-actions--stack">
              <StoreButtons layout="row" />
              <MotionButton as="a" href="/how-it-works" className="button button--ghost">
                See how it works &rarr;
              </MotionButton>
            </div>
          </div>

          {heroPhoto ? (
            <HeroPerson src={heroPhoto} alt={HERO_PHOTO_ALT} />
          ) : (
            <ProductPreview />
          )}
        </div>
      </section>

      <section className="section why-section">
        <SectionIllustration side="left" />
        <Reveal as="div" className="section-heading">
          <Badge icon="psychology_alt">WHY WISEMONIE</Badge>
          <h2>You already know where your money should go. The problem is keeping it there.</h2>
        </Reveal>
        <div className="why-statement">
          <Reveal as="p" variant="up">
            <strong>You have a plan.</strong> Rent, family, tithe, savings, daily expenses — you know
            exactly how your money should be divided. That part isn&apos;t hard.
          </Reveal>
          <Reveal as="p" variant="up">
            <strong>But your bank account doesn&apos;t know your plan.</strong> It shows one number.
            Every spend chips away at everything at once. By mid-month, the plan and reality have
            diverged.
          </Reveal>
          <Reveal as="p" variant="up">
            <strong>The gap between your plan and your spending is the whole problem.</strong>{" "}
            Wisemonie closes it.
          </Reveal>
          <Reveal as="p" variant="up" className="why-statement__cta">
            Plan it. Fund it. Spend from it.
          </Reveal>
        </div>
      </section>

      <section id="problem" className="section app-section">
        <SectionIllustration side="right" />
        <Reveal as="div" className="section-heading section-heading--left">
          <Badge icon="psychology_alt">THE PROBLEM</Badge>
          <h2>Your plan exists. Your account ignores it.</h2>
          <p>
            Ten commitments, one balance, zero separation. You know what each naira is for — your
            account doesn&apos;t.
          </p>
        </Reveal>

        <Reveal as="div" variant="up" className="problem-visual">
          <SalaryAllocation />
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
          <h2>What if your spending could only happen inside your plan?</h2>
          <p>That&apos;s exactly what Wisemonie does.</p>
        </Reveal>
      </section>

      <section id="solution" className="section showcase-section solution-section">
        <Reveal as="div" variant="left" className="showcase-copy">
          <Badge icon="tune">THE SOLUTION</Badge>
          <h2>Assign money to your plan. Spend only from what you assigned.</h2>
          <p>
            Every commitment gets its own envelope with real money in it. You spend from the
            envelope, not from a shared pool. Your plan and your spending stay in sync.
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
              src="/images/app/enveloperules.png"
              alt="Wisemonie release rules: pick the days and time each envelope opens (e.g. Mon/Wed/Fri at 7:30am)"
              className="phone-hero-image"
              loading="lazy"
            />
          </div>
          <BudgetMotion />
        </Reveal>
      </section>

      <section id="features" className="section feature-section">
        <SectionIllustration side="left" />
        <Reveal as="div" className="section-heading">
          <Badge icon="apps">FEATURES</Badge>
          <h2>The tools that keep your plan and your spending aligned.</h2>
          <p>
            Envelopes, release schedules, spending rules, and real-time visibility — each feature
            closes the gap between intention and action.
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
          <h2>Set your plan once. Spend from it every day.</h2>
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

      <section id="your-week" className="section week-section">
        <Reveal as="div" className="section-heading">
          <Badge icon="calendar_days">YOUR WEEK ON WISEMONIE</Badge>
          <h2>{weekCalendar.heading}</h2>
          <p>{weekCalendar.intro}</p>
        </Reveal>
        <WeekCalendar />
      </section>

      <section id="who-its-for" className="section persona-section">
        <SectionIllustration side="left" />
        <Reveal as="div" className="section-heading">
          <Badge icon="groups">WHO IT&apos;S FOR</Badge>
          <h2>{homeAudience.heading}</h2>
          <p>{homeAudience.intro}</p>
        </Reveal>

        <RevealGroup as="div" className="money-feature-grid audience-grid">
          {homeAudience.personas.map(({ icon, title, text }) => (
            <RevealItem as="article" className="money-feature-card" key={title}>
              <Icon name={icon} />
              <h3>{title}</h3>
              <p>{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal as="p" variant="up" className="audience-closing">
          {homeAudience.closing}
        </Reveal>
      </section>

      <section id="trust" className="section trust-section">
        <SectionIllustration side="right" />
        <Reveal as="div" className="section-heading">
          <Badge icon="shield_lock">TRUST &amp; SECURITY</Badge>
          <h2>Your money lives with a regulated bank. Wisemonie adds the plan layer.</h2>
          <p>
            Funds sit on regulated banking infrastructure. Wisemonie provides the structure, rules,
            and timing on top.
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
          <Badge icon="bolt">AVAILABLE NOW</Badge>
          <h2>Download Wisemonie.</h2>
          <p>
            Live on Google Play today. Make a plan, fund it, and spend from it.
          </p>
          <StoreButtons layout="row" />
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
          <h2>Questions people ask before downloading.</h2>
        </Reveal>
        <FaqAccordion items={faqItems} />
      </section>

      <section className="section final-cta-section">
        <SectionIllustration side="right" />
        <Reveal as="div" className="final-cta-card">
          <h2>Stop spending past your plan. Start spending from it.</h2>
          <p>
            Wisemonie is live on Google Play. iOS is on the way.
          </p>
          <StoreButtons layout="row" />
        </Reveal>
      </section>
    </main>
  );
}
