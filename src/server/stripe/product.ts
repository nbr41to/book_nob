"use server";

import Stripe from "stripe";
import { createStripe } from "./client";

/* Productの作成 */
export const stripeCreateProduct = async (
  params: Stripe.ProductCreateParams,
) => {
  const stripe = await createStripe();
  const product = await stripe.products.create(params);

  return product;
};

/* Productの更新 */
export const stripeUpdateProduct = async (
  productId: string,
  params: Stripe.ProductUpdateParams,
) => {
  const stripe = await createStripe();
  const product = await stripe.products.update(productId, params);

  return product;
};

// Productをarchiveにする（APIでは削除はできない）
export const stripeArchiveProduct = async (
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
