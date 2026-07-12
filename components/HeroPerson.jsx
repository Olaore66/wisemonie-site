import HeroNotification from "@/components/HeroNotification";

// Person-led hero: a real photo of someone checking their phone, with the
// money-release alert floating over it. Rendered only when the photo asset
// exists (see data/assets.js); otherwise the homepage falls back to the app
// mockup, so the hero is never broken while the photo is being sourced.
export default function HeroPerson({ src, alt }) {
  return (
    <div className="product-preview hero-person">
      <HeroNotification />
      <figure className="hero-person__frame">
        <img
          src={src}
          alt={alt}
          className="hero-person__img"
          fetchPriority="high"
          loading="eager"
        />
      </figure>
    </div>
  );
}
