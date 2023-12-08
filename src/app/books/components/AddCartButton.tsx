"use client";

import { SubmitButton } from "@/app/components/SubmitButton";
import { addCart } from "@/server/redis/cart";
import { FC } from "react";
import { useFormState } from "react-dom";

type Props = {
  bookId: number;
  disabled?: boolean;
};

export const AddCartButton: FC<Props> = ({ bookId, disabled = false }) => {
  const [_, formAction] = useFormState(addCart, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="bookId" value={bookId} />
      <SubmitButton disabled={disabled} fullWidth>
        {disabled ? "すでにカートにあります" : "カートに入れる 🛒"}
      </SubmitButton>
    </form>
  );
};
