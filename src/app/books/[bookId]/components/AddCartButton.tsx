"use client";

import { SubmitButton } from "@/app/components/SubmitButton";
import { addCart } from "@/server/redis/cart";
import { useUser } from "@clerk/nextjs";
import { Button } from "@mantine/core";
import Link from "next/link";
import { FC } from "react";
import { useFormState } from "react-dom";

type Props = {
  bookId: number;
  disabled?: boolean;
};

export const AddCartButton: FC<Props> = ({ bookId, disabled = false }) => {
  const [_, formAction] = useFormState(addCart, null);
  const { isSignedIn } = useUser();

  return (
    <>
      {isSignedIn ? (
        <form action={formAction}>
          <input type="hidden" name="bookId" value={bookId} />
          <SubmitButton disabled={disabled}>
            {disabled ? "すでにカートにあります" : "カートに入れる 🛒"}
          </SubmitButton>
        </form>
      ) : (
        <Button component={Link} href="/login">
          カートに入れる 🛒
        </Button>
      )}
    </>
  );
};
