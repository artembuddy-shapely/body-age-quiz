export interface Plan {
  id: string;
  label: string;
  tagline: string;
  isPopular?: boolean;
  isTrialCard?: boolean;  // shows "1 week trial → 1 month product" badge
  // Big price shown on the right of the card
  introRightPrice: string;  // discounted state
  fullRightPrice: string;   // full price state
  rightPriceLabel: string;  // "per day" / "per week"
  // Price breakdown below the plan name
  introBelowFull: string;   // full price (shown crossed out in discount state)
  introBelowIntro: string;  // intro total price
  fullBelowPrice: string;   // full total price (no discount state)
  // Stripe price IDs (set in .env.local)
  stripePriceIdIntro?: string;
  stripePriceIdFull?: string;
}

export const PLANS: Plan[] = [
  {
    id: "trial",
    label: "1-WEEK TRIAL",
    tagline: "Get visible results",
    isTrialCard: true,
    introRightPrice: "$0.99",
    fullRightPrice: "$6.93",
    rightPriceLabel: "per mo",
    introBelowFull: "$17.77",
    introBelowIntro: "$0.93",
    fullBelowPrice: "$17.77",
    stripePriceIdIntro: process.env.NEXT_PUBLIC_STRIPE_PRICE_TRIAL_INTRO,
    stripePriceIdFull: process.env.NEXT_PUBLIC_STRIPE_PRICE_TRIAL_FULL,
  },
  {
    id: "monthly",
    label: "4-WEEK PLAN",
    tagline: "Become fit and toned",
    isPopular: true,
    introRightPrice: "$0.54",
    fullRightPrice: "$1.39",
    rightPriceLabel: "per day",
    introBelowFull: "$38.98",
    introBelowIntro: "$15.78",
    fullBelowPrice: "$38.98",
    stripePriceIdIntro: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_INTRO,
    stripePriceIdFull: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_FULL,
  },
  {
    id: "quarterly",
    label: "12-WEEK PLAN",
    tagline: "Become fit and toned",
    introRightPrice: "$0.31",
    fullRightPrice: "$1.15",
    rightPriceLabel: "per day",
    introBelowFull: "$96.48",
    introBelowIntro: "$25.98",
    fullBelowPrice: "$96.48",
    stripePriceIdIntro: process.env.NEXT_PUBLIC_STRIPE_PRICE_QUARTERLY_INTRO,
    stripePriceIdFull: process.env.NEXT_PUBLIC_STRIPE_PRICE_QUARTERLY_FULL,
  },
];

export function getDisclaimer(plan: Plan, isDiscount: boolean): string {
  const price = isDiscount ? plan.introBelowIntro : plan.fullBelowPrice;
  const fullPrice = plan.fullBelowPrice;
  const periodMap: Record<string, string> = {
    trial: "1 week",
    monthly: "4 weeks",
    quarterly: "12 weeks",
  };
  const period = periodMap[plan.id] ?? "period";

  if (isDiscount) {
    return `By clicking 'GET MY PLAN', I agree to pay ${price} for the first ${period} and ${fullPrice} every ${period} for my Body Age Reset Plan subscription thereafter, unless cancelled. This is an introductory offer. Regular price ${fullPrice} per ${period}. You can cancel anytime before the renewal date. Recurring billing. Cancel anytime.`;
  }
  return `By clicking 'GET MY PLAN', I agree to pay ${price} every ${period} for my Body Age Reset Plan subscription, unless cancelled. You can cancel anytime before the renewal date. Recurring billing.`;
}

export const FEATURES = [
  {
    icon: "🌿",
    title: "Support a younger body age",
    desc: "with curated movement plan",
  },
  {
    icon: "🤸",
    title: "Beginner-friendly routines",
    desc: "that fit easily into real life",
  },
  {
    icon: "🏠",
    title: "Zero equipment",
    desc: "all you need is our plan and a comfortable outfit to work out",
  },
  {
    icon: "🛡️",
    title: "Movement patterns that protect your body",
    desc: "supporting balance, stability, and long-term function",
  },
  {
    icon: "🥗",
    title: "Nutrition guidance and feedback",
    desc: "to support healthy body aging from the inside out",
  },
];

export const FEATURED_TESTIMONIAL = {
  name: "Marta, 49 y.o.",
  photoUrl: "/media/testimonials/marta.jpg",
  quote:
    "What surprised me the most is how different I look. My posture is better, my shoulders are more open. People have started telling me I look fresher. And this is just after a few weeks of consistent exercise.",
};

export const TESTIMONIALS = [
  {
    id: "janine",
    name: "Janine, 52",
    photoUrl: "/media/testimonials/janine.jpg",
    rating: 5,
    text: "I've been having being heavy on gyms and was just looking for routines to make me feel healthier and proud of how my body feels. That's what made me stick with Shapely. The coaches are great and keep me motivated.",
  },
  {
    id: "angela",
    name: "Angela, 49",
    photoUrl: "/media/testimonials/angela.jpg",
    rating: 5,
    text: "Just three weeks into the Body Age Reset, I'm pain-free, standing taller, and feeling more confident — my friends can notice the difference. The whole experience feels very encouraging.",
  },
  {
    id: "karu",
    name: "Karu, 39",
    photoUrl: "/media/testimonials/karu.jpg",
    rating: 5,
    text: "I thought I just had to accept feeling 'past my prime.' But this plan showed me I wasn't. My age was how I was moving. Now I feel stronger, lighter, and more in control of my body.",
  },
];

export const PROMO_CODE = "alex_gr25";
export const DISCOUNT_PERCENT = 61;
