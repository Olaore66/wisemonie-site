# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary visitor: a person in Nigeria who earns money, names the commitments that money has to cover, and then watches the plan fall apart before the month ends. The site's own audience list is salary earners, students, freelancers, small business owners, and couples. The shared job is the same: keep plan and spending aligned when several commitments compete for one income.

Inferred from on-site copy, not from a separate interview: the moment that matters is after income arrives, when rent, tithe, family, debt, food, and transport are already competing and a single bank balance hides which naira is actually free.

Secondary visitors: someone deciding whether to install the Android app, someone joining the iOS waitlist, and someone reading trust, FAQ, blog, or legal pages before they trust the product with money.

## Product Purpose

Wisemonie is a personal-finance app that assigns money to named envelopes, sets when each envelope opens, and makes spending come from the envelope that owns that purpose. The marketing site exists to explain that mechanism, show a worked example, and send people to Google Play or the iOS waitlist.

Success for the site is a visitor who understands that Wisemonie is the plan layer, not the bank, and who can install the Android app or leave an iOS email without being misled about who holds the money.

## Positioning

A neighboring bank or savings app can hold a balance. It cannot truthfully claim Wisemonie's mechanism: each commitment is its own envelope of real money, opened on a clock the person set, with essentials funded before flex money. Wisemonie does not hold deposits. Funds sit with Rubies Microfinance Bank under Central Bank of Nigeria regulation. Wisemonie provides envelopes, rules, and timing.

## Operating Context

The product is used in the mobile app. This repository is the marketing site at wisemonie.app. Registration, planning, and transactions happen in the app, not on these pages.

The site's worked example, confirmed in `components/SalaryAllocation.jsx`, is a ₦200,000 salary of which ₦140,000 is already committed: Rent ₦80,000 (40%), Tithe ₦25,000 (12.5%), Family ₦20,000 (10%), Debt ₦15,000 (7.5%), leaving ₦60,000 (30%) to live on.

`data/productContent.js` `weekCalendar` is one planned week: transport ₦1,500 at 7:00am on weekdays, lunch ₦3,000, Friday 6:00pm fun/date night ₦15,000, Sunday 8:00am tithe ₦15,000, plus locked monthly extras (rent saving ₦80,000, debt ₦15,000, emergency reserve ₦10,000, savings sweep ₦25,000). Weekly spending total in that example is ₦67,000. Those figures are an example, not a promise about a user's account.

Money-in sources named on the site: salary, freelance payment, business revenue, allowance. Bill flows named on the site: data, electricity, DStv, airtime, paid from the envelope that owns the bill.

## Capabilities and Constraints

Routes that must keep working: `/`, `/about`, `/features`, `/how-it-works`, `/who-its-for`, `/trust`, `/security`, `/faq`, `/contact`, `/blog`, `/blog/[slug]`, `/privacy-policy`, `/terms-of-use`, `/cookie-policy`, `/delete-account`, `/admin/blog`, plus `api/revalidate`, `robots.js`, and `sitemap.js`.

Android is live. Store id `com.wisemonie`. iOS is not live. The site offers an iOS waitlist (`components/IosWaitlistDialog.jsx`) and the FAQ says iOS is on the way. Whether that waitlist copy is still commercially current was not re-confirmed outside the repo. Leave the meaning as written.

Contact form posts to Formspree `mdkqqyjq`. Support address on the site is wisemoniehelpdesk@gmail.com. Account deletion is described as in-app (More → Profile & Account → Delete Account) or by email from the registered address.

Privacy, terms, and delete-account body HTML are loaded from the Wisemonie backend at `https://newmoniewise-6vpj.onrender.com` via `data/legalApi.js` (override `LEGAL_API_BASE`). Do not rewrite that pipeline or the fetched legal meaning. Blog content comes from Firebase Remote Config through `data/blogApi.js` and `data/firebase.js`. Do not rewrite blog posts. Do not invent testimonials, prices, customers, or review text.

Confirmed fee language in the FAQ: small transfer fees, similar to a bank, ₦13 for transfers under ₦5,000. Core envelope features are free. Optional premium features are an opt-in subscription. Fees are shown before a transaction. No other price was confirmed.

Envelope types named in the FAQ: scheduled (opens on a day and time the person chooses) and hard-locked (sealed until a date they set). An empty envelope tells the person; they can wait, move flex money, or override. The app does not block them against their will.

Stack already in the repo: Next.js 16, React 19, plain CSS in `app/globals.css`, Framer Motion, Lenis, Firebase, Vercel Analytics. Dev command is `npm run dev`.

Undecided, and not invented here: a separate legal entity name is not printed on the marketing pages. Public line in the footer is "Wisemonie. Built on regulated Nigerian rails." Copyright line is "© 2026 Wisemonie."

## Brand Commitments

Name on the site is Wisemonie, often set in sentence case as "wisemonie" inside headlines. Tagline in the footer: "Your plan. Your spending. Always aligned." Default title: "Wisemonie: Align your financial plan with your spending." Homepage headline in source: "Plan your money. Spend from the plan."

Logo asset: `public/images/logo2.svg`. The wordmark paths are white. The header gives that file a night-lagoon plate so it stays readable. The mark's envelope shapes use the incumbent lime, mint, and teal. Do not invent a new logo.

Voice already in the copy: direct, second person, naira amounts, commitments named in life language (rent, tithe, family, transport), and an explicit refusal to call the product a bank.

Binding constraints from the rebuild request, recorded here so later visual work cannot treat them as optional taste:

- Keep every route, feature, data flow, and the meaning of the copy.
- One strong idea, one type pairing, one accent. Sections do not share the same layout.
- Do not use purple or blue gradients, glowing buttons, one font for every role, emoji as icons, a rounded-square icon tile above every heading, three equal cards in a row, cards nested in cards, gray text on a colored background, pill buttons as the default, Inter/Roboto/Arial as the brand face, or the same spacing and radius on every block.
- Do not reskin the site as an Apple marketing page. Motion and type craft (optical size, tracking, leading, materials, springs, interruptible motion, reduced motion) still apply.
- Working mood, inferred because the request left the mood bracket empty and forbade "modern" or "clean": the quiet hour after payday, when the salary is already spoken for and each named envelope waits for its clock. This sentence was not supplied by the user. It is the working assumption for this rebuild.

Social accounts linked from the site: Instagram, X, Facebook, and TikTok at wisemonie_app, plus a WhatsApp channel.

## Evidence on Hand

- Copy and examples: `data/productContent.js`, `components/SalaryAllocation.jsx`, `app/page.jsx`, `app/about/page.jsx`.
- Reviews that may be quoted, and only these three, from `data/productContent.js`: Babalotin Joy (July 2026), Abdullahi Mkudu (August 2026), airdrop scavenger (August 2026). Do not invent more.
- Imagery already in the repo includes `public/images/dashboard.png`, the hero person photo referenced as `hero-person.jpg`, and the logo files. Do not treat discarded local art from earlier uncommitted work as part of this tree.
- Absence: no customer counts, no download counts, no audited performance claims, and no press quotes were found in the marketing source. Do not fabricate them.

## Product Principles

1. The plan is the product. A single balance is the problem the site is here to undo.
2. The clock is the mechanism. Envelopes open when the person said they should, not when willpower shows up.
3. Say who holds the money. Every trust surface keeps the Rubies / CBN distinction intact.
4. Use the numbers the product already published. Do not invent a richer salary story.
5. The site sells understanding and an install. It does not become the app.

## Accessibility & Inclusion

No separate legal accessibility standard was stated. The site already ships a reduced-motion media query, visible nav labels, and an iOS waitlist that must stay usable without a mouse. Naira amounts and the bank-versus-plan distinction have to remain readable at phone width. Rebuild work keeps that, including `prefers-reduced-motion` as a cross-fade rather than a removed state.
