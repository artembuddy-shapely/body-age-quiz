import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json(
      { error: "Stripe not configured. Set STRIPE_SECRET_KEY in .env.local." },
      { status: 501 }
    );
  }

  try {
    const { planId, priceId } = await req.json();
    if (!priceId) {
      return NextResponse.json({ error: "priceId is required" }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const StripeModule = require("stripe") as {
      default: new (key: string) => {
        checkout: {
          sessions: {
            create: (params: Record<string, unknown>) => Promise<{ url: string | null }>;
          };
        };
      };
    };
    const stripe = new StripeModule.default(stripeKey);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId as string, quantity: 1 }],
      success_url: `${appUrl}/quiz?checkout=success`,
      cancel_url: `${appUrl}/quiz`,
      metadata: { planId: (planId as string) ?? "" },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
