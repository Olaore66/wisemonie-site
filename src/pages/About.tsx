import { InfoIcon } from "lucide-react";

function About() {
  const AboutTextArray = [
    {
      title: "Our Core Purpose",
      description:
        "The WiseMonie app uses envelope budgeting, automation and insights to help you plan expenses, track spending, and build healthier money habits.",
    },
    {
      title: "Why we built it",
      description:
        "WiseMonie is a personal finance platform built for everyday income earners. This site is informational — it shares details about the product and its features. <br /> Registration, budgeting and transactions all happen inside the WiseMonie mobile app.",
    },
  ];

  return (
    <>
      <title>About | WiseMonie</title>

      <section id="About">
        <div className="SectionHeads">
          <h2 className="SectionHead">About WiseMonie</h2>
          <p className="SectionSubHead">
            A personal finance app that helps you budget smarter, control
            spending, and manage money intentionally.
          </p>
        </div>

        <div className="AboutContent">
          <div className="AboutCards">
            {AboutTextArray.map((item, index) => (
              <div className="AboutCard" key={index}>
                <h3 className="AboutCardTitle">{item.title}</h3>
                <p className="AboutCardDescription">
                  {item.description.split("<br />").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < item.description.split("<br />").length - 1 && (
                        <>
                          <br />
                          <br />
                        </>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>

          <div className="AboutDisclosure">
            <div className="AboutDisclosureIcon">
              <InfoIcon size={40} />
            </div>
            <div className="AboutDisclosureText">
              <h2 className="AboutDisclosureHead">Important Disclosure</h2>
              <h2 className="AboutDisclosureSubHead">
                WiseMonie is not a bank or financial institution. Payments and
                transfers in the app are processed by licensed third-party
                providers and partner institutions. WiseMonie does not hold or
                store customer funds.
              </h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
