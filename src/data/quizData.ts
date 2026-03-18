export const BLOCKS = [
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

export const PLAN_ITEMS = [
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
