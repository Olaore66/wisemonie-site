// "Essential-first allocation" flow for the Features page: on payday, protected
// commitments are funded before any flex money exists. Pure markup + CSS (no
// binary assets), themed with the site's colour tokens.

import Icon from "@/components/Icon";

const essentials = [
  { label: "Rent", amount: "₦80K", locked: true },
  { label: "Tithe", amount: "₦15K", locked: true },
  { label: "Parents", amount: "₦20K", locked: false },
  { label: "Savings", amount: "₦25K", locked: true }
];

export default function EssentialFirstFlow() {
  return (
    <figure
      className="ef-flow"
      aria-label="On payday, rent, tithe, parents and savings are funded first. Only what's left becomes flex money you can spend without guilt."
    >
      <figcaption className="ef-flow__caption">Payday, in the right order</figcaption>

      <div className="ef-flow__salary">
        <Icon name="account_balance_wallet" />
        <span>Salary lands</span>
      </div>

      <div className="ef-flow__arrow" aria-hidden="true" />

      <div className="ef-flow__stage">
        <span className="ef-flow__stage-label">1 · Essentials funded first</span>
        <ul className="ef-flow__pills">
          {essentials.map((e) => (
            <li key={e.label} className={`ef-pill${e.locked ? " ef-pill--locked" : ""}`}>
              {e.locked ? <Icon name="lock" /> : null}
              <span className="ef-pill__label">{e.label}</span>
              <span className="ef-pill__amt">{e.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="ef-flow__arrow" aria-hidden="true" />

      <div className="ef-flow__stage">
        <span className="ef-flow__stage-label">2 · The rest is yours</span>
        <div className="ef-pill ef-pill--flex">
          <Icon name="favorite" />
          <span className="ef-pill__label">Flex money — spend without guilt</span>
        </div>
      </div>

      <p className="ef-flow__callout">
        Rent, tithe, family and savings are filled <strong>before</strong> flex money exists. No
        willpower required.
      </p>
    </figure>
  );
}
