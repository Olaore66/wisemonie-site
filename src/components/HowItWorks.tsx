import EnvelopeList from "../assets/envelopelist.png";
import EnvelopeRules from "../assets/enveloperules.png";
import BillPayment from "../assets/billpayment.png";
import TransferToBank from "../assets/transfertobank.png";
import useScrollSteps from "../hooks/useScrollSteps";
import { useState, useEffect } from "react";

function HowItWorks() {
  // JS Automation: Detect screen size
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 950);

  useEffect(() => {
    const handleResize = () => setIsTablet(window.innerWidth <= 950);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const steps = [
    {
      label: "GET STARTED",
      title: "Fund your wallet",
      description:
        "Move your salary into Wisemonie on payday. Your money is securely held while your week is prepared automatically.",
      image: EnvelopeList,
    },
    {
      label: "PLAN",
      title: "Build your week",
      description:
        "Create envelopes for transport, food, savings, tithe, family support, subscriptions, and everything else that matters.",
      image: EnvelopeRules,
    },
    {
      label: "AUTOMATE",
      title: "Schedule every release",
      description:
        "Choose exactly when each envelope unlocks. Transport every morning, lunch at noon, church on Sunday. Set it once and let Wisemonie handle the rest.",
      image: BillPayment,
    },
    {
      label: "LIVE",
      title: "Enjoy your week",
      description:
        "Spend confidently knowing today's money is available while tomorrow's stays protected until its scheduled release.",
      image: TransferToBank,
    },
  ];

  const { activeIndex, stepRefs, sectionRef } = useScrollSteps(steps.length);

  // ==========================================
  // LAYOUT 1: MOBILE/TABLET (Cards)
  // ==========================================
  if (isTablet) {
    return (
      <section
        id="how-it-works-mobile"
        ref={sectionRef}
        className="HowItWorksMobile"
      >
        {steps.map((step, index) => (
          <article
            key={index}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
            className={`MobileStep ${activeIndex === index ? "active" : ""}`}
          >
            <div className="MobilePhoneFrame">
              <img
                src={step.image}
                alt={step.title}
                className="MobilePhoneImage"
              />
            </div>
            <div className="MobileTextContent">
              <span className="PreviewLabel">{step.label}</span>
              <h2 className="PreviewTitle">{step.title}</h2>
              <p className="PreviewDescription">{step.description}</p>
            </div>
          </article>
        ))}
      </section>
    );
  }

  // ==========================================
  // LAYOUT 2: DESKTOP (Sticky Phone)
  // ==========================================
  return (
    <section id="how-it-works" ref={sectionRef}>
      <div className="HowItWorksPhoneCon">
        {steps.map((step, index) => (
          <img
            key={index}
            src={step.image}
            alt={step.title}
            className={`PhoneImage ${activeIndex === index ? "active" : ""}`}
          />
        ))}
      </div>

      <div className="HowItWorksContent">
        {steps.map((step, index) => (
          <article
            key={index}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
            className={`PreviewStep ${activeIndex === index ? "active" : ""}`}
          >
            <span className="PreviewLabel">{step.label}</span>
            <h2 className="PreviewTitle">{step.title}</h2>
            <p className="PreviewDescription">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
