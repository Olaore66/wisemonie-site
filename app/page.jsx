import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import WaitlistForm from "@/components/WaitlistForm";

const heroStats = [
  {
    title: "Protect essentials first",
    text: "Separate money for food, transport, bills, savings, and emergencies before daily spending begins."
  },
  {
    title: "Spend with structure",
    text: "Set simple rules that guide how money can be used across each income cycle."
  },
  {
    title: "Build better habits",
    text: "Reduce impulse spending and create more clarity around where your money goes."
  }
];

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
    text: "Use limits, timing rules, and smart pockets to reduce impulse spending."
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

const moneyFeatures = [
  {
    icon: "account_balance_wallet",
    title: "Smart Money Pockets",
    text: "Create separate pockets for food, transport, bills, savings, rent, emergencies, and flexible spending."
  },
  {
    icon: "verified",
    title: "Essential-First Allocation",
    text: "When money comes in, wisemonie helps you protect the important categories first."
  },
  {
    icon: "rule",
    title: "Spending Rules",
    text: "Set limits, release times, lock periods, or category-based controls."
  },
  {
    icon: "lock",
    title: "SafeLock",
    text: "Lock money for a goal or period, with clear rules before activation."
  },
  {
    icon: "swap_horiz",
    title: "Envelope Transfers",
    text: "Move money between pockets when your situation changes."
  },
  {
    icon: "receipt_long",
    title: "Bill and Airtime Flows",
    text: "Plan recurring expenses like bills, airtime, and data from the right money pocket."
  },
  {
    icon: "query_stats",
    title: "Real-Time Position",
    text: "See how much is left in each pocket before you spend."
  },
  {
    icon: "history",
    title: "Spending History",
    text: "View money movement by purpose, not just transaction lists."
  }
];

const flowSteps = [
  {
    icon: "payments",
    title: "Money comes in",
    text: "Add your salary, allowance, freelance income, or monthly inflow."
  },
  {
    icon: "shield",
    title: "Protect essentials",
    text: "Set aside money for food, transport, bills, savings, rent, and emergencies."
  },
  {
    icon: "rule",
    title: "Set your rules",
    text: "Choose how much can be spent, when money can be used, and what should stay protected."
  },
  {
    icon: "shopping_cart_checkout",
    title: "Spend with confidence.",
    text: "Spend money directly from the right pocket based on what works for you and stay aware of what remains."
  }
];

const appScreens = [
  {
    image: "/images/wisemonie1.jpeg",
    title: "Create your money plan",
    text: "Set the amount, duration, and purpose for your money cycle."
  },
  {
    image: "/images/wisemonie2.jpeg",
    title: "Split into pockets",
    text: "Divide money into essentials, savings, bills, transport, and flexible spending."
  },
  {
    image: "/images/wisemonie1.jpeg",
    title: "Track your position",
    text: "See what is available and what should stay protected."
  },
  {
    image: "/images/wisemonie2.jpeg",
    title: "Spend through rules",
    text: "Use money within the limits and conditions you created."
  }
];

const allocations = [
  ["Transport", "NGN 45,000", "88%"],
  ["Food", "NGN 60,000", "56%"],
  ["Bills", "NGN 120,000", "92%"]
];

const audienceCards = [
  {
    icon: "badge",
    title: "Salary Earners",
    text: "Protect transport, food, bills, and savings immediately after payday."
  },
  {
    icon: "work",
    title: "Freelancers",
    text: "Turn irregular income into structured pockets for survival, savings, work, and personal spending."
  },
  {
    icon: "school",
    title: "Students",
    text: "Stretch allowance across food, transport, data, school needs, and emergencies."
  },
  {
    icon: "rocket_launch",
    title: "Early-Career Professionals",
    text: "Build better money habits without complicated spreadsheets or financial jargon."
  },
  {
    icon: "storefront",
    title: "Side Hustlers",
    text: "Separate business money, personal spending, and recurring expenses more clearly."
  },
  {
    icon: "family_restroom",
    title: "Families and Shared Responsibilities",
    text: "Plan around essentials, obligations, and support needs without losing track."
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

const trustCards = [
  {
    icon: "account_balance",
    title: "Regulated Infrastructure",
    text: "User funds are intended to sit with licensed banking and payment partners."
  },
  {
    icon: "toggle_on",
    title: "User-Controlled Rules",
    text: "Locks, limits, and spending rules are optional and activated by the user."
  },
  {
    icon: "sync_alt",
    title: "Clear Money Movement",
    text: "Every money pocket shows what it is for, what has been used, and what remains."
  },
  {
    icon: "receipt",
    title: "Transparent Fees",
    text: "Any fees or penalties are shown before activation or transaction."
  }
];

const faqItems = [
  {
    question: "Is wisemonie a bank?",
    answer:
      "No. wisemonie is not a bank. wisemonie is designed to work with regulated wallet and payment partners while providing the money-structure, envelope, and spending-control layer."
  },
  {
    question: "Will wisemonie lock my money?",
    answer:
      "Only if you choose to activate a lock or spending rule. Discipline features are user-controlled and optional."
  },
  {
    question: "Can I change my money plan?",
    answer:
      "Yes. Some pockets can be adjusted when your needs change. Strict locks or SafeLock features may have separate rules that are shown before activation."
  },
  {
    question: "What happens if I try to spend beyond my limit?",
    answer:
      "If you activate spending rules, wisemonie may block, delay, or restrict actions that go against the rules you set."
  },
  {
    question: "Who is wisemonie for?",
    answer:
      "wisemonie is for salary earners, freelancers, students, side hustlers, and anyone who wants to reduce money pressure and stay in control of daily spending."
  },
  {
    question: "When will the app launch?",
    answer: "wisemonie is preparing for private beta and will onboard users in phases."
  },
  {
    question: "Will there be fees?",
    answer:
      "Some features may include fees, such as budget activation, premium controls, or transaction-related charges. Any applicable fee will be shown clearly before you use that feature."
  }
];

function ProductPreview() {
  return (
    <div className="product-preview" aria-label="wisemonie mobile app preview">
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
          alt="wisemonie app home dashboard"
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

function AppScreenCard({ image, title, text }) {
  return (
    <article className="app-screen-card reveal-card">
      <div className="app-screen-card__media">
        <img src={image} alt={`${title} screen`} />
      </div>
      <div className="app-screen-card__caption">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
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
            <Badge icon="volunteer_activism">Private beta opening soon</Badge>
            <h1>The one app to manage your money.</h1>
            <p className="hero-lede">
              Everyday life already comes with enough pressure. Wisemonie helps you give your income structure, protect essential money, and stay disciplined with simple spending rules, so money decisions feel clearer, calmer, and more intentional.
            </p>
            <div className="hero-actions">
              <a href="#download" className="button button--primary">
                Join Waitlist
              </a>
              <a href="#how-it-works" className="button button--secondary">
                See How It Works
              </a>
            </div>
            <p className="hero-supporting-line">
              Built for salary earners, freelancers, students, and anyone trying to stay in control
              of their money.
            </p>
            <div className="hero-stats">
              {heroStats.map((stat) => (
                <article key={stat.title}>
                  <h3>{stat.title}</h3>
                  <p>{stat.text}</p>
                </article>
              ))}
            </div>
          </div>

          <ProductPreview />
        </div>

        <div className="motion-strip" aria-hidden="true">
          <div className="motion-strip__track">
            <span>Money feels lighter when it has structure.</span>
            <span>Protect essentials before impulse spending gets there.</span>
            <span>Know what is safe to spend before you spend it.</span>
            <span>Discipline is easier when your money has rules.</span>
            <span>Financial peace starts with structure.</span>
            <span>Spend with clarity, not anxiety.</span>
            <span>Build better money habits one income cycle at a time.</span>
            <span>Your money should not create more pressure.</span>
            <span>Money feels lighter when it has structure.</span>
            <span>Protect essentials before impulse spending gets there.</span>
            <span>Know what is safe to spend before you spend it.</span>
            <span>Discipline is easier when your money has rules.</span>
            <span>Financial peace starts with structure.</span>
            <span>Spend with clarity, not anxiety.</span>
            <span>Build better money habits one income cycle at a time.</span>
            <span>Your money should not create more pressure.</span>
          </div>
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
        <div className="showcase-copy">
          <Badge icon="tune">THE SOLUTION</Badge>
          <h2>Give every part of your money a purpose.</h2>
          <p>
            wisemonie helps you divide your income into smart money pockets, set rules for each
            pocket, and spend with more intention without accidentally using money meant for
            something important.
          </p>
          <div className="solution-list">
            {solutionCards.map((solution) => (
              <SolutionCard key={solution.title} {...solution} />
            ))}
          </div>
        </div>

        <div className="showcase-visual">
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

      <section id="who-its-for" className="section assurance-section">
        <div className="section-heading">
          <Badge icon="groups">WHO IT&apos;S FOR</Badge>
          <h2>Built for people managing real financial pressure.</h2>
          <p>
            wisemonie is for anyone who wants more structure, discipline, and peace of mind around
            everyday spending.
          </p>
        </div>
        <div className="assurance-list">
          {audienceCards.map((item) => (
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
          <h2>Join the wisemonie private beta.</h2>
          <p>
            We are opening early access in phases. Join the waitlist to be among the first users to
            test wisemonie and help shape the future of disciplined spending.
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
            Join the wisemonie waitlist and be among the first to experience a calmer, more
            disciplined way to manage everyday spending.
          </p>
          <a href="#download" className="button button--primary">
            Join Waitlist
          </a>
        </div>
      </section>
    </main>
  );
}
