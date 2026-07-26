import {
  FaEnvelope,
  FaClock,
  FaShieldAlt,
  FaLock,
  FaBolt,
  FaChartLine,
  FaHistory,
  FaRobot,
} from "react-icons/fa";

function Features() {
  const FeaturesArray = [
    {
      icon: <FaEnvelope />,
      title: "Smart Money Envelopes",
      description:
        "Create envelopes for transport, tithe, lunch, rent, family, date night. Each one holds real money—separate from everything else.",
    },
    {
      icon: <FaClock />,
      title: "Scheduled Releases",
      description:
        "Set when each envelope opens. Transport unlocks at 7am on weekdays. Family support drops on Saturday. Set it once, forget it.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Essential–First Allocation",
      description:
        "Rent, tithe, and savings get filled first—before you can spend a dime. Whatever's left is your guilt-free flex.",
    },
    {
      icon: <FaLock />,
      title: "Spending Rules",
      description:
        "Lock rent and savings so you can't touch them. Set food and flex to release on schedule. You're in control.",
    },
    {
      icon: <FaBolt />,
      title: "Bill and Airtime Flows",
      description:
        "Pay DStv, electricity, data, and airtime directly from the envelope that owns them. No more borrowing from one bill to pay another.",
    },
    {
      icon: <FaChartLine />,
      title: "Planned Spending",
      description:
        "See exactly what you have left to spend this week—broken down by envelope. Plan before you spend, not after.",
    },
    // {
    //   icon: <FaChartLine />,
    //   title: "Real–Time Position",
    //   description:
    //     "See what's available in every envelope right now—not one confusing balance. Know what's released, locked, or coming up.",
    // },
    // {
    //   icon: <FaHistory />,
    //   title: "Spending History",
    //   description:
    //     "See where your money actually went. Not '47 transactions in May'—just 'Lunch: ₦18K. Tithe: ₦8K. Family: ₦20K.' Simple.",
    // },
    // {
    //   icon: <FaRobot />,
    //   title: "AI Money Assistant",
    //   description:
    //     "Tell it about an unusual week—wedding, family visiting, school fees—and it adjusts your envelopes so nothing breaks.",
    // },
  ];
  return (
    <section id="features">
      <div className="SectionHeads">
        <h2 className="SectionHead">Features that actually work</h2>
        <p className="SectionSubHead">
          Everything you need to take control of your money—without the stress.
        </p>
      </div>

      <div className="FeaturesCards">
        {FeaturesArray.map((FeaturesCard, index) => (
          <div className="FeaturesCard" key={index}>
            <span className="FeaturesCardIcon">{FeaturesCard.icon}</span>
            <h3 className="FeaturesCardTitle">{FeaturesCard.title}</h3>
            <p className="FeaturesCardDescription">
              {FeaturesCard.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
