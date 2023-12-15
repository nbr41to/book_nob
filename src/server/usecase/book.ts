"use server";

import { Book } from "@prisma/client";
import { bookCreateSchema, bookUpdateSchema } from "../validations/book";
import { FormActionState } from "@/types";
import { isPrismaError, isZodError } from "@/utils/error";
import {
  getBookById,
  prismaBookCreate,
  prismaBookUpdate,
} from "../prisma/book";
import {
  stripeCreateProduct,
  stripeArchiveProduct,
  stripeUpdateProduct,
} from "../stripe/product";
import { getOgImage } from "../ogp";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma/client";
import { auth } from "@clerk/nextjs";
import { stripeArchivePrice, stripeCreatePrice } from "../stripe/price";

/**
 * 本の追加 UseCase
 */
export const createBook = async (
  prevState: FormActionState<Book, typeof bookCreateSchema>,
  formData: FormData,
): Promise<FormActionState<Book, typeof bookCreateSchema>> => {
  let productId: string | undefined; // prismaのError時にStripeのProductをarchiveするために使用する
  try {
    /* Parameters */
    const data = {
      title: String(formData.get("title")),
      url: String(formData.get("url")),
      categoryId: Number(formData.get("categoryId")),
      price: Number(formData.get("price")),
    };

    /* Validation */
    const validated = bookCreateSchema.parse(data);

    /* Stripe側にProductとして保存する */
    const imageUrl = await getOgImage(validated.url);

    const product = await stripeCreateProduct({
      name: validated.title,
      url: validated.url,
      images: imageUrl
        ? [encodeURIComponent(imageUrl)]
        : ["https://placehold.jp/200x160.png"],
      default_price_data: {
        currency: "jpy",
        unit_amount: validated.price,
      },
    });

    if (!product.default_price)
      throw new Error("Not found product.default_price.");
    productId = product.id;

    /* DBに保存する */
    const book = await prismaBookCreate({
      ...validated,
      stripeProductId: productId,
      stripePriceId:
        typeof product.default_price === "string"
          ? product.default_price
          : product.default_price.id,
    });

    /* Refetch */
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
    if (isPrismaError(error) && productId) {
      stripeArchiveProduct(
        productId,
        "Prismaのエラーが発生したため、StripeのProductをarchiveしました。",
      );
    }

    console.error(error);

    return {
      data: null,
      error: "Internal server error",
      validationError: null,
    };
  }
};

/**
 * 本の更新 UseCase
 */
export const updateBook = async (
  prevState: FormActionState<Book, typeof bookUpdateSchema>,
  formData: FormData,
): Promise<FormActionState<Book, typeof bookUpdateSchema>> => {
  try {
    const data = {
      id: Number(formData.get("bookId")),
      title: String(formData.get("title")),
      url: String(formData.get("url")),
      categoryId: Number(formData.get("categoryId")),
      price: Number(formData.get("price")),
      stripeProductId: String(formData.get("stripeProductId")),
      stripePriceId: String(formData.get("stripePriceId")),
    };

    /* Validation */
    const validated = bookUpdateSchema.parse(data);
    console.log(validated);

    /* 現在のデータをDBから取得 */
    const currentBook = await getBookById(validated.id);
    if (!currentBook) throw new Error("Not found book.");

    if (validated.price !== currentBook.price) {
      /* ProductとPriceの更新 */
      // Priceを作成する
      const price = await stripeCreatePrice({
        product: validated.stripeProductId,
        currency: "jpy",
        unit_amount: validated.price,
      });
      // Stripe側でProductを更新する
      await stripeUpdateProduct(validated.stripeProductId, {
        name: validated.title,
        url: validated.url,
        default_price: price.id,
      });
      // PriceをArchive
      await stripeArchivePrice(validated.stripePriceId);
    } else {
      /* Productの更新 */
      await stripeUpdateProduct(validated.stripeProductId, {
        name: validated.title,
        url: validated.url,
      });
    }

    /* DBを更新する */
    const book = await prismaBookUpdate(validated);

    // revalidateが動かない: https://github.com/vercel/next.js/issues/54173
    // revalidatePath("/admin/books");

    return {
      data: book,
      error: null,
      validationError: null,
    };
  } catch (error) {
    console.error(error);

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

  const book = await getBookById(bookId);
  if (!book) return;

  const liked = book.likes.includes(userId as string);

  if (liked) {
    await prismaBookUpdate({
      id: bookId,
      likes: { set: book.likes.filter((id) => id !== userId) },
    });
  } else {
    await prismaBookUpdate({
      id: bookId,
      likes: { push: userId },
    });
  }

  revalidatePath("/books/[bookId]");
};

/**
 * 本の削除 UseCase
 */
export const deleteBook = async (
  prevState: any,
  formData: FormData,
): Promise<FormActionState<Book>> => {
  try {
    const bookId = Number(formData.get("bookId"));

    // Transaction
    const book = await prisma.$transaction(async (tx) => {
      // DBから削除
      const book = await tx.book.delete({
        where: { id: bookId },
      });
      // StripeのProductをarchive
      await stripeArchiveProduct(book.stripeProductId);

      return book;
    });

    // Refetch
    revalidatePath("/admin/books");
    console.log(book);
    return {
      data: book,
      error: null,
    };
  } catch (error) {
    console.error(error);

    return {
      data: null,
      error: "Internal server error",
    };
  }
};
