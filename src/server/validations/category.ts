import "server-only";

import { z } from "zod";

const categorySchema = z.object({
  id: z.coerce.number(),
  name: z.coerce.string().min(1, { message: "タグ名を入力してください。" }),
});

export const categoryCreateSchema = categorySchema.omit({ id: true });
export const categoryUpdateSchema = categorySchema;
