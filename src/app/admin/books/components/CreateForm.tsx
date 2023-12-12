"use client";

import { SubmitButton } from "@/app/components/SubmitButton";
import { createBook } from "@/server/usecase/book";
import { NumberInput, Select, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Category } from "@prisma/client";
import { FC, useEffect } from "react";
import { useFormState } from "react-dom";

const initialState = {
  data: null,
  error: null,
  validationError: null,
};

type Props = {
  categories: Category[];
  onClose: () => void;
};
export const CreateForm: FC<Props> = ({ categories, onClose }) => {
  const [formState, formAction] = useFormState(createBook, initialState);

  const categoryOptions = categories.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  }));

  /* 作成成功時の処理 */
  useEffect(() => {
    if (formState.data) {
      notifications.show({
        title: "Success",
        message: "Book created!!",
      });
      onClose();
    }
    if (formState.error) {
      notifications.show({
        title: "Error",
        message: formState.error,
        color: "red",
      });
    }
  }, [formState, onClose]);

  return (
    <form action={formAction} className="h-[340px] w-80 space-y-3" noValidate>
      <TextInput
        name="title"
        label="Title"
        placeholder="Title"
        required
        error={formState.validationError?.title?._errors.join(" ")}
      />
      <TextInput
        name="url"
        label="URL"
        placeholder="URL"
        required
        error={formState.validationError?.url?._errors.join(" ")}
      />
      <Select
        label="Category"
        name="categoryId"
        required
        defaultValue={categoryOptions[0].value}
        data={categoryOptions}
      />
      <NumberInput
        name="price"
        label="Price"
        placeholder="0"
        required
        error={formState.validationError?.price?._errors.join(" ")}
      />
      <SubmitButton fullWidth>送信</SubmitButton>
    </form>
  );
};
