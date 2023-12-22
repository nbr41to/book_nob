"use client";

import { SubmitButton } from "@/app/components/SubmitButton";
import { removeCart } from "@/server/redis/cart";
import { FC } from "react";
import { useFormState } from "react-dom";

type Props = {
  bookId: number;
};

export const DeleteButton: FC<Props> = ({ bookId }) => {
  const [_, formAction] = useFormState(removeCart, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="bookId" value={bookId} />
      <SubmitButton size="xs">カートから削除</SubmitButton>
    </form>
  );
};
