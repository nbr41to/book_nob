import Stripe from "stripe";
import { createStripe } from "./client";

/* Priceの作成 */
export const stripeCreatePrice = async (params: Stripe.PriceCreateParams) => {
  const stripe = await createStripe();
  const price = await stripe.prices.create(params);

  return price;
};

/* PriceのArchive */
export const stripeArchivePrice = async (priceId: string) => {
  const stripe = await createStripe();
  const price = await stripe.prices.update(priceId, {
    active: false,
    metadata: {
      message: "金額の変更に伴いarchive",
    },
  });

  return price;
};
