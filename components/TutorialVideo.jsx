"use client";

import { useEffect, useState } from "react";
import { getTutorialVideo } from "@/data/firebase";

export default function TutorialVideo() {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTutorialVideo()
      .then(setVideo)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="tutorial-video-wrap">
        <div className="tutorial-video-skeleton" aria-label="Loading video" />
      </div>
    );
  }

  if (!video) return null;

  return (
    <div className="tutorial-video-wrap">
      <video
        className="tutorial-video"
        src={video.url}
        controls
        playsInline
        preload="metadata"
        aria-label="How Wisemonie works"
      >
        Your browser does not support video playback.
      </video>
    </div>
  );
}
