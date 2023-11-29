import { SubmitIconButton } from "@/app/components/SubmitIconButton";
import { deleteBook } from "@/server/book";
import { FC } from "react";
import { useFormState } from "react-dom";

type Props = {
  id: number;
};

export const DeleteButton: FC<Props> = ({ id }) => {
  const [_, formAction] = useFormState(deleteBook, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="bookId" value={id} />
      <SubmitIconButton size="lg" variant="subtle" color="gray" radius={999}>
        🗑️
      </SubmitIconButton>
    </form>
  );
};
