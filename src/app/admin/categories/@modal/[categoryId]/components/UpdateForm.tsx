"use client";

import { updateCategory } from "@/server/category";
import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import { Category } from "@prisma/client";
import { FC } from "react";
import { useFormState, useFormStatus } from "react-dom";

type Props = {
  category: Category;
};

export const UpdateForm: FC<Props> = ({ category }) => {
  const [state, formAction] = useFormState(updateCategory, null);
  const { pending } = useFormStatus();

  return (
    <form action={formAction} className="w-80 relative space-y-8" noValidate>
      <input type="hidden" name="categoryId" value={category.id} />
      <TextInput
        name="name"
        label="Category name"
        placeholder="Technology"
        defaultValue={category.name}
        required
      />
      <Button type="submit" fullWidth>
        Submit
      </Button>
      <LoadingOverlay visible={pending} />
    </form>
  );
};
