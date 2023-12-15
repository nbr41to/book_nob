"use client";

import { SubmitIconButton } from "@/app/components/SubmitIconButton";
import { deleteBook } from "@/server/usecase/book";
import { initialState } from "@/utils/formAction";
import { notifications } from "@mantine/notifications";
import { FC, useEffect } from "react";
import { useFormState } from "react-dom";

type Props = {
  id: number;
};

export const DeleteButton: FC<Props> = ({ id }) => {
  const [formState, formAction] = useFormState(deleteBook, initialState);

  /* 作成成功時の処理 */
  useEffect(() => {
    if (formState.data) {
      notifications.show({
        title: "Success",
        message: "Book deleted!!",
      });
    }
    if (formState.error) {
      notifications.show({
        title: "Error",
        message: formState.error,
        color: "red",
      });
    }
  }, [formState]);

  return (
    <form action={formAction}>
      <input type="hidden" name="bookId" value={id} />
      <SubmitIconButton size="lg" variant="subtle" color="gray" radius={999}>
        🗑️
      </SubmitIconButton>
    </form>
  );
};
