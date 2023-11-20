"use server";

import "server-only";
import { Book, Prisma } from "@prisma/client";
import { prisma } from "./prisma/client";
import { bookCreateSchema } from "./validations/book";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

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

type State = {
  data: Book | null;
  error: string | null;
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
    const validated = bookCreateSchema.safeParse(data);
    if (!validated.success) {
      return {
        data: null,
        error: "Validation error",
      };
    }

    /* Create */
    await prisma.book.create({
      data: validated.data,
    });
  } catch (error) {
    return {
      data: null,
      error: "Internal server error",
    };
  }

  redirect("/books");
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
