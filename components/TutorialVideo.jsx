"use client";

import { useEffect, useState, useRef } from "react";
import { getTutorialVideo } from "@/data/firebase";

export default function TutorialVideo() {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    getTutorialVideo()
      .then(setVideo)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!video || !videoRef.current) return;
    const el = videoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [video]);

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
        ref={videoRef}
        className="tutorial-video"
        src={video.url}
        controls
        playsInline
        muted
        autoPlay
        loop
        preload="auto"
        aria-label="How Wisemonie works"
      >
        Your browser does not support video playback.
      </video>
    </div>
  );
}
