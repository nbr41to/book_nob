"use client";

import { SubmitButton } from "@/app/components/SubmitButton";
import { createCategory } from "@/server/category";
import { TextInput } from "@mantine/core";
import { FC } from "react";
import { useFormState } from "react-dom";

export const CreateForm: FC = () => {
  const [state, formAction] = useFormState(createCategory, {
    data: null,
    error: null,
  });

  // TODO: 作成後にスナック・バーを表示する
  // TODO: エラー時にエラーを表示する
  // TODO: 完了したらモーダルを閉じる
  // TODO: 完了したらデータを更新する

  return (
    <form action={formAction} className="relative w-80 space-y-8" noValidate>
      <TextInput
        name="name"
        label="Category name"
        placeholder="Technology"
        required
      />

      <SubmitButton fullWidth>Submit</SubmitButton>
      {state.error && <p className="font-bold text-red-500">{state.error}</p>}
    </form>
  );
};
