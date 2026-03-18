// TODO: Initialize Stripe SDK and implement createCheckoutSession helper.
// STRIPE_SECRET_KEY should be set in .env.local

export async function createCheckoutSession(_priceId: string): Promise<{ url: string }> {
  throw new Error("Stripe not yet configured");
}
