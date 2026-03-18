"use client";

import Image from "next/image";

// Hero photo: /public/hero.png

const AGE_RANGES = [
  { label: "40-49", value: 44.5 },
  { label: "50-59", value: 54.5 },
  { label: "60-69", value: 64.5 },
  { label: "70-79", value: 74.5 },
  { label: "80+", value: 82 },
];

interface LandingScreenProps {
  onAgeSelect: (label: string, value: number) => void;
}

export default function LandingScreen({ onAgeSelect }: LandingScreenProps) {
  return (
    <div
      style={{
        maxWidth: 440,
        margin: "0 auto",
        minHeight: "100dvh",
        background: "linear-gradient(180deg, #F7F5F2 0%, #EFF3F1 100%)",
        fontFamily: "'DM Sans', sans-serif",
        color: "#1A1A2E",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ── Headline ── */}
      <div style={{ padding: "40px 24px 20px", textAlign: "center" }}>
        <h1
          style={{
            fontSize: 40,
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            lineHeight: 1.08,
            textTransform: "uppercase",
            color: "#1A1A2E",
            margin: "0 0 14px",
            letterSpacing: -0.5,
          }}
        >
          Reduce Your
          <br />
          Biological Age
        </h1>
        <p
          style={{
            fontSize: 13,
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            color: "#3A7D7B",
            margin: 0,
          }}
        >
          Take Free 1 Min Quiz
        </p>
      </div>

      {/* ── Hero: age buttons (left) + photo (right) ── */}
      <div style={{ position: "relative", flex: 1, minHeight: 360 }}>
        {/* Photo — right 62%, full height of this section */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "62%",
            zIndex: 1,
          }}
        >
          <Image
            src="/hero.png"
            alt="Woman smiling"
            fill
            style={{ objectFit: "contain", objectPosition: "top center" }}
            priority
          />
        </div>

        {/* Age-range buttons — left 58%, stacked, over the photo */}
        <div
          style={{
            position: "absolute",
            left: 16,
            top: 20,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            gap: 11,
            width: "57%",
          }}
        >
          {AGE_RANGES.map((range) => (
            <button
              key={range.label}
              onClick={() => onAgeSelect(range.label, range.value)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "15px 14px 15px 22px",
                background: "#3A7D7B",
                border: "none",
                borderRadius: 18,
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
                boxShadow: "0 4px 16px rgba(58,125,123,0.25)",
              }}
            >
              <span
                style={{
                  fontSize: 20,
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  color: "white",
                  letterSpacing: 0.3,
                }}
              >
                {range.label}
              </span>

              {/* Arrow circle */}
              <span
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginLeft: 10,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M5 2.5L9.5 7L5 11.5"
                    stroke="#3A7D7B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Disclaimer ── */}
      <div style={{ padding: "18px 28px 40px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#6B7C78", lineHeight: 1.7, margin: 0 }}>
          Please review and agree to our{" "}
          <a
            href="https://shapely.coach/terms-of-use.html?language=en"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4A5A56", textDecoration: "underline" }}
          >
            Terms of Use
          </a>
          {" | "}
          <a
            href="https://shapely.coach/privacy-policy.html?language=en"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4A5A56", textDecoration: "underline" }}
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://shapely.coach/refund-policy.html?language=en"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4A5A56", textDecoration: "underline" }}
          >
            Refund Policy
          </a>
          . By continuing, you confirm you&apos;ve read and accepted them.
        </p>
      </div>
    </div>
  );
}
