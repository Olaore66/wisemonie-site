import HeroSectionImage from "../assets/dashboard.png";

function HeroSection() {
  return (
    <div id="HeroSection">
      <div className="HeroSectionText">
        <div className="HeroSectionHeads">
          <h1 className="HeroSectionHead">
            Budget on Wisemonie and spend directly from the budget.
          </h1>
          <h2 className="HeroSectionSubHead">
            WiseMonie turns your budget into your spending account. Income
            splits into envelopes — transport, food, offering, family — each
            releasing on your schedule. Spend from your plan, not around it.
          </h2>
        </div>

        <div className="HeroSectionCTAs">
          <a href="#download" className="Btn TakeBackYourWeekBtn">
            Take Back Your Week
          </a>
          <a href="#how-it-works" className="Btn SeeHowItWorksBtn">
            See How It Works
          </a>
        </div>
      </div>

      <div className="HeroSectionImage">
        <img src={HeroSectionImage} alt="Hero Image" />
      </div>
    </div>
  );
}

export default HeroSection;
