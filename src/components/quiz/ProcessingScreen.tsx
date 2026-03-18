"use client";

import { useState, useEffect } from "react";
import { styles } from "@/styles/quiz/quizStyles";

export default function ProcessingScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    "Analyzing your responses…",
    "Calculating biological markers…",
    "Modeling your aging trajectory…",
    "Building your personalized plan…",
  ];
  useEffect(() => {
    const timers = steps.map((_, i) => setTimeout(() => setStep(i), i * 1100));
    const done = setTimeout(onDone, steps.length * 1100 + 600);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={styles.processingWrap}>
      <div style={styles.processingSpinner}>
        <svg viewBox="0 0 50 50" style={{ width: 56, height: 56 }}>
          <circle cx="25" cy="25" r="20" fill="none" stroke="#E0E7E6" strokeWidth="4" />
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#3A7D7B"
            strokeWidth="4"
            strokeDasharray="80 126"
            strokeLinecap="round"
            style={{ animation: "spin 1.2s linear infinite", transformOrigin: "center" }}
          />
        </svg>
      </div>
      <div style={styles.processingSteps}>
        {steps.map((s, i) => (
          <div
            key={i}
            style={{
              ...styles.processingStep,
              opacity: step >= i ? 1 : 0.25,
              transform: step >= i ? "translateY(0)" : "translateY(8px)",
              transition: "all 0.5s ease",
            }}
          >
            <span style={{ ...styles.stepDot, background: step >= i ? "#3A7D7B" : "#D1DBD9" }} />
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
