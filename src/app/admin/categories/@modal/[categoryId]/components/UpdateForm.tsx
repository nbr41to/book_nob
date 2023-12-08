"use client";

import { SubmitButton } from "@/app/components/SubmitButton";
import { updateCategory } from "@/server/category";
import { TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { useFormState } from "react-dom";

type Props = {
  category: Category;
};

export const UpdateForm: FC<Props> = ({ category }) => {
  const router = useRouter();
  const [formState, formAction] = useFormState(updateCategory, {
    data: null,
    error: null,
  });

  useEffect(() => {
    if (formState.data) {
      notifications.show({
        title: "Success",
        message: "Category updated",
      });
      router.back();
    }
    if (formState.error) {
      notifications.show({
        title: "Error",
        message: formState.error,
        color: "red",
      });
    }
  }, [formState, router]);

  return (
    <form action={formAction} className="relative w-80 space-y-8" noValidate>
      <input type="hidden" name="categoryId" value={category.id} />
      <TextInput
        name="name"
        label="Category name"
        placeholder="Technology"
        defaultValue={category.name}
        required
        error={formState.validationError?.name?._errors.join(" ")}
      />
      <SubmitButton fullWidth>Submit</SubmitButton>
    </form>
  );
};
