"use client";

import { useSlideReel } from "@/components/useSlideReel";

function Stars() {
  return (
    <p className="review-carousel__stars" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 20 20" aria-hidden="true">
          <path
            fill="currentColor"
            d="M10 1.6 12.4 7l5.9.5-4.5 3.8 1.4 5.7L10 14.2 4.8 17l1.4-5.7L1.7 7.5 7.6 7 10 1.6Z"
          />
        </svg>
      ))}
    </p>
  );
}

function Arrow({ direction }) {
  const left = direction === "left";
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={left ? "M14.5 5.5 8 12l6.5 6.5" : "M9.5 5.5 16 12l-6.5 6.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ReviewCarousel({ reviews }) {
  const reel = useSlideReel(reviews.length, 5600);
  const slides = [...reviews, reviews[0]];

  function onKeyDown(event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      reel.next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      reel.prev();
    }
  }

  return (
    <div
      className="review-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Google Play reviews"
      onKeyDown={onKeyDown}
      onMouseEnter={() => reel.setHovering(true)}
      onMouseLeave={() => reel.setHovering(false)}
      onFocus={() => reel.setHovering(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) reel.setHovering(false);
      }}
    >
      <div
        className="review-carousel__viewport"
        onPointerDown={reel.onPointerDown}
        onPointerMove={reel.onPointerMove}
        onPointerUp={reel.onPointerUp}
        onPointerCancel={reel.onPointerCancel}
      >
        <div
          className={`review-carousel__track${reel.sliding ? " is-sliding" : ""}`}
          style={{ transform: `translate3d(calc(${-reel.pos} * 100% + ${reel.drag}px), 0, 0)` }}
          onTransitionEnd={reel.onTransitionEnd}
        >
          {slides.map((review, index) => (
            <blockquote
              key={`${review.name}-${index}`}
              className="review-carousel__slide"
              aria-hidden={index !== reel.visual}
            >
              <Stars />
              <p>{review.text}</p>
              <footer>
                <cite>{review.name}</cite>
                <span>{review.date} · Google Play</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>

      <div className="review-carousel__controls">
        <button
          type="button"
          className="review-carousel__arrow"
          aria-label="Previous review"
          onClick={reel.prev}
        >
          <Arrow direction="left" />
        </button>
        <div className="review-carousel__dots">
          {reviews.map((review, index) => (
            <button
              key={review.name}
              type="button"
              className={index === reel.visual ? "is-active" : ""}
              aria-label={`${review.name}, ${review.date}`}
              aria-current={index === reel.visual ? "true" : undefined}
              onClick={() => reel.goTo(index)}
            />
          ))}
        </div>
        <button
          type="button"
          className="review-carousel__arrow"
          aria-label="Next review"
          onClick={reel.next}
        >
          <Arrow direction="right" />
        </button>
      </div>
    </div>
  );
}
