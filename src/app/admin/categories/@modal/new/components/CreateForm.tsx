"use client";

import { createBook } from "@/server/book";
import { createCategory } from "@/server/category";
import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import { Book } from "@prisma/client";
import { FC } from "react";
import { useFormState, useFormStatus } from "react-dom";

type State = {
  data: Book | null;
  error: string | null;
};

const initialState: State = {
  data: null,
  error: null,
};

export const CreateForm: FC = () => {
  const [state, formAction] = useFormState(createCategory, initialState);
  const { pending } = useFormStatus();

  return (
    <form action={formAction} className="relative w-80 space-y-8" noValidate>
      <TextInput
        name="name"
        label="Category name"
        placeholder="Technology"
        required
      />

      <Button type="submit" fullWidth>
        Submit
      </Button>
      {state.error && <p className="font-bold text-red-500">{state.error}</p>}
      <LoadingOverlay visible={pending} />
    </form>
  );
};
