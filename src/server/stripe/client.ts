"use server";

import Stripe from "stripe";

export const createStripe = async () =>
  new Stripe(process.env.STRIPE_SECRET_KEY || "");
