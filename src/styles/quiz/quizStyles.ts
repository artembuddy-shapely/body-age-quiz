import React from "react";

export const keyframes = `
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
`;

export const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 440, margin: "0 auto", minHeight: "100vh",
    background: "linear-gradient(180deg, #F7F5F2 0%, #EFF3F1 100%)",
    fontFamily: "'DM Sans', sans-serif", color: "#1A1A2E",
    display: "flex", flexDirection: "column", position: "relative", overflow: "hidden",
  },

  backRow: { display: "flex", alignItems: "center" },
  backButton: {
    width: 36, height: 36, borderRadius: 10, border: "1px solid #E0E7E6",
    background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", flexShrink: 0, WebkitTapHighlightColor: "transparent",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  },

  progressWrap: { padding: "16px 20px 0", display: "flex", alignItems: "center", gap: 10 },
  progressTrack: { flex: 1, height: 6, background: "#E0E7E6", borderRadius: 3, overflow: "hidden" },
  progressFill: {
    height: "100%", background: "linear-gradient(90deg, #3A7D7B, #5BA8A6)",
    borderRadius: 3, transition: "width 0.5s ease",
  },
  progressLabel: {
    fontSize: 12, fontFamily: "'Outfit', sans-serif", fontWeight: 500,
    color: "#6B7C78", minWidth: 32, textAlign: "right",
  },

  blockIndicator: { display: "flex", justifyContent: "center", gap: 6, padding: "14px 20px 4px", alignItems: "center" },
  blockDot: { height: 8, transition: "all 0.4s ease" },

  content: { flex: 1, padding: "8px 20px 32px", display: "flex", flexDirection: "column" },

  questionWrap: { flex: 1, display: "flex", flexDirection: "column", animation: "fadeUp 0.35s ease" },
  blockTag: {
    fontSize: 13, fontFamily: "'Outfit', sans-serif", fontWeight: 500, color: "#3A7D7B",
    background: "#EFF7F6", padding: "6px 12px", borderRadius: 20, alignSelf: "flex-start",
    marginBottom: 16, letterSpacing: 0.3,
  },
  questionText: {
    fontSize: 22, fontFamily: "'Outfit', sans-serif", fontWeight: 600,
    lineHeight: 1.3, margin: "0 0 6px", color: "#1A1A2E",
  },
  questionHint: { fontSize: 13, color: "#8A9A96", marginBottom: 24, fontStyle: "italic" },

  optionsWrap: { display: "flex", flexDirection: "column", gap: 10 },
  optionButton: {
    display: "flex", alignItems: "center", gap: 14, padding: "16px 18px",
    border: "1.5px solid #E0E7E6", borderRadius: 14, cursor: "pointer",
    textAlign: "left", fontSize: 15, fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.2s ease", WebkitTapHighlightColor: "transparent",
  },
  optionRadio: {
    width: 22, height: 22, border: "2px solid #C5CCC9",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, transition: "all 0.2s ease",
  },
  optionLabel: { flex: 1, lineHeight: 1.35 },

  nextButton: {
    marginTop: 28, padding: "16px 24px",
    background: "linear-gradient(135deg, #3A7D7B, #2E6664)",
    color: "white", border: "none", borderRadius: 14, fontSize: 16,
    fontFamily: "'Outfit', sans-serif", fontWeight: 600, cursor: "pointer",
    letterSpacing: 0.3, transition: "all 0.2s ease", WebkitTapHighlightColor: "transparent",
  },

  resultWrap: {
    flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", textAlign: "center", padding: "8px 0",
    animation: "fadeUp 0.4s ease",
  },
  resultIconLarge: { fontSize: 44, marginBottom: 12 },
  resultLabel: {
    fontSize: 13, fontFamily: "'Outfit', sans-serif", fontWeight: 600,
    color: "#6B7C78", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8,
  },
  resultAge: {
    fontSize: 88, fontFamily: "'Outfit', sans-serif", fontWeight: 700,
    color: "#C0544E", lineHeight: 1, marginBottom: 8, animation: "pulse 2s ease infinite",
  },
  resultActual: { fontSize: 15, color: "#6B7C78", marginBottom: 4 },
  resultDelta: {
    fontSize: 15, fontWeight: 600, color: "#C0544E", background: "#FDF0EF",
    padding: "6px 14px", borderRadius: 20, marginBottom: 20,
  },
  resultCategory: {
    fontSize: 14, fontFamily: "'Outfit', sans-serif", fontWeight: 500,
    color: "#3A7D7B", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16,
  },
  resultMessage: {
    fontSize: 15, lineHeight: 1.6, color: "#4A5A56", maxWidth: 340,
    marginBottom: 8, padding: "0 4px",
  },

  updatedAgeWrap: {
    background: "#FFFFFF", borderRadius: 16, padding: "18px 24px",
    border: "1px solid #E0E7E6", marginBottom: 14, width: "100%", maxWidth: 320,
  },
  updatedAgeLabel: {
    fontSize: 11, fontFamily: "'Outfit', sans-serif", fontWeight: 600,
    color: "#8A9A96", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10,
  },
  updatedAgeRow: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 16,
  },
  prevAge: {
    fontSize: 40, fontFamily: "'Outfit', sans-serif", fontWeight: 600,
    color: "#B0BAB7", textDecoration: "line-through", textDecorationColor: "#C0544E",
    lineHeight: 1,
  },
  newAge: {
    fontSize: 52, fontFamily: "'Outfit', sans-serif", fontWeight: 700,
    color: "#3A7D7B", lineHeight: 1,
  },

  reductionCallout: {
    background: "#EFF7F6", borderRadius: 12, padding: "10px 18px", marginBottom: 16,
    display: "flex", alignItems: "center", gap: 8, justifyContent: "center",
  },
  reductionCalloutNumber: {
    fontSize: 18, fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: "#3A7D7B",
  },
  reductionCalloutText: {
    fontSize: 14, color: "#5BA8A6",
  },

  paceBadge: {
    display: "inline-block", fontSize: 11, fontFamily: "'Outfit', sans-serif", fontWeight: 600,
    letterSpacing: 2, color: "#3A7D7B", background: "#EFF7F6",
    padding: "6px 16px", borderRadius: 20, marginBottom: 16,
  },
  paceTitle: {
    fontSize: 26, fontFamily: "'Outfit', sans-serif", fontWeight: 700,
    margin: "0 0 8px", color: "#1A1A2E",
  },
  paceSubtitle: {
    fontSize: 15, color: "#6B7C78", lineHeight: 1.5, margin: "0 0 20px",
  },

  processingWrap: {
    flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", padding: "40px 24px", minHeight: "100vh",
  },
  processingSpinner: { marginBottom: 40 },
  processingSteps: { display: "flex", flexDirection: "column", gap: 16 },
  processingStep: {
    display: "flex", alignItems: "center", gap: 12, fontSize: 15,
    color: "#4A5A56", fontFamily: "'DM Sans', sans-serif",
  },
  stepDot: { width: 8, height: 8, borderRadius: 4, flexShrink: 0, transition: "background 0.3s ease" },

  summaryWrap: { padding: "16px 20px 40px", animation: "fadeUp 0.5s ease" },
  summaryHeader: { textAlign: "center", marginBottom: 20 },
  summaryBadge: {
    display: "inline-block", fontSize: 11, fontFamily: "'Outfit', sans-serif", fontWeight: 600,
    letterSpacing: 2, color: "#3A7D7B", background: "#EFF7F6",
    padding: "6px 16px", borderRadius: 20, marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 28, fontFamily: "'Outfit', sans-serif", fontWeight: 700,
    margin: "0 0 8px", color: "#1A1A2E",
  },
  summarySubtitle: { fontSize: 15, color: "#6B7C78", lineHeight: 1.5, margin: 0 },

  ageCompare: { display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 },
  ageBox: {
    textAlign: "center", background: "#FFFFFF", borderRadius: 16,
    padding: "14px 20px", border: "1px solid #E0E7E6", minWidth: 115,
  },
  ageBoxLabel: {
    fontSize: 10, fontFamily: "'Outfit', sans-serif", fontWeight: 500,
    letterSpacing: 0.8, color: "#8A9A96", textTransform: "uppercase", marginBottom: 4,
  },
  ageBoxNumber: { fontSize: 40, fontFamily: "'Outfit', sans-serif", fontWeight: 700, lineHeight: 1.1 },
  ageArrow: { opacity: 0.6 },

  reductionBanner: {
    textAlign: "center", background: "linear-gradient(135deg, #3A7D7B, #2E6664)",
    color: "white", borderRadius: 14, padding: "14px 20px", marginBottom: 24,
    display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
  },
  reductionNumber: { fontSize: 22, fontFamily: "'Outfit', sans-serif", fontWeight: 700 },
  reductionText: { fontSize: 14, fontFamily: "'DM Sans', sans-serif", opacity: 0.85 },

  planSection: { marginBottom: 28 },
  planTitle: { fontSize: 18, fontFamily: "'Outfit', sans-serif", fontWeight: 600, margin: "0 0 16px", color: "#1A1A2E" },
  planCard: {
    background: "#FFFFFF", borderRadius: 16, padding: "18px",
    marginBottom: 12, border: "1px solid #E0E7E6", animation: "fadeUp 0.4s ease both",
  },
  planCardTop: { display: "flex", alignItems: "center", gap: 12, marginBottom: 10 },
  planIcon: { fontSize: 28, flexShrink: 0 },
  planCardInfo: { flex: 1 },
  planArea: {
    fontSize: 11, fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#3A7D7B",
    letterSpacing: 1, textTransform: "uppercase", marginBottom: 2,
  },
  planCardTitle: { fontSize: 16, fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#1A1A2E" },
  planReduction: {
    fontSize: 15, fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: "#3A7D7B",
    background: "#EFF7F6", padding: "4px 10px", borderRadius: 8, flexShrink: 0,
  },
  planDesc: { fontSize: 14, lineHeight: 1.55, color: "#6B7C78", margin: 0 },

  ctaButton: {
    width: "100%", padding: "18px 24px",
    background: "linear-gradient(135deg, #3A7D7B, #2E6664)",
    color: "white", border: "none", borderRadius: 14, fontSize: 17,
    fontFamily: "'Outfit', sans-serif", fontWeight: 600, cursor: "pointer",
    letterSpacing: 0.3, marginBottom: 10, WebkitTapHighlightColor: "transparent",
  },
  ctaSubtext: { textAlign: "center", fontSize: 13, color: "#8A9A96", margin: 0 },
};
