"use client";

import { useSlideReel } from "@/components/useSlideReel";

const SCREENS = [
  {
    src: "/images/dashboard.png",
    alt: "Wisemonie home: a ₦30,824 balance with budgets and envelopes"
  },
  {
    src: "/images/app/envelopelist.png",
    alt: "Create New Budget: a ₦30,000 budget split into envelopes"
  },
  {
    src: "/images/app/enveloperules.png",
    alt: "New envelope: choose the days and time the money is released"
  },
  {
    src: "/images/app/billpayment.png",
    alt: "Buy airtime, paid from the Transport envelope"
  }
];

export default function PhoneReel() {
  const reel = useSlideReel(SCREENS.length, 3800);
  const frames = [...SCREENS, SCREENS[0]];

  return (
    <div
      className="open__phone"
      onMouseEnter={() => reel.setHovering(true)}
      onMouseLeave={() => reel.setHovering(false)}
    >
      <p className="sr-only">{SCREENS[reel.visual].alt}</p>
      <div
        className={`phone-reel${reel.sliding ? " is-sliding" : ""}`}
        style={{ transform: `translate3d(calc(${-reel.pos} * 100% + ${reel.drag}px), 0, 0)` }}
        onTransitionEnd={reel.onTransitionEnd}
        onPointerDown={reel.onPointerDown}
        onPointerMove={reel.onPointerMove}
        onPointerUp={reel.onPointerUp}
        onPointerCancel={reel.onPointerCancel}
        aria-hidden="true"
      >
        {frames.map((screen, index) => (
          <img key={`${screen.src}-${index}`} src={screen.src} alt="" draggable="false" />
        ))}
      </div>
    </div>
  );
}
