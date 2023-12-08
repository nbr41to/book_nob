import { Prisma } from "@prisma/client";
import { ZodFormattedError, ZodType, z } from "zod";

const bookWithCategory = Prisma.validator<Prisma.BookDefaultArgs>()({
  include: { category: true },
});
export type BookWithCategory = Prisma.BookGetPayload<typeof bookWithCategory>;

export type FormActionState<
  T,
  U extends ZodType<any, any, any> = ZodType<any, any, any>,
> = {
  data: T | null;
  error: string | null; // その他のエラー
  validationError?: ZodFormattedError<z.infer<U>> | null; // バリデーションエラー
};
