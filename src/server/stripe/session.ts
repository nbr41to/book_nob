"use server";

import Stripe from "stripe";
import { createStripe } from "./client";
import { BASE_URL } from "@/utils/url";

export const createCheckoutSession = async (
  prevState: Stripe.Response<Stripe.Checkout.Session> | null,
  formData: FormData,
) => {
  const priceIds = formData.getAll("priceIds[]") as string[];
  const lineItems = priceIds.map((priceId) => ({
    price: priceId,
    quantity: 1,
  }));

  const stripe = await createStripe();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: lineItems,
    success_url: `${BASE_URL}/carts?success=true`,
    cancel_url: `${BASE_URL}/carts`,
  });

  return session;
};
