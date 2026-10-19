"use client";

import { useEffect, useRef, useState } from "react";
import { PlayPauseButton } from "@/components/PlayPauseButton";
import { theme as t } from "@/components/theme";

export function HomepageVideoPlayer({
  src,
  mime = "video/mp4",
  label = "1-minute overview of how Recurv simplifies collections",
}: {
  src: string;
  mime?: string;
  label?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Phones should not pull the 1080p file (~42MB) just because the player
    // scrolled into view. Desktop still starts when the section is on screen.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.5 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  }

  return (
    <div
      className="group relative mx-auto w-full max-w-[min(100%,calc((100svh-8rem)*16/9))] overflow-hidden rounded-2xl"
      style={{ background: t.bg }}
    >
      <video
        ref={ref}
        className="block aspect-video h-auto w-full origin-center scale-[1.02]"
        controls
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={src} type={mime} />
      </video>
      <PlayPauseButton
        playing={playing}
        onClick={toggle}
        playLabel={`Play ${label}`}
        pauseLabel={`Pause ${label}`}
      />
    </div>
  );
}
