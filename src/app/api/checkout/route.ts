// TODO: Implement Stripe checkout session creation.
// POST /api/checkout → creates session, returns { url }

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "Stripe not yet configured" }, { status: 501 });
}
