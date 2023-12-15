"use server";

import "server-only";
import { Prisma } from "@prisma/client";
import { prisma } from "./client";

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
export const prismaCategoryCreate = async (
  params: Prisma.CategoryUncheckedCreateInput,
) =>
  prisma.category.create({
    data: params,
  });

/**
 * カテゴリの更新
 */
export const prismaCategoryUpdate = async (
  params: Prisma.CategoryUncheckedUpdateInput,
) =>
  prisma.category.update({
    where: { id: params.id as number },
    data: params,
  });

/**
 * カテゴリの削除
 */
export const prismaCategoryDelete = async (id: number) =>
  prisma.category.delete({
    where: { id },
  });
