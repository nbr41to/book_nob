"use client";

import { Modal } from "@/app/components/Modal";
import { SubmitButton } from "@/app/components/SubmitButton";
import { deleteBook } from "@/server/usecase/book";
import { ActionIcon, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC } from "react";
import { useFormState } from "react-dom";

type Props = {
  id: number;
};

export const DeleteButton: FC<Props> = ({ id }) => {
  const [opened, { open, close }] = useDisclosure();
  const [formState, formAction] = useFormState(deleteBook, {
    data: null,
    error: null,
  });

  return (
    <>
      <ActionIcon
        size="lg"
        variant="subtle"
        color="gray"
        radius={999}
        onClick={open}
      >
        🗑️
      </ActionIcon>
      <Modal opened={opened} onClose={close}>
        <div className="space-y-8 py-20">
          <p className="text-center text-xl">本を削除しますか？</p>
          <div className="flex justify-center gap-4">
            <Button onClick={close}>キャンセル</Button>
            <form action={formAction}>
              <input type="hidden" name="bookId" value={id} />
              <SubmitButton variant="outline">削除する</SubmitButton>
            </form>
          </div>
          <p className="text-red py-4 text-center font-bold">
            {formState.error}
          </p>
        </div>
      </Modal>
    </>
  );
};
