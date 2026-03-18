"use client";

import { styles } from "@/styles/quiz/quizStyles";
import { BLOCKS } from "@/data/quizData";
import { type Answer, type Answers, type Reductions, getPersonalizedResultCopy } from "@/lib/quiz/calculations";
import AnimatedNumber from "./AnimatedNumber";

interface QuizScreenProps {
  screen: number;
  answers: Answers;
  multiSelect: Record<string, string[]>;
  bodyAge: number | null;
  reductions: Reductions;
  slideDir: string;
  totalScreens: number;
  onBack: () => void;
  onSelect: (qId: string, option: Answer & { label: string }, type: string) => void;
  onMultiConfirm: () => void;
  onNext: () => void;
}

export default function QuizScreen({
  screen,
  answers,
  multiSelect,
  bodyAge,
  reductions,
  slideDir,
  totalScreens,
  onBack,
  onSelect,
  onMultiConfirm,
  onNext,
}: QuizScreenProps) {
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
      age -= reductions[BLOCKS[i]?.id] || 0;
    }
    return age;
  })();

  const actualAge = Math.round(answers["age"]?.value || 55);

  return (
    <div style={styles.container}>
      <div style={styles.progressWrap}>
        {screen > 0 && (
          <button style={styles.backButton} onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 4L7 10L13 16" stroke="#6B7C78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
          <div
            key={b.id}
            style={{
              ...styles.blockDot,
              background: i <= currentBlock ? "#3A7D7B" : "#D1DBD9",
              opacity: i <= currentBlock ? 1 : 0.5,
              width: i === currentBlock ? 24 : 8,
              borderRadius: 4,
            }}
          />
        ))}
      </div>

      <div
        style={{
          ...styles.content,
          opacity: slideDir === "in" ? 1 : 0,
          transform: slideDir === "in" ? "translateX(0)" : "translateX(-24px)",
          transition: "all 0.25s ease",
        }}
      >
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
                <div style={styles.resultDelta}>{bodyAge! - actualAge} years above your real age</div>
                <div style={styles.resultMessage}>
                  Your body is aging faster than it should — but here&apos;s what matters: this is{" "}
                  <strong>reversible</strong>. Our assessment identifies exactly where your biggest age-reversal
                  opportunities are hiding. Let&apos;s find them.
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
                      <path d="M5 14H23M23 14L17 8M23 14L17 20" stroke="#3A7D7B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div style={styles.newAge}>
                      <AnimatedNumber
                        value={cumulativeAge!}
                        startFrom={cumulativeAge! + (reductions[block.id] || 2)}
                        duration={1200}
                      />
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
            <button style={styles.nextButton} onClick={onNext}>
              {currentBlock === 0
                ? "See How to Reduce It →"
                : screen >= totalScreens - 1
                ? "See My Aging Pace →"
                : "Continue Assessment →"}
            </button>
          </div>
        ) : (
          <div style={styles.questionWrap}>
            <div style={styles.blockTag}>
              {block.icon} {block.title}
            </div>
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
                  <button
                    key={i}
                    style={{
                      ...styles.optionButton,
                      borderColor: isSelected ? "#3A7D7B" : "#E0E7E6",
                      background: isSelected ? "#EFF7F6" : "#FFFFFF",
                      boxShadow: isSelected ? "0 0 0 2px #3A7D7B" : "0 1px 3px rgba(0,0,0,0.04)",
                    }}
                    onClick={() => onSelect(question!.id, opt as Answer & { label: string }, question!.type)}
                  >
                    <span
                      style={{
                        ...styles.optionRadio,
                        borderColor: isSelected ? "#3A7D7B" : "#C5CCC9",
                        background: isSelected ? "#3A7D7B" : "transparent",
                        borderRadius: question!.type === "multi" ? 4 : 12,
                      }}
                    >
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span style={styles.optionLabel}>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {question!.type === "multi" && (multiSelect[question!.id] || []).length > 0 && (
              <button style={styles.nextButton} onClick={onMultiConfirm}>
                Continue →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
