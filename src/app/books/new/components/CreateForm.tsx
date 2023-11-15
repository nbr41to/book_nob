"use client";

import { createBook } from "@/server/book";
import { Button, LoadingOverlay, NumberInput, TextInput } from "@mantine/core";
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
    <form action={formAction} className="w-80 relative space-y-3" noValidate>
      <TextInput name="title" label="Title" placeholder="Title" required />
      <TextInput name="url" label="URL" placeholder="URL" required />
      <TextInput
        name="category"
        label="Category"
        placeholder="Category"
        required
      />
      <NumberInput name="price" label="Price" placeholder="0" required />
      <Button type="submit" fullWidth>
        Submit
      </Button>
      {state.error && <p className="text-red-500 font-bold">{state.error}</p>}
      <LoadingOverlay visible={pending} />
    </form>
  );
};
