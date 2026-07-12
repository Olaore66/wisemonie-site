import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import WaitlistForm from "@/components/WaitlistForm";
import HeroNotification from "@/components/HeroNotification";
import SectionIllustration from "@/components/SectionIllustration";
import SalaryAllocation from "@/components/SalaryAllocation";
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

const problemCards = [
  {
    icon: "query_stats",
    title: "Monday morning.",
    text: "₦200K in the app. You feel rich — until you remember ₦140K is already rent, tithe, mum and debt. This week is really ₦60K."
  },
  {
    icon: "schedule",
    title: "Wednesday service.",
    text: "Church in two hours, and you're doing maths in your head for offering — money you meant to set aside on the 25th."
  },
  {
    icon: "volunteer_activism",
    title: "Saturday call to mum.",
    text: "You meant to send ₦5K every Saturday. Third one skipped — not because you don't have it, but because you're not sure you do."
  },
  {
    icon: "favorite",
    title: "Friday night.",
    text: "“Let's just stay in,” you tell your partner — because you can't tell if there's money for a date. So you skip it. Again."
  }
];

const solutionCards = [
  {
    icon: "utensils",
    title: "Monday lunch shows up on Monday.",
    text: "₦3,000 in “Work lunch,” released Mon/Wed/Fri at 11am. Tue and Thu it stays shut — so you bring food from home without thinking about it."
  },
  {
    icon: "gift",
    title: "Sunday offering is sacred again.",
    text: "₦2,000 in “Offering,” locked until Sunday 8am. When the basket comes, you give without doing maths — it was set aside on the 25th."
  },
  {
    icon: "volunteer_activism",
    title: "Mum gets her ₦5K every Saturday.",
    text: "Automatic, same time every week. She knows it's coming; so do you. No willpower, no remembering."
  },
  {
    icon: "favorite",
    title: "Friday night money is Friday night money.",
    text: "₦15,000 in “Chillout,” released Friday 6pm. Go out, see friends — without dipping into rent or starting Monday behind."
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
            <Badge icon="volunteer_activism">
              Private beta opening soon{" "}
              <span className="eyebrow__secondary">&middot; Built on regulated Nigerian rails</span>
            </Badge>
            <h1>Budget & spend directly from the budget.</h1>
            <p className="hero-subhead">
              Wisemonie splits one salary into the rhythms of your actual week.
            </p>
            <p className="hero-lede">
              <span className="hero-highlight">Wisemonie turns your budget into the account you spend from. Your income splits into envelopes — transport, food, offering, family — each one releasing money on the schedule you set, so you spend directly from your plan instead of around it.</span>.
            </p>
            <div className="hero-actions">
              <MotionButton as="a" href="#download" className="button button--primary">
                Take back your week
              </MotionButton>
              <MotionButton as="a" href="/how-it-works" className="button button--secondary">
                See how Wisemonie runs your week &rarr;
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
          <h2>Your salary lands once a month. Your life happens every day.</h2>
        </Reveal>
        <div className="why-statement">
          <Reveal as="p" variant="up">
            <strong>Salary lands on the 25th.</strong> In 30 minutes your brain has it all planned —
            rent, tithe, &#8358;25K to mum, transport, a little for the weekend.
          </Reveal>
          <Reveal as="p" variant="up">
            <strong>By Friday,</strong> you&apos;ve lost track of what&apos;s left. The bank shows one
            big number; the plan lived in your head. They never match.
          </Reveal>
          <Reveal as="p" variant="up">
            <strong>You don&apos;t have a money problem. You have a week problem.</strong> Nothing in
            your account knows what day it is. Wisemonie does.
          </Reveal>
          <Reveal as="p" variant="up" className="why-statement__cta">
            Wisemonie runs the week.
          </Reveal>
        </div>
      </section>

      <section id="problem" className="section app-section">
        <SectionIllustration side="right" />
        <Reveal as="div" className="section-heading section-heading--left">
          <Badge icon="psychology_alt">THE PROBLEM</Badge>
          <h2>One account. Ten commitments. No structure.</h2>
          <p>
            Ten commitments, one balance that won&apos;t tell you which money belongs to what. The
            result isn&apos;t failure — it&apos;s exhaustion.
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
          <h2>It all stops the moment your week is structured the way your life is.</h2>
          <p>Set your week once. Let it run on its own.</p>
        </Reveal>
      </section>

      <section id="solution" className="section showcase-section solution-section">
        <Reveal as="div" variant="left" className="showcase-copy">
          <Badge icon="tune">THE SOLUTION</Badge>
          <h2>Give every day of your week its own money.</h2>
          <p>
            One salary, split into envelopes that match your real week — each releasing on the right
            day, automatically. You stop deciding; the week decides for you.
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
          <h2>The mechanics that make your week run itself.</h2>
          <p>
            Every feature exists to put the right money on the right day, automatically, so you
            stop carrying the week in your head.
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
          <h2>Set your week once. Live it every week.</h2>
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
          <h2>Your money lives with a regulated bank. Wisemonie just runs the week.</h2>
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
