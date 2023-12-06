"use client";

import { SubmitButton } from "@/app/components/SubmitButton";
import { updateCategory } from "@/server/category";
import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import { Category } from "@prisma/client";
import { FC } from "react";
import { useFormState, useFormStatus } from "react-dom";

type Props = {
  category: Category;
};

export const UpdateForm: FC<Props> = ({ category }) => {
  const [state, formAction] = useFormState(updateCategory, {
    data: null,
    error: null,
  });

  console.log(state);

  return (
    <form action={formAction} className="relative w-80 space-y-8" noValidate>
      <input type="hidden" name="categoryId" value={category.id} />
      <TextInput
        name="name"
        label="Category name"
        placeholder="Technology"
        defaultValue={category.name}
        required
      />
      <SubmitButton fullWidth>Submit</SubmitButton>
    </form>
  );
};
