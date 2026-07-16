// Infographic for the homepage "Problem" section: shows how a ₦200,000 salary
// is mostly committed before the week even starts. Pure markup + CSS (no binary
// assets), themed with the site's colour tokens.

const segments = [
  { label: "Rent", amount: "₦80K", pct: 40, className: "seg--rent" },
  { label: "Tithe", amount: "₦25K", pct: 12.5, className: "seg--tithe" },
  { label: "Family", amount: "₦20K", pct: 10, className: "seg--family" },
  { label: "Debt", amount: "₦15K", pct: 7.5, className: "seg--debt" },
  { label: "Left to live", amount: "₦60K", pct: 30, className: "seg--left" }
];

export default function SalaryAllocation() {
  return (
    <figure
      className="allocation"
      aria-label="Of a ₦200,000 salary, ₦140,000 is already committed to rent, tithe, family and debt, leaving ₦60,000 to actually live on."
    >
      <figcaption className="allocation__caption">
        What <strong>₦200,000</strong> really looks like
      </figcaption>

      <div className="allocation__bar" role="presentation">
        {segments.map((s) => (
          <div
            key={s.label}
            className={`allocation__seg ${s.className}`}
            style={{ width: `${s.pct}%` }}
          >
            <span className="allocation__seg-amt">{s.amount}</span>
          </div>
        ))}
      </div>

      <ul className="allocation__legend">
        {segments.map((s) => (
          <li key={s.label} className="allocation__legend-item">
            <span className={`allocation__dot ${s.className}`} aria-hidden="true" />
            {s.label}{" "}
            <span className="allocation__legend-amt">{s.amount}</span>
          </li>
        ))}
      </ul>

      <p className="allocation__callout">
        ₦140K is already spoken for before the week starts. Only{" "}
        <strong>₦60K</strong> is actually yours.
      </p>
    </figure>
  );
}
