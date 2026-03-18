import { useRef, useCallback } from "react";

export function useSound(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getAudio = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
    }
    return audioRef.current;
  }, [src]);

  const play = useCallback(
    ({ loop = false, volume = 1 } = {}) => {
      const audio = getAudio();
      if (!audio) return;
      audio.loop = loop;
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    },
    [getAudio]
  );

  const stop = useCallback(() => {
    const audio = getAudio();
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [getAudio]);

  const fadeOut = useCallback(
    (duration = 1000) => {
      const audio = getAudio();
      if (!audio) return;
      const start = audio.volume;
      const steps = 20;
      const step = start / steps;
      const interval = duration / steps;
      let vol = start;
      const timer = setInterval(() => {
        vol -= step;
        audio.volume = Math.max(0, vol);
        if (vol <= 0) {
          clearInterval(timer);
          audio.pause();
          audio.currentTime = 0;
          audio.volume = start;
        }
      }, interval);
    },
    [getAudio]
  );

  return { play, stop, fadeOut };
}

export function playOneShot(src: string, volume = 0.35) {
  if (typeof window === "undefined") return;
  const audio = new Audio(src);
  audio.volume = volume;
  audio.play().catch(() => {});
}
