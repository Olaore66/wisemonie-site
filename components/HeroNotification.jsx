import Icon from "@/components/Icon";

export default function HeroNotification() {
  return (
    <div className="hero-notification" role="status">
      <span className="hero-notification__glow" aria-hidden="true" />
      <div className="hero-notification__head">
        <span className="hero-notification__app-icon">
          <img src="/images/iconwithoutbackground.png" alt="" />
        </span>
        <span className="hero-notification__app-name">Wisemonie</span>
        <span className="hero-notification__time">now</span>
      </div>
      <div className="hero-notification__body">
        <span className="hero-notification__unlock-icon" aria-hidden="true">
          <Icon name="lock_open" />
        </span>
        <p>
          <strong>&#8358;2,500.00</strong> has been unlocked in your <strong>&apos;Security&apos;</strong>{" "}
          envelope. It&apos;s ready to spend!
        </p>
      </div>
      <span className="hero-notification__check" aria-hidden="true">
        <Icon name="check_circle" />
      </span>
    </div>
  );
}
