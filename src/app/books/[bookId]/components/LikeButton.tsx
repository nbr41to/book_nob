"use client";

import { SubmitButton } from "@/app/components/SubmitButton";
import { toggleBookLikes } from "@/server/book";
import { useUser } from "@clerk/nextjs";
import { FC } from "react";
import { useFormState } from "react-dom";

type Props = {
  bookId: number;
  likedIds: string[];
};

export const LikeButton: FC<Props> = ({ bookId, likedIds }) => {
  const [_, formAction] = useFormState(toggleBookLikes, null);
  const { user } = useUser();
  const isLiked = likedIds.includes(user?.id ?? "");

  return (
    <form action={formAction}>
      <input type="hidden" name="bookId" value={bookId} />
      <SubmitButton>
        {isLiked ? "❤️" : "♡"} ({likedIds.length})
      </SubmitButton>
    </form>
  );
};
