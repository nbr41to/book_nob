"use server";

import "server-only";
import { Category, Prisma } from "@prisma/client";
import { prisma } from "./client";
import { revalidatePath } from "next/cache";
import {
  categoryCreateSchema,
  categoryUpdateSchema,
} from "../validations/category";
import { FormActionState } from "@/types";
import { isZodError } from "@/utils/error";

/**
 * カテゴリの一覧を取得する
 */
export const getCategories = async () => {
  const categories = await prisma.category.findMany();

  return categories;
};

/**
 * IDからカテゴリを取得する
 */
export const getCategoryById = async (categoryId: number) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  return category;
};

/**
 * カテゴリの新規作成
 */
export const createCategory = async (
  prevState: FormActionState<Category, typeof categoryCreateSchema>,
  formData: FormData,
): Promise<FormActionState<Category, typeof categoryCreateSchema>> => {
  try {
    const data: Prisma.CategoryUncheckedCreateInput = {
      name: String(formData.get("name")),
    };

    /* Validation */
    const validated = categoryCreateSchema.parse(data);

    /* Create */
    const category = await prisma.category.create({
      data: validated,
    });

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
    const data: Prisma.CategoryUncheckedUpdateInput = {
      id: Number(formData.get("categoryId")),
      name: String(formData.get("name")),
    };
    console.log(data);

    /* Validation */
    const validated = categoryUpdateSchema.parse(data);

    /* Update */
    const category = await prisma.category.update({
      where: { id: data.id as number }, // TODO: as number 再考
      data: validated,
    });

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
    /* Delete */
    const categoryId = Number(formData.get("categoryId"));
    const category = await prisma.category.delete({
      where: { id: categoryId },
    });

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
