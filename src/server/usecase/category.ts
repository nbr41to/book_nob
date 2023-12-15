"use server";

import { FormActionState } from "@/types";
import { Category } from "@prisma/client";
import "server-only";
import {
  categoryCreateSchema,
  categoryUpdateSchema,
} from "../validations/category";
import {
  prismaCategoryCreate,
  prismaCategoryDelete,
  prismaCategoryUpdate,
} from "../prisma/category";
import { isZodError } from "@/utils/error";
import { revalidatePath } from "next/cache";

/**
 * カテゴリの新規作成
 */
export const createCategory = async (
  prevState: FormActionState<Category, typeof categoryCreateSchema>,
  formData: FormData,
): Promise<FormActionState<Category, typeof categoryCreateSchema>> => {
  try {
    const data = {
      name: String(formData.get("name")),
    };

    /* Validation */
    const validated = categoryCreateSchema.parse(data);

    /* Create */
    const category = await prismaCategoryCreate(validated);

    return {
      data: category,
      error: null,
      validationError: null,
    };
  } catch (error) {
    if (isZodError(error)) {
      return {
        data: null,
        error: null,
        validationError: error.format(),
      };
    }

    return {
      data: null,
      error: "Internal server error",
      validationError: null,
    };
  }
};

/**
 * カテゴリの更新
 */
export const updateCategory = async (
  prevState: FormActionState<Category, typeof categoryUpdateSchema>,
  formData: FormData,
): Promise<FormActionState<Category, typeof categoryUpdateSchema>> => {
  try {
    /* Parameters */
    const data = {
      id: Number(formData.get("categoryId")),
      name: String(formData.get("name")),
    };

    /* Validation */
    const validated = categoryUpdateSchema.parse(data);

    /* Update */
    const category = await prismaCategoryUpdate(validated);

    return {
      data: category,
      error: null,
      validationError: null,
    };
  } catch (error) {
    if (isZodError(error)) {
      return {
        data: null,
        error: null,
        validationError: error.format(),
      };
    }

    return {
      data: null,
      error: "Internal server error",
      validationError: null,
    };
  }
};

/**
 * カテゴリの削除
 */
export const deleteCategory = async (
  prevState: FormActionState<Category>,
  formData: FormData,
): Promise<FormActionState<Category>> => {
  try {
    /* Parameters */
    const categoryId = Number(formData.get("categoryId"));

    /* Delete */
    const category = await prismaCategoryDelete(categoryId);

    /* Refetch */
    revalidatePath("/admin/categories");

    return {
      data: category,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: "Internal server error",
    };
  }
};
