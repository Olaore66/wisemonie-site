import Icon from "@/components/Icon";

// An honest, on-brand recreation of the Wisemonie home screen, built in HTML/CSS
// so it renders crisply at any size and shows realistic data that matches the
// site's story (transport, lunch, tithe, mum, rent) — no screenshot needed.
// It scales with its phone frame via container-query units (see .app-screen CSS).

const envelopes = [
  { icon: "bus", name: "Transport", when: "Opens 7:00am · daily", amount: "₦1,500", state: "released", tag: "Ready" },
  { icon: "utensils", name: "Work lunch", when: "11am · Mon/Wed/Fri", amount: "₦3,000", state: "released", tag: "Ready" },
  { icon: "gift", name: "Sunday tithe", when: "Opens Sun · 8:00am", amount: "₦15,000", state: "scheduled", tag: "Sun" },
  { icon: "volunteer_activism", name: "Mum", when: "Sends Sat · 9:00am", amount: "₦5,000", state: "scheduled", tag: "Sat" },
  { icon: "lock", name: "Rent saving", when: "Locked · until the 30th", amount: "₦80,000", state: "locked", tag: "Locked" }
];

export default function AppScreen() {
  return (
    <div className="app-screen" role="img" aria-label="Wisemonie app home screen showing weekly envelopes: transport and lunch released, tithe and mum scheduled, rent locked.">
      <div className="app-statusbar">
        <span>9:41</span>
        <span className="app-statusbar__dots" aria-hidden="true">
          <i /><i /><i />
        </span>
      </div>

      <div className="app-greet">
        <span className="app-avatar">A</span>
        <div className="app-greet__text">
          <small>Good morning</small>
          <strong>Ada</strong>
        </div>
        <span className="app-bell">
          <Icon name="notifications_active" />
        </span>
      </div>

      <div className="app-balance">
        <span className="app-balance__label">Available this week</span>
        <span className="app-balance__amt">₦248,500</span>
        <div className="app-balance__row">
          <span className="app-chip app-chip--lime">
            <Icon name="account_balance_wallet" /> Fund
          </span>
          <span className="app-chip app-chip--ghost">Envelopes</span>
        </div>
      </div>

      <div className="app-sec-head">
        <strong>This week</strong>
        <span>5 of 7 envelopes</span>
      </div>

      <ul className="app-envs">
        {envelopes.map((e) => (
          <li className={`app-env app-env--${e.state}`} key={e.name}>
            <span className="app-env__icon">
              <Icon name={e.icon} />
            </span>
            <span className="app-env__main">
              <strong>{e.name}</strong>
              <small>{e.when}</small>
            </span>
            <span className="app-env__meta">
              <strong>{e.amount}</strong>
              <span className={`app-tag app-tag--${e.state}`}>{e.tag}</span>
            </span>
          </li>
        ))}
      </ul>

      <nav className="app-nav" aria-hidden="true">
        <span className="app-nav__item app-nav__item--active"><Icon name="home" /><small>Home</small></span>
        <span className="app-nav__item"><Icon name="query_stats" /><small>Budget</small></span>
        <span className="app-nav__item"><Icon name="history" /><small>Activity</small></span>
        <span className="app-nav__item"><Icon name="apps" /><small>More</small></span>
      </nav>
    </div>
  );
}
