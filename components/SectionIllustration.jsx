import MoneyPeopleIllustration from "@/components/MoneyPeopleIllustration";

export default function SectionIllustration({ side = "right" }) {
  return (
    <div className={`section-illustration-wrap section-illustration-wrap--${side}`} aria-hidden="true">
      <MoneyPeopleIllustration className="section-illustration" />
    </div>
  );
}
