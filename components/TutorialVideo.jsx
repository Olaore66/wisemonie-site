"use client";

import { useEffect, useState, useRef } from "react";
import { getTutorialVideo } from "@/data/firebase";

const localFilm = { url: "/videos/envelopes.mp4", local: true };

export default function TutorialVideo() {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reduce, setReduce] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener("change", apply);
    getTutorialVideo()
      .then((remote) => setVideo(remote?.url ? remote : localFilm))
      .catch(() => setVideo(localFilm))
      .finally(() => setLoading(false));
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!video || !el || reduce) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [video, reduce]);

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
        poster={video.local ? "/images/brand/scene-envelopes.jpg" : undefined}
        controls
        playsInline
        muted
        loop
        autoPlay={!reduce}
        preload="metadata"
        aria-label="How Wisemonie works"
      >
        Your browser does not support video playback.
      </video>
    </div>
  );
}
