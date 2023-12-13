"use server";

import { Book } from "@prisma/client";
import { bookCreateSchema, bookUpdateSchema } from "../validations/book";
import { FormActionState } from "@/types";
import { isPrismaError, isZodError } from "@/utils/error";
import { prismaBookCreate } from "../prisma/book";
import { createProduct, archiveProduct } from "../stripe/product";
import { getOgImage } from "../ogp";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma/client";

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

    const product = await createProduct({
      name: validated.title,
      url: validated.url,
      images: imageUrl ? [imageUrl] : ["https://placehold.jp/200x160.png"],
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
      archiveProduct(
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
const updateBook = async (
  prevState: FormActionState<Book, typeof bookUpdateSchema>,
  formData: FormData,
) => {};

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
      await archiveProduct(book.stripeProductId);

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
