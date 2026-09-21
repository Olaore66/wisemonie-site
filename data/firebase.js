"use client";

import { initializeApp, getApps } from "firebase/app";
import { getRemoteConfig, fetchAndActivate, getValue } from "firebase/remote-config";

const firebaseConfig = {
  apiKey: "AIzaSyD9T1fqEWhoxaXdM6i0_5SD-tFUbtbC3YE",
  authDomain: "wisemonie-app.firebaseapp.com",
  projectId: "wisemonie-app",
  storageBucket: "wisemonie-app.firebasestorage.app",
  messagingSenderId: "237540020398",
  appId: "1:237540020398:web:b3d6a82e430bd1433d9d3f",
  measurementId: "G-5F9Q7YEKR7"
};

let app;
export function getFirebaseApp() {
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  }
  return app;
}

export async function getTutorialVideo() {
  try {
    const rc = getRemoteConfig(getFirebaseApp());
    rc.settings.minimumFetchIntervalMillis = 3600000;
    await fetchAndActivate(rc);

    const enabled = getValue(rc, "tutorial_video_enabled").asBoolean();
    const url = getValue(rc, "tutorial_video_url").asString();

    if (!enabled || !url) return null;
    return { url, enabled };
  } catch {
    return null;
  }
}
