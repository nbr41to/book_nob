"use server";

import { Book } from "@prisma/client";
import { bookCreateSchema, bookUpdateSchema } from "../validations/book";
import { FormActionState } from "@/types";
import { isZodError } from "@/utils/error";
import { prismaBookCreate } from "../prisma/book";
import { createProduct } from "../stripe/product";
import { getOgImage } from "../ogp";
import { revalidatePath } from "next/cache";

/**
 * 本の追加 UseCase
 */
export const createBook = async (
  prevState: FormActionState<Book, typeof bookCreateSchema>,
  formData: FormData,
): Promise<FormActionState<Book, typeof bookCreateSchema>> => {
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

    // TODO: Transaction処理にする
    /* Stripe側にProductとして保存する */
    const imageUrl = await getOgImage(validated.url);
    const product = await createProduct({
      name: validated.title,
      url: validated.url,
      images: imageUrl ? [imageUrl] : undefined,
      default_price_data: {
        currency: "jpy",
        unit_amount: validated.price,
      },
    });

    if (!product.default_price)
      throw new Error("Not found product.default_price.");

    /* DBに保存する */
    const book = await prismaBookCreate({
      ...validated,
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
const deleteBook = async () => {};
