import { BLOCKS } from "@/data/quizData";

export type Answer = { label?: string; value?: number; score: number; labels?: string[] };
export type Answers = Record<string, Answer>;
export type Reductions = Record<string, number>;

export function calcBodyAge(answers: Answers) {
  const ageVal = answers["age"]?.value || 55;
  const recoveryScore = answers["recovery"]?.score || 0;
  const skinScore = answers["skin"]?.score || 0;
  return Math.round(ageVal + 4 + recoveryScore * 1.2 + skinScore * 1.1);
}

export function calcBlockReduction(blockId: string, answers: Answers) {
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

export function getPersonalizedResultCopy(blockId: string, answers: Answers, reduction: number) {
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
