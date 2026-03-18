"use client";

import { useState, useCallback } from "react";
import { BLOCKS } from "@/data/quizData";
import {
  type Answer,
  type Answers,
  type Reductions,
  calcBodyAge,
  calcBlockReduction,
} from "@/lib/quiz/calculations";
import { styles, keyframes } from "@/styles/quiz/quizStyles";
import QuizScreen from "@/components/quiz/QuizScreen";
import PaceOfAgingScreen from "@/components/quiz/PaceOfAgingScreen";
import ProcessingScreen from "@/components/quiz/ProcessingScreen";
import SummaryScreen from "@/components/quiz/SummaryScreen";
import LandingScreen from "@/components/quiz/LandingScreen";
import PaymentScreen from "@/components/quiz/PaymentScreen";

type Phase = "landing" | "quiz" | "pace" | "processing" | "summary" | "payment";

export default function BodyAgeQuiz() {
  const [screen, setScreen] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [multiSelect, setMultiSelect] = useState<Record<string, string[]>>({});
  const [bodyAge, setBodyAge] = useState<number | null>(null);
  const [reductions, setReductions] = useState<Reductions>({});
  const [phase, setPhase] = useState<Phase>("landing");
  const [slideDir, setSlideDir] = useState("in");
  const totalScreens = BLOCKS.length * 4;

  const currentBlock = Math.floor(screen / 4);
  const withinBlock = screen % 4;
  const block = BLOCKS[currentBlock];

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

  // Age selected on landing → pre-fill the age answer, skip to recovery question (screen 1)
  const handleLandingAgeSelect = (label: string, value: number) => {
    setAnswers({ age: { label, value, score: 0 } });
    setScreen(1);
    setPhase("quiz");
  };

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
    // First quiz question (recovery) → back to landing
    if (phase === "quiz" && screen === 1) {
      setPhase("landing");
      setAnswers({});
      setScreen(0);
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
    const question = block?.questions[withinBlock];
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

  if (phase === "landing") {
    return <LandingScreen onAgeSelect={handleLandingAgeSelect} />;
  }

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

  if (phase === "processing") {
    return (
      <div style={styles.container}>
        <style>{keyframes}</style>
        <ProcessingScreen onDone={() => setPhase("summary")} />
      </div>
    );
  }

  if (phase === "summary") {
    return (
      <div style={styles.container}>
        <style>{keyframes}</style>
        <SummaryScreen
          bodyAge={bodyAge!}
          reductions={reductions}
          actualAge={actualAge}
          onBack={goBack}
          onContinue={() => setPhase("payment")}
        />
      </div>
    );
  }

  if (phase === "payment") {
    return (
      <>
        <style>{keyframes}</style>
        <PaymentScreen
          bodyAge={bodyAge!}
          actualAge={actualAge}
          onBack={() => setPhase("summary")}
        />
      </>
    );
  }

  return (
    <>
      <style>{keyframes}</style>
      <QuizScreen
        screen={screen}
        answers={answers}
        multiSelect={multiSelect}
        bodyAge={bodyAge}
        reductions={reductions}
        slideDir={slideDir}
        totalScreens={totalScreens}
        onBack={goBack}
        onSelect={handleSelect}
        onMultiConfirm={handleMultiConfirm}
        onNext={goNext}
      />
    </>
  );
}
