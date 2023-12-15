"use client";

import { SubmitButton } from "@/app/components/SubmitButton";
import { createCategory } from "@/server/usecase/category";
import { TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { useFormState } from "react-dom";

// TODO: 完了したらデータを更新したいけどParallel Routesを使うとrevalidatePathが使えない
export const CreateForm: FC = () => {
  const router = useRouter();
  const [FormState, formAction] = useFormState(createCategory, {
    data: null,
    error: null,
  });

  useEffect(() => {
    if (FormState.data) {
      notifications.show({
        title: "Success",
        message: "Category created!!",
      });
      router.back();
    }
    if (FormState.error) {
      notifications.show({
        title: "Error",
        message: FormState.error,
        color: "red",
      });
    }
  }, [FormState, router]);

  return (
    <form action={formAction} className="relative w-80 space-y-8" noValidate>
      <TextInput
        name="name"
        label="Category name"
        placeholder="Technology"
        required
        error={FormState.validationError?.name?._errors.join(" ")}
      />
      <SubmitButton fullWidth>Submit</SubmitButton>
    </form>
  );
};
