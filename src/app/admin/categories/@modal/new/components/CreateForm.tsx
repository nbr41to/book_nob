"use client";

import { createBook } from "@/server/book";
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
  const [state, formAction] = useFormState(createBook, initialState);
  const { pending } = useFormStatus();

  return (
    <form action={formAction} className="w-80 relative space-y-8" noValidate>
      <TextInput
        name="name"
        label="Category name"
        placeholder="Technology"
        required
      />

      <Button type="submit" fullWidth>
        Submit
      </Button>
      {state.error && <p className="text-red-500 font-bold">{state.error}</p>}
      <LoadingOverlay visible={pending} />
    </form>
  );
};
