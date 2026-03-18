"use client";

import { styles } from "@/styles/quiz/quizStyles";
import { BLOCKS, PLAN_ITEMS } from "@/data/quizData";
import { type Reductions } from "@/lib/quiz/calculations";
import AgingGraph from "./AgingGraph";

interface SummaryScreenProps {
  bodyAge: number;
  reductions: Reductions;
  actualAge: number;
  onBack: () => void;
}

export default function SummaryScreen({ bodyAge, reductions, actualAge, onBack }: SummaryScreenProps) {
  return (
    <div style={styles.summaryWrap}>
      <div style={{ ...styles.backRow, marginBottom: 0, padding: "0 0 12px" }}>
        <button style={styles.backButton} onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 4L7 10L13 16" stroke="#6B7C78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div style={styles.summaryHeader}>
        <div style={styles.summaryBadge}>YOUR BODY AGE REPORT</div>
        <h1 style={styles.summaryTitle}>Your Personalized Plan</h1>
        <p style={styles.summarySubtitle}>
          Based on your unique profile, here&apos;s how your aging trajectory changes with the right plan
        </p>
      </div>

      <div
        style={{
          background: "#FFFFFF", borderRadius: 16, padding: "18px 14px 8px",
          border: "1px solid #E0E7E6", marginBottom: 20, animation: "fadeUp 0.5s ease",
        }}
      >
        <div
          style={{
            fontSize: 13, fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#3A7D7B",
            letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 8, paddingLeft: 4,
          }}
        >
          10-Year Aging Projection
        </div>
        <AgingGraph bodyAge={bodyAge} targetAge={bodyAge - 7} actualAge={actualAge} />
      </div>

      <div style={styles.ageCompare}>
        <div style={styles.ageBox}>
          <div style={styles.ageBoxLabel}>Current Body Age</div>
          <div style={{ ...styles.ageBoxNumber, color: "#C0544E" }}>{bodyAge}</div>
          <div style={{ fontSize: 11, color: "#8A9A96" }}>aging at 1.3×</div>
        </div>
        <div style={styles.ageArrow}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M6 16H26M26 16L20 10M26 16L20 22" stroke="#3A7D7B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={styles.ageBox}>
          <div style={styles.ageBoxLabel}>Target Body Age</div>
          <div style={{ ...styles.ageBoxNumber, color: "#3A7D7B" }}>{bodyAge - 7}</div>
          <div style={{ fontSize: 11, color: "#3A7D7B", fontWeight: 500 }}>aging at 0.75×</div>
        </div>
      </div>

      <div style={styles.reductionBanner}>
        <span style={styles.reductionNumber}>7 years younger</span>
        <span style={styles.reductionText}>achievable in 12 weeks</span>
      </div>

      <div style={styles.planSection}>
        <h2 style={styles.planTitle}>Your 4-Pillar Rejuvenation Plan</h2>
        {PLAN_ITEMS.map((item, i) => {
          const red = reductions[BLOCKS[i + 1]?.id] || 2;
          return (
            <div key={i} style={{ ...styles.planCard, animationDelay: `${i * 0.15}s` }}>
              <div style={styles.planCardTop}>
                <span style={styles.planIcon}>{item.icon}</span>
                <div style={styles.planCardInfo}>
                  <div style={styles.planArea}>{item.area}</div>
                  <div style={styles.planCardTitle}>{item.title}</div>
                </div>
                <div style={styles.planReduction}>{red} yrs</div>
              </div>
              <p style={styles.planDesc}>{item.desc}</p>
            </div>
          );
        })}
      </div>

      <button style={styles.ctaButton} onClick={() => {}}>
        Start My Body Age Reset
      </button>
      <p style={styles.ctaSubtext}>Join 24,000+ women who reversed their body age</p>
    </div>
  );
}
