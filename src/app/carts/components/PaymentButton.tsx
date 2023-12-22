"use client";

import { SubmitButton } from "@/app/components/SubmitButton";
import { createCheckoutSession } from "@/server/stripe/session";
import { redirectCheckoutForm } from "@/utils/redirectCheckoutForm";
import { FC, useEffect } from "react";
import { useFormState } from "react-dom";

type Props = {
  priceIds: string[];
};

export const PaymentButton: FC<Props> = ({ priceIds }) => {
  const [session, formAction] = useFormState(createCheckoutSession, null);

  useEffect(() => {
    if (session) {
      redirectCheckoutForm(session.id);

      // TODO: カートから削除する処理
    }
  }, [session]);

  return (
    <form action={formAction}>
      {priceIds.map((priceId) => (
        <input key={priceId} type="hidden" name="priceIds[]" value={priceId} />
      ))}
      <SubmitButton size="xl" fullWidth>
        購入する
      </SubmitButton>
    </form>
  );
};
