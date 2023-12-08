import "server-only";

import { z } from "zod";

const bookSchema = z.object({
  id: z.coerce.number(),
  title: z.coerce.string().min(1, { message: "タイトルを入力してください。" }),
  url: z.coerce.string().min(1, { message: "URLを入力してください。" }),
  categoryId: z.coerce.number(),
  price: z.coerce.number().min(0, { message: "0以上の値を入力してください。" }),
});

export const bookCreateSchema = bookSchema.omit({ id: true });
export const bookUpdateSchema = bookSchema;
