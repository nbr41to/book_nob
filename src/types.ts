import { Prisma } from "@prisma/client";

const bookWithCategory = Prisma.validator<Prisma.BookDefaultArgs>()({
  include: { category: true },
});
export type BookWithCategory = Prisma.BookGetPayload<typeof bookWithCategory>;
