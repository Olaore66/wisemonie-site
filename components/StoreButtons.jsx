"use client";

import { useState } from "react";
import IosWaitlistDialog from "@/components/IosWaitlistDialog";

const PLAY_URL = "https://play.google.com/store/apps/details?id=com.wisemonie";

export default function StoreButtons({ layout = "row" }) {
  const [iosOpen, setIosOpen] = useState(false);

  return (
    <>
      <div className={`store-buttons store-buttons--${layout}`}>
        <a
          href={PLAY_URL}
          className="store-badge store-badge--play"
          target="_blank"
          rel="noopener"
          aria-label="Get Wisemonie on Google Play"
        >
          <img src="/images/google-play-badge.png" alt="" />
        </a>

        <button
          type="button"
          className="store-badge store-badge--ios"
          onClick={() => setIosOpen(true)}
          aria-label="Get Wisemonie on iPhone at web.wisemonie.app. The App Store app is not live yet."
        >
          <img src="/images/app-store-badge.svg" alt="" />
        </button>
      </div>

      <IosWaitlistDialog open={iosOpen} onClose={() => setIosOpen(false)} />
    </>
  );
}
