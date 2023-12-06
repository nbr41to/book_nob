import { SubmitIconButton } from "@/app/components/SubmitIconButton";
import { deleteCategory } from "@/server/category";
import { FC } from "react";
import { useFormState } from "react-dom";

type Props = {
  id: number;
};

export const DeleteButton: FC<Props> = ({ id }) => {
  const [state, formAction] = useFormState(deleteCategory, {
    data: null,
    error: null,
  });

  return (
    <form action={formAction}>
      <input type="hidden" name="categoryId" value={id} />
      <SubmitIconButton size="lg" variant="subtle" color="gray" radius={999}>
        🗑️
      </SubmitIconButton>
    </form>
  );
};
