"use server";

import "server-only";
import { Book, Prisma } from "@prisma/client";
import { prisma } from "./prisma/client";
import { bookCreateSchema } from "./validations/book";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

type State = {
  data: Book | null;
  error: string | null;
};

export const createBook = async (
  prevState: State,
  formData: FormData
): Promise<State> => {
  try {
    const data: Prisma.BookCreateInput = {
      title: formData.get("title") as string,
      url: formData.get("url") as string,
      category: formData.get("category") as string,
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

/* 本のいいねを1増やす */
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
