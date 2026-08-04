const PLAY_URL = "https://play.google.com/store/apps/details?id=com.wisemonie";

// The Wisemonie app is live on Google Play; iOS is on the way.
// One reusable pair of store CTAs so every download button on the site
// (hero, mid-page, footer CTA) says exactly the same thing.
export default function StoreButtons({ layout = "row", primaryLabel = "Get it on Google Play" }) {
  return (
    <div className={`store-buttons store-buttons--${layout}`}>
      <a
        href={PLAY_URL}
        className="store-btn store-btn--play"
        target="_blank"
        rel="noopener"
        aria-label="Download Wisemonie on Google Play"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="store-btn__icon">
          <path d="M3.6 2.3a1.8 1.8 0 0 0-.8 1.5v16.4a1.8 1.8 0 0 0 .8 1.5l9.1-9.6-9.1-9.8z" fill="#34a853" />
          <path d="M17.2 8.3l-4.1-2.3-.4-.2-9.1 9.8 9.1-9.6.4-.2 4.1-2.3z" fill="#fbbc04" opacity=".9" />
          <path d="M20.2 10.7l-3-1.7v6l3-1.7a1.6 1.6 0 0 0 0-2.6z" fill="#ea4335" />
          <path d="M3.6 21.7 12.7 12l4.5 4.4-.5.3-9 5.2c-.6.4-1.4.4-2 .1z" fill="#4285f4" />
        </svg>
        <span className="store-btn__text">
          <small>Get it on</small>
          <strong>Google Play</strong>
        </span>
      </a>

      <span className="store-btn store-btn--ios" aria-label="iOS coming soon">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="store-btn__icon">
          <path d="M16.4 12.9c0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.8-1.7 0-3.3 1-4.1 2.5-1.8 3.1-.5 7.7 1.2 10.2.9 1.3 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.4-.8s2 .8 3.3.8c1.4 0 2.3-1.2 3.1-2.5.7-1.1 1.1-2.1 1.3-2.7-2.5-1-2.8-3.9-2.8-4z" />
          <path d="M14.6 5.4c.7-.9 1.2-2 1.1-3.2-1 0-2.3.7-3 1.5-.7.8-1.3 2-1.1 3.1 1.1.1 2.3-.6 3-1.4z" />
        </svg>
        <span className="store-btn__text">
          <small>Coming soon</small>
          <strong>App Store</strong>
        </span>
      </span>
    </div>
  );
}
