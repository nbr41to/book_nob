"use server";

import "server-only";
import { Book, Prisma } from "@prisma/client";
import { prisma } from "./prisma/client";
import { bookCreateSchema } from "./validations/book";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

/**
 * カテゴリの一覧を取得する
 */
export const getCategories = async () => {
  const categories = await prisma.category.findMany();

  return categories;
};

type State = {
  data: Book | null;
  error: string | null;
};

/**
 * カテゴリの新規作成
 */
export const createCategory = async (
  prevState: State | null,
  formData: FormData
): Promise<State> => {
  try {
    const data: Prisma.CategoryUncheckedCreateInput = {
      name: String(formData.get("name")),
    };

    /* Validation */
    // const validated = bookCreateSchema.safeParse(data);
    // if (!validated.success) {
    //   return {
    //     data: null,
    //     error: "Validation error",
    //   };
    // }

    /* Create */
    await prisma.category.create({
      data: data,
    });
  } catch (error) {
    return {
      data: null,
      error: "Internal server error",
    };
  }

  redirect("/admin/categories");
};

/**
 * カテゴリの更新
 */
export const updateCategory = async (
  prevState: State | null,
  formData: FormData
): Promise<State> => {
  try {
    const data: Prisma.CategoryUncheckedUpdateInput = {
      name: String(formData.get("name")),
    };

    /* Validation */
    // const validated = bookCreateSchema.safeParse(data);
    // if (!validated.success) {
    //   return {
    //     data: null,
    //     error: "Validation error",
    //   };
    // }

    /* Update */
    await prisma.category.update({
      where: { id: Number(formData.get("categoryId")) },
      data: data,
    });
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error: "Internal server error",
    };
  }
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
};

/**
 * カテゴリの削除
 */
export const deleteCategory = async (prevState: any, formData: FormData) => {
  const categoryId = Number(formData.get("categoryId"));
  await prisma.category.delete({
    where: { id: categoryId },
  });

  revalidatePath("/admin/categories");
};
