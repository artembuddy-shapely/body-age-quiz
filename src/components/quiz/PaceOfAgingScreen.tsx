"use client";

import { useState, useEffect } from "react";
import { styles } from "@/styles/quiz/quizStyles";
import { type Answers } from "@/lib/quiz/calculations";

export default function PaceOfAgingScreen({
  bodyAge,
  targetAge,
  answers,
  onContinue,
  onBack,
}: {
  bodyAge: number;
  targetAge: number;
  answers: Answers;
  onContinue: () => void;
  onBack: () => void;
}) {
  const [reveal, setReveal] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setReveal(1), 400);
    const t2 = setTimeout(() => setReveal(2), 1200);
    const t3 = setTimeout(() => setReveal(3), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const currentPace = 1.3;
  const targetPace = 0.75;
  const actualAge = Math.round(answers["age"]?.value || 55);

  const meterAngle = (pace: number) => {
    const min = 0.5, max = 1.8;
    return -120 + ((pace - min) / (max - min)) * 240;
  };

  return (
    <div style={{ ...styles.content, padding: "8px 20px 32px" }}>
      <div style={{ ...styles.backRow, marginBottom: 8 }}>
        <button style={styles.backButton} onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 4L7 10L13 16" stroke="#6B7C78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div style={{ textAlign: "center", animation: "fadeUp 0.4s ease" }}>
        <div style={styles.paceBadge}>NEW INSIGHT</div>
        <h1 style={{ ...styles.paceTitle }}>Your Pace of Aging</h1>
        <p style={styles.paceSubtitle}>
          It&apos;s not just <em>how old</em> your body is — it&apos;s <em>how fast</em> it&apos;s getting older.
        </p>

        <div style={{ position: "relative", margin: "0 auto 4px", maxWidth: 280 }}>
          <svg viewBox="0 0 280 170" style={{ width: "100%", height: "auto" }}>
            <defs>
              <linearGradient id="meterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3A7D7B" />
                <stop offset="50%" stopColor="#E8B84B" />
                <stop offset="100%" stopColor="#C0544E" />
              </linearGradient>
            </defs>

            <path d="M 40 145 A 100 100 0 0 1 240 145" fill="none" stroke="#E8EBE9" strokeWidth="14" strokeLinecap="round" />
            <path d="M 40 145 A 100 100 0 0 1 240 145" fill="none" stroke="url(#meterGrad)" strokeWidth="14" strokeLinecap="round" opacity="0.25" />

            <g
              style={{
                transform: `rotate(${reveal >= 1 ? meterAngle(currentPace) : -120}deg)`,
                transformOrigin: "140px 145px",
                transition: "transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <line x1="140" y1="145" x2="140" y2="58" stroke="#C0544E" strokeWidth="3" strokeLinecap="round" />
              <circle cx="140" cy="145" r="6" fill="#C0544E" />
            </g>

            <g style={{ opacity: reveal >= 2 ? 1 : 0, transition: "opacity 0.6s ease" }}>
              <g
                style={{
                  transform: `rotate(${meterAngle(targetPace)}deg)`,
                  transformOrigin: "140px 145px",
                }}
              >
                <line x1="140" y1="145" x2="140" y2="65" stroke="#3A7D7B" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4,3" />
              </g>
            </g>

            <text x="44" y="164" fill="#3A7D7B" fontSize="10" fontFamily="Outfit, sans-serif" fontWeight="500">Slow</text>
            <text x="216" y="164" fill="#C0544E" fontSize="10" fontFamily="Outfit, sans-serif" fontWeight="500">Fast</text>
          </svg>

          <div
            style={{
              position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 36, fontFamily: "'Outfit', sans-serif", fontWeight: 700,
                color: "#C0544E", lineHeight: 1,
                opacity: reveal >= 1 ? 1 : 0, transition: "opacity 0.5s ease",
              }}
            >
              {currentPace}×
            </div>
            <div style={{ fontSize: 11, color: "#8A9A96", marginTop: 2 }}>years per calendar year</div>
          </div>
        </div>

        <div
          style={{
            background: "#FDF0EF", borderRadius: 12, padding: "14px 18px", marginBottom: 16,
            opacity: reveal >= 1 ? 1 : 0, transform: reveal >= 1 ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.5s ease",
          }}
        >
          <div style={{ fontSize: 14, color: "#8B4944", lineHeight: 1.5 }}>
            At age <strong>{actualAge}</strong>, your body is aging at <strong>1.3 years</strong> for every calendar year.
            This means in 10 years, your body will feel like it aged <strong>13 years</strong> instead of 10.
          </div>
        </div>

        <div
          style={{
            opacity: reveal >= 2 ? 1 : 0, transform: reveal >= 2 ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.6s ease", marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 12 }}>
            <div
              style={{
                background: "#C0544E", color: "white", borderRadius: 8, padding: "8px 14px",
                fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 20,
              }}
            >
              1.3×
            </div>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M5 14H23M23 14L17 8M23 14L17 20" stroke="#3A7D7B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div
              style={{
                background: "#3A7D7B", color: "white", borderRadius: 8, padding: "8px 14px",
                fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 20,
              }}
            >
              0.75×
            </div>
          </div>
          <div style={{ fontSize: 14, color: "#4A5A56", lineHeight: 1.5 }}>
            Your personalized plan doesn&apos;t just lower your body age — it <strong>slows down how fast you age</strong>.
            At 0.75×, your body ages only 7.5 years for every 10 calendar years.
          </div>
        </div>

        <div
          style={{
            opacity: reveal >= 3 ? 1 : 0, transform: reveal >= 3 ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.6s ease",
            background: "#EFF7F6", borderRadius: 12, padding: "16px 18px", marginBottom: 24,
          }}
        >
          <div style={{ fontSize: 13, fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#3A7D7B", marginBottom: 6, letterSpacing: 0.5, textTransform: "uppercase" }}>
            The compounding effect
          </div>
          <div style={{ fontSize: 14, color: "#4A5A56", lineHeight: 1.55 }}>
            Every year at the slower pace, the gap between you and your peers widens in your favor.
            In 5 years, you&apos;ll have the biology of someone <strong>{Math.round(5 * 0.75 + targetAge)} </strong>
            while others your age will feel <strong>{Math.round(5 * currentPace + bodyAge)}</strong>.
          </div>
        </div>

        <button style={styles.nextButton} onClick={onContinue}>
          See My Full Reset Plan →
        </button>
      </div>
    </div>
  );
}
