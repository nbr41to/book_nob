"use server";

import Stripe from "stripe";
import { createStripe } from "./client";

export const createProduct = async (params: Stripe.ProductCreateParams) => {
  const stripe = await createStripe();
  const product = await stripe.products.create(params);

  return product;
};

// Productをarchiveにする（APIでは削除はできない）
export const archiveProduct = async (
  productId: string,
  message = "Admin権限でダッシュボードの操作でarchive",
) => {
  const stripe = await createStripe();
  const product = await stripe.products.update(productId, {
    active: false,
    metadata: {
      message,
    },
  });

  return product;
};
