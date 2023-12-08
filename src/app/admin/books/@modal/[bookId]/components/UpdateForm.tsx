"use client";

import { SubmitButton } from "@/app/components/SubmitButton";
import { updateBook } from "@/server/book";
import { BookWithCategory } from "@/types";
import { NumberInput, Select, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { useFormState } from "react-dom";

const initialState = {
  data: null,
  error: null,
  validationError: null,
};

type Props = {
  book: BookWithCategory;
  categories: Category[];
};
export const UpdateForm: FC<Props> = ({ book, categories }) => {
  const router = useRouter();
  const [formState, formAction] = useFormState(updateBook, initialState);

  const categoryOptions = categories.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  }));

  /* 更新成功時の処理 */
  useEffect(() => {
    if (formState.data) {
      notifications.show({
        title: "Success",
        message: "Book updated!!",
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
    <form action={formAction} className="w-80 space-y-3" noValidate>
      <input type="hidden" name="bookId" value={book.id} />
      <TextInput
        name="title"
        label="Title"
        placeholder="Title"
        required
        defaultValue={book.title}
        error={formState.validationError?.title?._errors.join(" ")}
      />
      <TextInput
        name="url"
        label="URL"
        placeholder="URL"
        required
        defaultValue={book.url}
        error={formState.validationError?.url?._errors.join(" ")}
      />
      <Select
        label="Category"
        name="categoryId"
        required
        defaultValue={book.categoryId.toString()}
        data={categoryOptions}
      />
      <NumberInput
        name="price"
        label="Price"
        placeholder="0"
        required
        defaultValue={book.price}
        error={formState.validationError?.price?._errors.join(" ")}
      />
      <SubmitButton fullWidth>送信</SubmitButton>
    </form>
  );
};
