"use client";
import { useState, useEffect } from "react";

const STORAGE_KEY = "shapely_discount_expiry";
const DURATION_SECONDS = 10 * 60;

export function useCountdown() {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let expiryMs: number;
    if (stored) {
      expiryMs = parseInt(stored, 10);
    } else {
      expiryMs = Date.now() + DURATION_SECONDS * 1000;
      localStorage.setItem(STORAGE_KEY, String(expiryMs));
    }
    const tick = () => {
      const remaining = Math.max(0, Math.floor((expiryMs - Date.now()) / 1000));
      setSecondsLeft(remaining);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const s = secondsLeft ?? 0;
  return {
    minutes: Math.floor(s / 60),
    seconds: s % 60,
    isExpired: secondsLeft !== null && secondsLeft === 0,
    isReady: secondsLeft !== null,
  };
}
