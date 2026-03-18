"use client";

import { useState, useEffect, useRef } from "react";

export default function AnimatedNumber({
  value,
  duration = 1500,
  startFrom,
}: {
  value: number;
  duration?: number;
  startFrom?: number;
}) {
  const [display, setDisplay] = useState(startFrom ?? value - 8);
  const ref = useRef<number | null>(null);
  useEffect(() => {
    const start = startFrom ?? value - 8;
    const end = value;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [value, duration, startFrom]);
  return <span>{display}</span>;
}
