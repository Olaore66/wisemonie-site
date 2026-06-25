import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import WaitlistForm from "@/components/WaitlistForm";
import HeroEnvelopeStack from "@/components/HeroEnvelopeStack";
import SectionIllustration from "@/components/SectionIllustration";
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
    text: "You check your account. ₦200K. You feel rich. But ₦80K is rent. ₦25K is tithe. ₦20K is mum. ₦15K is debt. You actually have ₦40K to live on this week. The account didn't tell you that."
  },
  {
    icon: "schedule",
    title: "Wednesday service.",
    text: "Church starts in two hours. You're doing maths in your head about how much is for offering. You shouldn't have to be doing this. The offering money was supposed to be set aside on the 25th."
  },
  {
    icon: "volunteer_activism",
    title: "Saturday call to mum.",
    text: "You promised yourself you'd send ₦5K every Saturday. This is the third Saturday you've skipped. Not because you don't have ₦5K. Because you're not sure if you do."
  },
  {
    icon: "favorite",
    title: "Friday night.",
    text: "Your partner is asking what you're doing this weekend. You say “let's just stay in,” but really you can't tell if there's money for a date or not. So you skip it. Again."
  }
];

const solutionCards = [
  {
    icon: "utensils",
    title: "Monday lunch shows up on Monday.",
    text: "₦3,000 in your “Work lunch” envelope, released Monday morning at 11am. Wednesday too. Friday too. Tuesday and Thursday, the envelope stays closed. You bring food from home and don't even think about it."
  },
  {
    icon: "gift",
    title: "Sunday offering is sacred again.",
    text: "₦2,000 in your “Offering” envelope, locked until Sunday 8am. When the basket comes around, you give without doing the maths. The money was set aside on the 25th. Sunday-you just lives the result."
  },
  {
    icon: "volunteer_activism",
    title: "Mum gets her ₦5K every Saturday.",
    text: "Automatic. Same time every week. She knows it's coming. You know it's coming. You become the person you've always wanted to be, without willpower, without remembering."
  },
  {
    icon: "favorite",
    title: "Friday night money is Friday night money.",
    text: "₦15,000 in your “Chillout” envelope, released Friday at 6pm. You take your partner out. You see your friends. You don't dip into rent. You don't start next Monday already behind."
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
      <HeroEnvelopeStack />
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
            <h1>Salary on the 25th. Life on every other day.</h1>
            <p className="hero-subhead">
              Wisemonie splits one salary into the rhythms of your actual week.
            </p>
            <p className="hero-lede">
              <span className="hero-highlight">Monday lunch</span>, Wednesday service, Friday
              chillout, <span className="hero-highlight">Sunday offering</span>, Saturday call to
              your parents. Every commitment shows up on time. You stop doing maths in your head.
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
            <strong>Salary arrives on the 25th.</strong> Your brain plans it perfectly in the
            first 30 minutes: rent goes here, tithe goes there, &#8358;25K to mum, food and
            transport sorted, something for the partner, a little left for the weekend.
          </Reveal>
          <Reveal as="p" variant="up">
            <strong>By Friday of the same week,</strong> you&apos;re already not sure how much of
            any of that is left. The bank shows one big number. The plan was in your head. The two
            never match.
          </Reveal>
          <Reveal as="p" variant="up">
            <strong>You don&apos;t have a money problem.</strong> You have a week problem. Nothing
            in your bank account knows what day it is. Wisemonie does.
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
            Most Nigerians are running ten parallel commitments from one bank balance, and the
            balance refuses to tell them which money belongs to which commitment. The result is
            not failure. It&apos;s exhaustion.
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
          <h2>All of this stops the moment your week is structured the way your life is.</h2>
          <p>Set your week once. Let it run on its own.</p>
        </Reveal>
      </section>

      <section id="solution" className="section showcase-section solution-section">
        <Reveal as="div" variant="left" className="showcase-copy">
          <Badge icon="tune">THE SOLUTION</Badge>
          <h2>Give every day of your week its own money.</h2>
          <p>
            Wisemonie splits one salary into envelopes that match your real week, and releases the
            right money on the right day, automatically. You stop deciding. The week decides for
            you.
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
