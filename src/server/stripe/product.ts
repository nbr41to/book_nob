"use server";

import Stripe from "stripe";
import { createStripe } from "./client";

export const createProduct = async (params: Stripe.ProductCreateParams) => {
  const stripe = await createStripe();
  const product = await stripe.products.create(params);

  return product;
};
