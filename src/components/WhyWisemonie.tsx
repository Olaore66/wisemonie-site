import { EyeIcon, CalendarDaysIcon, ChartLineIcon } from "lucide-react";

function WhyWisemonie() {
  const ValueCards = [
    {
      title: "Understand",
      description:
        "WiseMonie automatically categorizes every transaction. No guessing—just clarity.",
      illustration: EyeIcon, // ✅ Store the component directly, NOT a string
    },
    {
      title: "Plan",
      description:
        "Turn your salary into a weekly spending plan. Set aside money for bills, savings, and fun.",
      illustration: CalendarDaysIcon, // ✅
    },
    {
      title: "Grow",
      description:
        "Track your progress, get nudges when you're overspending, and watch your savings grow.",
      illustration: ChartLineIcon, // ✅
    },
  ];

  return (
    <section id="why-wisemonie">
      <div className="SectionHeads">
        <h2 className="SectionHead">Your money journey, simplified</h2>
        <p className="SectionSubHead">
          From understanding your finances to building better habits, WiseMonie
          guides you every step of the way.
        </p>
      </div>

      <div className="WhyWisemonieTimeline">
        {ValueCards.map((card) => {
          const Icon = card.illustration;
          return (
            <div className="WhyWisemonieCard">
              <span className="WhyWisemonieCardIllustration">
                <Icon size={45} />
              </span>
              <h3 className="WhyWisemonieCardTitle">{card.title}</h3>
              <p className="WhyWisemonieCardDesc">{card.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WhyWisemonie;
