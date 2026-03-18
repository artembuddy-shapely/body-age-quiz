"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const BLOCKS = [
  {
    id: "core",
    title: "Biological Age Assessment",
    subtitle: "Let's establish your baseline",
    icon: "🧬",
    questions: [
      {
        id: "age",
        text: "What is your current age?",
        type: "single",
        options: [
          { label: "40–45", value: 42.5, score: 0 },
          { label: "46–50", value: 48, score: 0 },
          { label: "51–55", value: 53, score: 0 },
          { label: "56–60", value: 58, score: 0 },
          { label: "61–65", value: 63, score: 0 },
          { label: "66–70", value: 68, score: 0 },
        ],
      },
      {
        id: "recovery",
        text: "How quickly do you recover from a cold or minor illness?",
        type: "single",
        options: [
          { label: "Within a few days", score: 0 },
          { label: "About a week", score: 1 },
          { label: "10–14 days", score: 2 },
          { label: "More than 2 weeks", score: 3 },
        ],
      },
      {
        id: "skin",
        text: "How would you describe your skin elasticity and overall appearance?",
        type: "single",
        options: [
          { label: "Firm, smooth, minimal lines", score: 0 },
          { label: "Some fine lines, mostly firm", score: 1 },
          { label: "Noticeable wrinkles, some sagging", score: 2 },
          { label: "Significant loss of elasticity", score: 3 },
        ],
      },
    ],
  },
  {
    id: "fitness",
    title: "Fitness Profile",
    subtitle: "Your body's functional capacity",
    icon: "💪",
    questions: [
      {
        id: "exercise_freq",
        text: "How often do you do structured exercise (gym, classes, home workouts)?",
        type: "single",
        options: [
          { label: "5+ times per week", score: 0 },
          { label: "3–4 times per week", score: 1 },
          { label: "1–2 times per week", score: 2 },
          { label: "A few times a month", score: 3 },
          { label: "Rarely or never", score: 4 },
        ],
      },
      {
        id: "floor_test",
        text: "Can you get up from the floor without using your hands or knees for support?",
        type: "single",
        options: [
          { label: "Yes, easily", score: 0 },
          { label: "With some effort", score: 1 },
          { label: "Only with support", score: 2 },
          { label: "I can't do this", score: 3 },
        ],
      },
      {
        id: "balance",
        text: "How long can you balance on one leg with your eyes closed?",
        type: "single",
        options: [
          { label: "30+ seconds", score: 0 },
          { label: "15–30 seconds", score: 1 },
          { label: "5–15 seconds", score: 2 },
          { label: "Less than 5 seconds", score: 3 },
        ],
      },
    ],
  },
  {
    id: "activity",
    title: "Daily Activity",
    subtitle: "Movement beyond exercise",
    icon: "🚶‍♀️",
    questions: [
      {
        id: "sitting",
        text: "How many hours per day do you spend sitting?",
        type: "single",
        options: [
          { label: "Less than 4 hours", score: 0 },
          { label: "4–6 hours", score: 1 },
          { label: "6–8 hours", score: 2 },
          { label: "8–10 hours", score: 3 },
          { label: "10+ hours", score: 4 },
        ],
      },
      {
        id: "steps",
        text: "How many steps do you take on an average day?",
        type: "single",
        options: [
          { label: "10,000+", score: 0 },
          { label: "7,000–10,000", score: 1 },
          { label: "4,000–7,000", score: 2 },
          { label: "Less than 4,000", score: 3 },
        ],
      },
      {
        id: "movement_variety",
        text: "Which types of regular movement do you include in your week?",
        type: "multi",
        options: [
          { label: "Walking or hiking", score: -1 },
          { label: "Stretching or yoga", score: -1 },
          { label: "Dancing", score: -1 },
          { label: "Gardening or housework", score: -1 },
          { label: "None of these regularly", score: 3 },
        ],
      },
    ],
  },
  {
    id: "mental",
    title: "Mental Wellness",
    subtitle: "Your mind shapes your biology",
    icon: "🧠",
    questions: [
      {
        id: "stress",
        text: "How often do you feel stressed or overwhelmed?",
        type: "single",
        options: [
          { label: "Rarely", score: 0 },
          { label: "Sometimes", score: 1 },
          { label: "Often", score: 2 },
          { label: "Almost constantly", score: 3 },
        ],
      },
      {
        id: "sleep",
        text: "How would you rate your sleep quality?",
        type: "single",
        options: [
          { label: "Excellent — I wake refreshed", score: 0 },
          { label: "Good — occasional disruptions", score: 1 },
          { label: "Fair — I often wake tired", score: 2 },
          { label: "Poor — chronic sleep issues", score: 3 },
        ],
      },
      {
        id: "social",
        text: "How often do you have meaningful social interactions?",
        type: "single",
        options: [
          { label: "Daily", score: 0 },
          { label: "Several times a week", score: 1 },
          { label: "A few times a month", score: 2 },
          { label: "Rarely", score: 3 },
        ],
      },
    ],
  },
  {
    id: "energy",
    title: "Energy & Nutrition",
    subtitle: "The fuel behind your vitality",
    icon: "⚡",
    questions: [
      {
        id: "energy_levels",
        text: "How would you describe your energy levels throughout the day?",
        type: "single",
        options: [
          { label: "Steady and strong all day", score: 0 },
          { label: "Good, with a dip in the afternoon", score: 1 },
          { label: "Low by midday", score: 2 },
          { label: "Consistently low from morning", score: 3 },
        ],
      },
      {
        id: "nutrition",
        text: "How many servings of fruits and vegetables do you eat daily?",
        type: "single",
        options: [
          { label: "5 or more", score: 0 },
          { label: "3–4", score: 1 },
          { label: "1–2", score: 2 },
          { label: "Less than 1", score: 3 },
        ],
      },
      {
        id: "hydration",
        text: "How much water do you drink per day?",
        type: "single",
        options: [
          { label: "8+ glasses (2+ liters)", score: 0 },
          { label: "5–7 glasses", score: 1 },
          { label: "3–4 glasses", score: 2 },
          { label: "Less than 3 glasses", score: 3 },
        ],
      },
    ],
  },
];

const PLAN_ITEMS = [
  {
    icon: "🏋️‍♀️",
    area: "Fitness",
    title: "Restore Functional Strength",
    desc: "Targeted low-impact exercises to rebuild balance, flexibility, and floor-to-stand mobility — 3× per week, 15 min sessions.",
  },
  {
    icon: "🚶‍♀️",
    area: "Activity",
    title: "Activate Daily Movement",
    desc: "A step-by-step plan to reduce sitting time and add movement variety — walking routines, micro-stretches, and active breaks.",
  },
  {
    icon: "🧘",
    area: "Mental",
    title: "Stress & Sleep Reset",
    desc: "Guided breathwork, Tai Chi-based mindfulness, and a sleep hygiene protocol designed to lower cortisol and improve recovery.",
  },
  {
    icon: "🍃",
    area: "Energy",
    title: "Vitality Nutrition Guide",
    desc: "Simple anti-inflammatory meal patterns and hydration habits that sustain energy levels and support cellular repair.",
  },
];

type Answer = { label?: string; value?: number; score: number; labels?: string[] };
type Answers = Record<string, Answer>;
type Reductions = Record<string, number>;

function calcBodyAge(answers: Answers) {
  const ageVal = answers["age"]?.value || 55;
  const recoveryScore = answers["recovery"]?.score || 0;
  const skinScore = answers["skin"]?.score || 0;
  return Math.round(ageVal + 4 + recoveryScore * 1.2 + skinScore * 1.1);
}

function calcBlockReduction(blockId: string, answers: Answers) {
  const block = BLOCKS.find((b) => b.id === blockId);
  if (!block || blockId === "core") return 0;
  let totalScore = 0;
  let maxScore = 0;
  block.questions.forEach((q) => {
    const ans = answers[q.id];
    if (ans) {
      if (q.type === "multi") {
        totalScore += Math.max(ans.score, 0);
        maxScore += 4;
      } else {
        totalScore += ans.score;
        maxScore += Math.max(...q.options.map((o) => o.score));
      }
    }
  });
  const ratio = maxScore > 0 ? totalScore / maxScore : 0.5;
  return Math.round(2 + ratio * 2);
}

function getPersonalizedResultCopy(blockId: string, answers: Answers, reduction: number) {
  if (blockId === "fitness") {
    const freq = answers["exercise_freq"]?.score || 0;
    const floor = answers["floor_test"]?.score || 0;
    if (freq >= 3)
      return `Your body is craving more structured movement. Women who start with just 15 minutes of functional training 3× per week see measurable changes in balance, grip strength, and recovery speed within the first 4 weeks. That alone accounts for ${reduction} years of biological age reversal.`;
    if (floor >= 2)
      return `Your functional mobility has room to grow — and that's actually great news. Floor-to-stand ability is one of the strongest predictors of biological age. A focused 12-week plan can take ${reduction} years off your body's functional clock.`;
    return `Your fitness foundation is decent, but targeted optimization of balance and functional strength can still unlock ${reduction} years of biological age improvement. Small gaps here compound over time.`;
  }
  if (blockId === "activity") {
    const sitting = answers["sitting"]?.score || 0;
    const steps = answers["steps"]?.score || 0;
    if (sitting >= 3)
      return `Extended sitting is silently accelerating your aging. Research shows that breaking up long sitting periods — even with 2-minute walks every hour — can shift inflammatory markers back by ${reduction} years. Your daily routine holds untapped potential.`;
    if (steps >= 2)
      return `Your step count suggests your body isn't getting the baseline movement it needs to keep cellular repair running efficiently. Getting to 7,000+ daily steps is worth ${reduction} years of biological age improvement — and it's more achievable than you think.`;
    return `Your movement patterns show specific windows for optimization. Adding variety — stretching, light walks, active hobbies — can reduce biological age markers by ${reduction} years without changing your exercise routine.`;
  }
  if (blockId === "mental") {
    const stress = answers["stress"]?.score || 0;
    const sleep = answers["sleep"]?.score || 0;
    if (stress >= 2)
      return `Chronic stress is one of the most powerful accelerators of biological aging — it shortens telomeres and raises cortisol, which disrupts every system in your body. A structured stress-reduction protocol can reverse ${reduction} years of accumulated wear.`;
    if (sleep >= 2)
      return `Your sleep quality is directly impacting how fast your cells age. During deep sleep, your body does its most critical repair work. Improving sleep architecture alone can account for ${reduction} years of biological age reduction.`;
    return `Your mental wellness profile shows meaningful optimization potential. Social connection, stress management, and sleep quality are three levers that together can shift your biological clock back by ${reduction} years.`;
  }
  if (blockId === "energy") {
    const nutrition = answers["nutrition"]?.score || 0;
    const hydration = answers["hydration"]?.score || 0;
    if (nutrition >= 2)
      return `Your nutrition is leaving cellular energy on the table. Anti-inflammatory foods don't just improve how you feel — they directly reduce oxidative stress markers linked to accelerated aging. Optimizing your plate can reclaim ${reduction} years.`;
    if (hydration >= 2)
      return `Dehydration silently ages your cells. Even mild chronic under-hydration reduces kidney efficiency, slows cellular turnover, and impacts skin elasticity. Proper hydration combined with nutrient timing can reverse ${reduction} years of biological aging.`;
    return `Your energy profile reveals a clear gap between where you are and where your body could be. Strategic changes in nutrition and hydration can restore ${reduction} years of vitality by improving how your cells produce and use energy.`;
  }
  return "";
}

function AnimatedNumber({ value, duration = 1500, startFrom }: { value: number; duration?: number; startFrom?: number }) {
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
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [value, duration, startFrom]);
  return <span>{display}</span>;
}

function ProcessingScreen({ onDone }: { onDone: () => void }) {
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
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={styles.processingWrap}>
      <div style={styles.processingSpinner}>
        <svg viewBox="0 0 50 50" style={{ width: 56, height: 56 }}>
          <circle cx="25" cy="25" r="20" fill="none" stroke="#E0E7E6" strokeWidth="4" />
          <circle cx="25" cy="25" r="20" fill="none" stroke="#3A7D7B" strokeWidth="4"
            strokeDasharray="80 126" strokeLinecap="round"
            style={{ animation: "spin 1.2s linear infinite", transformOrigin: "center" }} />
        </svg>
      </div>
      <div style={styles.processingSteps}>
        {steps.map((s, i) => (
          <div key={i} style={{
            ...styles.processingStep,
            opacity: step >= i ? 1 : 0.25,
            transform: step >= i ? "translateY(0)" : "translateY(8px)",
            transition: "all 0.5s ease",
          }}>
            <span style={{ ...styles.stepDot, background: step >= i ? "#3A7D7B" : "#D1DBD9" }} />
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

function AgingGraph({ bodyAge, targetAge, actualAge }: { bodyAge: number; targetAge: number; actualAge: number }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setProgress(1), 200);
    return () => clearTimeout(t);
  }, []);

  const years = 10;
  const W = 360, H = 200, padL = 44, padR = 16, padT = 24, padB = 36;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const currentPace = 1.3;
  const targetPace = 0.75;

  const points = (pace: number) => {
    const pts = [];
    for (let i = 0; i <= years; i++) {
      const x = padL + (i / years) * chartW;
      const ageAtYear = bodyAge + pace * i;
      const minAge = bodyAge - 2;
      const maxAge = bodyAge + currentPace * years + 2;
      const y = padT + chartH - ((ageAtYear - minAge) / (maxAge - minAge)) * chartH;
      pts.push(`${x},${y}`);
    }
    return pts.join(" ");
  };

  const currentLine = points(currentPace);
  const targetLine = points(targetPace);

  const len = Math.sqrt(chartW * chartW + chartH * chartH) * 1.5;
  const dashOffset = len * (1 - progress);

  // suppress unused variable warning
  void actualAge;
  void targetAge;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <linearGradient id="targetFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A7D7B" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#3A7D7B" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="currentFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C0544E" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#C0544E" stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {[0, 2, 4, 6, 8, 10].map((yr) => {
        const x = padL + (yr / years) * chartW;
        return (
          <g key={yr}>
            <line x1={x} y1={padT} x2={x} y2={padT + chartH} stroke="#E0E7E6" strokeWidth="0.5" />
            <text x={x} y={H - 8} textAnchor="middle" fill="#9AABA7" fontSize="10" fontFamily="Outfit, sans-serif">
              {yr === 0 ? "Now" : `+${yr}y`}
            </text>
          </g>
        );
      })}

      <polygon
        points={`${currentLine} ${padL + chartW},${padT + chartH} ${padL},${padT + chartH}`}
        fill="url(#currentFill)"
      />
      <polyline
        points={currentLine}
        fill="none" stroke="#C0544E" strokeWidth="2" strokeDasharray="5,4"
        opacity="0.6"
      />

      <polygon
        points={`${targetLine} ${padL + chartW},${padT + chartH} ${padL},${padT + chartH}`}
        fill="url(#targetFill)"
      />
      <polyline
        points={targetLine}
        fill="none" stroke="#3A7D7B" strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray={len} strokeDashoffset={dashOffset}
        style={{ transition: "stroke-dashoffset 2s ease" }}
      />

      <circle cx={padL} cy={padT + chartH - ((bodyAge - (bodyAge - 2)) / ((bodyAge + currentPace * years + 2) - (bodyAge - 2))) * chartH}
        r="4" fill="#3A7D7B" />

      <g style={{ opacity: progress, transition: "opacity 1.5s ease 1s" }}>
        <rect x={padL + chartW - 100} y={padT + 2} width="100" height="42" rx="6" fill="white" fillOpacity="0.9" stroke="#E0E7E6" strokeWidth="0.5" />
        <circle cx={padL + chartW - 88} cy={padT + 16} r="4" fill="#C0544E" opacity="0.6" />
        <text x={padL + chartW - 78} y={padT + 20} fill="#6B7C78" fontSize="9" fontFamily="Outfit, sans-serif">Current path</text>
        <circle cx={padL + chartW - 88} cy={padT + 32} r="4" fill="#3A7D7B" />
        <text x={padL + chartW - 78} y={padT + 36} fill="#3A7D7B" fontSize="9" fontFamily="Outfit, sans-serif" fontWeight="600">With your plan</text>
      </g>

      <text x={padL - 6} y={padT + 6} textAnchor="end" fill="#9AABA7" fontSize="9" fontFamily="Outfit, sans-serif">{bodyAge}</text>
      {(() => {
        const endAge = Math.round(bodyAge + targetPace * years);
        const endAgeCurrent = Math.round(bodyAge + currentPace * years);
        return (
          <>
            <text x={padL + chartW + 4} y={padT + chartH - ((endAge - (bodyAge - 2)) / ((bodyAge + currentPace * years + 2) - (bodyAge - 2))) * chartH + 4}
              fill="#3A7D7B" fontSize="10" fontFamily="Outfit, sans-serif" fontWeight="600"
              style={{ opacity: progress, transition: "opacity 1s ease 1.5s" }}>{endAge}</text>
            <text x={padL + chartW + 4} y={padT + 12}
              fill="#C0544E" fontSize="10" fontFamily="Outfit, sans-serif" opacity="0.6"
              style={{ opacity: progress * 0.6, transition: "opacity 1s ease 1.5s" }}>{endAgeCurrent}</text>
          </>
        );
      })()}
    </svg>
  );
}

function PaceOfAgingScreen({ bodyAge, targetAge, answers, onContinue, onBack }: {
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
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
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
            <path d="M13 4L7 10L13 16" stroke="#6B7C78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

            <g style={{
              transform: `rotate(${reveal >= 1 ? meterAngle(currentPace) : -120}deg)`,
              transformOrigin: "140px 145px",
              transition: "transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}>
              <line x1="140" y1="145" x2="140" y2="58" stroke="#C0544E" strokeWidth="3" strokeLinecap="round" />
              <circle cx="140" cy="145" r="6" fill="#C0544E" />
            </g>

            <g style={{ opacity: reveal >= 2 ? 1 : 0, transition: "opacity 0.6s ease" }}>
              <g style={{
                transform: `rotate(${meterAngle(targetPace)}deg)`,
                transformOrigin: "140px 145px",
              }}>
                <line x1="140" y1="145" x2="140" y2="65" stroke="#3A7D7B" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4,3" />
              </g>
            </g>

            <text x="44" y="164" fill="#3A7D7B" fontSize="10" fontFamily="Outfit, sans-serif" fontWeight="500">Slow</text>
            <text x="216" y="164" fill="#C0544E" fontSize="10" fontFamily="Outfit, sans-serif" fontWeight="500">Fast</text>
          </svg>

          <div style={{
            position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)",
            textAlign: "center",
          }}>
            <div style={{
              fontSize: 36, fontFamily: "'Outfit', sans-serif", fontWeight: 700,
              color: "#C0544E", lineHeight: 1,
              opacity: reveal >= 1 ? 1 : 0, transition: "opacity 0.5s ease",
            }}>
              {currentPace}×
            </div>
            <div style={{ fontSize: 11, color: "#8A9A96", marginTop: 2 }}>years per calendar year</div>
          </div>
        </div>

        <div style={{
          background: "#FDF0EF", borderRadius: 12, padding: "14px 18px", marginBottom: 16,
          opacity: reveal >= 1 ? 1 : 0, transform: reveal >= 1 ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.5s ease",
        }}>
          <div style={{ fontSize: 14, color: "#8B4944", lineHeight: 1.5 }}>
            At age <strong>{actualAge}</strong>, your body is aging at <strong>1.3 years</strong> for every calendar year.
            This means in 10 years, your body will feel like it aged <strong>13 years</strong> instead of 10.
          </div>
        </div>

        <div style={{
          opacity: reveal >= 2 ? 1 : 0, transform: reveal >= 2 ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.6s ease", marginBottom: 16,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 12,
          }}>
            <div style={{
              background: "#C0544E", color: "white", borderRadius: 8, padding: "8px 14px",
              fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 20,
            }}>1.3×</div>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M5 14H23M23 14L17 8M23 14L17 20" stroke="#3A7D7B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div style={{
              background: "#3A7D7B", color: "white", borderRadius: 8, padding: "8px 14px",
              fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 20,
            }}>0.75×</div>
          </div>
          <div style={{ fontSize: 14, color: "#4A5A56", lineHeight: 1.5 }}>
            Your personalized plan doesn&apos;t just lower your body age — it <strong>slows down how fast you age</strong>.
            At 0.75×, your body ages only 7.5 years for every 10 calendar years.
          </div>
        </div>

        <div style={{
          opacity: reveal >= 3 ? 1 : 0, transform: reveal >= 3 ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.6s ease",
          background: "#EFF7F6", borderRadius: 12, padding: "16px 18px", marginBottom: 24,
        }}>
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

export default function BodyAgeQuiz() {
  const [screen, setScreen] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [multiSelect, setMultiSelect] = useState<Record<string, string[]>>({});
  const [bodyAge, setBodyAge] = useState<number | null>(null);
  const [reductions, setReductions] = useState<Reductions>({});
  const [phase, setPhase] = useState("quiz"); // quiz | pace | processing | summary
  const [slideDir, setSlideDir] = useState("in");
  const totalScreens = BLOCKS.length * 4;

  const currentBlock = Math.floor(screen / 4);
  const withinBlock = screen % 4;
  const isResult = withinBlock === 3;
  const block = BLOCKS[currentBlock];
  const question = !isResult && block ? block.questions[withinBlock] : null;
  const progressPercent = ((screen + 1) / totalScreens) * 100;

  const cumulativeAge = (() => {
    if (!bodyAge) return null;
    let age = bodyAge;
    for (let i = 1; i <= currentBlock; i++) {
      age -= (reductions[BLOCKS[i]?.id] || 0);
    }
    return age;
  })();

  const goNext = useCallback(() => {
    setSlideDir("out");
    setTimeout(() => {
      if (screen === totalScreens - 1) {
        setPhase("pace");
      } else {
        setScreen((s) => s + 1);
      }
      setSlideDir("in");
      setMultiSelect({});
    }, 250);
  }, [screen, totalScreens]);

  const goBack = useCallback(() => {
    if (phase === "summary") {
      setPhase("pace");
      return;
    }
    if (phase === "pace") {
      setPhase("quiz");
      setScreen(totalScreens - 1);
      return;
    }
    if (screen > 0) {
      setSlideDir("out");
      setTimeout(() => {
        setScreen((s) => s - 1);
        setSlideDir("in");
        setMultiSelect({});
      }, 200);
    }
  }, [screen, phase, totalScreens]);

  const handleSelect = (qId: string, option: Answer & { label: string }, type: string) => {
    if (type === "multi") {
      setMultiSelect((prev) => {
        const selected = prev[qId] || [];
        if (option.label.toLowerCase().includes("none")) {
          return { ...prev, [qId]: [option.label] };
        }
        let updated;
        if (selected.includes(option.label)) {
          updated = selected.filter((l) => l !== option.label);
        } else {
          updated = [...selected.filter((l) => !l.toLowerCase().includes("none")), option.label];
        }
        return { ...prev, [qId]: updated };
      });
    } else {
      const newAnswers = { ...answers, [qId]: option };
      setAnswers(newAnswers);
      if (withinBlock < 2) {
        setTimeout(goNext, 350);
      } else if (withinBlock === 2) {
        setTimeout(() => {
          if (currentBlock === 0) {
            setBodyAge(calcBodyAge(newAnswers));
          } else {
            const red = calcBlockReduction(block.id, newAnswers);
            setReductions((prev) => ({ ...prev, [block.id]: red }));
          }
          goNext();
        }, 350);
      }
    }
  };

  const handleMultiConfirm = () => {
    if (!question) return;
    const qId = question.id;
    const selected = multiSelect[qId] || [];
    const matchedOptions = question.options.filter((o) => selected.includes(o.label));
    const totalScore = matchedOptions.reduce((sum, o) => sum + o.score, 0);
    const newAnswers = { ...answers, [qId]: { score: Math.max(0, totalScore), labels: selected } };
    setAnswers(newAnswers);
    if (withinBlock === 2) {
      const red = calcBlockReduction(block.id, newAnswers);
      setReductions((prev) => ({ ...prev, [block.id]: red }));
    }
    setTimeout(goNext, 200);
  };

  const actualAge = Math.round(answers["age"]?.value || 55);

  // --- PHASE: PACE OF AGING ---
  if (phase === "pace") {
    return (
      <div style={styles.container}>
        <style>{keyframes}</style>
        <PaceOfAgingScreen
          bodyAge={bodyAge!}
          targetAge={bodyAge! - 7}
          answers={answers}
          onContinue={() => setPhase("processing")}
          onBack={goBack}
        />
      </div>
    );
  }

  // --- PHASE: PROCESSING ---
  if (phase === "processing") {
    return (
      <div style={styles.container}>
        <style>{keyframes}</style>
        <ProcessingScreen onDone={() => setPhase("summary")} />
      </div>
    );
  }

  // --- PHASE: SUMMARY ---
  if (phase === "summary") {
    return (
      <div style={styles.container}>
        <style>{keyframes}</style>
        <div style={styles.summaryWrap}>
          <div style={{ ...styles.backRow, marginBottom: 0, padding: "0 0 12px" }}>
            <button style={styles.backButton} onClick={goBack}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 4L7 10L13 16" stroke="#6B7C78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

          <div style={{
            background: "#FFFFFF", borderRadius: 16, padding: "18px 14px 8px",
            border: "1px solid #E0E7E6", marginBottom: 20, animation: "fadeUp 0.5s ease",
          }}>
            <div style={{ fontSize: 13, fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#3A7D7B", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 8, paddingLeft: 4 }}>
              10-Year Aging Projection
            </div>
            <AgingGraph bodyAge={bodyAge!} targetAge={bodyAge! - 7} actualAge={actualAge} />
          </div>

          <div style={styles.ageCompare}>
            <div style={styles.ageBox}>
              <div style={styles.ageBoxLabel}>Current Body Age</div>
              <div style={{ ...styles.ageBoxNumber, color: "#C0544E" }}>{bodyAge}</div>
              <div style={{ fontSize: 11, color: "#8A9A96" }}>aging at 1.3×</div>
            </div>
            <div style={styles.ageArrow}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M6 16H26M26 16L20 10M26 16L20 22" stroke="#3A7D7B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={styles.ageBox}>
              <div style={styles.ageBoxLabel}>Target Body Age</div>
              <div style={{ ...styles.ageBoxNumber, color: "#3A7D7B" }}>{bodyAge! - 7}</div>
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
      </div>
    );
  }

  // --- PHASE: QUIZ ---
  return (
    <div style={styles.container}>
      <style>{keyframes}</style>

      <div style={styles.progressWrap}>
        {screen > 0 && (
          <button style={styles.backButton} onClick={goBack}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 4L7 10L13 16" stroke="#6B7C78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        <div style={styles.progressTrack}>
          <div style={{ ...styles.progressFill, width: `${progressPercent}%` }} />
        </div>
        <div style={styles.progressLabel}>{Math.round(progressPercent)}%</div>
      </div>

      <div style={styles.blockIndicator}>
        {BLOCKS.map((b, i) => (
          <div key={b.id} style={{
            ...styles.blockDot,
            background: i <= currentBlock ? "#3A7D7B" : "#D1DBD9",
            opacity: i <= currentBlock ? 1 : 0.5,
            width: i === currentBlock ? 24 : 8,
            borderRadius: 4,
          }} />
        ))}
      </div>

      <div style={{
        ...styles.content,
        opacity: slideDir === "in" ? 1 : 0,
        transform: slideDir === "in" ? "translateX(0)" : "translateX(-24px)",
        transition: "all 0.25s ease",
      }}>
        {isResult ? (
          <div style={styles.resultWrap}>
            {currentBlock === 0 ? (
              <>
                <div style={styles.resultIconLarge}>🧬</div>
                <div style={styles.resultLabel}>YOUR CURRENT BODY AGE</div>
                <div style={styles.resultAge}>
                  <AnimatedNumber value={bodyAge!} />
                </div>
                <div style={styles.resultActual}>Your actual age: {actualAge}</div>
                <div style={styles.resultDelta}>
                  {bodyAge! - actualAge} years above your real age
                </div>
                <div style={styles.resultMessage}>
                  Your body is aging faster than it should — but here&apos;s what matters:
                  this is <strong>reversible</strong>. Our assessment identifies exactly where
                  your biggest age-reversal opportunities are hiding. Let&apos;s find them.
                </div>
              </>
            ) : (
              <>
                <div style={styles.resultIconLarge}>{block.icon}</div>
                <div style={styles.resultCategory}>{block.title} — Assessment Complete</div>

                <div style={styles.updatedAgeWrap}>
                  <div style={styles.updatedAgeLabel}>Your Updated Body Age</div>
                  <div style={styles.updatedAgeRow}>
                    <div style={styles.prevAge}>{cumulativeAge! + (reductions[block.id] || 2)}</div>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M5 14H23M23 14L17 8M23 14L17 20" stroke="#3A7D7B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div style={styles.newAge}>
                      <AnimatedNumber value={cumulativeAge!} startFrom={cumulativeAge! + (reductions[block.id] || 2)} duration={1200} />
                    </div>
                  </div>
                </div>

                <div style={styles.reductionCallout}>
                  <div style={styles.reductionCalloutNumber}>{reductions[block.id] || 2} years</div>
                  <div style={styles.reductionCalloutText}>unlocked from {block.title.toLowerCase()}</div>
                </div>

                <div style={styles.resultMessage}>
                  {getPersonalizedResultCopy(block.id, answers, reductions[block.id] || 2)}
                </div>
              </>
            )}
            <button style={styles.nextButton} onClick={goNext}>
              {currentBlock === 0
                ? "See How to Reduce It →"
                : screen >= totalScreens - 1
                ? "See My Aging Pace →"
                : "Continue Assessment →"}
            </button>
          </div>
        ) : (
          <div style={styles.questionWrap}>
            <div style={styles.blockTag}>{block.icon} {block.title}</div>
            <h2 style={styles.questionText}>{question!.text}</h2>
            <div style={styles.questionHint}>
              {question!.type === "multi" ? "Select all that apply" : "Choose one"}
            </div>

            <div style={styles.optionsWrap}>
              {question!.options.map((opt, i) => {
                const isSelected =
                  question!.type === "multi"
                    ? (multiSelect[question!.id] || []).includes(opt.label)
                    : answers[question!.id]?.label === opt.label;
                return (
                  <button key={i} style={{
                    ...styles.optionButton,
                    borderColor: isSelected ? "#3A7D7B" : "#E0E7E6",
                    background: isSelected ? "#EFF7F6" : "#FFFFFF",
                    boxShadow: isSelected ? "0 0 0 2px #3A7D7B" : "0 1px 3px rgba(0,0,0,0.04)",
                  }} onClick={() => handleSelect(question!.id, opt as Answer & { label: string }, question!.type)}>
                    <span style={{
                      ...styles.optionRadio,
                      borderColor: isSelected ? "#3A7D7B" : "#C5CCC9",
                      background: isSelected ? "#3A7D7B" : "transparent",
                      borderRadius: question!.type === "multi" ? 4 : 12,
                    }}>
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                    <span style={styles.optionLabel}>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {question!.type === "multi" && (multiSelect[question!.id] || []).length > 0 && (
              <button style={styles.nextButton} onClick={handleMultiConfirm}>
                Continue →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const keyframes = `
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
`;

const styles: Record<string, React.CSSProperties> = {
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
