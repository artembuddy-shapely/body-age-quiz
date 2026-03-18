"use client";

import { useState, useRef, useCallback } from "react";
import { useCountdown } from "@/lib/useCountdown";
import {
  PLANS,
  FEATURES,
  FEATURED_TESTIMONIAL,
  TESTIMONIALS,
  PROMO_CODE,
  DISCOUNT_PERCENT,
  getDisclaimer,
  type Plan,
} from "@/data/paymentData";
import { keyframes } from "@/styles/quiz/quizStyles";

// ─── Sub-components ───────────────────────────────────────────────────────────

function TimerDisplay({ minutes, seconds }: { minutes: number; seconds: number }) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 22, fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: "white", lineHeight: 1 }}>
          {pad(minutes)}
        </div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", letterSpacing: 0.5 }}>min</div>
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "white", marginBottom: 10 }}>:</div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 22, fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: "white", lineHeight: 1 }}>
          {pad(seconds)}
        </div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", letterSpacing: 0.5 }}>sec</div>
      </div>
    </div>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#4CAF50", fontSize: 16 }}>★</span>
      ))}
    </div>
  );
}

function PlanCard({
  plan,
  isSelected,
  isDiscount,
  onSelect,
}: {
  plan: Plan;
  isSelected: boolean;
  isDiscount: boolean;
  onSelect: () => void;
}) {
  const rightPrice = isDiscount ? plan.introRightPrice : plan.fullRightPrice;
  const rightColor = isDiscount ? "#3A7D7B" : "#1A1A2E";

  return (
    <div
      onClick={onSelect}
      style={{
        position: "relative",
        border: isSelected ? "2px solid #3A7D7B" : "1.5px solid #D8E3E1",
        borderRadius: 16,
        background: isSelected ? "#F0F8F7" : "#FFFFFF",
        padding: "16px 14px 14px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        marginBottom: 10,
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* Most popular badge */}
      {plan.isPopular && (
        <div
          style={{
            position: "absolute",
            top: -1,
            right: -1,
            background: "#3A7D7B",
            color: "white",
            fontSize: 10,
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            letterSpacing: 1,
            padding: "4px 10px",
            borderRadius: "0 14px 0 10px",
          }}
        >
          MOST POPULAR
        </div>
      )}

      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        {/* Radio */}
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: `2px solid ${isSelected ? "#3A7D7B" : "#C5CCC9"}`,
            background: isSelected ? "#3A7D7B" : "transparent",
            flexShrink: 0,
            marginTop: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isSelected && (
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />
          )}
        </div>

        {/* Left: plan name + price info */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 15,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              color: "#1A1A2E",
              marginBottom: 4,
            }}
          >
            {plan.label}
          </div>

          {/* Price breakdown */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            {isDiscount ? (
              <>
                <span style={{ fontSize: 13, color: "#9AABA7", textDecoration: "line-through" }}>
                  {plan.introBelowFull}
                </span>
                <span style={{ fontSize: 13, color: "#3A7D7B", fontWeight: 600 }}>
                  → {plan.introBelowIntro}
                </span>
              </>
            ) : (
              <span style={{ fontSize: 13, color: "#1A1A2E", fontWeight: 600 }}>
                {plan.fullBelowPrice}
              </span>
            )}
          </div>

          {/* Tagline */}
          <div style={{ fontSize: 12, color: "#8A9A96", fontStyle: "italic" }}>
            {plan.tagline}
          </div>

          {/* Trial badge */}
          {plan.isTrialCard && (
            <div
              style={{
                display: "inline-block",
                marginTop: 6,
                fontSize: 10,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                color: "#3A7D7B",
                background: "#EFF7F6",
                padding: "2px 8px",
                borderRadius: 6,
              }}
            >
              1 week trial → 1 month product
            </div>
          )}
        </div>

        {/* Right: big price */}
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div
            style={{
              fontSize: 26,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              color: rightColor,
              lineHeight: 1.1,
            }}
          >
            {rightPrice}
          </div>
          <div style={{ fontSize: 11, color: "#8A9A96" }}>{plan.rightPriceLabel}</div>
        </div>
      </div>
    </div>
  );
}

// Body silhouette placeholder (replaced with real image when available)
function BodyFigure({ label, isAfter }: { label: string; isAfter?: boolean }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: 72,
          height: 100,
          margin: "0 auto 8px",
          background: isAfter
            ? "linear-gradient(180deg, #3A7D7B22 0%, #3A7D7B44 100%)"
            : "linear-gradient(180deg, #C0544E22 0%, #C0544E44 100%)",
          borderRadius: "36px 36px 28px 28px",
          border: `2px solid ${isAfter ? "#3A7D7B66" : "#C0544E44"}`,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <svg viewBox="0 0 72 100" style={{ width: "100%", height: "100%", opacity: 0.5 }}>
          {/* simple body silhouette */}
          <ellipse cx="36" cy="18" rx="12" ry="12" fill={isAfter ? "#3A7D7B" : "#C0544E"} />
          <path
            d={
              isAfter
                ? "M20 40 C20 30 52 30 52 40 L56 80 L44 80 L40 60 L32 60 L28 80 L16 80 Z"
                : "M16 42 C16 30 56 30 56 42 L62 82 L48 82 L42 62 L30 62 L24 82 L10 82 Z"
            }
            fill={isAfter ? "#3A7D7B" : "#C0544E"}
          />
        </svg>
      </div>
      <div
        style={{
          fontSize: 12,
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 600,
          color: "#6B7C78",
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function PlansBlock({
  plans,
  selectedId,
  isDiscount,
  onSelectPlan,
  onGetMyPlan,
  scrollTarget,
}: {
  plans: Plan[];
  selectedId: string;
  isDiscount: boolean;
  onSelectPlan: (id: string) => void;
  onGetMyPlan: () => void;
  scrollTarget?: string;
}) {
  const handleCta = () => {
    if (scrollTarget) {
      document.getElementById(scrollTarget)?.scrollIntoView({ behavior: "smooth" });
    } else {
      onGetMyPlan();
    }
  };

  return (
    <div>
      <div
        style={{
          fontSize: 13,
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 600,
          color: "#6B7C78",
          letterSpacing: 0.5,
          marginBottom: 12,
        }}
      >
        Start your positive changes
      </div>

      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          isSelected={plan.id === selectedId}
          isDiscount={isDiscount}
          onSelect={() => onSelectPlan(plan.id)}
        />
      ))}

      <button
        onClick={handleCta}
        style={{
          width: "100%",
          padding: "18px 24px",
          background: "linear-gradient(135deg, #3A7D7B, #2E6664)",
          color: "white",
          border: "none",
          borderRadius: 14,
          fontSize: 17,
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: 0.5,
          textTransform: "uppercase",
          marginTop: 8,
          animation: "ctaPulse 2s ease-in-out infinite",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        Get My Plan
      </button>

      <div style={{ textAlign: "center", marginTop: 12 }}>
        <a
          href="https://shapely.coach/refund-policy.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 12, color: "#3A7D7B", textDecoration: "underline" }}
        >
          30-day money-back guarantee
        </a>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function PaymentScreen({
  bodyAge,
  actualAge,
  onBack,
}: {
  bodyAge: number;
  actualAge: number;
  onBack: () => void;
}) {
  const { minutes, seconds, isExpired, isReady } = useCountdown();
  const [selectedPlanId, setSelectedPlanId] = useState("monthly");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const touchStartX = useRef(0);

  const isDiscount = isReady && !isExpired;
  const selectedPlan = PLANS.find((p) => p.id === selectedPlanId) ?? PLANS[1];
  const disclaimer = getDisclaimer(selectedPlan, isDiscount);

  const yearsOlder = Math.max(0, bodyAge - actualAge);
  const goalBodyAge = bodyAge - 7;
  const goalYearsOlder = Math.max(0, goalBodyAge - actualAge);

  const pad = (n: number) => String(n).padStart(2, "0");

  const handleCheckout = useCallback(async () => {
    if (isCheckingOut) return;
    setIsCheckingOut(true);
    try {
      const priceId = isDiscount
        ? selectedPlan.stripePriceIdIntro
        : selectedPlan.stripePriceIdFull;
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: selectedPlan.id, priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout is not yet configured. Please add your Stripe keys.");
      }
    } catch {
      alert("Checkout is not yet configured. Please add your Stripe keys.");
    } finally {
      setIsCheckingOut(false);
    }
  }, [isCheckingOut, isDiscount, selectedPlan]);

  const prevTestimonial = () => setCarouselIndex((i) => Math.max(0, i - 1));
  const nextTestimonial = () => setCarouselIndex((i) => Math.min(TESTIMONIALS.length - 1, i + 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextTestimonial();
    else if (diff < -50) prevTestimonial();
  };

  const stickyBarHeight = 64;

  // Suppress unused variable warning for DISCOUNT_PERCENT — used in sticky bar
  void DISCOUNT_PERCENT;

  return (
    <>
      <style>{keyframes}</style>
      <style>{`
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(58,125,123,0.4); transform: scale(1); }
          50% { box-shadow: 0 8px 30px rgba(58,125,123,0.6); transform: scale(1.015); }
        }
      `}</style>

      {/* ── Sticky timer bar ── */}
      {isDiscount && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: 440,
            background: "linear-gradient(135deg, #2E6664, #3A7D7B)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            height: stickyBarHeight,
            boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", marginBottom: 2 }}>
              {DISCOUNT_PERCENT}% discount reserved for
            </div>
            <TimerDisplay minutes={minutes} seconds={seconds} />
          </div>
          <button
            onClick={() =>
              document.getElementById("payment-plans")?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              background: "white",
              color: "#2E6664",
              border: "none",
              borderRadius: 10,
              padding: "10px 16px",
              fontSize: 13,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              cursor: "pointer",
              flexShrink: 0,
              letterSpacing: 0.3,
            }}
          >
            GET MY PLAN
          </button>
        </div>
      )}

      {/* ── Main content ── */}
      <div
        style={{
          maxWidth: 440,
          margin: "0 auto",
          background: "linear-gradient(180deg, #F7F5F2 0%, #EFF3F1 100%)",
          minHeight: "100vh",
          fontFamily: "'DM Sans', sans-serif",
          color: "#1A1A2E",
          paddingTop: isDiscount ? stickyBarHeight : 0,
        }}
      >
        {/* Back button */}
        <div style={{ padding: "16px 20px 0" }}>
          <button
            onClick={onBack}
            style={{
              width: 36, height: 36, borderRadius: 10, border: "1px solid #E0E7E6",
              background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", WebkitTapHighlightColor: "transparent",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 4L7 10L13 16" stroke="#6B7C78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* ── Before / After comparison ── */}
        <div style={{ padding: "20px 20px 0" }}>
          <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "20px", border: "1px solid #E0E7E6" }}>

            {/* "Now" / "Your goal" column labels */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div style={{ flex: 1, textAlign: "center" }}>
                <span style={{ fontSize: 11, fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#8A9A96", letterSpacing: 1, textTransform: "uppercase" }}>Now</span>
              </div>
              <div style={{ width: 36 }} />
              <div style={{ flex: 1, textAlign: "center" }}>
                <span style={{ fontSize: 11, fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#3A7D7B", letterSpacing: 1, textTransform: "uppercase" }}>Your goal</span>
              </div>
            </div>

            {/* Body figures */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 20 }}>
              <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <BodyFigure label="" />
              </div>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ flexShrink: 0 }}>
                <path d="M5 14H23M23 14L17 8M23 14L17 20" stroke="#3A7D7B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <BodyFigure label="" isAfter />
              </div>
            </div>

            {/* Stats — two rows, each with current→goal side by side */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {/* Body age */}
              <div style={{ display: "flex", alignItems: "stretch", gap: 6 }}>
                <div style={{ flex: 1, background: "#FDF0EF", borderRadius: 10, padding: "8px 12px" }}>
                  <div style={{ fontSize: 9, fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#C0544E", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 2 }}>Body age</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#C0544E" }}>
                    {yearsOlder > 0 ? `${yearsOlder} yrs older` : "At your age"}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", padding: "0 2px" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#3A7D7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ flex: 1, background: "#EFF7F6", borderRadius: 10, padding: "8px 12px" }}>
                  <div style={{ fontSize: 9, fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#3A7D7B", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 2 }}>Body age</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#3A7D7B" }}>
                    {goalYearsOlder > 0 ? `${goalYearsOlder} yrs older` : "At your age"}
                  </div>
                </div>
              </div>

              {/* Pace of aging */}
              <div style={{ display: "flex", alignItems: "stretch", gap: 6 }}>
                <div style={{ flex: 1, background: "#FDF0EF", borderRadius: 10, padding: "8px 12px" }}>
                  <div style={{ fontSize: 9, fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#C0544E", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 2 }}>Pace of aging</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#C0544E" }}>Fast</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", padding: "0 2px" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#3A7D7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ flex: 1, background: "#EFF7F6", borderRadius: 10, padding: "8px 12px" }}>
                  <div style={{ fontSize: 9, fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#3A7D7B", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 2 }}>Pace of aging</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#3A7D7B" }}>Slow</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Promo section (only when discount active) ── */}
        {isDiscount && (
          <div style={{ padding: "20px 20px 0" }}>
            {/* Title */}
            <h2 style={{ fontSize: 22, fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: "#1A1A2E", margin: "0 0 14px", textAlign: "center" }}>
              Your Body Age Reset<br />Plan is ready!
            </h2>

            {/* Promo code badge */}
            <div style={{ background: "#EFF7F6", borderRadius: 14, padding: "12px 16px", marginBottom: 16, border: "1px solid #C8E6E4" }}>
              <div style={{ fontSize: 12, fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#3A7D7B", marginBottom: 8 }}>
                ✓ Your promo code is applied!
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13 4L6 11L3 8" stroke="#3A7D7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: 15, fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: "#1A1A2E", letterSpacing: 1 }}>
                  {PROMO_CODE}
                </span>
              </div>
            </div>

            {/* Timer — open (not in white card) */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 8 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 44, fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: "#1A1A2E", lineHeight: 1, background: "#FFFFFF", borderRadius: 14, padding: "10px 20px", minWidth: 78, border: "1px solid #E0E7E6", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  {pad(minutes)}
                </div>
                <div style={{ fontSize: 11, color: "#8A9A96", marginTop: 6 }}>minutes</div>
              </div>
              <div style={{ fontSize: 44, fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: "#1A1A2E", paddingBottom: 20 }}>:</div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 44, fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: "#1A1A2E", lineHeight: 1, background: "#FFFFFF", borderRadius: 14, padding: "10px 20px", minWidth: 78, border: "1px solid #E0E7E6", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  {pad(seconds)}
                </div>
                <div style={{ fontSize: 11, color: "#8A9A96", marginTop: 6 }}>seconds</div>
              </div>
            </div>
          </div>
        )}

        {/* ── Plans section ── */}
        <div id="payment-plans" style={{ padding: "20px 20px 0" }}>
          <PlansBlock
            plans={PLANS}
            selectedId={selectedPlanId}
            isDiscount={isDiscount}
            onSelectPlan={setSelectedPlanId}
            onGetMyPlan={handleCheckout}
          />
        </div>

        {/* ── Disclaimer ── */}
        <div style={{ padding: "16px 20px 0" }}>
          <p style={{ fontSize: 11, color: "#9AABA7", lineHeight: 1.6, margin: 0 }}>
            {disclaimer}
          </p>
        </div>

        {/* ── Highlights ── */}
        <div style={{ padding: "24px 20px 0" }}>
          <h2
            style={{
              fontSize: 20,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              color: "#1A1A2E",
              margin: "0 0 16px",
            }}
          >
            Highlights of your plan
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>{f.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#1A1A2E", marginBottom: 2 }}>
                    {f.title}
                  </div>
                  <div style={{ fontSize: 13, color: "#6B7C78", lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Featured testimonial ── */}
        <div style={{ padding: "28px 20px 0" }}>
          <h2
            style={{
              fontSize: 20,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              color: "#1A1A2E",
              margin: "0 0 16px",
            }}
          >
            Results that make us proud
          </h2>
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid #E0E7E6",
            }}
          >
            {/* Photo placeholder */}
            <div
              style={{
                width: "100%",
                height: 220,
                background: "linear-gradient(135deg, #EFF7F6, #D4EBE9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 48,
              }}
            >
              🌿
            </div>
            <div style={{ padding: "16px" }}>
              <div
                style={{
                  fontSize: 14,
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  color: "#1A1A2E",
                  marginBottom: 8,
                }}
              >
                {FEATURED_TESTIMONIAL.name}
              </div>
              <p style={{ fontSize: 14, color: "#4A5A56", lineHeight: 1.6, margin: 0 }}>
                &ldquo;{FEATURED_TESTIMONIAL.quote}&rdquo;
              </p>
            </div>
          </div>
          <p style={{ fontSize: 11, color: "#9AABA7", lineHeight: 1.6, margin: "12px 0 0", textAlign: "center" }}>
            * Results may vary. This is a personal experience and not a guarantee of specific outcomes.
          </p>
        </div>

        {/* ── Testimonials carousel ── */}
        <div style={{ padding: "28px 20px 0" }}>
          <h2
            style={{
              fontSize: 20,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              color: "#1A1A2E",
              margin: "0 0 16px",
            }}
          >
            People love our plans
          </h2>

          <div style={{ position: "relative" }}>
            <div
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{
                background: "#FFFFFF",
                borderRadius: 20,
                padding: "20px",
                border: "1px solid #E0E7E6",
                minHeight: 160,
                transition: "all 0.3s ease",
              }}
            >
              {TESTIMONIALS[carouselIndex] && (
                <>
                  <Stars count={TESTIMONIALS[carouselIndex].rating} />
                  <p style={{ fontSize: 14, color: "#4A5A56", lineHeight: 1.6, margin: "12px 0" }}>
                    &ldquo;{TESTIMONIALS[carouselIndex].text}&rdquo;
                  </p>
                  <div
                    style={{
                      fontSize: 13,
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                      color: "#1A1A2E",
                    }}
                  >
                    {TESTIMONIALS[carouselIndex].name}
                  </div>
                </>
              )}
            </div>

            {/* Arrows */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
              <button
                onClick={prevTestimonial}
                disabled={carouselIndex === 0}
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  border: "1.5px solid #E0E7E6", background: carouselIndex === 0 ? "#F5F5F5" : "#FFFFFF",
                  cursor: carouselIndex === 0 ? "default" : "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center", opacity: carouselIndex === 0 ? 0.4 : 1,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L6 8L10 13" stroke="#3A7D7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Dots */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {TESTIMONIALS.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    style={{
                      width: i === carouselIndex ? 16 : 7,
                      height: 7,
                      borderRadius: 4,
                      background: i === carouselIndex ? "#3A7D7B" : "#D1DBD9",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                disabled={carouselIndex === TESTIMONIALS.length - 1}
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  border: "1.5px solid #E0E7E6", background: carouselIndex === TESTIMONIALS.length - 1 ? "#F5F5F5" : "#FFFFFF",
                  cursor: carouselIndex === TESTIMONIALS.length - 1 ? "default" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: carouselIndex === TESTIMONIALS.length - 1 ? 0.4 : 1,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L10 8L6 13" stroke="#3A7D7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Repeated plans section ── */}
        <div style={{ padding: "28px 20px 0" }}>
          <h2
            style={{
              fontSize: 20,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              color: "#1A1A2E",
              margin: "0 0 4px",
              textAlign: "center",
            }}
          >
            Your Body Age Reset<br />Plan is ready!
          </h2>

          {isDiscount && (
            <div
              style={{
                background: "#EFF7F6",
                borderRadius: 12,
                padding: "10px 16px",
                marginBottom: 16,
                marginTop: 12,
                border: "1px solid #C8E6E4",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 12, fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#3A7D7B" }}>
                ✓ Your promo code is applied!
              </span>
              <span style={{ flex: 1 }} />
              <span style={{ fontSize: 13, fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: "#1A1A2E", letterSpacing: 1 }}>
                {PROMO_CODE}
              </span>
            </div>
          )}

          <PlansBlock
            plans={PLANS}
            selectedId={selectedPlanId}
            isDiscount={isDiscount}
            onSelectPlan={setSelectedPlanId}
            onGetMyPlan={handleCheckout}
          />
        </div>

        {/* ── Repeated disclaimer ── */}
        <div style={{ padding: "16px 20px 0" }}>
          <p style={{ fontSize: 11, color: "#9AABA7", lineHeight: 1.6, margin: 0 }}>
            {disclaimer}
          </p>
        </div>

        {/* ── Money-back guarantee ── */}
        <div id="money-back" style={{ padding: "28px 20px 0" }}>
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 20,
              padding: "24px 20px",
              border: "1px solid #E0E7E6",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>🛡️</div>
            <h3
              style={{
                fontSize: 18,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                color: "#1A1A2E",
                margin: "0 0 12px",
                lineHeight: 1.3,
              }}
            >
              30-day money-back guarantee
            </h3>
            <p style={{ fontSize: 13, color: "#4A5A56", lineHeight: 1.7, margin: 0 }}>
              We believe in you and you&apos;ll get visible results in 4 weeks! We even guarantee it. If you don&apos;t see visible results and can demonstrate you followed our plan, you&apos;ll get a full refund. See applicable limitations in our{" "}
              <a
                href="https://shapely.coach/refund-policy.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#3A7D7B", textDecoration: "underline" }}
              >
                money-back policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{ padding: "28px 20px 48px", textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "#9AABA7", margin: "0 0 16px" }}>
            Soul Stretch LTD | Nicosia, Cyprus
          </p>
          <p
            style={{
              fontSize: 13,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              color: "#4A5A56",
              margin: "0 0 14px",
            }}
          >
            Guaranteed Safe Checkout
          </p>
          {/* Payment method placeholder icons */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            {["VISA", "MC", "PayPal", "Stripe"].map((name) => (
              <div
                key={name}
                style={{
                  background: "#F0F0EE",
                  borderRadius: 6,
                  padding: "6px 12px",
                  fontSize: 11,
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  color: "#4A5A56",
                  border: "1px solid #E0E0DC",
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
