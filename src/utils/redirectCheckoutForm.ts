import { loadStripe } from "@stripe/stripe-js";

export const redirectCheckoutForm = async (sessionId: string) => {
  const stripe = await loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
  );

  if (!stripe) return;

  await stripe.redirectToCheckout({ sessionId });
};
