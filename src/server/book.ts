"use server";

import "server-only";
import { Book, Prisma } from "@prisma/client";
import { prisma } from "./prisma/client";
import { bookCreateSchema, bookUpdateSchema } from "./validations/book";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { ZodError, ZodFormattedError, z } from "zod";

const isZodError = (error: any): error is ZodError => {
  return error instanceof ZodError;
};

/**
 * 本の一覧を取得する
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

type State = {
  data: Book | null;
  error: string | null; // その他のエラー
  validationError: ZodFormattedError<z.infer<typeof bookCreateSchema>> | null; // バリデーションエラー
};

/**
 * 本の新規作成
 */
export const createBook = async (
  prevState: State,
  formData: FormData
): Promise<State> => {
  try {
    const data: Prisma.BookUncheckedCreateInput = {
      title: String(formData.get("title")),
      url: String(formData.get("url")),
      categoryId: Number(formData.get("categoryId")),
      price: Number(formData.get("price")),
    };

    /* Validation */
    const validated = bookCreateSchema.parse(data);

    /* Create */
    const book = await prisma.book.create({
      data: validated,
    });

    return {
      data: book,
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
 * 本の更新
 */
export const updateBook = async (
  prevState: State,
  formData: FormData
): Promise<State> => {
  try {
    const data: Prisma.BookUncheckedUpdateInput = {
      id: Number(formData.get("bookId")),
      title: String(formData.get("title")),
      url: String(formData.get("url")),
      categoryId: Number(formData.get("categoryId")),
      price: Number(formData.get("price")),
    };

    /* Validation */
    const validated = bookUpdateSchema.parse(data);

    /* Update */
    const book = await prisma.book.update({
      where: { id: validated.id },
      data: validated,
    });

    // revalidateが動かない: https://github.com/vercel/next.js/issues/54173
    revalidatePath("/admin/books");

    return {
      data: book,
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
 * 本のいいねを1増やす
 */
export const toggleBookLikes = async (prevState: any, formData: FormData) => {
  const bookId = Number(formData.get("bookId"));
  const { userId }: { userId: string | null } = auth();
  if (!userId) return;

  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });
  if (!book) return;

  const liked = book.likes.includes(userId as string);

  if (liked) {
    await prisma.book.update({
      where: { id: bookId },
      data: { likes: { set: book.likes.filter((id) => id !== userId) } },
    });
  } else {
    await prisma.book.update({
      where: { id: bookId },
      data: { likes: { push: userId } },
    });
  }

  revalidatePath("/books/[bookId]");
};

/**
 * 本の削除
 */
export const deleteBook = async (prevState: any, formData: FormData) => {
  const bookId = Number(formData.get("bookId"));
  await prisma.book.delete({
    where: { id: bookId },
  });

  revalidatePath("/admin/books");
};
