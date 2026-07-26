import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

function FAQ() {
  const [selected, setSelected] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    selected === index ? setSelected(null) : setSelected(index);
  };

  const FAQCards = [
    {
      id: "01",
      question: "Is WiseMonie a bank?",
      answer:
        "No. WiseMonie is not a bank and does not hold deposits. Your money is held with Rubies Microfinance Bank, our licensed banking partner regulated by the Central Bank of Nigeria. WiseMonie provides the envelope structure and the release schedule on top of that banking layer.",
    },
    {
      id: "02",
      question: "Will WiseMonie lock my money?",
      answer:
        "Only if you ask it to. WiseMonie has two types of envelopes: scheduled (open on a day and time you choose, like Monday lunch at 11am) and hard-locked (sealed until a date you set, like rent saving until the 30th). You decide which envelopes lock and which release. WiseMonie just enforces what you decided.",
    },
    {
      id: "03",
      question: "Can I change my money plan?",
      answer:
        "Yes, anytime. Your week is yours. When life changes: new job, baby coming, partner moves in, new church, you update your envelopes and the new week starts running. Hard-locked envelopes have their own unlock rules that you set up front, but everything else is editable.",
    },
    {
      id: "04",
      question: "What happens if I try to spend beyond my limit?",
      answer:
        "The envelope tells you it's empty for today. You can either wait until the next scheduled release, move money from a flex envelope, or override the rule manually if it's an emergency. WiseMonie doesn't block you against your will. It just makes sure you know which envelope you're spending from.",
    },
    {
      id: "05",
      question: "Who is WiseMonie for?",
      answer:
        "Anyone running a real week on a finite income: salary earners, students, freelancers, business owners, couples managing shared obligations. If your life has multiple recurring commitments (rent, tithe, family, partner, daily essentials) and one or two income streams, WiseMonie was built for you.",
    },
    {
      id: "06",
      question: "Will there be fees?",
      answer:
        "Small transfer fees apply (similar to what your bank already charges, ₦13 for transfers under ₦5,000). Core envelope features are free. Optional premium features for shared family envelopes, advanced analytics, and business mode are available on opt-in subscription. All fees are shown clearly in the app before any transaction. No surprise charges.",
    },
  ];

  return (
    <section id="faq">
      <div className="SectionHeads">
        <h1 className="SectionHead">Frequently Asked Questions</h1>
        <p className="SectionSubHead">
          Everything you need to know about WiseMonie
        </p>
      </div>

      <div id="FAQCards">
        {FAQCards.map((card, index) => {
          const isOpen = selected === index;

          return (
            <div
              className={`FAQCard ${isOpen ? "open" : ""}`}
              key={index}
              onClick={() => toggleFAQ(index)}
            >
              <div className="FAQCardDetails">
                <h3 className="FAQCardHead">{card.question}</h3>

                <span className={`FAQCaret ${isOpen ? "open" : ""}`}>
                  <FaChevronDown />
                </span>
              </div>

              <div className="FAQCardHidden">
                <p className="FAQCardAnswer">{card.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FAQ;
