export const moneyFeatures = [
  {
    icon: "account_balance_wallet",
    title: "Smart Money Envelopes",
    text: "Create one envelope per real commitment in your life. Monday lunch. Tithe. Mum. Rent saving. Friday date. Each one is real money, separated from everything else."
  },
  {
    icon: "schedule",
    title: "Scheduled Releases",
    text: "Set the day and time each envelope opens. Transport at 7am Monday-Friday. Offering at 8am Sunday. Parents at 9am Saturday. Your week runs on a clock."
  },
  {
    icon: "verified",
    title: "Essential-First Allocation",
    text: "On payday, the system makes sure rent, tithe, parents, and savings get their envelopes filled first. Whatever's left becomes your flex money, and you can spend it without guilt."
  },
  {
    icon: "rule",
    title: "Spending Rules",
    text: "Lock high-stakes envelopes (rent saving, tithe) so you cannot raid them. Set soft envelopes (flex, food) to release on schedule. You choose the strictness for each one."
  },
  {
    icon: "receipt_long",
    title: "Bill and Airtime Flows",
    text: "Pay your data, electricity, DStv, airtime, directly from the envelope that owns that bill. No more spending lunch money on data top-up because you forgot the bill envelope existed."
  },
  {
    icon: "query_stats",
    title: "Real-Time Position",
    text: "See exactly what's available right now in every envelope. Not a single confusing balance, a clear picture of each commitment: what's released, what's locked, what's coming."
  },
  {
    icon: "history",
    title: "Spending History by Purpose",
    text: "See where your week's money went, organised by life category. Not \"47 transactions in May,\" but \"Lunch ₦18K. Tithe ₦8K. Mum ₦20K. Date ₦12K.\" Receipts that match your life."
  },
  {
    icon: "smart_toy",
    title: "AI Money Assistant",
    text: "Tell it about an unusual week: wedding coming, parent visiting, school fees due, and it suggests how to adjust your envelopes without breaking the rest."
  }
];

export const flowSteps = [
  {
    icon: "account_balance_wallet",
    title: "Fund your wallet.",
    text: "Move your income in on payday. Wisemonie sits on regulated Nigerian banking rails, your money is held with our licensed partner, not by us."
  },
  {
    icon: "calendar_days",
    title: "Build your week.",
    text: "Walk through your normal week with Wisemonie. Monday lunch. Wednesday service offering. Friday date. Saturday call to mum. Sunday tithe. Daily transport. Weekly chillout. Rent saving. Each becomes its own envelope."
  },
  {
    icon: "schedule",
    title: "Set the release rhythm.",
    text: "Transport opens at 7am Monday-Friday. Lunch at 11am Mon-Wed-Fri. Offering at 8am Sunday. Parents at 9am Saturday. Rent saving stays locked until rent is due. Your week now runs on a clock."
  },
  {
    icon: "shopping_cart_checkout",
    title: "Live the week.",
    text: "Spend directly from the envelope of the moment: buy lunch from the Monday lunch envelope, pay tithe from the Sunday tithe envelope, send mum's money from the Parents envelope. When today's envelope is empty, it's empty. Tomorrow's envelope opens on its own."
  }
];

export const targetPersona = {
  heading: "Built for one person first",
  intro:
    "Wisemonie is designed for Nigerian income earners making ₦200K–₦700K per month, who:",
  points: [
    "Already use 3–4 money apps (bank + OPay/PalmPay + savings app + maybe a loan app)",
    "Try to budget but watch the plan fall apart by week 3",
    "Send something home to family every month",
    "Tithe and give offerings",
    "Want better discipline but can't fight willpower battles 47 times a week"
  ],
  closing: "If that sounds like you, you're who we built this for.",
  note:
    "Other groups, like students, freelancers, and families, are welcome to join the waitlist. We built for this person first because winning one specific user well beats winning everyone weakly."
};

export const homeAudience = {
  heading: "Built for anyone running a real week on a finite income.",
  intro:
    "If you've ever opened a second bank account to hide money from yourself, you understand the problem Wisemonie solves. You're not undisciplined. You're running too many parallel commitments through infrastructure that was never built to separate them.",
  personas: [
    {
      icon: "business",
      title: "Salary earners",
      text: "Managing rent, tithe, family, food, transport, and a partner, every week, every month, with no built-in separation."
    },
    {
      icon: "graduation_cap",
      title: "Students",
      text: "Running NYSC allowance, money from home, and side gigs through one account that pretends it's all the same money."
    },
    {
      icon: "laptop",
      title: "Freelancers",
      text: "Receiving lumpy income: a big project payment that has to last three months covering tax, savings, family obligation, and daily life."
    },
    {
      icon: "store",
      title: "Small business owners",
      text: "Whose business money, personal money, family obligation money, and tithe money all sit in the same account because there's no easy way to separate them."
    },
    {
      icon: "favorite",
      title: "Couples",
      text: "Managing shared rent, shared school fees, individual tithes, and individual family obligations from two incomes and zero shared visibility."
    }
  ],
  closing: "Wisemonie was built for one core insight: your life has rhythms. Your money should follow them."
};

export const trustCards = [
  {
    icon: "account_balance",
    title: "Regulated infrastructure",
    text: "Your funds are held with our licensed banking partner, Rubies Microfinance Bank, under Central Bank of Nigeria regulation. Wisemonie doesn't hold your money. We hold the rules and timing of your week: when each envelope opens, what's protected, what's available today."
  },
  {
    icon: "toggle_on",
    title: "User-controlled rules",
    text: "Every lock, limit, and release rule is something you turn on, not something we impose. You can adjust your plan when your life changes."
  },
  {
    icon: "receipt",
    title: "Transparent fees",
    text: "Any transaction fees or penalties show clearly before activation. No surprise charges."
  }
];

export const faqItems = [
  {
    question: "Is wisemonie a bank?",
    answer:
      "No. wisemonie is not a bank and does not hold deposits. Your money is held with Rubies Microfinance Bank, our licensed banking partner regulated by the Central Bank of Nigeria. wisemonie provides the envelope structure and the release schedule on top of that banking layer."
  },
  {
    question: "Will wisemonie lock my money?",
    answer:
      "Only if you ask it to. wisemonie has two types of envelopes: scheduled (open on a day and time you choose, like Monday lunch at 11am) and hard-locked (sealed until a date you set, like rent saving until the 30th). You decide which envelopes lock and which release. wisemonie just enforces what you decided."
  },
  {
    question: "Can I change my money plan?",
    answer:
      "Yes, anytime. Your week is yours. When life changes: new job, baby coming, partner moves in, new church, you update your envelopes and the new week starts running. Hard-locked envelopes have their own unlock rules that you set up front, but everything else is editable."
  },
  {
    question: "What happens if I try to spend beyond my limit?",
    answer:
      "The envelope tells you it's empty for today. You can either wait until the next scheduled release, move money from a flex envelope, or override the rule manually if it's an emergency. wisemonie doesn't block you against your will. It just makes sure you know which envelope you're spending from."
  },
  {
    question: "Who is wisemonie for?",
    answer:
      "Anyone running a real week on a finite income: salary earners, students, freelancers, business owners, couples managing shared obligations. If your life has multiple recurring commitments (rent, tithe, family, partner, daily essentials) and one or two income streams, wisemonie was built for you."
  },
  {
    question: "When will the app launch?",
    answer:
      "Private beta is opening in phases now. Join the early-access list to be invited as we open more spots. Public launch on Android and iOS is coming shortly after."
  },
  {
    question: "Will there be fees?",
    answer:
      "Small transfer fees apply (similar to what your bank already charges, ₦13 for transfers under ₦5,000). Core envelope features are free. Optional premium features for shared family envelopes, advanced analytics, and business mode are available on opt-in subscription. All fees are shown clearly in the app before any transaction. No surprise charges."
  }
];

export const weekCalendar = {
  heading: "This is what one funded week looks like.",
  intro:
    "Salary lands on the 25th. By 30 minutes later, your whole week is set. Here's what runs on its own from then on.",
  days: [
    {
      day: "Mon",
      full: "Monday",
      items: [
        { time: "7:00am", icon: "bus", label: "Transport", amount: "₦1,500" },
        { time: "11:00am", icon: "utensils", label: "Work lunch", amount: "₦3,000" },
        { time: "Evening", icon: "shopping_bag", label: "Daily essentials", amount: "₦500" }
      ]
    },
    {
      day: "Tue",
      full: "Tuesday",
      items: [
        { time: "7:00am", icon: "bus", label: "Transport", amount: "₦1,500" },
        { time: "Evening", icon: "shopping_bag", label: "Daily essentials", amount: "₦500" }
      ]
    },
    {
      day: "Wed",
      full: "Wednesday",
      items: [
        { time: "7:00am", icon: "bus", label: "Transport", amount: "₦1,500" },
        { time: "11:00am", icon: "utensils", label: "Work lunch", amount: "₦3,000" },
        { time: "6:30pm", icon: "gift", label: "Service offering", amount: "₦1,000" },
        { time: "Evening", icon: "shopping_bag", label: "Daily essentials", amount: "₦500" }
      ]
    },
    {
      day: "Thu",
      full: "Thursday",
      items: [
        { time: "7:00am", icon: "bus", label: "Transport", amount: "₦1,500" },
        { time: "Evening", icon: "shopping_bag", label: "Daily essentials", amount: "₦500" }
      ]
    },
    {
      day: "Fri",
      full: "Friday",
      items: [
        { time: "7:00am", icon: "bus", label: "Transport", amount: "₦1,500" },
        { time: "11:00am", icon: "utensils", label: "Work lunch", amount: "₦3,000" },
        { time: "6:00pm", icon: "favorite", label: "Chillout / date", amount: "₦15,000" },
        { time: "Evening", icon: "shopping_bag", label: "Daily essentials", amount: "₦500" }
      ]
    },
    {
      day: "Sat",
      full: "Saturday",
      items: [
        { time: "9:00am", icon: "volunteer_activism", label: "Send to parents", amount: "₦5,000" },
        { time: "Flex day", icon: "account_balance_wallet", label: "Personal flex", amount: "₦8,000" }
      ]
    },
    {
      day: "Sun",
      full: "Sunday",
      items: [{ time: "8:00am", icon: "gift", label: "Tithe", amount: "₦15,000" }]
    }
  ],
  summary: {
    weeklyTotal: "₦67,000",
    monthlyTotal: "₦268,000",
    extras: [
      { label: "Rent saving", amount: "₦80,000", note: "locked, releases on due date" },
      { label: "Debt payment", amount: "₦15,000" },
      { label: "Emergency reserve", amount: "₦10,000", note: "released only with reason" },
      { label: "Savings sweep", amount: "₦25,000" }
    ],
    closing:
      "Your ₦450,000 salary is fully accounted for, by day, for a month. You don't budget. You just live the week."
  }
};
