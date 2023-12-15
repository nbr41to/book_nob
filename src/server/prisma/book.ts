"use server";

import "server-only";
import { Book, Prisma } from "@prisma/client";
import { prisma } from "./client";
import { bookCreateSchema, bookUpdateSchema } from "../validations/book";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { ZodError, ZodFormattedError, z } from "zod";
import { isZodError } from "@/utils/error";
import { FormActionState } from "@/types";

/**
 * 本の一覧をすべて取得する
 */
export const getBooks = async () => {
  const books = await prisma.book.findMany({
    include: {
      category: true,
    },
  });

  return books;
};

/**
 * カテゴリーIDから本の一覧を取得する
 */
export const getBooksByCategoryId = async (categoryId: number) => {
  const books = await prisma.book.findMany({
    where: { categoryId },
    include: {
      category: true,
    },
  });

  return books;
};

/**
 * IDから本を取得する
 */
export const getBookById = async (bookId: number) => {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: {
      category: true,
    },
  });

  return book;
};

/**
 * 複数の指定したIDから本一覧を取得する
 */
export const getBookWhereIn = async (bookIds: number[]) => {
  const books = await prisma.book.findMany({
    where: { id: { in: bookIds } },
    include: { category: true },
  });

  return books;
};

/**
 * 本の新規作成
 */
export const prismaBookCreate = async (
  params: Prisma.BookUncheckedCreateInput,
) =>
  prisma.book.create({
    data: params,
  });

/**
 * 本の更新
 */
export const prismaBookUpdate = async (
  params: Prisma.BookUncheckedUpdateInput,
) =>
  prisma.book.update({
    where: { id: params.id as number },
    data: params,
  });

/**
 * 本の削除
 */
export const prismaBookDelete = async (bookId: number) =>
  prisma.book.delete({
    where: { id: bookId },
  });
